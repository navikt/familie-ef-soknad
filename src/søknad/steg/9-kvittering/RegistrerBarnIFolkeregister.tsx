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
import { StyledUndertittel } from '../../../components/gruppe/Spacing';

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
  const undertittelMedNavn = hentBeskjedMedNavn(
    barnasNavn,
    'Husk å registrere riktig adresse for [0] i Folkeregisteret.'
  );

  return (
    <SeksjonGruppe>
      <StyledUndertittel>{undertittelMedNavn}</StyledUndertittel>
      <Normaltekst>{tekst}</Normaltekst>
      <KomponentGruppe>
        <a
          target={'_blank'}
          rel={'noreferrer noopener'}
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
