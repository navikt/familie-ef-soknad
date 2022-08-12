import React, { useState } from 'react';
import Barnekort from '../../../søknad/steg/3-barnadine/Barnekort';
import LeggTilBarn from '../../../søknad/steg/3-barnadine/LeggTilBarn';
import Modal from 'nav-frontend-modal';
import { hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useSøknad } from '../../../context/SøknadContext';
import { useLocation } from 'react-router-dom';
import { IBarn } from '../../../models/steg/barn';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesOvergangsstonad } from '../../routing/routesOvergangsstonad';
import { hentPathOvergangsstønadOppsummering } from '../../utils';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { ISøknad } from '../../../models/søknad/søknad';
import { logSidevisningOvergangsstonad } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { kommerFraOppsummeringen } from '../../../utils/locationState';
import { Alert, Button, Label } from '@navikt/ds-react';

const BarnaDine: React.FC = () => {
  const intl = useLokalIntlContext();
  const {
    søknad,
    mellomlagreOvergangsstønad,
    settSøknad,
    settDokumentasjonsbehovForBarn,
  } = useSøknad();
  const location = useLocation();
  const kommerFraOppsummering =
    kommerFraOppsummeringen(location.state) && false;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;

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
    <>
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
        <div className="barna-dine">
          <Alert variant="info" className="informasjonstekst">
            {hentTekst('barnadine.infohentet', intl)}
          </Alert>
          <div className="barnekort-wrapper">
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
            <div className="barnekort legg-til">
              <div className="barnekort__informasjonsboks legg-til-barn-kort">
                <Label>{hentTekst('barnadine.leggtil.info', intl)}</Label>
                <Button onClick={() => settÅpenModal(true)}>
                  {hentTekst('barnadine.leggtil', intl)}
                </Button>
              </div>
            </div>
          </div>
          <Modal
            isOpen={åpenModal}
            onRequestClose={() => settÅpenModal(false)}
            closeButton={true}
            contentLabel="Legg til barn"
          >
            <div className="legg-til-barn-modal">
              <LeggTilBarn
                settÅpenModal={settÅpenModal}
                barneListe={søknad.person.barn}
                settBarneListe={settBarneliste}
                settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
              />
            </div>
          </Modal>
        </div>
      </Side>
    </>
  );
};

export default BarnaDine;
