import React, { useState } from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useSkolepengerSøknad } from '../../SkolepengerContext';
import Barnekort from '../../../søknad/steg/3-barnadine/Barnekort';
import { IBarn } from '../../../models/steg/barn';
import { RoutesSkolepenger } from '../../routing/routes';
import { hentPathSkolepengerOppsummering } from '../../utils';
import Side, { ESide } from '../../../components/side/Side';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { logSidevisningSkolepenger } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { Alert } from '@navikt/ds-react';
import {
  BarnaDineContainer,
  BarneKortWrapper,
} from '../../../søknad/steg/3-barnadine/BarnaDineFellesStyles';
import { LeggTilBarnKort } from '../../../søknad/steg/3-barnadine/LeggTilBarnKort';
import LeggTilBarnModal from '../../../søknad/steg/3-barnadine/LeggTilBarnModal';

const BarnaDine: React.FC = () => {
  const intl = useLokalIntlContext();
  const {
    søknad,
    mellomlagreSkolepenger,
    settDokumentasjonsbehovForBarn,
    oppdaterBarnISoknaden,
    fjernBarnFraSøknad,
  } = useSkolepengerSøknad();
  const skalViseKnapper = ESide.visTilbakeNesteAvbrytKnapp;

  useMount(() => logSidevisningSkolepenger('BarnaDine'));

  const [åpenModal, settÅpenModal] = useState(false);

  const harMinstEttBarn = søknad.person.barn.length > 0;

  return (
    <>
      <Side
        stønadstype={Stønadstype.skolepenger}
        stegtittel={hentTekst('barnadine.sidetittel', intl)}
        skalViseKnapper={skalViseKnapper}
        erSpørsmålBesvart={harMinstEttBarn}
        routesStønad={RoutesSkolepenger}
        mellomlagreStønad={mellomlagreSkolepenger}
        tilbakeTilOppsummeringPath={hentPathSkolepengerOppsummering}
        informasjonstekstId="barnadine.skolepenger.info.brukpdf"
      >
        <BarnaDineContainer>
          <Alert size="small" variant="info" inline>
            {hentTekst('barnadine.infohentet', intl)}
          </Alert>
          <BarneKortWrapper>
            {søknad.person.barn
              ?.sort((a: IBarn, b: IBarn) => parseInt(a.id) - parseInt(b.id))
              .map((barn: IBarn) => (
                <Barnekort
                  key={barn.id}
                  gjeldendeBarn={barn}
                  barneListe={søknad.person.barn}
                  oppdaterBarnISoknaden={oppdaterBarnISoknaden}
                  settDokumentasjonsbehovForBarn={
                    settDokumentasjonsbehovForBarn
                  }
                  fjernBarnFraSøknad={fjernBarnFraSøknad}
                />
              ))}
            <LeggTilBarnKort settÅpenModal={settÅpenModal} />
          </BarneKortWrapper>
          {åpenModal && (
            <LeggTilBarnModal
              tittel={intl.formatMessage({ id: 'barnadine.leggtil' })}
              lukkModal={() => settÅpenModal(false)}
              barneListe={søknad.person.barn}
              oppdaterBarnISoknaden={oppdaterBarnISoknaden}
              settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
            />
          )}
        </BarnaDineContainer>
      </Side>
    </>
  );
};

export default BarnaDine;
