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
      <div>
        <Element>Kopier denne og send til utvikler for feilsøking:</Element>
        <pre>{JSON.stringify(søknad, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Feilside;
