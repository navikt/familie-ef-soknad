import React from 'react';
import { LocaleString } from '../models/språk';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { useSpråkContext } from '../context/SpråkContext';

interface Props {
  tekst: LocaleString | string;
}

const LocaleTekst = ({ tekst }: Props) => {
  const [locale] = useSpråkContext();
  return (
    <>
      {tekst ? (
        typeof tekst !== 'string' ? (
          tekst[locale] ||
          tekst.nb || (
            <span style={{ color: 'red' }}>
              <FormattedHTMLMessage id={'feil.ingentekst.sanity'} />
            </span>
          )
        ) : (
          <FormattedHTMLMessage id={tekst} />
        )
      ) : (
        <FormattedMessage id={'feil.udefinerttekst'} />
      )}
    </>
  );
};

export default LocaleTekst;
