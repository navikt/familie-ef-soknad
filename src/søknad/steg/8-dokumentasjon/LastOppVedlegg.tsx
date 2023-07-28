import React from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import Filopplaster from '../../../components/filopplaster/Filopplaster';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { hentTekst } from '../../../utils/søknad';
import {
  BarnetilsynDokumentasjon,
  IDokumentasjon,
} from '../../../models/steg/dokumentasjon';
import { IVedlegg } from '../../../models/steg/vedlegg';
import { EFiltyper } from '../../../helpers/filtyper';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import FormattedHtmlMessage from '../../../language/FormattedHtmlMessage';
import { BodyShort, Checkbox, GuidePanel, Heading } from '@navikt/ds-react';
import styled from 'styled-components';

const StyledSeksjonGruppe = styled(SeksjonGruppe)`
  padding-bottom: 40px;
`;

interface Props {
  dokumentasjon: IDokumentasjon;
  oppdaterDokumentasjon: (
    dokumentasjonsid: string,
    opplastedeVedlegg: IVedlegg[] | undefined,
    harSendtInnTidligere: boolean
  ) => void;
}

const LastOppVedlegg: React.FC<Props> = ({
  dokumentasjon,
  oppdaterDokumentasjon,
}) => {
  const intl = useLokalIntlContext();

  const settHarSendtInnTidligere = (e: any) => {
    const huketAv = e.target.checked;
    const vedlegg = huketAv ? [] : dokumentasjon.opplastedeVedlegg;
    oppdaterDokumentasjon(dokumentasjon.id, vedlegg, huketAv);
  };

  const hvisIkkeFakturaForBarnepass =
    dokumentasjon.id !== BarnetilsynDokumentasjon.FAKTURA_BARNEPASSORDNING;

  return (
    <StyledSeksjonGruppe>
      <GuidePanel illustration={<GrøntDokumentIkon />} poster>
        <FeltGruppe>
          <Heading size="small" level="3" style={{ justifyContent: 'left' }}>
            <LocaleTekst tekst={dokumentasjon.tittel} />
          </Heading>
        </FeltGruppe>
        {dokumentasjon.beskrivelse && (
          <FeltGruppe>
            <BodyShort>
              <FormattedHtmlMessage id={dokumentasjon.beskrivelse} />
            </BodyShort>
          </FeltGruppe>
        )}
        {hvisIkkeFakturaForBarnepass && (
          <FeltGruppe>
            <Checkbox
              checked={dokumentasjon.harSendtInn}
              onChange={settHarSendtInnTidligere}
            >
              {hentTekst('dokumentasjon.checkbox.sendtTidligere', intl)}
            </Checkbox>
          </FeltGruppe>
        )}
        {!dokumentasjon.harSendtInn && (
          <Filopplaster
            oppdaterDokumentasjon={oppdaterDokumentasjon}
            dokumentasjon={dokumentasjon}
            maxFilstørrelse={1024 * 1024 * 10}
            tillatteFiltyper={[
              EFiltyper.PNG,
              EFiltyper.PDF,
              EFiltyper.JPG,
              EFiltyper.JPEG,
            ]}
          />
        )}
      </GuidePanel>
    </StyledSeksjonGruppe>
  );
};

const GrøntDokumentIkon = () => {
  return (
    <svg
      width="87"
      height="87"
      viewBox="0 0 87 87"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="43.5" cy="43.5" r="43.5" fill="#A8DBB1" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22 25.6V69.1701C22 70.7329 23.2508 72 24.7943 72H62.2073C63.7492 72 65 70.7329 65 69.1701V18.8299C65 17.2671 63.7492 16 62.2073 16H32.3519L22 25.6Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M32.3519 16V22.6858C32.3519 24.2956 31.0204 25.6 29.3773 25.6H22L32.3519 16Z"
        fill="#C9C9C9"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.963 36.8H57.0371V34.4H29.963V36.8Z"
        fill="#6A6A6A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.963 42.4H57.0371V40H29.963V42.4Z"
        fill="#6A6A6A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.963 48H57.0371V45.6H29.963V48Z"
        fill="#6A6A6A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.963 53.6H57.0371V51.2H29.963V53.6Z"
        fill="#6A6A6A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.963 59.2H57.0371V56.8H29.963V59.2Z"
        fill="#6A6A6A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.963 31.2H57.0371V28.8H29.963V31.2Z"
        fill="#6A6A6A"
      />
    </svg>
  );
};

export default LastOppVedlegg;
