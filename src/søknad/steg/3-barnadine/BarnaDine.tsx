import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { Element } from 'nav-frontend-typografi';
import Barnekort from './Barnekort';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useIntl } from 'react-intl';
import Modal from 'nav-frontend-modal';
import LeggTilBarn from './LeggTilBarn';
import Hjelpetekst from '../../../components/Hjelpetekst';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { hentTekst } from '../../../utils/søknad';
import { useHistory, useLocation } from 'react-router-dom';

const BarnaDine: React.FC = () => {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  const { søknad } = useSøknadContext();
  const [åpenModal, settÅpenModal] = useState(false);

  const barna = søknad.person.barn;

  console.log('kommerFraOppsummering', kommerFraOppsummering);

  return (
    <>
      <Side
        tittel={hentTekst('barnadine.sidetittel', intl)}
        kommerFraOppsummering={kommerFraOppsummering}
      >
        <div className="barna-dine">
          <Hjelpetekst
            åpneTekstid={'barnadine.hjelpetekst.åpne'}
            innholdTekstid={'barnadine.hjelpetekst.innhold'}
          />
          <AlertStripeInfo className="informasjonstekst">
            {hentTekst('barnadine.infohentet', intl)}
          </AlertStripeInfo>
          <div className="barnekort-wrapper">
            {barna?.map((barn) => (
              <Barnekort
                key={barn.id}
                settÅpenModal={settÅpenModal}
                id={barn.id ? barn.id : ''}
                navn={barn.navn}
                fnr={barn.fnr}
                fødselsdato={barn.fødselsdato}
                personnummer={
                  barn.personnummer && barn.personnummer.verdi
                    ? barn.personnummer
                    : {
                        label: hentTekst('barnadine.personnummer', intl),
                        verdi: '',
                      }
                }
                alder={barn.alder}
                harSammeAdresse={barn.harSammeAdresse}
                født={
                  barn.født
                    ? barn.født
                    : {
                        label: hentTekst('barnekort.født', intl),
                        verdi: false,
                      }
                }
                lagtTil={barn.lagtTil ? barn.lagtTil : false}
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
            contentLabel="Halla"
          >
            <div className="legg-til-barn-modal">
              <LeggTilBarn settÅpenModal={settÅpenModal} />
            </div>
          </Modal>
        </div>
        {location.state?.kommerFraOppsummering ? (
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
