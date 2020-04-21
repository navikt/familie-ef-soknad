import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { RadioPanel } from 'nav-frontend-skjema';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

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
      </KomponentGruppe>

      <KomponentGruppe>
        <Normaltekst>
          {intl.formatMessage({ id: 'barnekort.spm.skalBarnBoHosDeg' })}
        </Normaltekst>
        <div className="radiogruppe-2-svar">
          <RadioPanel
            key={'ja'}
            name={'radio-bosted'}
            label="Ja"
            value={'ja'}
            checked={boHosDeg === 'ja'}
            onChange={(e) => settBo(e)}
          />
          <RadioPanel
            key={'nei'}
            name={'radio-bosted'}
            label="Nei"
            value={'nei'}
            checked={boHosDeg === 'nei'}
            onChange={(e) => settBo(e)}
          />
        </div>
        {boHosDeg === 'nei' && (
          <AlertStripeAdvarsel className="fjernBakgrunn bor-ikke">
            <FormattedMessage id="barnadine.advarsel.skalikkebo" />
          </AlertStripeAdvarsel>
        )}
      </KomponentGruppe>
    </>
  );
};

export default LeggTilBarnUfødt;
