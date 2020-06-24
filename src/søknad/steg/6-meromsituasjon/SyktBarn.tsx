import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';

const SyktBarn: React.FC = () => {
  return (
    <KomponentGruppe>
      <AlertStripeDokumentasjon>
        <Normaltekst>
          Du må legge ved dokumentasjon som bekrefter at barnet ditt er sykt og
          beskriver din mulighet til å være i yrkesrettet aktivitet.
        </Normaltekst>
        <br />
        <Normaltekst>
          Dokumentasjonen fra legen din må vise:
          <ul>
            <li>
              grunnen til at barnets sykdom påvirker muligheten din til å være i
              arbeid eller annen yrkesrettet aktivitet
            </li>
            <li>når barnet ble sykt</li>
            <li>når legen regner med at barnet vil bli friskt</li>
            <li>hvor mye du kan arbeide</li>
          </ul>
        </Normaltekst>
        <Normaltekst>
          Du får muligheten til å laste ned eller skrive ut en huskeliste du kan
          ta med til legen din for å dokumentere dette når du sender inn
          søknaden.
        </Normaltekst>
      </AlertStripeDokumentasjon>
    </KomponentGruppe>
  );
};
export default SyktBarn;
