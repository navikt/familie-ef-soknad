import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { useSkolepengerSøknad } from '../../SkolepengerContext';
import Barnekort from '../../../søknad/steg/3-barnadine/Barnekort';
import LeggTilBarn from '../../../søknad/steg/3-barnadine/LeggTilBarn';
import { IBarn } from '../../../models/steg/barn';
import { RoutesSkolepenger } from '../../routing/routes';
import { hentPathSkolepengerOppsummering } from '../../utils';
import Side, { ESide } from '../../../components/side/Side';

const BarnaDine: React.FC = () => {
  const intl = useIntl();
  const {
    søknad,
    settSøknad,
    mellomlagreSkolepenger,
    settDokumentasjonsbehov,
  } = useSkolepengerSøknad();
  const location = useLocation();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering && false;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;

  const [åpenModal, settÅpenModal] = useState(false);

  const slettBarn = (id: string) => {
    const nyBarneListe = søknad.person.barn.filter((b) => b.id !== id);

    settSøknad((prevSoknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, barn: nyBarneListe },
      };
    });
  };

  const settBarneliste = (nyBarneListe: IBarn[]) => {
    settSøknad((prevSoknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, barn: nyBarneListe },
      };
    });
  };

  return (
    <>
      <Side
        tittel={hentTekst('barnadine.sidetittel', intl)}
        skalViseKnapper={skalViseKnapper}
        erSpørsmålBesvart={true}
        routesStønad={RoutesSkolepenger}
        mellomlagreStønad={mellomlagreSkolepenger}
        tilbakeTilOppsummeringPath={hentPathSkolepengerOppsummering}
      >
        <div className="barna-dine">
          <AlertStripeInfo className="informasjonstekst">
            {hentTekst('barnadine.infohentet', intl)}
          </AlertStripeInfo>
          <div className="barnekort-wrapper">
            {søknad.person.barn
              ?.sort((a: IBarn, b: IBarn) => parseInt(a.id) - parseInt(b.id))
              .map((barn: IBarn) => (
                <Barnekort
                  key={barn.id}
                  id={barn.id ? barn.id : ''}
                  navn={barn.navn}
                  fødselsdato={barn.fødselsdato}
                  ident={
                    barn.ident && barn.ident.verdi
                      ? barn.ident
                      : {
                          label: hentTekst('barnadine.ident', intl),
                          verdi: '',
                        }
                  }
                  alder={barn.alder}
                  harSammeAdresse={barn.harSammeAdresse}
                  født={
                    barn.født
                      ? barn.født
                      : {
                          label: hentTekst('barnekort.spm.født', intl),
                          verdi: false,
                        }
                  }
                  lagtTil={barn.lagtTil ? barn.lagtTil : false}
                  barneListe={søknad.person.barn}
                  settBarneListe={settBarneliste}
                  settDokumentasjonsbehov={settDokumentasjonsbehov}
                  slettBarn={slettBarn}
                />
              ))}
            <div className="barnekort legg-til">
              <div className="barnekort__informasjonsboks legg-til-barn-kort">
                <Element>{hentTekst('barnadine.leggtil.info', intl)}</Element>
                <Knapp onClick={() => settÅpenModal(true)}>
                  {hentTekst('barnadine.leggtil', intl)}
                </Knapp>
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
                settDokumentasjonsbehov={settDokumentasjonsbehov}
                settBarneListe={settBarneliste}
              />
            </div>
          </Modal>
        </div>
      </Side>
    </>
  );
};

export default BarnaDine;
