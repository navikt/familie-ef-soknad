import React from 'react';

const Fil: React.FC<{ fil: string | File | null }> = ({ fil }) => {
  if (!fil || typeof fil === 'string') return null;

  return <h1>{fil.name}</h1>;
};

export default Fil;
