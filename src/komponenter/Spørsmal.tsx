import React from 'react';
import { ISporsmal } from '../typer/sporsmal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../språk/LocaleTekst';
import SpråkVelger from './sprakvelger/Språkvelger';

interface ISporsmalProps {
  sporsmalListe: ISporsmal[];
  steg: number;
}

type MergedProps = ISporsmalProps;
const Sporsmal: React.FC<MergedProps> = ({ sporsmalListe, steg }) => {
  const sporsmal = sporsmalListe[steg];
  // eslint-disable-next-line

  return (
    <div>
      <Undertittel>Dynamisk tekst fra Sanity: </Undertittel>
      <Normaltekst>
        <LocaleTekst tekst={sporsmal.tittel} />
      </Normaltekst>
      <Undertittel>Statisk tekst fra appen:</Undertittel>
      <Normaltekst>
        <LocaleTekst tekst={'app.tekst'} />
      </Normaltekst>
      <SpråkVelger/>
    </div>
  );
};

export default Sporsmal;
