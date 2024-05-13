import React from 'react';
import { GuidePanel } from '@navikt/ds-react';
import styled from 'styled-components';

const StyledGuidePanel = styled(GuidePanel)`
  z-index: -1;
`;

const VeilederSnakkeboble: React.FC<{ tekst: string }> = ({ tekst }) => (
  <StyledGuidePanel poster={true}>{tekst}</StyledGuidePanel>
);

export default VeilederSnakkeboble;
