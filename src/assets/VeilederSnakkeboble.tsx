import React from 'react';
import { GuidePanel } from '@navikt/ds-react';
import styled from 'styled-components';

/*
 * z-index er lagt på for at språkvelgeren skal legge seg over GuidePanel
 * slik at det er mulig å velge språk på mindre skjermer.
 */
const StyledGuidePanel = styled(GuidePanel)`
  z-index: -1;
`;

const VeilederSnakkeboble: React.FC<{ tekst: string }> = ({ tekst }) => (
  <StyledGuidePanel poster={true}>{tekst}</StyledGuidePanel>
);

export default VeilederSnakkeboble;
