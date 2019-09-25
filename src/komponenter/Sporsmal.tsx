import React from 'react';
import { ISporsmal } from '../models/Sporsmal';

interface ISporsmalProps {
  sporsmalListe: ISporsmal[];
  steg: number;
}

const Sporsmal: React.FC<ISporsmalProps> = ({ sporsmalListe, steg }) => {
  const sporsmal = sporsmalListe[steg];
  console.log(sporsmal);

  return <div>{sporsmal.sporsmal_tekst}</div>;
};

export default Sporsmal;
