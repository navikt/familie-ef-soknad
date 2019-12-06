import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useSøknadContext from '../../context/SøknadContext';
import { injectIntl } from 'react-intl';

const Filopplaster = () => {
  const { søknad, settSøknad } = useSøknadContext();

  const onDrop = useCallback((acceptedFiles) => {
    søknad.vedlegg.append('vedlegg', acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Slipp filene her...</p>
      ) : (
        <p>Dra og dropp filene her, eller klikk for å velge.</p>
      )}
    </div>
  );
};

export default injectIntl(Filopplaster);
