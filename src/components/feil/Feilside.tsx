import React, { FC } from 'react';
import {
  AlertStripeFeil,
  AlertStripeAdvarsel,
  AlertStripeInfo,
} from 'nav-frontend-alertstriper';
import { EAlvorlighetsgrad } from '../../models/felles/feilmelding';
import { useLokalIntlContext } from '../../context/LokalIntlContext';
import FormattedHtmlMessage from '../../language/FormattedHtmlMessage';

const Feilside: FC<{ tekstId?: string; alvorlighetsgrad?: string }> = ({
  tekstId,
  alvorlighetsgrad,
}) => {
  let AlertStripeMedAlvorlighetsgrad = AlertStripeFeil;

  switch (alvorlighetsgrad) {
    case EAlvorlighetsgrad.INFO:
      AlertStripeMedAlvorlighetsgrad = AlertStripeInfo;
      break;
    case EAlvorlighetsgrad.WARNING:
      AlertStripeMedAlvorlighetsgrad = AlertStripeAdvarsel;
      break;
    default:
  }

  const intl = useLokalIntlContext();
  return (
    <div className="feilside">
      <AlertStripeMedAlvorlighetsgrad>
        {tekstId ? (
          <FormattedHtmlMessage id={tekstId} />
        ) : (
          intl.formatMessage({ id: 'feil.alert' })
        )}
      </AlertStripeMedAlvorlighetsgrad>
    </div>
  );
};

export default Feilside;
