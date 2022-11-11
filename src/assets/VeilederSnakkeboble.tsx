import React from 'react';
import { GuidePanel } from "@navikt/ds-react";

const VeilederSnakkeboble: React.FC<any> = ({ tekst }) => (
  <GuidePanel poster={true}>
    {tekst}
  </GuidePanel>
);

export default VeilederSnakkeboble;
