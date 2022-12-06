import React from 'react';
import { LocaleString } from '../models/felles/språk';
import { useSpråkContext } from '../context/SpråkContext';
import styled from 'styled-components/macro';
import navFarger from 'nav-frontend-core';
import FormattedHtmlMessage from './FormattedHtmlMessage';
import FormattedMessage from './FormattedMessage';

interface Props {
  tekst: LocaleString | string;
  replaceArgument0?: string;
}

const StyledLocaleTekst = styled.div`
  a {
    color: ${navFarger.navBla};
  }
`;

const LocaleTekst = ({ tekst, replaceArgument0 }: Props) => {
  const [locale] = useSpråkContext();
  return (
    <StyledLocaleTekst>
      {tekst ? (
        typeof tekst !== 'string' ? (
          tekst[locale] ||
          tekst.nb || (
            <span style={{ color: 'red' }}>
              <FormattedHtmlMessage id={'feil.ingentekst.sanity'} />
            </span>
          )
        ) : (
          <FormattedHtmlMessage
            id={tekst}
            replaceArgument0={replaceArgument0}
          />
        )
      ) : (
        <FormattedMessage id={'feil.udefinerttekst'} />
      )}
    </StyledLocaleTekst>
  );
};

export default LocaleTekst;
