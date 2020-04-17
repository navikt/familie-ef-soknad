import React, { useState } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import barn1 from '../../../assets/barn1.svg';
import barn2 from '../../../assets/barn2.svg';
import barn3 from '../../../assets/barn3.svg';
import ufødtIkon from '../../../assets/ufodt.svg';
import { useIntl } from 'react-intl';
import LeggTilBarn from '../../steg/3-barnadine/LeggTilBarn';
import Modal from 'nav-frontend-modal';
import { ITekstFelt, IBooleanFelt } from '../../../models/søknadsfelter';
import { useSøknad } from '../../../context/SøknadContext';
import { hentTekst } from '../../../utils/søknad';

interface Props {
  navn: ITekstFelt;
  fnr: ITekstFelt;
  fødselsdato: ITekstFelt;
  personnummer: ITekstFelt;
  alder: ITekstFelt;
  harSammeAdresse: IBooleanFelt;
  lagtTil: boolean;
  født: IBooleanFelt;
  id: string;
  settÅpenModal: Function;
}

const Barnekort: React.FC<Props> = ({
  settÅpenModal,
  id,
  navn,
  fnr,
  alder,
  harSammeAdresse,
  lagtTil,
  født,
  fødselsdato,
}) => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknad();
  const [åpenEndreModal, settÅpenEndreModal] = useState(false);

  const formatFnr = (fnr: string) => {
    return fnr.substring(0, 6) + ' ' + fnr.substring(6, 11);
  };

  const ikoner = [barn1, barn2, barn3];
  const ikon = født
    ? ikoner[Math.floor(Math.random() * ikoner.length)]
    : ufødtIkon;

  let bosted: string = '';
  if (født !== undefined) {
    bosted = født
      ? harSammeAdresse
        ? hentTekst('barnekort.adresse.bor', intl)
        : hentTekst('barnekort.adresse.borIkke', intl)
      : harSammeAdresse
      ? hentTekst('barnekort.adresse.skalBo', intl)
      : hentTekst('barnekort.adresse.skalIkkeBo', intl);
  } else {
    bosted = harSammeAdresse
      ? intl.formatMessage({ id: 'barnekort.adresse.registrert' })
      : intl.formatMessage({ id: 'barnekort.adresse.uregistrert' });
  }

  const fjernFraSøknad = (id: string) => {
    const nyBarneListe = søknad.person.barn.filter((b) => b.id !== id);

    settSøknad({ ...søknad, person: { ...søknad.person, barn: nyBarneListe } });
  };

  return (
    <div className="barnekort">
      <div className="barnekort__header">
        <img alt="barn" className="barneikon" src={ikon} />
      </div>
      <div className="barnekort__informasjonsboks">
        <div className="informasjonsboks-innhold">
          <Element>
            {født.verdi
              ? navn.verdi
              : intl.formatMessage({ id: 'barnekort.normaltekst.barn' })}
          </Element>
          <div className="informasjonselement">
            {fnr.verdi ? (
              <>
                <Normaltekst>
                  {intl.formatMessage({ id: 'barnekort.fødselsnummer' })}
                </Normaltekst>
                <Normaltekst>{formatFnr(fnr.verdi)}</Normaltekst>
              </>
            ) : (
              <>
                <Normaltekst>
                  {født
                    ? intl.formatMessage({ id: 'barnekort.fødselsdato' })
                    : intl.formatMessage({ id: 'barnekort.termindato' })}
                </Normaltekst>
                <Normaltekst>{fødselsdato.verdi}</Normaltekst>
              </>
            )}
          </div>
          <div className="informasjonselement">
            <Normaltekst>
              {intl.formatMessage({ id: 'barnekort.alder' })}
            </Normaltekst>
            <Normaltekst>
              {født.verdi ? alder.verdi : hentTekst('barnekort.erUfødt', intl)}
              {' ' + intl.formatMessage({ id: 'barnekort.år' })}
            </Normaltekst>
          </div>
          <div className="informasjonselement">
            <Normaltekst>
              {intl.formatMessage({ id: 'barnekort.bosted' })}
            </Normaltekst>
            <Normaltekst>{bosted}</Normaltekst>
          </div>
          {lagtTil ? (
            <div
              className="barnekort__endre-barnekort"
              onClick={() => settÅpenEndreModal(true)}
            >
              <Normaltekst>
                <span className="lenke">
                  {intl.formatMessage({ id: 'barnekort.lenke.endre' })}
                </span>
              </Normaltekst>
            </div>
          ) : null}
          {lagtTil ? (
            <div
              className="barnekort__endre-barnekort"
              onClick={() => fjernFraSøknad(id)}
            >
              <Normaltekst>
                <span className="lenke">Fjern fra søknad</span>
              </Normaltekst>
            </div>
          ) : null}
        </div>
        <Modal
          isOpen={åpenEndreModal}
          onRequestClose={() => settÅpenModal(false)}
          closeButton={true}
          contentLabel="Halla"
        >
          <div style={{ padding: '2rem 2.5rem' }}>
            <LeggTilBarn settÅpenModal={settÅpenEndreModal} id={id} />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Barnekort;
