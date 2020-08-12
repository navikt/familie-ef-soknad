import React from 'react';
import slett from '../../assets/slett.svg';
import vedlegg from '../../assets/vedlegg.svg';
import { formaterFilstørrelse } from './utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { IVedlegg } from '../../models/steg/vedlegg';

interface Props {
  filliste: IVedlegg[];
  slettVedlegg: (vedlegg: IVedlegg) => void;
}

const OpplastedeFiler: React.FC<Props> = ({ filliste, slettVedlegg }) => {
  return (
    <>
      {filliste.map((fil: IVedlegg, index: number) => {
        return (
          <div key={fil.dokumentId}>
            <div className="fil">
              <div>
                <img
                  className="vedleggsikon"
                  src={vedlegg}
                  alt="Vedleggsikon"
                />
                <Normaltekst className="filnavn">{fil.navn}</Normaltekst>
                <Normaltekst className="filstørrelse">
                  ({formaterFilstørrelse(fil.størrelse)})
                </Normaltekst>
              </div>
              <div
                className="slett"
                onClick={() => {
                  slettVedlegg(fil);
                }}
              >
                <Normaltekst>slett</Normaltekst>
                <img className="slettikon" src={slett} alt="Rødt kryss" />
              </div>
            </div>
            {index === filliste.length - 1 ? '' : <hr />}
          </div>
        );
      })}
    </>
  );
};

export default OpplastedeFiler;
