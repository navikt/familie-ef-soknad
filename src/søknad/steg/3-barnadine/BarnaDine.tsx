import React, { useState } from 'react';
import Barnekort from './Barnekort';
import LeggTilBarn from './LeggTilBarn';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import Side from '../../../components/side/Side';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import { useHistory, useLocation } from 'react-router-dom';

const BarnaDine: React.FC = () => {
  const intl = useIntl();
  const { søknad, mellomlagreOvergangsstønad } = useSøknad();
  const history = useHistory();
  const location = useLocation();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering && false;

  const [åpenModal, settÅpenModal] = useState(false);

  const barna = søknad.person.barn;

  return (
    <>
      <Side
        tittel={hentTekst('barnadine.sidetittel', intl)}
        skalViseKnapper={true}
        erSpørsmålBesvart={true}
        mellomlagreOvergangsstønad={mellomlagreOvergangsstønad}
      >
        <div className="barna-dine">
          <AlertStripeInfo className="informasjonstekst">
            {hentTekst('barnadine.infohentet', intl)}
          </AlertStripeInfo>
          <div className="barnekort-wrapper">
            {barna?.map((barn) => (
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
              <LeggTilBarn settÅpenModal={settÅpenModal} />
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
