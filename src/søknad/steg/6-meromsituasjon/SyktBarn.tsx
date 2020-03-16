import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

const SyktBarn: React.FC = () => {
  return (
    <KomponentGruppe>
      <AlertStripe type={'info'} form={'inline'}>
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
        <Normaltekst>
          Du får muligheten til å laste ned eller skrive ut et følgebrev du kan
          ta med til legen din for å dokumentere dette når du sender inn
          søknaden.
        </Normaltekst>
      </AlertStripe>
    </KomponentGruppe>
  );
};
export default SyktBarn;
