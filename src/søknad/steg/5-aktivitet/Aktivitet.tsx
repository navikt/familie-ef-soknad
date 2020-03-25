import React, { useEffect, useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import { useIntl } from 'react-intl';
import Side from '../../../components/side/Side';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import HjemmeMedBarnUnderEttÅr from './HjemmeMedBarnUnderEttÅr';
import EtablererEgenVirksomhet from './EtablererEgenVirksomhet';
import OmArbeidsforholdetDitt from './arbeidsforhold/OmArbeidsforholdetDitt';
import { hvaErDinArbeidssituasjonSpm } from './AktivitetConfig';
import {
  EArbeidssituasjon,
  IAktivitet,
} from '../../../models/steg/aktivitet/aktivitet';
import UnderUtdanning from './underUtdanning/UnderUtdanning';
import Arbeidssøker from './arbeidssøker/Arbeidssøker';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { ISpørsmål } from '../../../models/spørsmalogsvar';
import { hentTekst } from '../../../utils/søknad';
import { nyttTekstListeFelt } from '../../../utils/søknadsfelter';
import OmFirmaetDitt from './OmFirmaetDitt';

const Aktivitet: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknadContext();
  const [arbeidssituasjon, settArbeidssituasjon] = useState<IAktivitet>({
    hvaErDinArbeidssituasjon: nyttTekstListeFelt,
  });
  const { hvaErDinArbeidssituasjon } = arbeidssituasjon;

  useEffect(() => {
    settSøknad({ ...søknad, aktivitet: arbeidssituasjon });
    // eslint-disable-next-line
  }, [arbeidssituasjon]);

  const oppdaterArbeidssituasjon = (nyArbeidssituasjon: IAktivitet) => {
    settArbeidssituasjon({ ...arbeidssituasjon, ...nyArbeidssituasjon });
  };

  const settArbeidssituasjonFelt = (spørsmål: ISpørsmål, svar: string[]) => {
    oppdaterArbeidssituasjon({
      ...arbeidssituasjon,
      [spørsmål.søknadid]: {
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar,
      },
    });
  };

  const erAktivitetHuketAv = (aktivitet: EArbeidssituasjon): boolean => {
    const tekstid: string = 'arbeidssituasjon.svar.' + aktivitet;
    const svarTekst: string = intl.formatMessage({ id: tekstid });
    return hvaErDinArbeidssituasjon.verdi.some((svarHuketAvISøknad: string) => {
      return svarHuketAvISøknad === svarTekst;
    });
  };

  const huketAvHjemmeMedBarnUnderEttÅr = erAktivitetHuketAv(
    EArbeidssituasjon.erHjemmeMedBarnUnderEttÅr
  );
  const huketAvEtablererEgenVirksomhet = erAktivitetHuketAv(
    EArbeidssituasjon.etablererEgenVirksomhet
  );
  const huketAvHarArbeid =
    erAktivitetHuketAv(EArbeidssituasjon.erAnsattIEgetAS) ||
    erAktivitetHuketAv(EArbeidssituasjon.erArbeidstaker);
  const huketAvErArbeidssøker = erAktivitetHuketAv(
    EArbeidssituasjon.erArbeidssøker
  );
  const huketAvTarUtdanning = erAktivitetHuketAv(
    EArbeidssituasjon.tarUtdanning
  );

  const huketAvSelvstendigNæringsdrivendeEllerFrilanser = erAktivitetHuketAv(
    EArbeidssituasjon.erSelvstendigNæringsdriveneEllerFrilanser
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
