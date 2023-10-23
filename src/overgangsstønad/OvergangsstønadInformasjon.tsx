import { BodyShort, Heading } from '@navikt/ds-react';
import styled from 'styled-components';
import FeltGruppe from '../components/gruppe/FeltGruppe';
import Språkvelger from '../components/språkvelger/Språkvelger';
import LocaleTekst from '../language/LocaleTekst';
import { LokalIntlShape } from '../language/typer';
import { IPerson } from '../models/søknad/person';
import { hentTekst } from '../utils/søknad';
import { isIE } from 'react-device-detect';
import { OversettelseAlert } from '../components/forside/OversettelseAlert';
import { DisclaimerBoks } from '../components/forside/DisclaimerBoks';
import { StartSøknadKnapp } from '../components/forside/StartSøknadKnapp';

const Seksjon = styled.div`
  margin-bottom: 3rem;

  & > *:nth-child(n + 1) {
    margin-top: 1.3rem;
  }
`;

interface InnholdProps {
  person: IPerson;
  intl: LokalIntlShape;
  harBekreftet: boolean;
  settBekreftelse: (bekreftet: boolean) => void;
  nesteSide: string;
}

export const OvergangsstønadInformasjon: React.FC<InnholdProps> = ({
  person,
  intl,
  harBekreftet,
  settBekreftelse,
  nesteSide,
}) => {
  return (
    <>
      <FeltGruppe>
        <Språkvelger />
      </FeltGruppe>

      <OversettelseAlert />

      <Seksjon>
        <BodyShort>
          {hentTekst('forside.overgangsstønad.erDuEnsligMorEllerFar', intl)}
        </BodyShort>
        <BodyShort>
          {hentTekst('forside.overgangsstønad.sammeSøknad', intl)}
        </BodyShort>
        <LocaleTekst tekst={'forside.overgangsstønad.merOmOvergangsstønad'} />
      </Seksjon>

      <Seksjon>
        <Heading level="2" size="small">
          {hentTekst(
            'forside.overgangsstønad.overskrift.riktigeOpplysninger',
            intl
          )}
        </Heading>
        <BodyShort>
          {hentTekst('forside.overgangsstønad.riktigeOpplysninger', intl)}
        </BodyShort>
        <BodyShort>
          {hentTekst('forside.overgangsstønad.meldeEndringer', intl)}
        </BodyShort>
      </Seksjon>

      <Seksjon>
        <Heading level="2" size="small">
          {hentTekst(
            'forside.overgangsstønad.overskrift.sendeDokumentasjon',
            intl
          )}
        </Heading>
        <BodyShort>
          {hentTekst('forside.overgangsstønad.beskjedDokumentere', intl)}
        </BodyShort>
        <BodyShort>
          {hentTekst('forside.overgangsstønad.merInformasjon', intl)}
        </BodyShort>
        <LocaleTekst tekst={'forside.overgangsstønad.oversiktDokumentasjon'} />
      </Seksjon>

      <Seksjon>
        <Heading level="2" size="small">
          {hentTekst(
            'forside.overgangsstønad.overskrift.henteInformasjon',
            intl
          )}
        </Heading>
        <BodyShort>
          {hentTekst('forside.overgangsstønad.henteInformasjon', intl)}
        </BodyShort>
        <BodyShort>
          {hentTekst('forside.overgangsstønad.viHenter', intl)}
        </BodyShort>
        <LocaleTekst tekst={'forside.overgangsstønad.henterPunktliste'} />
        <BodyShort>
          {hentTekst('forside.overgangsstønad.tidligereOpplysninger', intl)}
        </BodyShort>
        <LocaleTekst
          tekst={'forside.overgangsstønad.personopplysningeneDine'}
        />
      </Seksjon>

      <Seksjon>
        <Heading level="2" size="small">
          {hentTekst('forside.overgangsstønad.overskrift.slikSøkerDu', intl)}
        </Heading>
        <BodyShort>
          {hentTekst('forside.overgangsstønad.slikSøkerDu', intl)}
        </BodyShort>
        <BodyShort>
          {hentTekst('forside.overgangsstønad.viLagrerSøknadenDin', intl)}
        </BodyShort>
        <BodyShort>
          {hentTekst('forside.overgangsstønad.manglerDuDokumentasjon', intl)}
        </BodyShort>
      </Seksjon>

      {!isIE && (
        <DisclaimerBoks
          person={person}
          tekst={'forside.overgangsstønad.disclaimerTekst'}
          harBekreftet={harBekreftet}
          settBekreftelse={settBekreftelse}
          intl={intl}
        />
      )}

      {harBekreftet && <StartSøknadKnapp nesteSide={nesteSide} />}
    </>
  );
};
