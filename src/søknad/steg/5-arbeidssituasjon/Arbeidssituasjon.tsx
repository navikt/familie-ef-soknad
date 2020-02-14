import React from 'react';
import { hentNesteRoute } from '../../../routing/utils';
import { IRoute, Routes } from '../../../routing/Routes';
import { useLocation } from 'react-router-dom';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { hvaErDinArbeidssituasjon } from './ArbeidssituasjonConfig';
import { useIntl } from 'react-intl';
import { ISvar } from '../../../models/spørsmal';
import HjemmeMedBarnUnderEttÅr from './HjemmeMedBarnUnderEttÅr';

const Arbeidssituasjon: React.FC = () => {
  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);
  const intl = useIntl();

  const { søknad, settSøknad } = useSøknadContext();
  const { situasjon } = søknad.arbeidssituasjon;
  const arbeidLagretISøknad: string = situasjon.verdi;

  const settArbeidssituasjon = (spørsmål: string, svar: string) => {
    settSøknad({
      ...søknad,
      arbeidssituasjon: {
        ...søknad.arbeidssituasjon,
        situasjon: { label: spørsmål, verdi: svar },
      },
    });
  };
  const valgtÅrsak:
    | ISvar
    | undefined = hvaErDinArbeidssituasjon.svaralternativer.find(
    (svar: any) =>
      intl.formatMessage({ id: svar.svar_tekstid }) === arbeidLagretISøknad
  );

  console.log(valgtÅrsak);

  // TODO: Må lage en ny spørsmålskomponent med multiple choice check boxes og ny datafelttype for å ta inn lister

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.arbeidssituasjon' })}
      nestePath={nesteRoute.path}
      tilbakePath={Routes[2].path}
    >
      <KomponentGruppe>
        <MultiSvarSpørsmål
          spørsmål={hvaErDinArbeidssituasjon}
          onChange={settArbeidssituasjon}
          valgtSvar={situasjon?.verdi}
        />
      </KomponentGruppe>
      <HjemmeMedBarnUnderEttÅr erValgt={true} />
    </Side>
  );
};

export default Arbeidssituasjon;
