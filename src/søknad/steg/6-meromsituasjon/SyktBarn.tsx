import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';

const SyktBarn: React.FC = () => {
  return (
    <KomponentGruppe>
      <AlertStripeDokumentasjon>
        <Normaltekst>
          Du må legge ved dokumentasjon om barnets sykdom og din mulighet til å
          være i yrkesrettet aktivitet
        </Normaltekst>
        <br />
        <Normaltekst>
          Dokumentasjonen fra legen din må tydelig vise:
          <ul>
            <li>
              årsaken til at barnets sykdom påvirker muligheten din til å være i
              yrkesrettet aktivitet
            </li>
            <li>hvor mye du kan arbeide</li>
          </ul>
        </Normaltekst>
        <Normaltekst>
          Søker du om å forlenge stønadsperioden fordi barnet har en sykdom som
          ikke er varig? Da trenger vi dokumentasjonen fra lege som også viser:
          <ul>
            <li>når barnet ble syk</li>
            <li>når legen din regner med at barnet vil bli frisk</li>
          </ul>
        </Normaltekst>
      </AlertStripeDokumentasjon>
    </KomponentGruppe>
  );
};
export default SyktBarn;
