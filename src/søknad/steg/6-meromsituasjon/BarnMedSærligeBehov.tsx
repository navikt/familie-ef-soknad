import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';
import { useSøknad } from '../../../context/SøknadContext';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { IHjelpetekst } from '../../../models/felles/hjelpetekst';
import {
  ILabel,
  ISpørsmål,
  ISvar,
} from '../../../models/felles/spørsmålogsvar';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';

const BarnMedSærligeBehov: React.FC = () => {
  const { søknad } = useSøknad();
  const barn = søknad.person.barn;

  const spørsmål: ISpørsmål = {
    flersvar: false,
    svaralternativer: [],
    søknadid: '',
    tekstid: '',
  };

  return (
    <KomponentGruppe>
      <AlertStripeDokumentasjon>
        <Normaltekst>
          Du må legge ved dokumentasjon om barnets tilsynsbehov
        </Normaltekst>
        <Normaltekst>
          <ul>
            <li>
              Dokumentasjon fra legen din som bekrefter at barnet har
              medisinske, psykiske eller store sosiale problemer og trenger
              tilsyn.
            </li>
            <li>
              Dokumentasjon som beskriver hvor mye og hvordan barnet ditt
              trenger tilsyn, og hvordan dette påvirker muligheten din til å
              være i yrkesrettet aktivitet.
            </li>
          </ul>
        </Normaltekst>
      </AlertStripeDokumentasjon>
    </KomponentGruppe>
  );
};
export default BarnMedSærligeBehov;
