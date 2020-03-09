import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import barn1 from '../../../assets/barn1.svg';
import ufødtIkon from '../../../assets/ufodt.svg';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { IBarn } from '../../../models/person';

const StyledBarnasBostedHeader = styled.div`
    .barnas-bosted-header {
            box-sizing: border-box;
            background-color: #4d3e55;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            border-bottom: 4px solid #826ba1;
            height: 128px;
            display: flex;
            align-items: flex-end;
    
            img {
                display: block;
                margin: 0 auto;
            }
    }

    .navn {
        text-align: center;
        margin-top: 1.5rem;
    }

    .inforad {
        margin-top: 1.5rem;
        margin-bottom: 4rem;
        display: flex;
        justify-content: space-evenly; 

        .informasjonselement-header {
                text-align: center;
                color: @navGra60;
        }

        .informasjonselement-innhold {
            text-align: center;
            color: @navMorkGra;
        }
        }
    }
`;

interface Props {
  barn: IBarn;
}

const BarnasBostedHeader: React.FC<Props> = ({ barn }) => {
  const intl = useIntl();
  const ikon = barn.ufødt ? ufødtIkon : barn1;
  const bosted = barn.harSammeAdresse
    ? intl.formatMessage({ id: 'barnekort.adresse.registrert' })
    : intl.formatMessage({ id: 'barnekort.adresse.uregistrert' });

  return (
    <StyledBarnasBostedHeader>
      <div className="barnas-bosted-header">
        <img alt="barn" className="barneikon" src={ikon} />
      </div>
      <div className="barnas-bosted__info">
        <Element className="navn">{barn.navn}</Element>
        <div className="inforad">
          <div className="informasjonselement">
            <Normaltekst className="informasjonselement-header">
              {intl.formatMessage({ id: 'barnekort.fødselsnummer' })}
            </Normaltekst>
            <Normaltekst className="informasjonselement-innhold">
              {barn.fnr}
            </Normaltekst>
          </div>
          <div className="informasjonselement">
            <Normaltekst className="informasjonselement-header">
              {intl.formatMessage({ id: 'barnekort.alder' })}
            </Normaltekst>
            <Normaltekst className="informasjonselement-innhold">
              {barn.alder} år
            </Normaltekst>
          </div>
          <div className="informasjonselement">
            <Normaltekst className="informasjonselement-header">
              {intl.formatMessage({ id: 'barnekort.bosted' })}
            </Normaltekst>
            <Normaltekst className="informasjonselement-innhold">
              {bosted}
            </Normaltekst>
          </div>
        </div>
      </div>
    </StyledBarnasBostedHeader>
  );
};

export default BarnasBostedHeader;
