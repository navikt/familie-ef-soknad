import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';

const BarnMedSærligeBehov: React.FC = () => {
  return (
    <KomponentGruppe>
      <AlertStripeDokumentasjon>
        <Normaltekst>
          Du må legge ved dokumentasjon på barnets tilsynsbehov
        </Normaltekst>
        <Normaltekst>
          <ul>
            <li>
              Dokumentasjon fra legen din som bekrefter at barnet har
              medisinske, psykiske eller store sosiale problemer og trenger
              tilsyn.
            </li>
            <li>
              Dokumentasjon som beskriver behovet barnet ditt har for tilsyn og
              hvordan dette påvirker muligheten din til å være i arbeid eller
              yrkesrettet aktivitet.
            </li>
          </ul>
        </Normaltekst>
      </AlertStripeDokumentasjon>
    </KomponentGruppe>
  );
};
export default BarnMedSærligeBehov;
