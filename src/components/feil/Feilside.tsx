import React, { FC } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useIntl } from 'react-intl';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { useSøknad } from '../../context/SøknadContext';

const Feilside: FC<{ tekst?: string }> = ({ tekst }) => {
  const { søknad } = useSøknad();
  const intl = useIntl();
  return (
    <div className="feilside">
      <AlertStripeFeil>
        {intl.formatMessage({ id: 'feil.alert' })}
        <Normaltekst>{tekst}</Normaltekst>
      </AlertStripeFeil>
    </div>
  );
};

export default Feilside;
