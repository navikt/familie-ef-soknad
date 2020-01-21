import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import barn1 from '../../assets/barn1.svg';
import barn2 from '../../assets/barn2.svg';
import barn3 from '../../assets/barn3.svg';
import ufødtIkon from '../../assets/ufodt.svg';

interface Props {
    navn: string;
    fnr: string;
    alder: number;
    harSammeAdresse: boolean;
    ufødt: boolean;
}

const Barnekort: React.FC<Props> = ( { navn, fnr, alder, harSammeAdresse, ufødt }) => {

    const formaterFnr = (fnr: string) => {
        return fnr.substring(0, 6) + ' ' + fnr.substring(6, 11);
    }

    const ikoner = [barn1, barn2, barn3];
    const ikon = ufødt ? ufødtIkon : ikoner[Math.floor(Math.random() * ikoner.length)];

    const bosted = harSammeAdresse ? "Registrert på adressen din" : "Ikke registrert på adressen din";

  return (
        <div className="barnekort">
          <div className="header">
              <img className="barneikon" src={ikon} />
          </div>
          <div className="informasjonsboks">
            <div className="informasjonsboks-innhold">
              <Normaltekst className="navn">{navn}</Normaltekst>
              <div className="informasjonselement">
                <Normaltekst>FØDSELSNUMMER</Normaltekst>
                <Normaltekst>{formaterFnr(fnr)}</Normaltekst>
              </div>
              <div className="informasjonselement">
                <Normaltekst>ALDER</Normaltekst>
                <Normaltekst>{alder} år</Normaltekst>
              </div>
              <div className="informasjonselement">
                <Normaltekst>BOSTED</Normaltekst>
                <Normaltekst>{bosted}</Normaltekst>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Barnekort;
