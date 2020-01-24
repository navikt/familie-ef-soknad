import React, { useCallback, useState } from 'react';
import useSøknadContext from '../../context/SøknadContext';
import { useDropzone } from 'react-dropzone';
import { injectIntl, IntlShape } from 'react-intl';
import {
  hentBeskjedMedNavn,
  hentBeskjedMedToParametre,
} from '../../utils/språk';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import opplasting from '../../assets/opplasting.svg';
import OpplastedeFiler from './OpplastedeFiler';
import { formaterFilstørrelse } from './utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Modal from 'nav-frontend-modal';
import { IVedlegg } from '../../models/vedlegg';

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
  const [filliste, settFilliste] = useState<any>([]);
  const [feilmeldinger, settFeilmeldinger] = useState<string[]>([]);
  const [åpenModal, settÅpenModal] = useState<boolean>(false);

  const lukkModal = () => {
    settÅpenModal(false);
  };

  const onDrop = useCallback(
    (filer) => {
      const feilmeldingsliste: string[] = [];
      const nyeVedlegg: IVedlegg[] = [];

      filer.forEach((fil: File) => {
        if (maxFilstørrelse && fil.size > maxFilstørrelse) {
          const maks = formaterFilstørrelse(maxFilstørrelse);
          feilmeldingsliste.push(
            hentBeskjedMedToParametre(
              fil.name,
              maks,
              intl.formatMessage({ id: 'filopplaster.feilmelding.maks' })
            )
          );

          settFeilmeldinger(feilmeldingsliste);
          settÅpenModal(true);
          return;
        }

        if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
          feilmeldingsliste.push(
            hentBeskjedMedNavn(
              fil.name,
              intl.formatMessage({ id: 'filopplaster.feilmelding.filtype' })
            )
          );
          settFeilmeldinger(feilmeldingsliste);
          settÅpenModal(true);
          return;
        }

        const data = new FormData();
        data.append('file', fil);

        fetch(
          'https://www.nav.no/familie/alene-med-barn/mellomlagring/api/mapper/soknad-om-overgangsstonad-vedlegg',
          {
            method: 'POST',
            body: data,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            nyeVedlegg.push(data);
            settFilliste((prevListe: any) => [
              { filObjekt: fil, dokumentId: data.dokumentId },
              ...prevListe,
            ]);
            const nyVedleggsliste = [...søknad.vedleggsliste, ...nyeVedlegg];

            settSøknad({
              ...søknad,
              vedleggsliste: nyVedleggsliste,
            });
          })
          .catch((error) => {
            console.log('Feil', error);
            feilmeldingsliste.push(
              intl.formatMessage({ id: 'filopplaster.dra' })
            );
          });
      });
    },
    // eslint-disable-next-line
    [søknad]
  );

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
          <OpplastedeFiler filliste={filliste} settFilliste={settFilliste} />
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
