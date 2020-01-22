import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { injectIntl, IntlShape } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import opplasting from '../../assets/opplasting.svg';
import OpplastedeFiler from './OpplastedeFiler';
import { formaterFilstørrelse } from './utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Modal from 'nav-frontend-modal';

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
  //const { søknad, settSøknad } = useSøknadContext();
  const [filliste, settFilliste] = useState<File[]>([]);
  const [feilmeldinger, settFeilmeldinger] = useState<string[]>([]);
  const [åpenModal, settÅpenModal] = useState<boolean>(false);

  const lukkModal = () => {
    settÅpenModal(false);
  };

  const onDrop = useCallback((filer) => {
    const feilmeldingsliste: string[] = [];
    //const vedleggsliste: IVedlegg[] = [];

    filer.forEach((fil: File) => {
      const filKey = fil.name + fil.size;

      if (maxFilstørrelse && fil.size > maxFilstørrelse) {
        const maks = formaterFilstørrelse(maxFilstørrelse);
        feilmeldingsliste.push(
          fil.name + ' er for stor. Den må være under ' + maks + '.'
        );

        settFeilmeldinger(feilmeldingsliste);
        settÅpenModal(true);
        return;
      }

      if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
        feilmeldingsliste.push(fil.name + ' har feil filtype.');

        settFeilmeldinger(feilmeldingsliste);
        settÅpenModal(true);
        return;
      }

      const data = new FormData();

      if (!data.get(filKey)) {
        data.append('file', fil);
      }

      const options = {
        method: 'POST',
        body: data,
      };

      console.log('data');
      console.log(data);

      fetch(
        'https://www.nav.no/familie/alene-med-barn/mellomlagring/api/mapper/soknad-om-overgangsstonad-vedlegg',
        options
      )
        .then((response) => response.json())
        .then((json) => console.log(json));

      settFilliste((prevListe) => [fil, ...prevListe]);
    });

    //settSøknad({ ...søknad, vedlegg: data });

    // eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log('filliste');
  console.log(filliste);

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
          <OpplastedeFiler filliste={filliste} />
        </div>
      </div>

      <div className="filopplaster">
        <Modal
          isOpen={åpenModal}
          onRequestClose={() => lukkModal()}
          closeButton={true}
          contentLabel="Modal"
        >
          <div className="feilmelding">
            {feilmeldinger.map((feilmelding) => (
              <AlertStripeFeil key={feilmelding} className="feilmelding-alert">
                {feilmelding}
              </AlertStripeFeil>
            ))}
          </div>
        </Modal>
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
