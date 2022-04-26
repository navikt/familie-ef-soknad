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
import { IVedlegg } from '../../models/steg/vedlegg';
import Environment from '../../Environment';
import axios from 'axios';
import { skjemanavnTilId, urlTilSkjemanavn } from '../../utils/skjemanavn';
import { IDokumentasjon } from '../../models/steg/dokumentasjon';
import { dagensDatoMedTidspunktStreng } from '../../utils/dato';
import {
  HEADER_NAV_CONSUMER_ID,
  HEADER_NAV_CONSUMER_ID_VALUE,
} from '../../utils/apiutil';
import { logFeilFilopplasting } from '../../utils/amplitude';
import { getFeilmelding } from '../../utils/feil';
import FormData from 'form-data';

interface Props {
  intl: IntlShape;
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
  intl,
  oppdaterDokumentasjon,
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

  const url = window.location.href;
  const skjemanavn = urlTilSkjemanavn(url);
  const skjemaId = skjemanavnTilId(skjemanavn);

  const onDrop = useCallback(
    (filer) => {
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
            `${Environment().dokumentUrl}`,
            requestData,
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
                'Content-Transfer-Encoding': 'base64',
                accept: 'application/json',
                [HEADER_NAV_CONSUMER_ID]: HEADER_NAV_CONSUMER_ID_VALUE,
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
