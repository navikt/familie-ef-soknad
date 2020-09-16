import { useState } from 'react';
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
import { useIntl } from 'react-intl';
import { MellomlagredeStønadstyper } from '../models/søknad/stønadstyper';
import { IBarn } from '../models/steg/barn';
import { oppdaterObjektIListe } from '../utils/array';

// -----------  CONTEXT  -----------
const initialState: ISøknad = {
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
    },
  },
  merOmDinSituasjon: {
    gjelderDetteDeg: {
      spørsmålid: ESituasjon.gjelderDetteDeg,
      svarid: [],
      label: '',
      verdi: [],
    },
  },
  dokumentasjonsbehov: [],
  harBekreftet: false,
};

const [SøknadProvider, useSøknad] = createUseContext(() => {
  const [søknad, settSøknad] = useState<ISøknad>(initialState);
  const [
    mellomlagretOvergangsstønad,
    settMellomlagretOvergangsstønad,
  ] = useState<IMellomlagretOvergangsstønad>();
  const intl = useIntl();

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
    };
    mellomlagreSøknadTilDokument(
      utfyltSøknad,
      MellomlagredeStønadstyper.overgangsstønad
    );
    settMellomlagretOvergangsstønad(utfyltSøknad);
  };

  const nullstillMellomlagretOvergangsstønad = (): Promise<any> => {
    return nullstillMellomlagretSøknadTilDokument(
      MellomlagredeStønadstyper.overgangsstønad
    );
  };

  const settDokumentasjonsbehovForBarn = (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    barneid: string,
    barnepassid?: string
  ) => {
    let endretDokumentasjonsbehov = søknad.dokumentasjonsbehov;
    if (spørsmål.flersvar) {
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

  const oppdaterBarnISoknaden = (
    oppdatertBarn: IBarn,
    indeksBarnSomErHuket: number
  ) => {
    settSøknad((prevSøknad) => ({
      ...prevSøknad,
      person: {
        ...prevSøknad.person,
        barn: oppdaterObjektIListe<IBarn>(
          søknad.person.barn,
          oppdatertBarn,
          indeksBarnSomErHuket
        ),
      },
    }));
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
    oppdaterBarnISoknaden,
  };
});

export { SøknadProvider, useSøknad };
