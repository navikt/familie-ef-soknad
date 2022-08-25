import { FC } from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import Lenke from 'nav-frontend-lenker';
import { Stønadstype } from '../../../../models/søknad/stønadstyper';
import { Label, BodyShort, Alert } from '@navikt/ds-react';

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
  return (
    <>
      <KomponentGruppe>
        <Alert size="small" variant="warning" inline>
          <LocaleTekst tekst={'personopplysninger.alert.riktigAdresse'} />
        </Alert>
      </KomponentGruppe>
      <KomponentGruppe>
        <FeltGruppe>
          <Label>
            <LocaleTekst tekst={'personopplysninger.info.endreAdresse'} />
          </Label>
        </FeltGruppe>
        <FeltGruppe>
          <BodyShort>
            <Lenke href={lenkerPDFSøknad[stønadstype]}>
              <LocaleTekst tekst={'personopplysninger.lenke.pdfskjema'} />
            </Lenke>
          </BodyShort>
        </FeltGruppe>
        <BodyShort>
          <LocaleTekst tekst={'personopplysninger.info.pdfskjema'} />
        </BodyShort>
      </KomponentGruppe>
    </>
  );
};

export default SøkerBorIkkePåAdresse;
