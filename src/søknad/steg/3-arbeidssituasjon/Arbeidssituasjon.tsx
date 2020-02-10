import React from 'react';
import { hentNesteRoute } from '../../../routing/utils';
import { IRoute, Routes } from '../../../routing/Routes';
import { useLocation } from 'react-router-dom';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { hvaErDinArbeidssituasjon } from './ArbeidssituasjonConfig';

const Arbeidssituasjon: React.FC = () => {
  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);

  const { søknad, settSøknad } = useSøknadContext();

  const settArbeidssituasjon = (svar: string) => {
    console.log('setter arbeidssituasjon');
  };

  return (
    <Side
      tittel={'Arbeid, utdanning etc'}
      nestePath={nesteRoute.path}
      tilbakePath={Routes[2].path}
    >
      <KomponentGruppe>
        <MultiSvarSpørsmål
          spørsmål={hvaErDinArbeidssituasjon}
          onChange={settArbeidssituasjon}
          valgtSvar={undefined}
        />
      </KomponentGruppe>
      >
    </Side>
  );
};

export default Arbeidssituasjon;
