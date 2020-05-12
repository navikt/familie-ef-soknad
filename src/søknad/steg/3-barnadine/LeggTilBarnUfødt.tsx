import React from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import AlertStripe from 'nav-frontend-alertstriper';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { ESvar } from '../../../models/spørsmålogsvar';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';

interface Props {
  settBo: Function;
  boHosDeg: string;
  settDato: Function;
  barnDato: Date;
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
        />
        <AlertStripe type="info" form="inline">
          <FormattedMessage id="barnadine.info.terminbekreftelse" />
        </AlertStripe>
      </KomponentGruppe>
      <KomponentGruppe>
        <Normaltekst>
          {intl.formatMessage({ id: 'barnekort.spm.skalBarnBoHosDeg' })}
        </Normaltekst>
        <div className="radiogruppe-2-svar">
          <RadioPanel
            key={ESvar.JA}
            name={'radio-bosted'}
            label="Ja"
            value={ESvar.JA}
            checked={boHosDeg === ESvar.JA}
            onChange={(e) => settBo(e)}
          />
          <RadioPanel
            key={ESvar.NEI}
            name={'radio-bosted'}
            label="Nei"
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
    </>
  );
};

export default LeggTilBarnUfødt;
