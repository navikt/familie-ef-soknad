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
  const [alleredeOpplastet, settAlleredeOpplastet] = useState<boolean>(false);

  const onDrop = useCallback((filer) => {
    settFeilmeldinger([]);
    settAlleredeOpplastet(false);

    const data = søknad.vedlegg;

    filer.forEach((fil: File) => {
      if (!tillatteFiltyper.includes(fil.type)) {
        settFeilmeldinger(['Ikke en gyldig filtype']);
        settSøknad({ ...søknad, vedlegg: new FormData() });
        return;
      }

      const filKey = fil.name + fil.size;

      if (!data.get(filKey)) {
        data.append(filKey, fil);
      } else {
        settAlleredeOpplastet(true);
      }
    });

    settSøknad({ ...søknad, vedlegg: data });
    // eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="filopplaster-wrapper">
      <div className="tittel-wrapper">
        <Undertittel className="tittel">{tittel}</Undertittel>

        <ul className="opplasting-liste">
          <li>
            <Normaltekst>
              Redegjørelse for hvor den tidligere samboeren bor nå
            </Normaltekst>
          </li>
          <li>
            <Normaltekst>
              Kopi av flyttemelding/tips til Folkeregisteret
            </Normaltekst>
          </li>
          <li>
            <Normaltekst>Husleiekontrakt for begge parter</Normaltekst>
          </li>
        </ul>

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
