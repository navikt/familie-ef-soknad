import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentTekst } from '../utils/søknad';
import { formatDate } from '../utils/dato';
import { IntlShape, useIntl } from 'react-intl';

export const verdiTilTekstsvar = (
  verdi: string | Date | boolean,
  intl: IntlShape
) => {
  if (typeof verdi === 'string') {
    return verdi;
  } else if (typeof verdi === 'boolean') {
    if (verdi === true) {
      return hentTekst('svar.ja', intl);
    } else {
      return hentTekst('svar.nei', intl);
    }
  } else if (verdi instanceof Date) {
    return formatDate(verdi);
  } else {
    return null;
  }
};

export const VisLabelOgSvar = (objekt: Object) => {
  const intl = useIntl();

  return Object.values(objekt).map((spørsmål) => {
    if (!spørsmål) {
      console.log('NEI NEI NEI');
      console.log(objekt);

      return null;
    }

    return (
      <div className="spørsmål-og-svar">
        <Element>{spørsmål.label}</Element>
        <Normaltekst>{verdiTilTekstsvar(spørsmål.verdi, intl)}</Normaltekst>
      </div>
    );
  });
};
