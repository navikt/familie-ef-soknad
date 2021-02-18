import { useState } from 'react';
import { Toggles } from '../models/søknad/toggles';
import createUseContext from 'constate';

const [TogglesProvider, useToggles] = createUseContext(() => {
  const [toggles, settToggles] = useState<Toggles>({});
  TogglesProvider.displayName = 'TOGGLES_PROVIDER';

  return { toggles, settToggles };
});

export { TogglesProvider, useToggles };
