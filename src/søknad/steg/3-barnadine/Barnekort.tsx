import React, { useEffect, useState } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import barn1 from '../../../assets/barn1.svg';
import barn2 from '../../../assets/barn2.svg';
import barn3 from '../../../assets/barn3.svg';
import ufødtIkon from '../../../assets/ufodt.svg';
import { useIntl } from 'react-intl';
import LeggTilBarn from './LeggTilBarn';
import Modal from 'nav-frontend-modal';
import { hentTekst } from '../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { IBarn } from '../../../models/steg/barn';

interface Props {
  gjeldendeBarn: IBarn;
  velgBarnForDenneSøknaden?: React.ReactNode;
  slettBarn: Function;
  settDokumentasjonsbehovForBarn: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    barneid: string,
    barnepassid?: string
  ) => void;
  barneListe: IBarn[];
  settBarneListe: (barneListe: IBarn[]) => void;
}

const Barnekort: React.FC<Props> = ({
  gjeldendeBarn,
  velgBarnForDenneSøknaden,
  slettBarn,
  settDokumentasjonsbehovForBarn,
  barneListe,
  settBarneListe,
}) => {
  const intl = useIntl();
  const [åpenEndreModal, settÅpenEndreModal] = useState(false);
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const {
    id,
    navn,
    fødselsdato,
    født,
    ident,
    alder,
    lagtTil,
    harSammeAdresse,
    medforelder,
    harAdressesperre,
  } = gjeldendeBarn;

  const formatFnr = (fødselsnummer: string) => {
    return fødselsnummer.substring(0, 6) + ' ' + fødselsnummer.substring(6, 11);
  };

  const ikoner = [barn1, barn2, barn3];
  const ikon = født?.verdi
    ? ikoner[Math.floor(Math.random() * ikoner.length)]
    : ufødtIkon;

  let bosted: string = '';

  if (lagtTil) {
    bosted = født?.verdi
      ? harSammeAdresse.verdi
        ? hentTekst('barnekort.adresse.bor', intl)
        : hentTekst('barnekort.adresse.borIkke', intl)
      : harSammeAdresse.verdi
      ? hentTekst('barnekort.adresse.skalBo', intl)
      : hentTekst('barnekort.adresse.skalIkkeBo', intl);
  } else {
    bosted = harSammeAdresse.verdi
      ? intl.formatMessage({ id: 'barnekort.adresse.registrert' })
      : intl.formatMessage({ id: 'barnekort.adresse.uregistrert' });
  }

  return (
    <div className="barnekort">
      <div className="barnekort__header">
        <img alt="barn" className="barneikon" src={ikon} />
      </div>
      <div className="barnekort__informasjonsboks">
        <div className="informasjonsboks-innhold">
          <Undertittel tag="h3">
            {navn.verdi
              ? navn.verdi
              : intl.formatMessage({ id: 'barnekort.normaltekst.barn' })}
          </Undertittel>
          {!harAdressesperre && (
            <div className="informasjonselement">
              {ident.verdi ? (
                <>
                  <Normaltekst>
                    {intl.formatMessage({ id: 'barnekort.fødselsnummer' })}
                  </Normaltekst>
                  <Normaltekst>{formatFnr(ident.verdi)}</Normaltekst>
                </>
              ) : (
                <>
                  <Normaltekst>
                    {født?.verdi
                      ? intl.formatMessage({ id: 'barnekort.fødselsdato' })
                      : intl.formatMessage({ id: 'barnekort.termindato' })}
                  </Normaltekst>
                  <Normaltekst>{fødselsdato.verdi}</Normaltekst>
                </>
              )}
            </div>
          )}
          <div className="informasjonselement">
            <Normaltekst>
              {intl.formatMessage({ id: 'barnekort.alder' })}
            </Normaltekst>
            <Normaltekst>
              {født?.verdi ? alder.verdi : hentTekst('barnekort.erUfødt', intl)}
              {født?.verdi && ' ' + intl.formatMessage({ id: 'barnekort.år' })}
            </Normaltekst>
          </div>
          {!harAdressesperre && (
            <div className="informasjonselement">
              <Normaltekst>
                {intl.formatMessage({ id: 'barnekort.bosted' })}
              </Normaltekst>
              <Normaltekst>{bosted}</Normaltekst>
            </div>
          )}
          {medforelder &&
            !medforelder.verdi?.død &&
            (medforelder.verdi?.navn || medforelder.verdi?.alder) && (
              <div className="informasjonselement">
                <Normaltekst>
                  {intl.formatMessage({ id: 'barnasbosted.forelder.annen' })}
                </Normaltekst>
                <Normaltekst>
                  {medforelder?.verdi && medforelder?.verdi.navn
                    ? medforelder?.verdi?.navn
                    : medforelder?.verdi?.alder
                    ? `${hentTekst('barnekort.medforelder.hemmelig', intl)}, ${
                        medforelder.verdi.alder
                      }`
                    : null}
                </Normaltekst>
              </div>
            )}
          {velgBarnForDenneSøknaden}
          {lagtTil ? (
            <button
              className="barnekort__endre-barnekort lenke"
              onClick={() => settÅpenEndreModal(true)}
            >
              <Normaltekst>
                {intl.formatMessage({ id: 'barnekort.lenke.endre' })}
              </Normaltekst>
            </button>
          ) : null}
          {lagtTil ? (
            <button
              className="barnekort__endre-barnekort lenke"
              onClick={() => slettBarn(id)}
            >
              <Normaltekst>
                {intl.formatMessage({ id: 'barnekort.fjern' })}
              </Normaltekst>
            </button>
          ) : null}
        </div>
        <Modal
          isOpen={åpenEndreModal}
          onRequestClose={() => settÅpenEndreModal(false)}
          closeButton={true}
          contentLabel="legg til barn modal"
        >
          <div style={{ padding: '2rem 2.5rem' }}>
            <LeggTilBarn
              settÅpenModal={settÅpenEndreModal}
              id={id}
              barneListe={barneListe}
              settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
              settBarneListe={settBarneListe}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Barnekort;
