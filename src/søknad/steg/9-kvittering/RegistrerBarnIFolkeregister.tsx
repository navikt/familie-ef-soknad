import { FC } from 'react';
import { ESkalBarnetBoHosSøker } from '../../../models/steg/barnasbosted';
import { IBarn } from '../../../models/steg/barn';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { hentTekst } from '../../../utils/søknad';
import { flereBarnsNavn } from '../../../utils/barn';
import { hentBeskjedMedNavn } from '../../../utils/språk';
import LocaleTekst from '../../../language/LocaleTekst';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { StyledUndertittel } from '../../../components/gruppe/Spacing';
import { BodyShort } from '@navikt/ds-react';

interface Props {
  barna: IBarn[];
}

const RegistrerBarnIFolkeregister: FC<Props> = ({ barna }) => {
  const intl = useLokalIntlContext();

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
    hentTekst('barnasbosted.skalBliFolkeregistrert.tekst', intl)
  );

  return (
    <SeksjonGruppe>
      <StyledUndertittel>{undertittelMedNavn}</StyledUndertittel>
      <BodyShort>{tekst}</BodyShort>
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
