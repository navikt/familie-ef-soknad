import React, { useCallback, useState } from 'react';
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
import Environment from '../../Environment';

interface Props {
  intl: IntlShape;
  settVedlegg: (vedleggliste: IVedlegg[]) => void;
  vedleggsliste: IVedlegg[];
  tittel: string;
  dokumentasjonsType: string;
  beskrivelsesListe?: string[];
  tillatteFiltyper?: string[];
  maxFilstørrelse?: number;
}

const Filopplaster: React.FC<Props> = ({
  intl,
  settVedlegg,
  vedleggsliste,
  tittel,
  dokumentasjonsType,
  beskrivelsesListe,
  tillatteFiltyper,
  maxFilstørrelse,
}) => {
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

        fetch(`${Environment().dokumentUrl}`, {
          method: 'POST',
          body: data,
        })
          .then((response) => response.json())
          .then((data) => {
            nyeVedlegg.push({
              dokumentId: data.dokumentId,
              navn: dokumentasjonsType,
              label: tittel,
            });
            settFilliste((prevListe: any) => [
              { filObjekt: fil, dokumentId: data.dokumentId },
              ...prevListe,
            ]);
            const nyVedleggsliste = [...vedleggsliste, ...nyeVedlegg];

            settVedlegg(nyVedleggsliste);
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
    []
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
