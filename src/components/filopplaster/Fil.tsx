import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

const formaterFilstørrelse = (bytes: number, decimals: number = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const Fil: React.FC<{ fil: string | File | null }> = ({ fil }) => {
  if (!fil || typeof fil === 'string') return null;

  return (
    <div className="fil">
      <Normaltekst>{fil.name}</Normaltekst>
      <Normaltekst className="filstørrelse">
        ({formaterFilstørrelse(fil.size)})
      </Normaltekst>
    </div>
  );
};

export default Fil;
