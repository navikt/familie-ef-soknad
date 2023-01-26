import React, { useState } from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useLocation } from 'react-router-dom';
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
import { kommerFraOppsummeringen } from '../../../utils/locationState';
import { Alert, Button, Label } from '@navikt/ds-react';
import { ModalWrapper } from '../../../components/Modal/ModalWrapper';

const BarnaDine: React.FC = () => {
  const intl = useLokalIntlContext();
  const {
    søknad,
    settSøknad,
    mellomlagreSkolepenger,
    settDokumentasjonsbehovForBarn,
  } = useSkolepengerSøknad();
  const location = useLocation();
  const kommerFraOppsummering =
    kommerFraOppsummeringen(location.state) && false;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;

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
        <div className="barna-dine">
          <Alert size="small" variant="info" className="informasjonstekst">
            {hentTekst('barnadine.infohentet', intl)}
          </Alert>
          <div className="barnekort-wrapper">
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
            <div className="barnekort legg-til">
              <div className="barnekort__informasjonsboks legg-til-barn-kort">
                <Label as="p">
                  {hentTekst('barnadine.leggtil.info', intl)}
                </Label>
                <Button onClick={() => settÅpenModal(true)}>
                  {hentTekst('barnadine.leggtil', intl)}
                </Button>
              </div>
            </div>
          </div>
          <ModalWrapper
            tittel={intl.formatMessage({ id: 'barnadine.leggtil' })}
            visModal={åpenModal}
            onClose={() => settÅpenModal(false)}
          >
            <div className="legg-til-barn-modal">
              <LeggTilBarn
                settÅpenModal={settÅpenModal}
                barneListe={søknad.person.barn}
                settBarneListe={settBarneliste}
                settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
              />
            </div>
          </ModalWrapper>
        </div>
      </Side>
    </>
  );
};

export default BarnaDine;
