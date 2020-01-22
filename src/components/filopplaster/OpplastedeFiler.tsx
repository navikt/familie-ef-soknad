import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import vedlegg from '../../assets/vedlegg.svg';
import slett from '../../assets/slett.svg';
import { formaterFilstørrelse } from './utils';

interface Props {
  filliste: File[];
  settFilliste: Function;
}

const OpplastedeFiler: React.FC<Props> = ({ filliste, settFilliste }) => {
  const slettFil = (fil: File) => {
    const temp = filliste.slice();

    const index = temp.indexOf(fil);

    if (index > -1) {
      temp.splice(index, 1);
    }

    settFilliste(temp);
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
