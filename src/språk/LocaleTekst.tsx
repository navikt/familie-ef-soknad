import React from 'react';
import { LocaleString } from '../typer/språk';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface Props {
  tekst: LocaleString | string;
}

const LocaleTekst = ({ tekst, intl }: Props & InjectedIntlProps) => {
  return (
    <>
      {tekst
        ? typeof tekst !== 'string'
          ? tekst[intl.locale] ||
            tekst.nb || (
              <span style={{ color: 'red' }}>
                {intl.formatMessage({ id: 'feil.ingentekst.sanity' })}
              </span>
            )
          : intl.formatMessage({ id: tekst })
        : intl.formatMessage({ id: 'feil.udefinerttekst' })}
    </>
  );
};

export default injectIntl(LocaleTekst);
