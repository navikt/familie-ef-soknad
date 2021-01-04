import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import barn1 from '../assets/barn1.svg';
import ufødtIkon from '../assets/ufodt.svg';
import styled from 'styled-components/macro';
import { IBarn } from '../models/steg/barn';
import { useIntl } from 'react-intl';
import { førsteBokstavStor } from '../utils/språk';
import { hentBarnetsNavnEllerBeskrivelse } from '../utils/barn';

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

  .barnas-bosted-tom {
    background-color: white;
    border-bottom: solid 1px;

    img {
      display: block;
      margin: 0 auto;
    }
  }

  .navn {
    text-align: center;
    margin-top: 1rem;
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
`;

interface Props {
  barn: IBarn;
  visBakgrunn?: boolean;
}

const BarneHeader: React.FC<Props> = ({ barn, visBakgrunn = false }) => {
  const ikon = barn.født?.verdi ? barn1 : ufødtIkon;
  const intl = useIntl();

  return (
    <StyledBarnasBostedHeader>
      <div
        className={visBakgrunn ? 'barnas-bosted-header' : 'barnas-bosted-tom'}
      >
        <img
          alt="barn"
          className="barneikon"
          src={ikon}
          aria-labelledby="img"
        />
      </div>
      <div className="navn">
        <Undertittel tag="h3">
          {førsteBokstavStor(hentBarnetsNavnEllerBeskrivelse(barn, intl))}
        </Undertittel>
      </div>
    </StyledBarnasBostedHeader>
  );
};

export default BarneHeader;
