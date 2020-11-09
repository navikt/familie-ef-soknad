import React from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import AlertStripe from 'nav-frontend-alertstriper';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { ESvar, ESvarTekstid } from '../../../models/felles/spørsmålogsvar';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import { hentTekst } from '../../../utils/søknad';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';

interface Props {
  settBo: Function;
  boHosDeg: string;
  settDato: Function;
  barnDato: Date | undefined;
}

const LeggTilBarnUfødt: React.FC<Props> = ({
  settBo,
  boHosDeg,
  settDato,
  barnDato,
}) => {
  const intl = useIntl();

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
      {barnDato && (
        <KomponentGruppe>
          <Normaltekst className="label-normaltekst">
            {intl.formatMessage({ id: 'barnekort.spm.skalBarnetBoHosSøker' })}
          </Normaltekst>
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
            <AlertStripe type="advarsel" form="inline" className="bor-ikke">
              <FormattedMessage id="barnadine.advarsel.skalikkebo" />
            </AlertStripe>
          )}
        </KomponentGruppe>
      )}
    </>
  );
};

export default LeggTilBarnUfødt;
