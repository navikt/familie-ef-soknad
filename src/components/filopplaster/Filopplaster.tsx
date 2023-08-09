import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  hentBeskjedMedNavn,
  hentBeskjedMedToParametre,
} from '../../utils/språk';
import opplasting from '../../assets/opplasting.svg';
import OpplastedeFiler from './OpplastedeFiler';
import { formaterFilstørrelse } from './utils';
import { IVedlegg } from '../../models/steg/vedlegg';
import Environment from '../../Environment';
import axios from 'axios';
import { skjemanavnTilId, urlTilSkjemanavn } from '../../utils/skjemanavn';
import { IDokumentasjon } from '../../models/steg/dokumentasjon';
import { dagensDatoMedTidspunktStreng } from '../../utils/dato';
import { logFeilFilopplasting } from '../../utils/amplitude';
import { getFeilmelding } from '../../utils/feil';
import FormData from 'form-data';
import { useLokalIntlContext } from '../../context/LokalIntlContext';
import { Alert, BodyShort } from '@navikt/ds-react';
import { ModalWrapper } from '../Modal/ModalWrapper';

interface Props {
  oppdaterDokumentasjon: (
    dokumentasjonsid: string,
    opplastedeVedlegg: IVedlegg[] | undefined,
    harSendtInnTidligere: boolean
  ) => void;
  dokumentasjon: IDokumentasjon;
  beskrivelsesListe?: string[];
  tillatteFiltyper?: string[];
  maxFilstørrelse?: number;
}

interface OpplastetVedleggResponse {
  data: OpplastetVedlegg;
}

interface OpplastetVedlegg {
  dokumentId: string;
  filnavn: string;
}

const Filopplaster: React.FC<Props> = ({
  oppdaterDokumentasjon,
  dokumentasjon,
  beskrivelsesListe,
  tillatteFiltyper,
  maxFilstørrelse,
}) => {
  const [feilmeldinger, settFeilmeldinger] = useState<string[]>([]);
  const [åpenModal, settÅpenModal] = useState<boolean>(false);
  const intl = useLokalIntlContext();

  const lukkModal = () => {
    settÅpenModal(false);
  };

  const url = window.location.href;
  const skjemanavn = urlTilSkjemanavn(url);
  const skjemaId = skjemanavnTilId(skjemanavn);

  const onDrop = useCallback(
    (filer: File[]) => {
      const feilmeldingsliste: string[] = [];
      const nyeVedlegg: IVedlegg[] = [];

      filer.forEach((fil: File) => {
        if (maxFilstørrelse && fil.size > maxFilstørrelse) {
          const maks = formaterFilstørrelse(maxFilstørrelse);

          const feilmelding = hentBeskjedMedToParametre(
            intl.formatMessage({ id: 'filopplaster.feilmelding.maks' }),
            fil.name,
            maks
          );

          feilmeldingsliste.push(feilmelding);

          logFeilFilopplasting(skjemanavn, skjemaId, {
            type_feil: 'For stor fil',
            feilmelding: feilmelding,
            filstørrelse: fil.size,
          });

          settFeilmeldinger(feilmeldingsliste);
          settÅpenModal(true);
          return;
        }

        if (tillatteFiltyper && !tillatteFiltyper.includes(fil.type)) {
          const feilmelding = hentBeskjedMedNavn(
            fil.name,
            intl.formatMessage({ id: 'filopplaster.feilmelding.filtype' })
          );
          feilmeldingsliste.push(feilmelding);
          settFeilmeldinger(feilmeldingsliste);
          settÅpenModal(true);

          logFeilFilopplasting(skjemanavn, skjemaId, {
            type_feil: 'Feil filtype',
            feilmelding: feilmelding,
            filtype: fil.type,
          });

          return;
        }

        const requestData = new FormData();
        requestData.append('file', fil);

        axios
          .post<FormData, OpplastetVedleggResponse>(
            `${Environment().dokumentProxyUrl}`,
            requestData,
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
                accept: 'application/json',
              },
              transformRequest: (data, headers) => {
                return requestData;
              },
            }
          )
          .then((response: { data: OpplastetVedlegg }) => {
            const { data } = response;
            nyeVedlegg.push({
              dokumentId: data.dokumentId,
              navn: fil.name,
              størrelse: fil.size,
              tidspunkt: dagensDatoMedTidspunktStreng,
            });

            const opplastedeVedlegg = dokumentasjon.opplastedeVedlegg || [];
            oppdaterDokumentasjon(
              dokumentasjon.id,
              [...opplastedeVedlegg, ...nyeVedlegg],
              dokumentasjon.harSendtInn
            );
          })
          .catch((error) => {
            const feilmelding = getFeilmelding(
              intl,
              'filopplaster.feilmelding',
              'generisk',
              error?.response?.data?.melding
            );
            feilmeldingsliste.push(feilmelding);

            logFeilFilopplasting(skjemanavn, skjemaId, {
              type_feil: 'Generisk feil',
              feilmelding: feilmelding,
              filtype: fil.type,
              filstørrelse: fil.size,
            });

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
    oppdaterDokumentasjon(
      dokumentasjon.id,
      nyVedleggsliste,
      dokumentasjon.harSendtInn
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="filopplaster-wrapper">
      <div className="tittel-wrapper">
        {beskrivelsesListe ? (
          <ul className="opplasting-liste">
            {beskrivelsesListe.map((el) => (
              <li>
                <BodyShort>{el}</BodyShort>
              </li>
            ))}
          </ul>
        ) : null}

        <OpplastedeFiler
          filliste={dokumentasjon.opplastedeVedlegg || []}
          slettVedlegg={slettVedlegg}
        />
      </div>

      <div className="filopplaster">
        <ModalWrapper
          tittel="Noe har gått galt"
          visModal={åpenModal}
          onClose={() => lukkModal()}
        >
          <div className="feilmelding-modal">
            {feilmeldinger.map((feilmelding) => (
              <Alert
                size="small"
                key={feilmelding}
                variant="error"
                className="feilmelding-alert"
              >
                {feilmelding}
              </Alert>
            ))}
          </div>
        </ModalWrapper>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <>
              <img
                src={opplasting}
                className="opplastingsikon"
                alt="Opplastingsikon"
              />
              <BodyShort className="tekst">
                {intl.formatMessage({ id: 'filopplaster.slipp' })}
              </BodyShort>
            </>
          ) : (
            <>
              <img
                src={opplasting}
                className="opplastingsikon"
                alt="Opplastingsikon"
              />
              <BodyShort className="tekst">
                {intl.formatMessage({ id: 'filopplaster.dra' })}
              </BodyShort>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filopplaster;
