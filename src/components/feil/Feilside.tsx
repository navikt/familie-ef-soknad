import React, { FC } from 'react';
import {
  AlertStripeFeil,
  AlertStripeAdvarsel,
  AlertStripeInfo,
} from 'nav-frontend-alertstriper';
import { FormattedHTMLMessage, useIntl } from 'react-intl';

const Feilside: FC<{ tekstId?: string; alvorlighetsgrad?: string }> = ({
  tekstId,
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
        {tekstId ? (
          <FormattedHTMLMessage id={tekstId} />
        ) : (
          intl.formatMessage({ id: 'feil.alert' })
        )}
      </AlertStripeMedAlvorlighetsgrad>
    </div>
  );
};

export default Feilside;
