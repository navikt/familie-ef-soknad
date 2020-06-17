import React, { useEffect } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentTekst } from '../utils/søknad';
import { formatDate, strengTilDato } from '../utils/dato';
import { IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { IUtenlandsopphold } from '../models/steg/omDeg/medlemskap';
import { isValidISODateString } from 'iso-datestring-validator';
import { hentBeskjedMedNavn } from '../utils/språk';

// TODO: Dette kan umulig være riktig visning av denne komponenten? Ser ikke ut som begrunnelse blir satt heller
export const VisPerioderBoddIUtlandet = (verdi: IUtenlandsopphold[]) => {
  return verdi.map((v: IUtenlandsopphold) => {
    return (
      <>
        {verdiTilTekstsvar(strengTilDato(v.periode.fra.verdi))}
        {VisLabelOgSvar(v.begrunnelse)}
      </>
    );
  });
};

export const verdiTilTekstsvar = (
  verdi: string | Date | boolean | number | string[],
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
  } else if (typeof verdi === 'number') {
    return <Normaltekst>{verdi.toString()}</Normaltekst>;
  } else if (typeof verdi === 'string') {
    try {
      if (isValidISODateString(verdi)) {
        const formattertDato = formatDate(strengTilDato(verdi));
        return <Normaltekst>{formattertDato}</Normaltekst>;
      }
    } catch (e) {
      return <Normaltekst>{verdi}</Normaltekst>;
    }
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
    console.log('Bør ikke komme hit');
    return <Normaltekst>{formatDate(verdi)}</Normaltekst>;
  } else {
    return null;
  }
};

export const VisLabelOgSvar = (objekt: Object | undefined, navn?: string) => {
  const intl = useIntl();

  if (!objekt) return null;
  console.log('OBJEKT', objekt);

  return Object.values(objekt).map((spørsmål) => {
    if (!spørsmål) {
      return null;
    }

    console.log('LABEL', spørsmål.label);

    const label =
      navn && spørsmål.label
        ? hentBeskjedMedNavn(navn, spørsmål.label)
        : spørsmål.label;

    return (
      <div className="spørsmål-og-svar">
        <Element>{label}</Element>
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
