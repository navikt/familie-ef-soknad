import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useSøknadContext from '../../context/SøknadContext';
import { injectIntl, IntlShape } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import opplasting from '../../assets/opplasting.svg';
import OpplastedeFiler from './OpplastedeFiler';

interface Props {
  intl: IntlShape;
  tittel: string;
  tillatteFiltyper: string[];
}

const Filopplaster: React.FC<Props> = ({ intl, tittel, tillatteFiltyper }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const [feilmeldinger, settFeilmeldinger] = useState<string[]>([]);

  const onDrop = useCallback((filer) => {
    settFeilmeldinger([]);

    console.log(filer);

    const data = new FormData();

    filer.forEach((fil: File) => {
      if (!tillatteFiltyper.includes(fil.type)) {
        settFeilmeldinger(['Ikke en gyldig filtype']);
        settSøknad({ ...søknad, vedlegg: new FormData() });
        return;
      }

      data.append(fil.name, fil);
    });

    settSøknad({ ...søknad, vedlegg: data });
    // eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="filopplaster-wrapper">
      <div className="tittel-wrapper">
        <Undertittel className="tittel">{tittel}</Undertittel>

        <div className="opplastede-filer">
          <OpplastedeFiler />
        </div>
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
      </div>
    </div>
  );
};

export default injectIntl(Filopplaster);
