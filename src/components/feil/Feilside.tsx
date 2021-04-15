import React, { FC } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';

const StyledNormaltekst = styled(Normaltekst)`
  margin-top: 1rem;
`;

const Feilside: FC<{ tekst?: string }> = ({ tekst }) => {
  const intl = useIntl();
  return (
    <div className="feilside">
      <AlertStripeFeil>
        {intl.formatMessage({ id: 'feil.alert' })}
        <StyledNormaltekst>{tekst}</StyledNormaltekst>
      </AlertStripeFeil>
    </div>
  );
};

export default Feilside;
