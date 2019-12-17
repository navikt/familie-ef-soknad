import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useSøknadContext from '../../context/SøknadContext';
import { injectIntl, IntlShape } from 'react-intl';

interface Props {
  intl: IntlShape;
}

const Filopplaster: React.FC<Props> = ({ intl }) => {
  const { søknad, settSøknad } = useSøknadContext();

  const onDrop = useCallback((acceptedFiles) => {
    søknad.vedlegg.append('vedlegg', acceptedFiles[0]);

    fetch(
      'https://www.nav.no/familie/alene-med-barn/mellomlagring/api/mapper/soknad-om-overgangsstonad-vedlegg',
      {
        method: 'post',
        body: søknad.vedlegg,
      }
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="filopplaster">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>{intl.formatMessage({ id: 'filopplaster.slipp' })}</p>
        ) : (
          <p>{intl.formatMessage({ id: 'filopplaster.dra' })}</p>
        )}
      </div>
    </div>
  );
};

export default injectIntl(Filopplaster);
