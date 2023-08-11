import React, { useState } from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useSkolepengerSøknad } from '../../SkolepengerContext';
import Barnekort from '../../../søknad/steg/3-barnadine/Barnekort';
import LeggTilBarn from '../../../søknad/steg/3-barnadine/LeggTilBarn';
import { IBarn } from '../../../models/steg/barn';
import { RoutesSkolepenger } from '../../routing/routes';
import { hentPathSkolepengerOppsummering } from '../../utils';
import Side, { ESide } from '../../../components/side/Side';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { logSidevisningSkolepenger } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { ISøknad } from '../../models/søknad';
import { Alert } from '@navikt/ds-react';
import { ModalWrapper } from '../../../components/Modal/ModalWrapper';
import {
  BarnaDineContainer,
  BarneKortWrapper,
} from '../../../søknad/steg/3-barnadine/BarnaDineFellesStyles';
import { LeggTilBarnKort } from '../../../søknad/steg/3-barnadine/LeggTilBarnKort';

const BarnaDine: React.FC = () => {
  const intl = useLokalIntlContext();
  const {
    søknad,
    settSøknad,
    mellomlagreSkolepenger,
    settDokumentasjonsbehovForBarn,
  } = useSkolepengerSøknad();
  const skalViseKnapper = ESide.visTilbakeNesteAvbrytKnapp;

  useMount(() => logSidevisningSkolepenger('BarnaDine'));

  const [åpenModal, settÅpenModal] = useState(false);

  const slettBarn = (id: string) => {
    const nyBarneListe = søknad.person.barn.filter(
      (barn: IBarn) => barn.id !== id
    );

    settSøknad((prevSoknad: ISøknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, barn: nyBarneListe },
      };
    });
  };

  const settBarneliste = (nyBarneListe: IBarn[]) => {
    settSøknad((prevSoknad: ISøknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, barn: nyBarneListe },
      };
    });
  };

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
                  settBarneListe={settBarneliste}
                  settDokumentasjonsbehovForBarn={
                    settDokumentasjonsbehovForBarn
                  }
                  slettBarn={slettBarn}
                />
              ))}
            <LeggTilBarnKort settÅpenModal={settÅpenModal} />
          </BarneKortWrapper>
          <ModalWrapper
            tittel={intl.formatMessage({ id: 'barnadine.leggtil' })}
            visModal={åpenModal}
            onClose={() => settÅpenModal(false)}
          >
            <LeggTilBarn
              settÅpenModal={settÅpenModal}
              barneListe={søknad.person.barn}
              settBarneListe={settBarneliste}
              settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
            />
          </ModalWrapper>
        </BarnaDineContainer>
      </Side>
    </>
  );
};

export default BarnaDine;
