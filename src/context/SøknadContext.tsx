import { useEffect, useState } from 'react';
import createUseContext from 'constate';
import tomPerson from '../mock/initialState.json';
import { EArbeidssituasjon } from '../models/steg/aktivitet/aktivitet';
import { EBosituasjon } from '../models/steg/bosituasjon';
import { ESituasjon } from '../models/steg/dinsituasjon/meromsituasjon';
import { ISpørsmål, ISvar } from '../models/felles/spørsmålogsvar';
import { ISøknad } from '../models/søknad/søknad';
import {
  hentDokumentasjonTilFlersvarSpørsmål,
  oppdaterDokumentasjonTilEtSvarSpørsmål,
  oppdaterDokumentasjonTilEtSvarSpørsmålForBarn,
} from '../helpers/steg/dokumentasjon';
import {
  hentMellomlagretSøknadFraDokument,
  mellomlagreSøknadTilDokument,
  nullstillMellomlagretSøknadTilDokument,
} from '../utils/søknad';
import { IMellomlagretOvergangsstønad } from '../models/søknad/mellomlagretSøknad';
import Environment from '../Environment';
import { MellomlagredeStønadstyper } from '../models/søknad/stønadstyper';
import { IBarn } from '../models/steg/barn';
import { oppdaterBarnIBarneliste, oppdaterBarneliste } from '../utils/barn';
import { IPerson } from '../models/søknad/person';
import { gjelderNoeAvDetteDeg } from '../søknad/steg/6-meromsituasjon/SituasjonConfig';
import { hvaErDinArbeidssituasjonSpm } from '../søknad/steg/5-aktivitet/AktivitetConfig';
import { useSpråkContext } from './SpråkContext';
import { LokalIntlShape } from '../language/typer';
import { useLokalIntlContext } from './LokalIntlContext';
import { LocaleType } from '../language/typer';
import { dagensDato, formatIsoDate } from '../utils/dato';

// -----------  CONTEXT  -----------
const initialState = (intl: LokalIntlShape): ISøknad => {
  return {
    person: tomPerson,
    sivilstatus: {},
    medlemskap: {},
    bosituasjon: {
      delerBoligMedAndreVoksne: {
        spørsmålid: EBosituasjon.delerBoligMedAndreVoksne,
        svarid: '',
        label: '',
        verdi: '',
      },
    },
    aktivitet: {
      hvaErDinArbeidssituasjon: {
        spørsmålid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
        svarid: [],
        label: '',
        verdi: [],
        alternativer: hvaErDinArbeidssituasjonSpm(intl).svaralternativer.map(
          (svaralternativ) => svaralternativ.svar_tekst
        ),
      },
    },
    merOmDinSituasjon: {
      gjelderDetteDeg: {
        spørsmålid: ESituasjon.gjelderDetteDeg,
        svarid: [],
        label: '',
        verdi: [],
        alternativer: gjelderNoeAvDetteDeg(intl).svaralternativer.map(
          (svaralternativ) => svaralternativ.svar_tekst
        ),
      },
    },
    dokumentasjonsbehov: [],
    harBekreftet: false,
    datoPåbegyntSøknad: formatIsoDate(dagensDato),
  };
};

const [SøknadProvider, useSøknad] = createUseContext(() => {
  SøknadProvider.displayName = 'OVERGANGSSTØNAD_PROVIDER';
  const intl = useLokalIntlContext();
  const [locale, setLocale] = useSpråkContext();
  const [søknad, settSøknad] = useState<ISøknad>(initialState(intl));

  const [mellomlagretOvergangsstønad, settMellomlagretOvergangsstønad] =
    useState<IMellomlagretOvergangsstønad>();

  useEffect(() => {
    if (
      mellomlagretOvergangsstønad?.locale &&
      mellomlagretOvergangsstønad?.locale !== locale
    ) {
      setLocale(mellomlagretOvergangsstønad.locale as LocaleType);
    }
  }, [mellomlagretOvergangsstønad, locale, setLocale]);

  const hentMellomlagretOvergangsstønad = (): Promise<void> => {
    return hentMellomlagretSøknadFraDokument<IMellomlagretOvergangsstønad>(
      MellomlagredeStønadstyper.overgangsstønad
    ).then((mellomlagretVersjon?: IMellomlagretOvergangsstønad) => {
      if (mellomlagretVersjon) {
        settMellomlagretOvergangsstønad(mellomlagretVersjon);
      }
    });
  };

  const brukMellomlagretOvergangsstønad = () => {
    if (mellomlagretOvergangsstønad) {
      settSøknad(mellomlagretOvergangsstønad.søknad);
    }
  };

  const mellomlagreOvergangsstønad = (steg: string) => {
    const utfyltSøknad = {
      søknad: søknad,
      modellVersjon: Environment().modellVersjon.overgangsstønad,
      gjeldendeSteg: steg,
      locale: locale,
    };
    mellomlagreSøknadTilDokument(
      utfyltSøknad,
      MellomlagredeStønadstyper.overgangsstønad
    );
    settMellomlagretOvergangsstønad(utfyltSøknad);
  };

  const nullstillMellomlagretOvergangsstønad = (): Promise<string> => {
    return nullstillMellomlagretSøknadTilDokument(
      MellomlagredeStønadstyper.overgangsstønad
    );
  };

  const nullstillSøknadOvergangsstønad = (
    person: IPerson,
    barnMedLabels: IBarn[]
  ) => {
    settSøknad({
      ...initialState(intl),
      person: { ...person, barn: barnMedLabels },
    });
    settMellomlagretOvergangsstønad(undefined);
  };

  const settDokumentasjonsbehovForBarn = (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    barneid: string,
    barnepassid?: string
  ) => {
    let endretDokumentasjonsbehov = søknad.dokumentasjonsbehov;
    if (spørsmål.flersvar) {
      // eslint-disable-next-line no-console
      console.error('Ikke implementert');
    } else {
      endretDokumentasjonsbehov = oppdaterDokumentasjonTilEtSvarSpørsmålForBarn(
        søknad.dokumentasjonsbehov,
        spørsmål,
        valgtSvar,
        intl,
        barneid,
        barnepassid
      );
    }

    settSøknad((prevSoknad) => {
      return {
        ...prevSoknad,
        dokumentasjonsbehov: endretDokumentasjonsbehov,
      };
    });
  };

  const settDokumentasjonsbehov = (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    erHuketAv?: boolean
  ) => {
    let endretDokumentasjonsbehov = søknad.dokumentasjonsbehov;

    if (spørsmål.flersvar) {
      endretDokumentasjonsbehov = hentDokumentasjonTilFlersvarSpørsmål(
        erHuketAv,
        søknad.dokumentasjonsbehov,
        valgtSvar,
        intl
      );
    } else {
      endretDokumentasjonsbehov = oppdaterDokumentasjonTilEtSvarSpørsmål(
        søknad.dokumentasjonsbehov,
        spørsmål,
        valgtSvar,
        intl
      );
    }

    settSøknad((prevSoknad) => {
      return { ...prevSoknad, dokumentasjonsbehov: endretDokumentasjonsbehov };
    });
  };

  const oppdaterBarnISøknaden = (oppdatertBarn: IBarn) => {
    settSøknad((prevSøknad) => ({
      ...prevSøknad,
      person: {
        ...prevSøknad.person,
        barn: oppdaterBarnIBarneliste(prevSøknad.person.barn, oppdatertBarn),
      },
    }));
  };

  const oppdaterFlereBarnISøknaden = (oppdaterteBarn: IBarn[]) => {
    settSøknad((prevSøknad) => ({
      ...prevSøknad,
      person: {
        ...prevSøknad.person,
        barn: oppdaterBarneliste(prevSøknad.person.barn, oppdaterteBarn),
      },
    }));
  };

  const fjernBarnFraSøknad = (id: string) => {
    settSøknad((prevSoknad: ISøknad) => {
      const nyBarneListe = prevSoknad.person.barn.filter(
        (b: IBarn) => b.id !== id
      );
      return {
        ...prevSoknad,
        person: { ...søknad.person, barn: nyBarneListe },
      };
    });
  };

  return {
    søknad,
    settSøknad,
    settDokumentasjonsbehov,
    settDokumentasjonsbehovForBarn,
    mellomlagretOvergangsstønad,
    hentMellomlagretOvergangsstønad,
    mellomlagreOvergangsstønad,
    brukMellomlagretOvergangsstønad,
    nullstillMellomlagretOvergangsstønad,
    oppdaterBarnISøknaden,
    oppdaterFlereBarnISøknaden,
    nullstillSøknadOvergangsstønad,
    fjernBarnFraSøknad,
  };
});

export { SøknadProvider, useSøknad };
