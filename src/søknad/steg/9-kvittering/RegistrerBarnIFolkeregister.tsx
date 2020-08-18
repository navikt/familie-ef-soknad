import React, { FC } from 'react';
import { ESkalBarnetBoHosSøker } from '../../../models/steg/barnasbosted';
import { IBarn } from '../../../models/steg/barn';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { Normaltekst } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import { flereBarnsNavn } from '../../../utils/barn';
import { hentBeskjedMedNavn } from '../../../utils/språk';
import LocaleTekst from '../../../language/LocaleTekst';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';

interface Props {
  barna: IBarn[];
}

const RegistrerBarnIFolkeregister: FC<Props> = ({ barna }) => {
  const intl = useIntl();
  const barnSomSkalRegistreresIFolkeregister = barna.filter((barn) => {
    return (
      barn?.forelder?.skalBarnetBoHosSøker?.svarid === ESkalBarnetBoHosSøker.ja
    );
  });

  if (barnSomSkalRegistreresIFolkeregister.length === 0) {
    return null;
  }
  const barnasNavn = flereBarnsNavn(barnSomSkalRegistreresIFolkeregister, intl);
  const tekst = hentBeskjedMedNavn(
    barnasNavn,
    hentTekst('barnasbosted.skalBliFolkeregistrert.tekst', intl)
  );

  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Normaltekst>{tekst}</Normaltekst>
      </FeltGruppe>
      <KomponentGruppe>
        <a
          target={'_blank'}
          className={'knapp knapp--standard kvittering'}
          href={
            'https://www.skatteetaten.no/person/folkeregister/flytte/i-norge/'
          }
        >
          <LocaleTekst tekst={'barnasbosted.skalBliFolkeregistrert.knapp'} />
        </a>
      </KomponentGruppe>
    </SeksjonGruppe>
  );
};
export default RegistrerBarnIFolkeregister;
