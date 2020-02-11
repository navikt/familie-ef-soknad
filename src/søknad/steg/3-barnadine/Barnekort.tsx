import React, { useState } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import barn1 from '../../../assets/barn1.svg';
import barn2 from '../../../assets/barn2.svg';
import barn3 from '../../../assets/barn3.svg';
import ufødtIkon from '../../../assets/ufodt.svg';
import useSøknadContext from '../../../context/SøknadContext';
import { useIntl } from 'react-intl';
import LeggTilBarn from '../../steg/3-barnadine/LeggTilBarn';
import Modal from 'nav-frontend-modal';

interface Props {
    navn: string;
    fnr: string;
    fødselsdato: string;
    personnummer: string;
    alder: number;
    harSammeAdresse: boolean;
    lagtTil: boolean;
    ufødt: boolean;
    id?: string;
    settÅpenModal: Function;
}

const Barnekort: React.FC<Props> = ( { settÅpenModal, id, navn, fnr, alder, harSammeAdresse, lagtTil, ufødt, fødselsdato }) => {
  const intl = useIntl();
    const { søknad, settSøknad } = useSøknadContext();
    const [åpenEndreModal, settÅpenEndreModal] = useState(false);

    const formatFnr = (fnr: string) => {
      return fnr.substring(0, 6) + ' ' + fnr.substring(6, 11);
    };

    const ikoner = [barn1, barn2, barn3];
    const ikon = ufødt ? ufødtIkon : ikoner[Math.floor(Math.random() * ikoner.length)];

    const bosted = harSammeAdresse ? intl.formatMessage({ id: 'barnekort.adresse.registrert' }) : intl.formatMessage({ id: 'barnekort.adresse.uregistrert' });

    const fjernFraSøknad = (id: string) => {
      const nyBarneListe = søknad.person.barn.filter(b => b.id !== id);

      settSøknad({...søknad, person: {...søknad.person, barn: nyBarneListe}});
    }

    const endre = (id: string) => {
      const nyBarneListe = søknad.person.barn.filter(b => b.id !== id);

      settSøknad({...søknad, person: {...søknad.person, barn: nyBarneListe}});

      settÅpenModal(true);
    }

  return (
        <div className="barnekort">
          <div className="barnekort__header">
              <img alt="barn" className="barneikon" src={ikon} />
          </div>
          <div className="barnekort__informasjonsboks">
            <div className="informasjonsboks-innhold">
              <Element>{navn}</Element>
              <div className="informasjonselement">
                {fnr ? <><Normaltekst>{intl.formatMessage({ id: 'barnekort.fødselsnummer' })}</Normaltekst>
                <Normaltekst>{formatFnr(fnr)}</Normaltekst></> :
                <><Normaltekst>{ufødt ? "TERMINDATO" : "FØDSELSDATO"}</Normaltekst>
                <Normaltekst>{fødselsdato}</Normaltekst></>}
              </div>
              <div className="informasjonselement">
                <Normaltekst>{intl.formatMessage({ id: 'barnekort.alder' })}</Normaltekst>
                <Normaltekst>{ufødt ? "Ufødt" : alder}</Normaltekst>
              </div>
              <div className="informasjonselement">
                <Normaltekst>{intl.formatMessage({ id: 'barnekort.bosted' })}</Normaltekst>
                <Normaltekst>{bosted}</Normaltekst>
              </div>
              {lagtTil && id ? <div className="barnekort__endre-barnekort" onClick={() => endre(id)}>
                <Normaltekst>Endre</Normaltekst>
              </div> : null}
              {lagtTil && id ? <div className="barnekort__endre-barnekort" onClick={() => fjernFraSøknad(id)}>
                <Normaltekst>Fjern fra søknad</Normaltekst>
              </div> : null}
            </div>
            <Modal
          isOpen={åpenEndreModal}
          onRequestClose={() => settÅpenModal(false)}
          closeButton={true}
          contentLabel="Halla"
          >
        <div style={{padding:'2rem 2.5rem'}}>
          <LeggTilBarn settÅpenModal={settÅpenEndreModal} />
        </div>
      </Modal>
          </div>
        </div>
  );
};

export default Barnekort;
