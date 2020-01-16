import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import vedlegg from '../../assets/vedlegg.svg';
import slett from '../../assets/slett.svg';
import useSøknadContext from '../../context/SøknadContext';
import { formaterFilstørrelse } from './utils';

const OpplastedeFiler = () => {
  const { søknad, settSøknad } = useSøknadContext();

  const slettFil = (fil: File) => {
    const data = søknad.vedlegg;

    const filKey = fil.name + fil.size;

    data.delete(filKey);

    settSøknad({ ...søknad, vedlegg: data });
  };

  if (!søknad.vedlegg || typeof søknad.vedlegg === 'string') return null;

  const filer = [];

  for (const fil of søknad.vedlegg.values()) {
    filer.push(fil as File);
  }

  return (
    <>
      {filer.map((fil) => {
        const filKey = fil.name + fil.size;

        return (
          <div key={filKey}>
            <div className="fil">
              <div>
                <img
                  className="vedleggsikon"
                  src={vedlegg}
                  alt="Vedleggsikon"
                />
                <Normaltekst className="filnavn">{fil.name}</Normaltekst>
                <Normaltekst className="filstørrelse">
                  ({formaterFilstørrelse(fil.size)})
                </Normaltekst>
              </div>
              <div
                className="slett"
                onClick={() => {
                  slettFil(fil);
                }}
              >
                <Normaltekst>slett</Normaltekst>
                <img className="slettikon" src={slett} alt="Rødt kryss" />
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default OpplastedeFiler;
