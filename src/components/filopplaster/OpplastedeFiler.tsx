import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import vedlegg from '../../assets/vedlegg.svg';
import slett from '../../assets/slett.svg';
import { ISøknad } from '../../models/søknad';
import useSøknadContext from '../../context/SøknadContext';

const formaterFilstørrelse = (bytes: number, decimals: number = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const OpplastedeFiler = () => {
  const { søknad, settSøknad } = useSøknadContext();

  const slettFil = (fil: File) => {
    const data = søknad.vedlegg;

    data.delete(fil.name);

    settSøknad({ ...søknad, vedlegg: data });
  };

  if (!søknad.vedlegg || typeof søknad.vedlegg === 'string') return null;

  const filer = [];

  for (var pair of søknad.vedlegg.entries()) {
    filer.push(pair[1] as File);
  }

  return (
    <>
      {filer.map((fil) => (
        <div className="fil" key={fil.lastModified}>
          <div>
            <img className="vedleggsikon" src={vedlegg} />
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
            <img className="slettikon" src={slett} />
          </div>
        </div>
      ))}
    </>
  );
};

export default OpplastedeFiler;
