import React from 'react';
import { LocaleString } from '../typer/sprak';
import { Element } from 'nav-frontend-typografi';

interface Props {
  tekst: LocaleString;
}

const SprakTekst = ({ tekst }: Props) => {
  return (
    <>
      <Element>Engelsk: {tekst.en}</Element>
      <Element>Norsk bokmål: {tekst.nb}</Element>
      <Element>Norsk nynorsk: {tekst.nn ? tekst.nn : 'Not found'}</Element>
    </>
  );
};

export default SprakTekst;
