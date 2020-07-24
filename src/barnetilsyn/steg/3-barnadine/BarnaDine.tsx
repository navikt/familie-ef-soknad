import React, { useState } from 'react';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import Side from '../../side/Side';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';
import { hentFeltObjekt, hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import Hjelpetekst from '../../../components/Hjelpetekst';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import BarnMedISøknad from './BarnMedISøknad';
import Barnekort from '../../../søknad/steg/3-barnadine/Barnekort';
import LeggTilBarn from '../../../søknad/steg/3-barnadine/LeggTilBarn';
import { IBarn } from '../../../models/barn';

const BarnaDine: React.FC = () => {
  const intl = useIntl();
  const {
    søknad,
    settSøknad,
    mellomlagreOvergangsstønad,
    settDokumentasjonsbehov,
  } = useBarnetilsynSøknad();
  const history = useHistory();
  const location = useLocation();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering && false;

  const [åpenModal, settÅpenModal] = useState(false);

  const toggleMedISøknadBarn = (id: string) => {
    const detteBarnet = søknad.person.barn.find((b: IBarn) => b.id === id);

    if (!detteBarnet) return null;

    const nyttBarn: IBarn = {
      ...detteBarnet,
      medISøknad: hentFeltObjekt(
        'barnekort.medISøknad',
        !detteBarnet.medISøknad?.verdi,
        intl
      ),
    };

    const nyBarneListe = søknad.person.barn.map((barn) => {
      return barn.id === id ? nyttBarn : barn;
    });
    settSøknad({
      ...søknad,
      person: { ...søknad.person, barn: nyBarneListe },
    });
  };

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
        skalViseKnapper={true}
        erSpørsmålBesvart={true}
        mellomlagreOvergangsstønad={mellomlagreOvergangsstønad}
      >
        <div className="barna-dine">
          <div className="barnetilsyn__hvilke-barn">
            <Element>Hvilke barn skal være med i søknaden?</Element>
            <FeltGruppe>
              <Hjelpetekst
                åpneTekstid={'barnetilsyn.hjelpetekst-åpne.hvilke'}
                innholdTekstid={'barnetilsyn.hjelpetekst-innhold.hvilke'}
              />
            </FeltGruppe>
          </div>
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
                  velgBarnForDenneSøknaden={
                    <BarnMedISøknad
                      id={barn.id ? barn.id : ''}
                      toggleMedISøknadBarn={toggleMedISøknadBarn}
                      medISøknad={!!barn.medISøknad?.verdi}
                    />
                  }
                  slettBarn={slettBarn}
                />
              ))}
            <div className="barnekort">
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
        {kommerFraOppsummering ? (
          <div className={'side'}>
            <Hovedknapp
              className="tilbake-til-oppsummering"
              onClick={() =>
                history.push({
                  pathname: '/oppsummering',
                })
              }
            >
              {hentTekst('oppsummering.tilbake', intl)}
            </Hovedknapp>
          </div>
        ) : null}
      </Side>
    </>
  );
};

export default BarnaDine;
