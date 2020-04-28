import createUseContext from 'constate';
import React from 'react';
import { IArbeidssøker } from '../models/steg/aktivitet/arbeidssøker';

const [SkjemaProvider, useSkjema] = createUseContext(() => {
  const [skjema, settSkjema] = React.useState<IArbeidssøker>({});

  return { skjema, settSkjema };
});

export { SkjemaProvider, useSkjema };
