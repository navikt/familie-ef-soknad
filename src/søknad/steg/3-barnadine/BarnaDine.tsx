import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { Element } from 'nav-frontend-typografi';
import Barnekort from './Barnekort';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { useIntl } from 'react-intl';
import Modal from 'nav-frontend-modal';
import LeggTilBarn from './LeggTilBarn';
import Hjelpetekst from '../../../components/Hjelpetekst';

const BarnaDine: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknadContext();
  const [åpenModal, settÅpenModal] = useState(false);

  const barna = søknad.person.barn;

  return (
    <>
      <Side tittel={intl.formatMessage({ id: 'barnadine.sidetittel' })}>
        <div className="barna-dine">
          <Hjelpetekst
            åpneTekstid={'barnadine.hjelpetekst.åpne'}
            innholdTekstid={'barnadine.hjelpetekst.innhold'}
          />
          <AlertStripeInfo className="informasjonstekst">
            {intl.formatMessage({ id: 'barnadine.infohentet' })}
          </AlertStripeInfo>
          <div className="barnekort-wrapper">
            {barna?.map((barn, index) => (
              <Barnekort
                key={index + barn.fødselsdato}
                settÅpenModal={settÅpenModal}
                id={barn.id ? barn.id : ''}
                navn={barn.navn}
                fnr={barn.fnr}
                fødselsdato={barn.fødselsdato}
                personnummer={barn.personnummer ? barn.personnummer : ''}
                alder={barn.alder}
                harSammeAdresse={barn.harSammeAdresse}
                født={barn.født ? barn.født : false}
                lagtTil={barn.lagtTil ? barn.lagtTil : false}
              />
            ))}
            <div className="barnekort">
              <div className="barnekort__informasjonsboks legg-til-barn-kort">
                <Element>
                  {intl.formatMessage({ id: 'barnadine.leggtil.info' })}
                </Element>
                <Knapp onClick={() => settÅpenModal(true)}>
                  {intl.formatMessage({ id: 'barnadine.leggtil' })}
                </Knapp>
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
