import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { sendInnSøknad } from '../../innsending/api';
import useSøknadContext from '../../context/SøknadContext';
import Side from '../../components/side/Side';
import { Normaltekst } from 'nav-frontend-typografi';
import Barnekort from './Barnekort';
import { Routes, IRoute } from '../../config/Routes';
import { hentForrigeRoute } from '../../utils/routing';
import { useLocation } from 'react-router';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import LeggTilBarn from './LeggTilBarn';
import Modal from 'nav-frontend-modal';

const BarnaDine = () => {
  const { søknad, settSøknad } = useSøknadContext();
  const [åpenModal, settÅpenModal] = useState(false);

  const barn = søknad.person.barn;

  const location = useLocation();
  const forrigeRoute: IRoute = hentForrigeRoute(Routes, location.pathname);

  const nyttBarn = {
    "fnr": "12345678911",
    "navn": "JUSTIN BIEBER",
    "alder": 10,
    "fødselsdato": "2014-02-02",
    "harSammeAdresse": true
  };

  const settDato = (date: Date | null): void => {
    date !== null && settSøknad({ ...søknad, datoSøktSeparasjon: date });
  };

  const leggTilBarn = (barn: any) => {
    settÅpenModal(true);
    const nyBarneListe = []

    søknad.person.barn.forEach(barn => nyBarneListe.push(barn));

    nyBarneListe.push(nyttBarn);

    settSøknad({ ...søknad, person: {...søknad.person, barn: nyBarneListe} })
  }

  console.log(søknad);

  return (
    <>
      <Side
        tittel={'Barna dine'}
        tilbakePath={forrigeRoute.path}
        nestePath={''}
      >
        <div className="barna-dine">
                      <Lesmerpanel
                className="hjelpetekst"
                apneTekst={"Hvilke barn kan du få stønad for?"}
              >
                <Normaltekst>Halla</Normaltekst>
              </Lesmerpanel>
              <AlertStripeInfo className="informasjonstekst">Informasjonen er hentet fra Folkeregisteret</AlertStripeInfo>
        <div className="barnekort-wrapper">
        {barn?.map(b => <Barnekort navn={b.navn} fnr={b.fnr} alder={b.alder} harSammeAdresse={b.harSammeAdresse} />)}
        <div className="barnekort">
          <div className="informasjonsboks legg-til-barn-kort">
            <Normaltekst>Er du gravid eller har du nylig fått barn som foreløpig ikke er registrert i Folkeregisteret?</Normaltekst>
            <Knapp onClick={leggTilBarn}>Legg til barn</Knapp>
            </div>
          </div>
        </div>
          <Modal
          isOpen={åpenModal}
          onRequestClose={() => settÅpenModal(false)}
          closeButton={true}
          contentLabel="Halla"
          >
        <div style={{padding:'2rem 2.5rem'}}>Innhold her</div>
      </Modal>
        </div>
      </Side>
    </>
  );
};

export default BarnaDine;
