import React, { useState } from 'react';
import Barnekort from './Barnekort';
import LeggTilBarn from './LeggTilBarn';
import Modal from 'nav-frontend-modal';
import Side from '../../../components/side/Side';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';
import { hentTekst } from '../../../utils/søknad';
import { Knapp } from 'nav-frontend-knapper';
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';

const BarnaDine: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknad();
  const [åpenModal, settÅpenModal] = useState(false);

  const barna = søknad.person.barn;

  return (
    <>
      <Side tittel={hentTekst('barnadine.sidetittel', intl)}>
        <div className="barna-dine">
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
