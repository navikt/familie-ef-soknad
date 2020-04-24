import createUseContext from 'constate';
import React from 'react';
import { ISkjema } from './typer/skjema';

const initialState: ISkjema = {
  fødselsnummer: '',
  arbeidssøker: {},
};

const [SkjemaProvider, useSkjema] = createUseContext(() => {
  const [skjema, settSkjema] = React.useState<ISkjema>(initialState);

  return { skjema, settSkjema };
});

export { SkjemaProvider, useSkjema };
