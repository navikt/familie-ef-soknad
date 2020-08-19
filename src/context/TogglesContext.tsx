import { useState } from 'react';
import { Toggles } from '../models/søknad/toggles';
import createUseContext from 'constate';

const [TogglesProvider, useToggles] = createUseContext(() => {
  const [toggles, settToggles] = useState<Toggles>({});

  return { toggles, settToggles };
});

export { TogglesProvider, useToggles };
