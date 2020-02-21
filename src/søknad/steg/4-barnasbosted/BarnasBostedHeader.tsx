import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import barn1 from '../../../assets/barn1.svg';
import { useIntl } from 'react-intl';
import { IBarn } from '../../../models/person';

interface Props {
    barn: IBarn;
}

const BarnasBostedHeader: React.FC<Props> = ({ barn }) => {
    const intl = useIntl();

    const bosted = barn.harSammeAdresse ? intl.formatMessage({ id: 'barnekort.adresse.registrert' }) : intl.formatMessage({ id: 'barnekort.adresse.uregistrert' });

  return (
      <>
        <div className="barnas-bosted__header">
        <img alt="barn" className="barneikon" src={barn1} />
    </div>
    <div className="barnas-bosted__info">
        <Element className="navn">{barn.navn}</Element>
        <div className="inforad">
        <div className="informasjonselement">
            <Normaltekst className="informasjonselement__header">{intl.formatMessage({id: 'barnekort.fødselsnummer'})}</Normaltekst>
            <Normaltekst className="informasjonselement__innhold">{barn.fnr}</Normaltekst>
        </div>
        <div className="informasjonselement">
            <Normaltekst className="informasjonselement__header">{intl.formatMessage({id: 'barnekort.alder'})}}</Normaltekst>
            <Normaltekst className="informasjonselement__innhold">{barn.alder} år</Normaltekst>
        </div>
        <div className="informasjonselement">
            <Normaltekst className="informasjonselement__header">{intl.formatMessage({id: 'barnekort.bosted'})}}</Normaltekst>
            <Normaltekst className="informasjonselement__innhold">{bosted}</Normaltekst>
        </div>
        </div>
    </div>
  </>
  );
};

export default BarnasBostedHeader;
