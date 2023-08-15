import React, { useState } from 'react';
import Barnekort from '../../../søknad/steg/3-barnadine/Barnekort';
import { hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useSøknad } from '../../../context/SøknadContext';
import { IBarn } from '../../../models/steg/barn';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesOvergangsstonad } from '../../routing/routesOvergangsstonad';
import { hentPathOvergangsstønadOppsummering } from '../../utils';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { ISøknad } from '../../../models/søknad/søknad';
import { logSidevisningOvergangsstonad } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { Alert } from '@navikt/ds-react';
import { ModalWrapper } from '../../../components/Modal/ModalWrapper';
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
    mellomlagreOvergangsstønad,
    settSøknad,
    settDokumentasjonsbehovForBarn,
  } = useSøknad();
  const skalViseKnapper = ESide.visTilbakeNesteAvbrytKnapp;

  const [åpenModal, settÅpenModal] = useState(false);

  useMount(() => logSidevisningOvergangsstonad('BarnaDine'));

  const barna = søknad.person.barn;
  const slettBarn = (id: string) => {
    const nyBarneListe = søknad.person.barn.filter((b: IBarn) => b.id !== id);

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
    <Side
      stønadstype={Stønadstype.overgangsstønad}
      stegtittel={hentTekst('barnadine.sidetittel', intl)}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={harMinstEttBarn}
      routesStønad={RoutesOvergangsstonad}
      mellomlagreStønad={mellomlagreOvergangsstønad}
      tilbakeTilOppsummeringPath={hentPathOvergangsstønadOppsummering}
      informasjonstekstId="barnadine.info.brukpdf"
    >
      <BarnaDineContainer>
        <Alert variant="info" inline>
          {hentTekst('barnadine.infohentet', intl)}
        </Alert>
        <BarneKortWrapper>
          {barna?.map((barn: IBarn) => (
            <Barnekort
              key={barn.id}
              gjeldendeBarn={barn}
              slettBarn={slettBarn}
              barneListe={søknad.person.barn}
              settBarneListe={settBarneliste}
              settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
            />
          ))}
          <LeggTilBarnKort settÅpenModal={settÅpenModal} />
        </BarneKortWrapper>
        {åpenModal && (
          <LeggTilBarnModal
            tittel={intl.formatMessage({ id: 'barnadine.leggtil' })}
            lukkModal={() => settÅpenModal(false)}
            barneListe={søknad.person.barn}
            settBarneListe={settBarneliste}
            settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
          />
        )}
      </BarnaDineContainer>
    </Side>
  );
};

export default BarnaDine;
