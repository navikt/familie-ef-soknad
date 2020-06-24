import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';

const SøkerErSyk: React.FC = () => {
  return (
    <KomponentGruppe>
      <AlertStripeDokumentasjon>
        <Normaltekst>
          Hvis du ikke har sykemelding eller ikke mottar arbeidsavklaringspenger
          (AAP) eller uføretrygd, må du legge ved dokumentasjon som bekrefter at
          du er syk.
        </Normaltekst>
        <br />
        <Normaltekst>
          Dokumentasjonen fra legen din må vise:
          <ul>
            <li>grunnen til at du ikke kan være i yrkesrettet aktivitet</li>
            <li>når du ble syk</li>
            <li>når legen din regner med at du vil bli frisk</li>
            <li>hvor mye du kan arbeide</li>
          </ul>
        </Normaltekst>
        <Normaltekst>
          Får du allerede overgangsstønad og søker du om å forlenge
          stønadsperioden utover 3 år fordi du har en sykdom som ikke er varig?
          Da trenger vi dokumentasjonen fra legen din selv om du har
          sykemelding.
        </Normaltekst>
        <Normaltekst>
          At sykdommen ikke er varig betyr i denne sammenhengen at den ikke har
          vart i mer enn 2 år eller vil vare i mer enn 2 år.
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
export default SøkerErSyk;
