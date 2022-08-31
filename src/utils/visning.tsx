import { useEffect } from 'react';
import { hentTekst } from '../utils/søknad';
import { formatDate, strengTilDato } from '../utils/dato';
import { useLocation } from 'react-router-dom';
import { isValidISODateString } from 'iso-datestring-validator';
import { hentBeskjedMedNavn } from '../utils/språk';
import {
  ISpørsmålBooleanFelt,
  ISpørsmålFelt,
  ISpørsmålListeFelt,
} from '../models/søknad/søknadsfelter';

import { harValgtSvar } from './spørsmålogsvar';
import { LokalIntlShape } from '../language/typer';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { BodyShort, Ingress, Label } from '@navikt/ds-react';

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
  intl?: LokalIntlShape
) => {
  if (Array.isArray(verdi)) {
    return (
      <ul>
        {verdi.map((v, index) => (
          <li key={index}>
            <BodyShort>{v}</BodyShort>
          </li>
        ))}
      </ul>
    );
  } else if (typeof verdi === 'number') {
    return <BodyShort>{verdi.toString()}</BodyShort>;
  } else if (typeof verdi === 'string') {
    try {
      if (isValidISODateString(verdi)) {
        const formattertDato = formatDate(strengTilDato(verdi));
        return <BodyShort>{formattertDato}</BodyShort>;
      }
    } catch (e) {
      return <BodyShort>{verdi}</BodyShort>;
    }
    return <BodyShort>{verdi}</BodyShort>;
  } else if (typeof verdi === 'boolean') {
    let jaTekst = 'Ja';
    let neiTekst = 'Nei';

    if (intl) {
      jaTekst = hentTekst('svar.ja', intl);
      neiTekst = hentTekst('svar.nei', intl);
    }

    if (verdi === true) {
      return <BodyShort>{jaTekst}</BodyShort>;
    } else {
      return <BodyShort>{neiTekst}</BodyShort>;
    }
  } else if (verdi instanceof Date) {
    return <BodyShort>{formatDate(verdi)}</BodyShort>;
  } else {
    return null;
  }
};

const VisPeriode = (objekt: any, tittel?: string) => {
  const intl = useLokalIntlContext();

  if (!(objekt && objekt.fra && objekt.til)) return null;

  return (
    <>
      {tittel ? (
        <div className="spørsmål-og-svar">
          <Label>{tittel}</Label>
        </div>
      ) : null}
      <div className="spørsmål-og-svar">
        <Label>{objekt.fra.label}</Label>
        {verdiTilTekstsvar(objekt.fra.verdi, intl)}
      </div>
      <div className="spørsmål-og-svar">
        <Label>{objekt.til.label}</Label>
        {verdiTilTekstsvar(objekt.til.verdi, intl)}
      </div>
    </>
  );
};

export const VisLabelOgSvar = (objekt: Object | undefined, navn?: string) => {
  const intl = useLokalIntlContext();

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
          <Label>{label}</Label>
          {verdiTilTekstsvar(spørsmål.verdi, intl)}
        </div>
      )
    );
  });
};

export const visLabelOgVerdiForSpørsmålFelt = (
  feltObjekt: ISpørsmålFelt | ISpørsmålBooleanFelt,
  intl: LokalIntlShape,
  overskrift?: string
) => {
  return (
    <>
      {overskrift && <Ingress>{overskrift}</Ingress>}
      <div className="spørsmål-og-svar">
        <Label>{feltObjekt.label}</Label>
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
      <Label>{feltListeObjekt.label}</Label>
      <ul>
        {feltListeObjekt.verdi.map((svar) => (
          <li>
            <BodyShort>{svar}</BodyShort>
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
