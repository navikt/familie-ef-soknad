import React from 'react';
import slett from '../../assets/slett.svg';
import vedlegg from '../../assets/vedlegg.svg';
import { formaterFilstørrelse } from './utils';
import { IVedlegg } from '../../models/steg/vedlegg';
import { BodyShort } from '@navikt/ds-react';

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
                <BodyShort className="filnavn">{fil.navn}</BodyShort>
                <BodyShort className="filstørrelse">
                  ({formaterFilstørrelse(fil.størrelse)})
                </BodyShort>
              </div>
              <div
                className="slett"
                onClick={() => {
                  slettVedlegg(fil);
                }}
              >
                <BodyShort>slett</BodyShort>
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
