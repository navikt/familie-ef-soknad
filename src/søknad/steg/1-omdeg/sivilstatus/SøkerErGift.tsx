import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';
import { ISpørsmål, ISvar } from '../../../../models/felles/spørsmålogsvar';
import { SeparasjonSpørsmål } from './SivilstatusConfig';
import SøkerHarSøktSeparasjon from './SøkerHarSøktSeparasjon';
import { ISivilstatus } from '../../../../models/steg/omDeg/sivilstatus';
import { useIntl } from 'react-intl';

interface Props {
  settJaNeiFelt: (spørsmål: ISpørsmål, valgtSvar: ISvar) => void;
  settDato: (date: string, objektnøkkel: string, tekst: string) => void;
  sivilstatus: ISivilstatus;
}

const SøkerErGift: React.FC<Props> = ({
  settJaNeiFelt,
  settDato,
  sivilstatus,
}) => {
  const separasjonsSpørsmål: ISpørsmål = SeparasjonSpørsmål(useIntl());
  const { harSøktSeparasjon } = sivilstatus;

  return (
    <>
      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={separasjonsSpørsmål}
          onChange={settJaNeiFelt}
          valgtSvar={harSøktSeparasjon ? harSøktSeparasjon.verdi : undefined}
        />
      </KomponentGruppe>
      {harSøktSeparasjon?.verdi ? (
        <SøkerHarSøktSeparasjon sivilstatus={sivilstatus} settDato={settDato} />
      ) : (
        harSøktSeparasjon?.verdi === false && (
          <AlertStripe type={'advarsel'} form={'inline'}>
            <LocaleTekst tekst={'sivilstatus.alert-advarsel.søktSeparasjon'} />
          </AlertStripe>
        )
      )}
    </>
  );
};

export default SøkerErGift;
