import React from 'react';
import { LocaleString } from '../models/felles/språk';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { useSpråkContext } from '../context/SpråkContext';
import styled from 'styled-components/macro';
import navFarger from 'nav-frontend-core';

interface Props {
  tekst: LocaleString | string;
}

const StyledLocaleTekst = styled.div`
  a {
    color: ${navFarger.navBla};
  }
`;

const LocaleTekst = ({ tekst }: Props) => {
  const [locale] = useSpråkContext();
  return (
    <StyledLocaleTekst>
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
    </StyledLocaleTekst>
  );
};

export default LocaleTekst;
