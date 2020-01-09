import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useSøknadContext from '../../context/SøknadContext';
import { injectIntl, IntlShape } from 'react-intl';
import { Normaltekst, Undertittel, Undertekst } from 'nav-frontend-typografi';
import opplasting from '../../assets/opplasting.svg';

interface Props {
  intl: IntlShape;
  tittel: string;
  tillatteFiltyper: string[];
}

const Filopplaster: React.FC<Props> = ({ intl, tittel, tillatteFiltyper }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const [feilmelding, settFeilmelding] = useState('');

  const onDrop = useCallback((filer) => {
    const fil = filer[0];

    if (!tillatteFiltyper.includes(fil.type)) {
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
        <Undertittel className="tittel">{tittel}</Undertittel>
      </div>

      <div className="filopplaster">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <>
              <img src={opplasting} className="opplastingsikon" />
              <Normaltekst className="tekst">
                {intl.formatMessage({ id: 'filopplaster.slipp' })}
              </Normaltekst>
            </>
          ) : (
            <>
              <img src={opplasting} className="opplastingsikon" />
              <Normaltekst className="tekst">
                {intl.formatMessage({ id: 'filopplaster.dra' })}
              </Normaltekst>
            </>
          )}
        </div>
        <div className="feilmelding">{feilmelding ? feilmelding : null}</div>
      </div>
    </div>
  );
};

export default injectIntl(Filopplaster);
