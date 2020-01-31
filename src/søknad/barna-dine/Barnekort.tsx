import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import barn1 from '../../assets/barn1.svg';
import barn2 from '../../assets/barn2.svg';
import barn3 from '../../assets/barn3.svg';
import ufødtIkon from '../../assets/ufodt.svg';
import { injectIntl, IntlShape } from 'react-intl';

interface Props {
  intl: IntlShape;
    navn: string;
    fnr: string;
    fødselsdato: string;
    personnummer: string;
    alder: number;
    harSammeAdresse: boolean;
    nytt: boolean;
    ufødt: boolean;
}

const Barnekort: React.FC<Props> = ( { intl, navn, fnr, alder, harSammeAdresse, nytt, ufødt, fødselsdato }) => {

    const formatFnr = (fnr: string) => {
      return fnr.substring(0, 6) + ' ' + fnr.substring(6, 11);
    };

    const ikoner = [barn1, barn2, barn3];
    const ikon = ufødt ? ufødtIkon : ikoner[Math.floor(Math.random() * ikoner.length)];

    const bosted = harSammeAdresse ? "Registrert på adressen din" : "Ikke registrert på adressen din";

  return (
        <div className="barnekort">
          <div className="header">
              <img alt="barn" className="barneikon" src={ikon} />
          </div>
          <div className="informasjonsboks">
            <div className="informasjonsboks-innhold">
              <Normaltekst className="navn">{navn}</Normaltekst>
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
            </div>
          </div>
        </div>
  );
};

export default injectIntl(Barnekort);
