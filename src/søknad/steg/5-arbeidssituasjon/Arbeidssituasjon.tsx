import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { hvaErDinArbeidssituasjon } from './ArbeidssituasjonConfig';
import { useIntl } from 'react-intl';
import HjemmeMedBarnUnderEttÅr from './HjemmeMedBarnUnderEttÅr';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import { EArbeidssituasjonSvar } from '../../../models/arbeidssituasjon';
import EtablererEgenVirksomhet from './EtablererEgenVirksomhet';

const Arbeidssituasjon: React.FC = () => {
  const intl = useIntl();

  const { søknad, settSøknad } = useSøknadContext();
  const { situasjon } = søknad.arbeidssituasjon;

  const settArbeidssituasjon = (spørsmål: string, svar: string[]) => {
    settSøknad({
      ...søknad,
      arbeidssituasjon: {
        ...søknad.arbeidssituasjon,
        situasjon: { label: spørsmål, verdi: svar },
      },
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

  return (
    <Side tittel={intl.formatMessage({ id: 'stegtittel.arbeidssituasjon' })}>
      <KomponentGruppe>
        <CheckboxSpørsmål
          spørsmål={hvaErDinArbeidssituasjon}
          settValgteSvar={settArbeidssituasjon}
          valgteSvar={situasjon?.verdi}
        />
      </KomponentGruppe>
      <HjemmeMedBarnUnderEttÅr erHuketAv={huketAvHjemmeMedBarnUnderEttÅr} />
      <EtablererEgenVirksomhet erHuketAv={huketAvEtablererEgenVirksomhet} />
    </Side>
  );
};

export default Arbeidssituasjon;
