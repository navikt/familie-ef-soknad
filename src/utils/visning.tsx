import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentTekst } from '../utils/søknad';
import { formatDate } from '../utils/dato';
import { IntlShape, useIntl } from 'react-intl';

export const VisPerioderBoddIUtlandet = (verdi: any) => {
  return verdi.map((v: any) => {
    return (
      <>
        {verdiTilTekstsvar(v.fra)}
        {VisLabelOgSvar(v.begrunnelse)}
      </>
    );
  });
};

export const verdiTilTekstsvar = (
  verdi: string | Date | boolean | string[],
  intl?: IntlShape
) => {
  if (Array.isArray(verdi)) {
    return (
      <ul>
        {verdi.map((v) => (
          <li>
            <Normaltekst>{v}</Normaltekst>
          </li>
        ))}
      </ul>
    );
  } else if (typeof verdi === 'string') {
    return <Normaltekst>{verdi}</Normaltekst>;
  } else if (typeof verdi === 'boolean') {
    let jaTekst = 'Ja';
    let neiTekst = 'Nei';

    if (intl) {
      jaTekst = hentTekst('svar.ja', intl);
      neiTekst = hentTekst('svar.nei', intl);
    }

    if (verdi === true) {
      return <Normaltekst>{jaTekst}</Normaltekst>;
    } else {
      return <Normaltekst>{neiTekst}</Normaltekst>;
    }
  } else if (verdi instanceof Date) {
    return <Normaltekst>{formatDate(verdi)}</Normaltekst>;
  } else {
    return null;
  }
};

export const VisLabelOgSvar = (objekt: Object) => {
  const intl = useIntl();

  return Object.values(objekt).map((spørsmål) => {
    if (!spørsmål) {
      return null;
    }

    return (
      <div className="spørsmål-og-svar">
        <Element>{spørsmål.label}</Element>
        {verdiTilTekstsvar(spørsmål.verdi, intl)}
      </div>
    );
  });
};
