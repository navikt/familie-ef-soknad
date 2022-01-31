import React, { useEffect } from 'react';
import { Element, Ingress, Normaltekst } from 'nav-frontend-typografi';
import { hentTekst } from '../utils/søknad';
import { formatDate, strengTilDato } from '../utils/dato';
import { IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { isValidISODateString } from 'iso-datestring-validator';
import { hentBeskjedMedNavn } from '../utils/språk';
import {
  ISpørsmålBooleanFelt,
  ISpørsmålFelt,
  ISpørsmålListeFelt,
} from '../models/søknad/søknadsfelter';
import { harValgtSvar } from './spørsmålogsvar';

export const visListeAvLabelOgSvar = (
  liste: any[] | undefined,
  overskrift: string
) => {
  if (!liste) return null;

  return liste.map((el, index) => {
    let tekst = overskrift;

    if (liste.length > 1) {
      tekst = tekst + ' ' + (index + 1);
    }

    return (
      <div key={index}>
        <Ingress>{tekst}</Ingress>
        {VisLabelOgSvar(el)}
        {index < liste.length - 1 && <hr />}
      </div>
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
        {verdi.map((v, index) => (
          <li key={index}>
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
    return <Normaltekst>{formatDate(verdi)}</Normaltekst>;
  } else {
    return null;
  }
};

const VisPeriode = (objekt: any, tittel?: string) => {
  const intl = useIntl();

  if (!(objekt && objekt.fra && objekt.til)) return null;

  return (
    <>
      {tittel ? (
        <div className="spørsmål-og-svar">
          <Element>{tittel}</Element>
        </div>
      ) : null}
      <div className="spørsmål-og-svar">
        <Element>{objekt.fra.label}</Element>
        {verdiTilTekstsvar(objekt.fra.verdi, intl)}
      </div>
      <div className="spørsmål-og-svar">
        <Element>{objekt.til.label}</Element>
        {verdiTilTekstsvar(objekt.til.verdi, intl)}
      </div>
    </>
  );
};

export const VisLabelOgSvar = (objekt: Object | undefined, navn?: string) => {
  const intl = useIntl();

  if (!objekt) return null;
  return Object.values(objekt).map((spørsmål, index) => {
    if (!spørsmål) {
      return null;
    }

    if (spørsmål.fra && spørsmål.til) {
      return VisPeriode(spørsmål);
    }

    const label =
      navn && spørsmål.label
        ? hentBeskjedMedNavn(navn, spørsmål.label)
        : spørsmål.label;
    return (
      harValgtSvar(spørsmål.verdi) &&
      label && (
        <div className="spørsmål-og-svar" key={index}>
          <Element>{label}</Element>
          {verdiTilTekstsvar(spørsmål.verdi, intl)}
        </div>
      )
    );
  });
};

export const visLabelOgVerdiForSpørsmålFelt = (
  feltObjekt: ISpørsmålFelt | ISpørsmålBooleanFelt,
  intl: IntlShape,
  overskrift?: string
) => {
  return (
    <>
      {overskrift && <Ingress>{overskrift}</Ingress>}
      <div className="spørsmål-og-svar">
        <Element>{feltObjekt.label}</Element>
        {verdiTilTekstsvar(feltObjekt.verdi, intl)}
      </div>
    </>
  );
};

export const visLabelOgVerdiForSpørsmålListeFelt = (
  feltListeObjekt: ISpørsmålListeFelt
) => {
  return (
    <div className="spørsmål-og-svar">
      <Element>{feltListeObjekt.label}</Element>
      <ul>
        {feltListeObjekt.verdi.map((svar) => (
          <li>
            <Normaltekst>{svar}</Normaltekst>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
