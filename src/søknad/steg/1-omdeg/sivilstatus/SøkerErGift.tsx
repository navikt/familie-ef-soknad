import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import {
  AlertStripeAdvarsel,
  AlertStripeInfo,
} from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';
import { IJaNeiSpørsmål } from '../../../../models/spørsmal';
import { SeparasjonSpørsmål } from './SivilstatusConfig';
import { ISivilstatus } from '../../../../models/omDeg';

interface Props {
  settJaNeiFelt: (spørsmål: IJaNeiSpørsmål, svar: boolean) => void;
  settDato: (date: Date | null, objektnøkkel: string, tekst: string) => void;
  sivilstatusObjekt: ISivilstatus;
}

const SøkerErGift: React.FC<Props> = ({
  settJaNeiFelt,
  settDato,
  sivilstatusObjekt,
}) => {
  const separasjonsSpørsmål: IJaNeiSpørsmål = SeparasjonSpørsmål;
  const { søkerHarSøktSeparasjon, datoSøktSeparasjon } = sivilstatusObjekt;

  return (
    <>
      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={separasjonsSpørsmål}
          onChange={settJaNeiFelt}
          valgtSvar={
            søkerHarSøktSeparasjon ? søkerHarSøktSeparasjon.verdi : undefined
          }
        />
      </KomponentGruppe>
      {søkerHarSøktSeparasjon?.verdi ? (
        <KomponentGruppe>
          <Datovelger
            settDato={(e) =>
              settDato(
                e,
                'datoSøktSeparasjon',
                'sivilstatus.separasjon.datosøkt'
              )
            }
            valgtDato={
              datoSøktSeparasjon ? datoSøktSeparasjon.verdi : undefined
            }
            tekstid={'sivilstatus.separasjon.datosøkt'}
            datobegrensning={DatoBegrensning.TidligereDatoer}
          />
          <FeltGruppe>
            <AlertStripeInfo className={'fjernBakgrunn'}>
              <LocaleTekst tekst={'sivilstatus.somgift'} />
            </AlertStripeInfo>
          </FeltGruppe>
        </KomponentGruppe>
      ) : !søkerHarSøktSeparasjon && søkerHarSøktSeparasjon !== undefined ? (
        <KomponentGruppe>
          <AlertStripeAdvarsel className={'fjernBakgrunn'}>
            <LocaleTekst tekst={'sivilstatus.separasjon.advarsel'} />
          </AlertStripeAdvarsel>
        </KomponentGruppe>
      ) : null}
    </>
  );
};

export default SøkerErGift;
