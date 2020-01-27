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
import Modal from 'nav-frontend-modal';
import LeggTilBarn from './LeggTilBarn';

const BarnaDine = () => {
  const { søknad, settSøknad } = useSøknadContext();
  const [åpenModal, settÅpenModal] = useState(false);

  const barn = søknad.person.barn;

  const location = useLocation();
  const forrigeRoute: IRoute = hentForrigeRoute(Routes, location.pathname);

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
        {barn?.map(b => <Barnekort navn={b.navn} fnr={b.fnr} alder={b.alder} harSammeAdresse={b.harSammeAdresse} ufødt={b.ufødt ? b.ufødt: false} />)}
        <div className="barnekort">
          <div className="informasjonsboks legg-til-barn-kort">
            <Normaltekst>Er du gravid eller har du nylig fått barn som foreløpig ikke er registrert i Folkeregisteret?</Normaltekst>
            <Knapp onClick={() => settÅpenModal(true)}>Legg til barn</Knapp>
            </div>
          </div>
        </div>
          <Modal
          isOpen={åpenModal}
          onRequestClose={() => settÅpenModal(false)}
          closeButton={true}
          contentLabel="Halla"
          >
        <div style={{padding:'2rem 2.5rem'}}>
          <LeggTilBarn settÅpenModal={settÅpenModal} navn={"Halla"} />
        </div>
      </Modal>
        </div>
      </Side>
    </>
  );
};

export default BarnaDine;
