import React from 'react';
import { hentNesteRoute } from '../../../routing/utils';
import { IRoute, Routes } from '../../../routing/Routes';
import { useLocation } from 'react-router-dom';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { hvaErDinArbeidssituasjon } from './ArbeidssituasjonConfig';
import { useIntl } from 'react-intl';
import HjemmeMedBarnUnderEttÅr from './HjemmeMedBarnUnderEttÅr';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';

const Arbeidssituasjon: React.FC = () => {
  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);
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

  // TODO: Må lage en ny spørsmålskomponent med multiple choice check boxes og ny datafelttype for å ta inn lister

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.arbeidssituasjon' })}
      nestePath={nesteRoute.path}
      tilbakePath={Routes[2].path}
    >
      <KomponentGruppe>
        <CheckboxSpørsmål
          spørsmål={hvaErDinArbeidssituasjon}
          settValgteSvar={settArbeidssituasjon}
          valgteSvar={situasjon?.verdi}
        />
      </KomponentGruppe>
      <HjemmeMedBarnUnderEttÅr erValgt={true} />
    </Side>
  );
};

export default Arbeidssituasjon;
