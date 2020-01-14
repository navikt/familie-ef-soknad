import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useSøknadContext from '../../context/SøknadContext';
import { injectIntl, IntlShape } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import opplasting from '../../assets/opplasting.svg';
import OpplastedeFiler from './OpplastedeFiler';
import { formaterFilstørrelse } from './utils';

interface Props {
  intl: IntlShape;
  tittel: string;
  beskrivelsesListe?: string[];
  tillatteFiltyper?: string[];
  maxFilstørrelse?: number;
}

const Filopplaster: React.FC<Props> = ({
  intl,
  tittel,
  beskrivelsesListe,
  tillatteFiltyper,
  maxFilstørrelse,
}) => {
  const { søknad, settSøknad } = useSøknadContext();
  const [feilmeldinger, settFeilmeldinger] = useState({});

  const onDrop = useCallback((filer) => {
    const data = søknad.vedlegg;

    filer.forEach((fil: File) => {
      const filKey = fil.name + fil.size;

      if (maxFilstørrelse && fil.size > maxFilstørrelse) {
        const maks = formaterFilstørrelse(maxFilstørrelse);

        settFeilmeldinger((prevState) => {
          return { ...prevState, [filKey]: 'Filer må være under ' + maks };
        });
      }

      if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
        settFeilmeldinger((prevState) => {
          return { ...prevState, [filKey]: 'Ikke en gyldig filtype' };
        });
      }

      if (!data.get(filKey)) {
        data.append(filKey, fil);
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

        {beskrivelsesListe ? (
          <ul className="opplasting-liste">
            {beskrivelsesListe.map((el) => (
              <li>
                <Normaltekst>{el}</Normaltekst>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="opplastede-filer">
          <OpplastedeFiler feilmeldinger={feilmeldinger} />
        </div>
      </div>

      <div className="filopplaster">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <>
              <img
                src={opplasting}
                className="opplastingsikon"
                alt="Opplastingsikon"
              />
              <Normaltekst className="tekst">
                {intl.formatMessage({ id: 'filopplaster.slipp' })}
              </Normaltekst>
            </>
          ) : (
            <>
              <img
                src={opplasting}
                className="opplastingsikon"
                alt="Opplastingsikon"
              />
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
