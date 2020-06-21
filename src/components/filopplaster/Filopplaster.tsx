import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { injectIntl, IntlShape } from 'react-intl';
import {
  hentBeskjedMedNavn,
  hentBeskjedMedToParametre,
} from '../../utils/språk';
import { Normaltekst } from 'nav-frontend-typografi';
import opplasting from '../../assets/opplasting.svg';
import OpplastedeFiler from './OpplastedeFiler';
import { formaterFilstørrelse } from './utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Modal from 'nav-frontend-modal';
import { IVedlegg } from '../../models/vedlegg';
import Environment from '../../Environment';
import axios from 'axios';
import { IDokumentasjon } from '../../models/dokumentasjon';
import { hentTekst } from '../../utils/søknad';

interface Props {
  intl: IntlShape;
  settDokumentasjon: (dokumentasjon: IDokumentasjon) => void;
  dokumentasjon: IDokumentasjon;
  beskrivelsesListe?: string[];
  tillatteFiltyper?: string[];
  maxFilstørrelse?: number;
}

interface OpplastetVedlegg {
  dokumentId: string;
  filnavn: string;
}

const Filopplaster: React.FC<Props> = ({
  intl,
  settDokumentasjon,
  dokumentasjon,
  beskrivelsesListe,
  tillatteFiltyper,
  maxFilstørrelse,
}) => {
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
              intl.formatMessage({ id: 'filopplaster.feilmelding.maks' }),
              fil.name,
              maks
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

        const requestData = new FormData();
        requestData.append('file', fil);

        axios
          .post<OpplastetVedlegg>(`${Environment().dokumentUrl}`, requestData, {
            withCredentials: true,
            headers: {
              'content-type': 'multipart/form-data',
              accept: 'application/json',
            },
          })
          .then((response: { data: OpplastetVedlegg }) => {
            const { data } = response;
            nyeVedlegg.push({
              dokumentId: data.dokumentId,
              navn: fil.name,
              størrelse: fil.size,
            });

            const opplastedeVedlegg = dokumentasjon.opplastedeVedlegg || [];
            settDokumentasjon({
              ...dokumentasjon,
              opplastedeVedlegg: [...opplastedeVedlegg, ...nyeVedlegg],
            });
          })
          .catch((error) => {
            feilmeldingsliste.push(
              intl.formatMessage({ id: 'filopplaster.feilmelding.generisk' })
            );
            settFeilmeldinger(feilmeldingsliste);
            settÅpenModal(true);
          });
      });
    },
    // eslint-disable-next-line
    [dokumentasjon.opplastedeVedlegg]
  );

  const slettVedlegg = (fil: IVedlegg) => {
    const opplastedeVedlegg = dokumentasjon.opplastedeVedlegg || [];
    const nyVedleggsliste = opplastedeVedlegg.filter((obj: IVedlegg) => {
      return obj.dokumentId !== fil.dokumentId;
    });
    settDokumentasjon({ ...dokumentasjon, opplastedeVedlegg: nyVedleggsliste });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="filopplaster-wrapper">
      <div className="tittel-wrapper">
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
          <OpplastedeFiler
            filliste={dokumentasjon.opplastedeVedlegg || []}
            slettVedlegg={slettVedlegg}
          />
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
