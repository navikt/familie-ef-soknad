import createUseContext from 'constate';
import React from 'react';
import { IArbeidssøker } from '../models/steg/aktivitet/arbeidssøker';

export interface ISkjema {
  innsendingsdato?: Date;
  arbeidssøker: IArbeidssøker;
}

const [SkjemaProvider, useSkjema] = createUseContext(() => {
  const [skjema, settSkjema] = React.useState<ISkjema>({ arbeidssøker: {} });

  return { skjema, settSkjema };
});

export { SkjemaProvider, useSkjema };
