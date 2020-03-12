import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

const SøkerErSyk: React.FC = () => {
  return (
    <KomponentGruppe>
      <AlertStripeInfo className={'fjernBakgrunn'}>
        <Normaltekst>
          Hvis du ikke har sykemelding eller ikke mottar AAP eller uføretrygd,
          må du legge ved dokumentasjon
        </Normaltekst>
        <br />
        <Normaltekst>
          Dokumentasjonen fra legen din må tydelig vise:
          <ul>
            <li>årsaken til at du ikke kan være i yrkesrettet aktivitet</li>
            <li>hvor mye du kan arbeide</li>
          </ul>
        </Normaltekst>
        <Normaltekst>
          Søker du om å forlenge stønadsperioden fordi du har en sykdom som ikke
          er varig? Da trenger vi dokumentasjonen fra legen din selv om du har
          sykemelding. Denne må vise:
          <ul>
            <li>når du ble syk</li>
            <li>når legen din regner med at du vil bli frisk</li>
          </ul>
        </Normaltekst>
        <Normaltekst>
          Du får muligheten til å laste ned eller skrive ut et følgebrev du kan
          ta med til legen din for å dokumentere dette når du sender inn
          søknaden.
        </Normaltekst>
      </AlertStripeInfo>
    </KomponentGruppe>
  );
};
export default SøkerErSyk;
