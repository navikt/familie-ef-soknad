import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { ESvar, ESvarTekstid } from '../../../models/felles/spørsmålogsvar';
import { RadioPanel } from 'nav-frontend-skjema';
import { hentTekst } from '../../../utils/søknad';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';
import { erDatoGyldigOgInnaforBegrensninger } from '../../../components/dato/utils';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import FormattedMessage from '../../../language/FormattedMessage';
import { Alert, Label } from '@navikt/ds-react';
import styled from 'styled-components';
import {
  Datovelger,
  DatoBegrensning,
} from '../../../components/dato/Datovelger';

interface Props {
  settBo: (nyttBo: string) => void;
  boHosDeg: string;
  settDato: (date: string) => void;
  barnDato: string;
}

const RadiopanelWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const LeggTilBarnUfødt: React.FC<Props> = ({
  settBo,
  boHosDeg,
  settDato,
  barnDato,
}) => {
  const intl = useLokalIntlContext();

  return (
    <>
      <KomponentGruppe>
        <Datovelger
          settDato={(e) => settDato(e)}
          valgtDato={barnDato}
          tekstid={'barnadine.termindato'}
          datobegrensning={DatoBegrensning.FremtidigeDatoer}
        />
        <AlertStripeDokumentasjon>
          <FormattedMessage id="barnadine.info.terminbekreftelse" />
        </AlertStripeDokumentasjon>
      </KomponentGruppe>
      {barnDato &&
        erDatoGyldigOgInnaforBegrensninger(
          barnDato,
          DatoBegrensning.FremtidigeDatoer
        ) && (
          <KomponentGruppe>
            <Label>
              {intl.formatMessage({ id: 'barnekort.spm.skalBarnetBoHosSøker' })}
            </Label>
            <RadiopanelWrapper>
              <RadioPanel
                key={ESvar.JA}
                name={'radio-bosted'}
                label={hentTekst(ESvarTekstid.JA, intl)}
                value={ESvar.JA}
                checked={boHosDeg === ESvar.JA}
                onChange={(e) => settBo(e.target.value)}
              />
              <RadioPanel
                key={ESvar.NEI}
                name={'radio-bosted'}
                label={hentTekst(ESvarTekstid.NEI, intl)}
                value={ESvar.NEI}
                checked={boHosDeg === ESvar.NEI}
                onChange={(e) => settBo(e.target.value)}
              />
            </RadiopanelWrapper>
            {boHosDeg === ESvar.NEI && (
              <Alert size="small" variant="warning" inline>
                <FormattedMessage id="barnadine.advarsel.skalikkebo" />
              </Alert>
            )}
          </KomponentGruppe>
        )}
    </>
  );
};

export default LeggTilBarnUfødt;
