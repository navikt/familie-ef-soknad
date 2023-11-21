import React from 'react';
import FeltGruppe from '../components/gruppe/FeltGruppe';
import LocaleTekst from '../language/LocaleTekst';
import {
  ERouteArbeidssøkerskjema,
  RoutesArbeidssokerskjema,
} from './routes/routesArbeidssokerskjema';
import { useSkjema } from './SkjemaContext';
import { useMount } from '../utils/hooks';
import { hentPath } from '../utils/routing';
import Språkvelger from '../components/språkvelger/Språkvelger';
import { logSidevisningArbeidssokerskjema } from '../utils/amplitude';
import { Heading, Panel } from '@navikt/ds-react';
import { VeilederBoks } from '../components/forside/VeilederBoks';
import { StartSøknadKnapp } from '../components/forside/KnappStartSøknad';
import { DisclaimerBoks } from '../components/forside/DisclaimerBoks';
import { Seksjon } from '../components/forside/Seksjon';
import { Overskrift } from '../components/forside/Overskrift';
import { Tekst } from '../components/forside/Tekst';
import { isIE } from 'react-device-detect';

const Forside: React.FC<{ visningsnavn: string }> = ({ visningsnavn }) => {
  const { skjema, settSkjema } = useSkjema();

  useMount(() => logSidevisningArbeidssokerskjema('Forside'));

  const settBekreftelse = (bekreftelse: boolean) => {
    settSkjema({
      ...skjema,
      harBekreftet: bekreftelse,
    });
  };

  const nesteSide =
    hentPath(RoutesArbeidssokerskjema, ERouteArbeidssøkerskjema.Spørsmål) || '';

  return (
    <div className={'forside'}>
      <div className={'forside__innhold'}>
        <Panel className={'forside__panel'}>
          <VeilederBoks navn={visningsnavn} />

          <FeltGruppe>
            <Språkvelger />
          </FeltGruppe>

          <Heading level="1" size="xlarge">
            <LocaleTekst tekst={'skjema.sidetittel'} />
          </Heading>

          <Seksjon>
            <Tekst tekst="forside.arbeidssøker.info" />
            <Tekst tekst="forside.arbeidssøker.krav" />
            <LocaleTekst tekst="forside.arbeidssøker.lerMer" />
          </Seksjon>

          <Seksjon>
            <Overskrift tekst="forside.arbeidssøker.overskrift.riktigeOpplysninger" />
            <Tekst tekst="forside.arbeidssøker.riktigeOpplysninger" />
            <Tekst tekst="forside.arbeidssøker.meldeEndringer" />
            <LocaleTekst
              tekst={'forside.arbeidssøker.personopplysningeneDineLenke'}
            />
          </Seksjon>

          {!isIE && (
            <DisclaimerBoks
              navn={visningsnavn}
              tekst={'forside.overgangsstønad.disclaimerTekst'}
              harBekreftet={skjema.harBekreftet}
              settBekreftelse={settBekreftelse}
            />
          )}

          {skjema.harBekreftet && <StartSøknadKnapp nesteSide={nesteSide} />}
        </Panel>
      </div>
    </div>
  );
};

export default Forside;
