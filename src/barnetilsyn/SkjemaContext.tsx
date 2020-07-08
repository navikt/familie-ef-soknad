import createUseContext from 'constate';
import React from 'react';

export interface ISkjema {
  innsendingsdato?: Date;
}

const [SkjemaProvider, useSkjema] = createUseContext(() => {
  const [skjema, settSkjema] = React.useState<ISkjema>({});

  return { skjema, settSkjema };
});

export { SkjemaProvider, useSkjema };
