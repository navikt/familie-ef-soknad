import React from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { ESvar, ESvarTekstid } from '../../../models/felles/spørsmålogsvar';
import { RadioPanel } from 'nav-frontend-skjema';
import { hentTekst } from '../../../utils/søknad';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';
import { erDatoGyldigOgInnaforBegrensninger } from '../../../components/dato/utils';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import FormattedMessage from '../../../language/FormattedMessage';
import { Alert, BodyShort } from '@navikt/ds-react';

interface Props {
  settBo: Function;
  boHosDeg: string;
  settDato: Function;
  barnDato: string;
}

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
          fetSkrift={true}
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
            <BodyShort className="label-normaltekst">
              {intl.formatMessage({ id: 'barnekort.spm.skalBarnetBoHosSøker' })}
            </BodyShort>
            <div className="radiogruppe-2-svar">
              <RadioPanel
                key={ESvar.JA}
                name={'radio-bosted'}
                label={hentTekst(ESvarTekstid.JA, intl)}
                value={ESvar.JA}
                checked={boHosDeg === ESvar.JA}
                onChange={(e) => settBo(e)}
              />
              <RadioPanel
                key={ESvar.NEI}
                name={'radio-bosted'}
                label={hentTekst(ESvarTekstid.NEI, intl)}
                value={ESvar.NEI}
                checked={boHosDeg === ESvar.NEI}
                onChange={(e) => settBo(e)}
              />
            </div>
            {boHosDeg === ESvar.NEI && (
              <Alert size="small" variant="warning" className="bor-ikke" inline>
                <FormattedMessage id="barnadine.advarsel.skalikkebo" />
              </Alert>
            )}
          </KomponentGruppe>
        )}
    </>
  );
};

export default LeggTilBarnUfødt;
