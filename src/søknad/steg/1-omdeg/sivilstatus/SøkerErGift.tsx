import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';
import { ISpørsmål } from '../../../../models/spørsmalogsvar';
import { SeparasjonSpørsmål } from './SivilstatusConfig';
import SøkerHarSøktSeparasjon from './SøkerHarSøktSeparasjon';
import { ISivilstatus } from '../../../../models/steg/omDeg/sivilstatus';

interface Props {
  settJaNeiFelt: (spørsmål: ISpørsmål, svar: boolean) => void;
  settDato: (date: Date | null, objektnøkkel: string, tekst: string) => void;
  sivilstatus: ISivilstatus;
}

const SøkerErGift: React.FC<Props> = ({
  settJaNeiFelt,
  settDato,
  sivilstatus,
}) => {
  const separasjonsSpørsmål: ISpørsmål = SeparasjonSpørsmål;
  const { søkerHarSøktSeparasjon } = sivilstatus;

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
        <SøkerHarSøktSeparasjon sivilstatus={sivilstatus} settDato={settDato} />
      ) : (
        søkerHarSøktSeparasjon?.verdi === false && (
          <KomponentGruppe>
            <AlertStripe type={'advarsel'} form={'inline'}>
              <LocaleTekst tekst={'sivilstatus.alert.søktSeparasjon'} />
            </AlertStripe>
          </KomponentGruppe>
        )
      )}
    </>
  );
};

export default SøkerErGift;
