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
    const data = new FormData();

    data.append('vedlegg', acceptedFiles[0]);

    settSøknad({ ...søknad, vedlegg: data });
    // eslint-disable-next-line
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
