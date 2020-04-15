import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Side from '../../../components/side/Side';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import HjemmeMedBarnUnderEttÅr from './HjemmeMedBarnUnderEttÅr';
import EtablererEgenVirksomhet from './EtablererEgenVirksomhet';
import OmArbeidsforholdetDitt from './arbeidsforhold/OmArbeidsforholdetDitt';
import { hvaErDinArbeidssituasjonSpm } from './AktivitetConfig';
import {
  ArbeidssituasjonType,
  IAktivitet,
} from '../../../models/steg/aktivitet/aktivitet';
import UnderUtdanning from './underUtdanning/UnderUtdanning';
import Arbeidssøker from './arbeidssøker/Arbeidssøker';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import OmFirmaetDitt from './OmFirmaetDitt';
import { returnerAvhukedeSvar } from '../../../utils/spørsmålogsvar';
import { useSøknad } from '../../../context/SøknadContext';

const Aktivitet: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad, settDokumentasjonsbehov } = useSøknad();
  const [arbeidssituasjon, settArbeidssituasjon] = useState<IAktivitet>({
    hvaErDinArbeidssituasjon: søknad.aktivitet.hvaErDinArbeidssituasjon,
  });
  const { hvaErDinArbeidssituasjon } = arbeidssituasjon;

  useEffect(() => {
    settSøknad({ ...søknad, aktivitet: arbeidssituasjon });
    // eslint-disable-next-line
  }, [arbeidssituasjon]);

  const oppdaterArbeidssituasjon = (nyArbeidssituasjon: IAktivitet) => {
    settArbeidssituasjon({ ...arbeidssituasjon, ...nyArbeidssituasjon });
  };

  const settArbeidssituasjonFelt = (
    spørsmål: ISpørsmål,
    svarHuketAv: boolean,
    svar: ISvar
  ) => {
    const { avhukedeSvar, svarider } = returnerAvhukedeSvar(
      hvaErDinArbeidssituasjon,
      svarHuketAv,
      svar,
      intl
    );

    oppdaterArbeidssituasjon({
      ...arbeidssituasjon,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svarider,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: avhukedeSvar,
      },
    });
    settDokumentasjonsbehov(spørsmål, svar, svarHuketAv);
  };

  const erAktivitetHuketAv = (aktivitet: ArbeidssituasjonType): boolean => {
    const tekstid: string = 'arbeidssituasjon.svar.' + aktivitet;
    const svarTekst: string = intl.formatMessage({ id: tekstid });
    return hvaErDinArbeidssituasjon.verdi.some((svarHuketAvISøknad: string) => {
      return svarHuketAvISøknad === svarTekst;
    });
  };

  const huketAvHjemmeMedBarnUnderEttÅr = erAktivitetHuketAv(
    ArbeidssituasjonType.erHjemmeMedBarnUnderEttÅr
  );
  const huketAvEtablererEgenVirksomhet = erAktivitetHuketAv(
    ArbeidssituasjonType.etablererEgenVirksomhet
  );
  const huketAvHarArbeid =
    erAktivitetHuketAv(ArbeidssituasjonType.erAnsattIEgetAS) ||
    erAktivitetHuketAv(ArbeidssituasjonType.erArbeidstaker);
  const huketAvErArbeidssøker = erAktivitetHuketAv(
    ArbeidssituasjonType.erArbeidssøker
  );
  const huketAvTarUtdanning = erAktivitetHuketAv(
    ArbeidssituasjonType.tarUtdanning
  );

  const huketAvSelvstendigNæringsdrivendeEllerFrilanser = erAktivitetHuketAv(
    ArbeidssituasjonType.erSelvstendigNæringsdriveneEllerFrilanser
  );

  return (
    <Side tittel={intl.formatMessage({ id: 'stegtittel.arbeidssituasjon' })}>
      <SeksjonGruppe>
        <CheckboxSpørsmål
          spørsmål={hvaErDinArbeidssituasjonSpm}
          settValgteSvar={settArbeidssituasjonFelt}
          valgteSvar={hvaErDinArbeidssituasjon?.verdi}
        />
      </SeksjonGruppe>

      {huketAvHjemmeMedBarnUnderEttÅr && <HjemmeMedBarnUnderEttÅr />}

      {huketAvEtablererEgenVirksomhet && (
        <EtablererEgenVirksomhet
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      )}

      {huketAvHarArbeid && (
        <OmArbeidsforholdetDitt
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      )}

      {huketAvErArbeidssøker && (
        <Arbeidssøker
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={oppdaterArbeidssituasjon}
        />
      )}

      {huketAvSelvstendigNæringsdrivendeEllerFrilanser && (
        <OmFirmaetDitt
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={oppdaterArbeidssituasjon}
        />
      )}

      {huketAvTarUtdanning && (
        <UnderUtdanning
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      )}
    </Side>
  );
};

export default Aktivitet;
