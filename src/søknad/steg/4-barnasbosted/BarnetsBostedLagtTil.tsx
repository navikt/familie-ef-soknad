import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { IBarn } from '../../../models/person';
import BarnasBostedHeader from './BarnasBostedHeader';
import ufødtIkon from '../../../assets/ufodt.svg';
import barn1 from '../../../assets/barn1.svg';

interface Props {
  barn: IBarn;
}

const BarnetsBostedLagtTil: React.FC<Props> = ({ barn }) => {
  const intl = useIntl();
  const ikon = barn.ufødt ? ufødtIkon : barn1;

  console.log('LAGT TIL');
  console.log(barn);

  const forelder = barn.forelder;

  if (!forelder) return null;

  return (
    <div className="barnas-bosted-lagt-til">
      <BarnasBostedHeader barn={barn} visInfo={false} />
      <div className="barnas-bosted-lagt-til__svar">
        {forelder.navn && (
          <div className="spørsmål-og-svar">
            <Element>{barn.navn}s andre forelder</Element>
            <Normaltekst>{forelder.navn}</Normaltekst>
          </div>
        )}
        {forelder.fødselsdato && (
          <div className="spørsmål-og-svar">
            <Element>Fødselsdato</Element>
            <Normaltekst>{forelder.fødselsdato}</Normaltekst>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarnetsBostedLagtTil;
