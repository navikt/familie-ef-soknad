import React, { useEffect } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentTekst } from '../utils/søknad';
import { formatDate } from '../utils/dato';
import { IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

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

    if (spørsmål.navn && spørsmål.fødselsnummer) {
      return (
        <div className="spørsmål-og-svar">
          <Element>{spørsmål.navn}</Element>
          <Normaltekst>{spørsmål.fødselsnummer}</Normaltekst>
        </div>
      );
    }

    return (
      <div className="spørsmål-og-svar">
        <Element>{spørsmål.label}</Element>
        {verdiTilTekstsvar(spørsmål.verdi, intl)}
      </div>
    );
  });
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
