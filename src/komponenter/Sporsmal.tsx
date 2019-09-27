import React from 'react';
import { ISporsmal } from '../typer/sporsmal';
import SprakTekst from './LocaleTekst';

interface ISporsmalProps {
  sporsmalListe: ISporsmal[];
  steg: number;
}

const Sporsmal: React.FC<ISporsmalProps> = ({ sporsmalListe, steg }) => {
  const sporsmal = sporsmalListe[steg];
  console.log(sporsmal);

  return (
    <div>
      <SprakTekst tekst={sporsmal.tittel} />
    </div>
  );
};

export default Sporsmal;
