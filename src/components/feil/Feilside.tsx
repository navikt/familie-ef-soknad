import React, { FC } from 'react';
import {
  AlertStripeFeil,
  AlertStripeAdvarsel,
  AlertStripeInfo,
} from 'nav-frontend-alertstriper';
import { useIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';

const StyledNormaltekst = styled(Normaltekst)`
  margin-top: 1rem;
`;

const Feilside: FC<{ tekst?: string; alvorlighetsgrad?: string }> = ({
  tekst,
  alvorlighetsgrad,
}) => {
  let AlertStripeMedAlvorlighetsgrad = AlertStripeFeil;

  switch (alvorlighetsgrad) {
    case 'INFO':
      AlertStripeMedAlvorlighetsgrad = AlertStripeInfo;
      break;
    case 'WARNING':
      AlertStripeMedAlvorlighetsgrad = AlertStripeAdvarsel;
      break;
    default:
  }

  const intl = useIntl();
  return (
    <div className="feilside">
      <AlertStripeMedAlvorlighetsgrad>
        {tekst ? (
          <StyledNormaltekst>{tekst}</StyledNormaltekst>
        ) : (
          intl.formatMessage({ id: 'feil.alert' })
        )}
      </AlertStripeMedAlvorlighetsgrad>
    </div>
  );
};

export default Feilside;
