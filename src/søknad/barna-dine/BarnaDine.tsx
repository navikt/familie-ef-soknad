import React, { useState } from 'react';
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
import { injectIntl, IntlShape } from 'react-intl';
import Modal from 'nav-frontend-modal';
import LeggTilBarn from './LeggTilBarn';

interface Props {
  intl: IntlShape;
}

const BarnaDine: React.FC<Props> = ( { intl } ) => {
  const { søknad } = useSøknadContext();
  const [åpenModal, settÅpenModal] = useState(false);

  const barn = søknad.person.barn;

  const location = useLocation();
  const forrigeRoute: IRoute = hentForrigeRoute(Routes, location.pathname);

  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'barnadine.sidetittel'})}
        tilbakePath={forrigeRoute.path}
        nestePath={''}
      >
        <div className="barna-dine">
                      <Lesmerpanel
                className="hjelpetekst"
                apneTekst={intl.formatMessage({ id: 'barnadine.hjelpetekst.åpne'})}
              >
                <Normaltekst>{intl.formatMessage({ id: 'barnadine.hjelpetekst.innhold'})}</Normaltekst>
              </Lesmerpanel>
              <AlertStripeInfo className="informasjonstekst">{intl.formatMessage({id: 'barnadine.infohentet'})}</AlertStripeInfo>
        <div className="barnekort-wrapper">
        {barn?.map(b => <Barnekort 
        settÅpenModal={settÅpenModal}
        id={b.id ? b.id: ""}
        navn={b.navn}
        fnr={b.fnr}
        fødselsdato={b.fødselsdato}
        personnummer={b.personnummer? b.personnummer : ""}
        alder={b.alder}
        harSammeAdresse={b.harSammeAdresse} 
        ufødt={b.ufødt ? b.ufødt : false} 
        lagtTil={b.lagtTil ? b.lagtTil: false} />
        )}
        <div className="barnekort">
          <div className="informasjonsboks legg-til-barn-kort">
            <Normaltekst>{intl.formatMessage({id: 'barnadine.leggtil.info'})}</Normaltekst>
            <Knapp onClick={() => settÅpenModal(true)}>{intl.formatMessage({id: 'barnadine.leggtil'})}</Knapp>
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
          <LeggTilBarn settÅpenModal={settÅpenModal} />
        </div>
      </Modal>
        </div>
      </Side>
    </>
  );
};

export default injectIntl(BarnaDine);
