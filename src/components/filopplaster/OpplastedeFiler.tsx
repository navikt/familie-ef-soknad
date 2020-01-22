import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import vedlegg from '../../assets/vedlegg.svg';
import slett from '../../assets/slett.svg';
import { formaterFilstørrelse } from './utils';

interface Props {
  filliste: File[];
}

const OpplastedeFiler: React.FC<Props> = ({ filliste }) => {
  const slettFil = (fil: File) => {
    // settFiler
  };

  return (
    <>
      {filliste.map((fil: File) => {
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
