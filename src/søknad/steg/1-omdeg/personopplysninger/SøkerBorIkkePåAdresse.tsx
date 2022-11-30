import { FC } from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import { Stønadstype } from '../../../../models/søknad/stønadstyper';
import { Label, BodyShort, Alert, Link } from '@navikt/ds-react';
import { hentBeskjedMedNavn } from '../../../../utils/språk';
import { useLokalIntlContext } from '../../../../context/LokalIntlContext';

interface Props {
  stønadstype: Stønadstype;
}

const lenkerPDFSøknad = {
  [Stønadstype.overgangsstønad]:
    'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.01/dokumentinnsending',
  [Stønadstype.barnetilsyn]:
    'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.02/dokumentinnsending',
  [Stønadstype.skolepenger]:
    'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.04/dokumentinnsending',
};

const SøkerBorIkkePåAdresse: FC<Props> = ({ stønadstype }) => {
  const intl = useLokalIntlContext();
  return (
    <>
      <KomponentGruppe>
        <Alert size="small" variant="warning" inline>
          <LocaleTekst tekst={'personopplysninger.alert.riktigAdresse'} />
        </Alert>
      </KomponentGruppe>
      <KomponentGruppe>
        <FeltGruppe>
          <Label as="p">
            <LocaleTekst tekst={'personopplysninger.info.endreAdresse'} />
          </Label>
        </FeltGruppe>
        <FeltGruppe>
          <BodyShort>
            <LocaleTekst
              tekst={'personopplysninger.lenke.pdfskjema'}
              replaceArgument0={lenkerPDFSøknad[stønadstype]}
            />
          </BodyShort>
        </FeltGruppe>
      </KomponentGruppe>
    </>
  );
};

export default SøkerBorIkkePåAdresse;
