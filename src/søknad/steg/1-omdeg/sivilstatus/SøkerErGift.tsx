import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';
import { IJaNeiSpørsmål } from '../../../../models/spørsmal';
import { SeparasjonSpørsmål } from './SivilstatusConfig';
import { ISivilstatus } from '../../../../models/omDeg';
import SøkerHarSøktSeparasjon from './SøkerHarSøktSeparasjon';

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
  const { søkerHarSøktSeparasjon } = sivilstatusObjekt;

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
        <SøkerHarSøktSeparasjon settDato={settDato} />
      ) : !søkerHarSøktSeparasjon?.verdi ? (
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
