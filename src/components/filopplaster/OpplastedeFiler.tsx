import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import vedlegg from '../../assets/vedlegg.svg';
import slett from '../../assets/slett.svg';
import useSøknadContext from '../../context/SøknadContext';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { formaterFilstørrelse } from './utils';

interface OpplastedeFilerProps {
  feilmeldinger: any;
}

const OpplastedeFiler: React.FC<OpplastedeFilerProps> = ({ feilmeldinger }) => {
  const { søknad, settSøknad } = useSøknadContext();

  const slettFil = (fil: File) => {
    const data = søknad.vedlegg;

    const filKey = fil.name + fil.size;

    data.delete(filKey);

    settSøknad({ ...søknad, vedlegg: data });
  };

  if (!søknad.vedlegg || typeof søknad.vedlegg === 'string') return null;

  const filer = [];

  for (var pair of søknad.vedlegg.entries()) {
    filer.push(pair[1] as File);
  }

  return (
    <>
      {filer.map((fil) => {
        const filKey = fil.name + fil.size;
        const feilmelding = feilmeldinger[filKey];

        return (
          <div key={fil.name + fil.size}>
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
            {feilmelding ? (
              <div className="feilmelding">
                <AlertStripeFeil className="feilmelding-alert">
                  {feilmelding}
                </AlertStripeFeil>
              </div>
            ) : null}
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default OpplastedeFiler;
