import React from 'react';
import { GuidePanel } from '@navikt/ds-react';

const VeilederSnakkeboble: React.FC<{ tekst: string }> = ({ tekst }) => (
  <GuidePanel poster={true}>{tekst}</GuidePanel>
);

export default VeilederSnakkeboble;
