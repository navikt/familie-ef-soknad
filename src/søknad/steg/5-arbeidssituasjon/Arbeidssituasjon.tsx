import React, { useEffect, useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { hvaErDinArbeidssituasjon } from './ArbeidssituasjonConfig';
import { useIntl } from 'react-intl';
import HjemmeMedBarnUnderEttÅr from './HjemmeMedBarnUnderEttÅr';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import {
  EArbeidssituasjonSvar,
  IArbeidssituasjon,
} from '../../../models/arbeidssituasjon';
import EtablererEgenVirksomhet from './EtablererEgenVirksomhet';
import OmFirmaetDitt from './OmFirmaetDitt';

const Arbeidssituasjon: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknadContext();
  const [arbeidssituasjon, settArbeidssituasjon] = useState<IArbeidssituasjon>({
    situasjon: { label: '', verdi: [] },
  });
  const { situasjon } = arbeidssituasjon;

  useEffect(() => {
    settSøknad({ ...søknad, arbeidssituasjon: arbeidssituasjon });
    // eslint-disable-next-line
  }, [arbeidssituasjon]);

  const oppdaterArbeidssituasjon = (nyArbeidssituasjon: IArbeidssituasjon) => {
    settArbeidssituasjon({ ...arbeidssituasjon, ...nyArbeidssituasjon });
  };

  const settArbeidssituasjonFelt = (spørsmål: string, svar: string[]) => {
    oppdaterArbeidssituasjon({
      ...arbeidssituasjon,
      situasjon: { label: spørsmål, verdi: svar },
    });
  };

  const erAktivitetHuketAv = (aktivitet: EArbeidssituasjonSvar): boolean => {
    const tekstid: string = 'arbeidssituasjon.svar.' + aktivitet;
    const svarTekst: string = intl.formatMessage({ id: tekstid });
    return situasjon.verdi.some((svarHuketAvISøknad: string) => {
      return svarHuketAvISøknad === svarTekst;
    });
  };

  const huketAvHjemmeMedBarnUnderEttÅr = erAktivitetHuketAv(
    EArbeidssituasjonSvar.erHjemmeMedBarnUnderEttÅr
  );
  const huketAvEtablererEgenVirksomhet = erAktivitetHuketAv(
    EArbeidssituasjonSvar.etablererEgenVirksomhet
  );
  const huketAvSelvstendigNæringsdrivendeEllerFrilanser = erAktivitetHuketAv(
    EArbeidssituasjonSvar.erSelvstendigNæringsdriveneEllerFrilanser
  );

  return (
    <Side tittel={intl.formatMessage({ id: 'stegtittel.arbeidssituasjon' })}>
      <KomponentGruppe>
        <CheckboxSpørsmål
          spørsmål={hvaErDinArbeidssituasjon}
          settValgteSvar={settArbeidssituasjonFelt}
          valgteSvar={situasjon?.verdi}
        />
      </KomponentGruppe>

      <HjemmeMedBarnUnderEttÅr erHuketAv={huketAvHjemmeMedBarnUnderEttÅr} />

      <EtablererEgenVirksomhet erHuketAv={huketAvEtablererEgenVirksomhet} />

      {huketAvSelvstendigNæringsdrivendeEllerFrilanser && (
        <OmFirmaetDitt
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={oppdaterArbeidssituasjon}
        />
      )}
    </Side>
  );
};

export default Arbeidssituasjon;
