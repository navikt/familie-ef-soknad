import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useSøknadContext from '../../context/SøknadContext';
import { injectIntl, IntlShape } from 'react-intl';
import { Normaltekst, Undertittel, Undertekst } from 'nav-frontend-typografi';

interface Props {
  intl: IntlShape;
}

const tillatte_filtyper = ['image/png'];

const Filopplaster: React.FC<Props> = ({ intl }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const [feilmelding, settFeilmelding] = useState('');

  const onDrop = useCallback((filer) => {
    const fil = filer[0];

    if (!tillatte_filtyper.includes(fil.type)) {
      settFeilmelding('Ikke en gyldig filtype');
      settSøknad({ ...søknad, vedlegg: new FormData() });
      return;
    }

    settFeilmelding('');

    const data = new FormData();

    data.append('vedlegg', filer[0]);

    settSøknad({ ...søknad, vedlegg: data });
    // eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="filopplaster-wrapper">
      <div className="tittel-wrapper">
        <Undertittel className="tittel">
          Bekreftelse fra Fylkesmannen om søknad om separasjon
        </Undertittel>
      </div>
      <div className="filopplaster">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Normaltekst className="tekst">
              {intl.formatMessage({ id: 'filopplaster.slipp' })}
            </Normaltekst>
          ) : (
            <Normaltekst className="tekst">
              {intl.formatMessage({ id: 'filopplaster.dra' })}
            </Normaltekst>
          )}
        </div>
        <div className="feilmelding">{feilmelding ? feilmelding : null}</div>
      </div>
    </div>
  );
};

export default injectIntl(Filopplaster);
