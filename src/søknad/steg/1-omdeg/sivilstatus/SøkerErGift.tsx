import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';
import { ISpørsmål } from '../../../../models/spørsmal';
import { SeparasjonSpørsmål } from './SivilstatusConfig';
import { ISivilstatus } from '../../../../models/steg/omDeg';
import SøkerHarSøktSeparasjon from './SøkerHarSøktSeparasjon';

interface Props {
  settJaNeiFelt: (spørsmål: ISpørsmål, svar: boolean) => void;
  settDato: (date: Date | null, objektnøkkel: string, tekst: string) => void;
  sivilstatusObjekt: ISivilstatus;
}

const SøkerErGift: React.FC<Props> = ({
  settJaNeiFelt,
  settDato,
  sivilstatusObjekt,
}) => {
  const separasjonsSpørsmål: ISpørsmål = SeparasjonSpørsmål;
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
          <AlertStripe type={'advarsel'} form={'inline'}>
            <LocaleTekst tekst={'sivilstatus.separasjon.advarsel'} />
          </AlertStripe>
        </KomponentGruppe>
      ) : null}
    </>
  );
};

export default SøkerErGift;
