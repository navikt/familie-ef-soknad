import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import Barnekort from './Barnekort';
import { Routes, IRoute } from '../../../routing/Routes';
import { hentNesteRoute } from '../../../routing/utils';
import { hentForrigeRoute } from '../../../routing/utils';
import { useLocation } from 'react-router';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { useIntl } from 'react-intl';
import Modal from 'nav-frontend-modal';
import LeggTilBarn from './LeggTilBarn';

const BarnaDine: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknadContext();
  const [åpenModal, settÅpenModal] = useState(false);

  const barna = søknad.person.barn;

  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);
  const forrigeRoute: IRoute = hentForrigeRoute(Routes, location.pathname);

  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'barnadine.sidetittel'})}
        nestePath={nesteRoute.path}
        tilbakePath={forrigeRoute.path}
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
        {
          barna?.map(barn => (
            <Barnekort
              settÅpenModal={settÅpenModal}
              id={barn.id ? barn.id : ""}
              navn={barn.navn}
              fnr={barn.fnr}
              fødselsdato={barn.fødselsdato}
              personnummer={barn.personnummer ? barn.personnummer : ""}
              alder={barn.alder}
              harSammeAdresse={barn.harSammeAdresse}
              ufødt={barn.ufødt ? barn.ufødt : false}
              lagtTil={barn.lagtTil ? barn.lagtTil : false}
            />
          ))
        }
        <div className="barnekort">
          <div className="barnekort__informasjonsboks legg-til-barn-kort">
            <Element>{intl.formatMessage({id: 'barnadine.leggtil.info'})}</Element>
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
        <div className="legg-til-barn-modal">
          <LeggTilBarn settÅpenModal={settÅpenModal} />
        </div>
      </Modal>
        </div>
      </Side>
    </>
  );
};

export default BarnaDine;
