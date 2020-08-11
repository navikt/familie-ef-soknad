import React, { useState } from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
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
import { IBarn } from '../../../models/steg/barn';

const BarnaDine: React.FC = () => {
  const intl = useIntl();
  const {
    søknad,
    settSøknad,
    mellomlagreBarnetilsyn,
    settDokumentasjonsbehov,
  } = useBarnetilsynSøknad();
  const history = useHistory();
  const location = useLocation();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering && false;

  const [åpenModal, settÅpenModal] = useState(false);

  const toggleSkalHaBarnepass = (id: string) => {
    const detteBarnet = søknad.person.barn.find((b: IBarn) => b.id === id);

    if (!detteBarnet) return null;

    const skalHaBarnepassVerdi = !detteBarnet.skalHaBarnepass?.verdi;
    const nyttBarn: IBarn = {
      ...detteBarnet,
      skalHaBarnepass: hentFeltObjekt(
        'barnekort.skalHaBarnepass',
        skalHaBarnepassVerdi,
        intl
      ),
    };

    if (!skalHaBarnepassVerdi) {
      delete nyttBarn.barnepass;
    }

    const nyBarneListe = søknad.person.barn.map((barn: IBarn) => {
      return barn.id === id ? nyttBarn : barn;
    });
    settSøknad({
      ...søknad,
      person: { ...søknad.person, barn: nyBarneListe },
    });
  };

  const slettBarn = (id: string) => {
    const nyBarneListe = søknad.person.barn.filter(
      (barn: IBarn) => barn.id !== id
    );

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

  const harValgtMinstEttBarn = søknad.person.barn.some(
    (b: IBarn) => b.skalHaBarnepass?.verdi
  );
  return (
    <>
      <Side
        tittel={hentTekst('barnadine.sidetittel', intl)}
        skalViseKnapper={true}
        erSpørsmålBesvart={harValgtMinstEttBarn}
        mellomlagreBarnetilsyn={mellomlagreBarnetilsyn}
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
                      toggleSkalHaBarnepass={toggleSkalHaBarnepass}
                      skalHaBarnepass={!!barn.skalHaBarnepass?.verdi}
                    />
                  }
                  slettBarn={slettBarn}
                />
              ))}
            <div className="barnekort legg-til">
              <div className="barnekort__informasjonsboks legg-til-barn-kort">
                <Element>
                  {hentTekst('barnadine.leggtil.info.barnetilsyn', intl)}
                </Element>
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
