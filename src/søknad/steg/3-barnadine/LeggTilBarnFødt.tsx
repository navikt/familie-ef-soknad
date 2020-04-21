import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { RadioPanel } from 'nav-frontend-skjema';
import { Input } from 'nav-frontend-skjema';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { useIntl } from 'react-intl';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';

interface Props {
  navn?: string;
  personnummer?: string;
  settNavn: Function;
  settPersonnummer: Function;
  settBo: Function;
  boHosDeg: string;
  settDato: Function;
  barnDato: Date;
}

const LeggTilBarnFødt: React.FC<Props> = ({
  navn,
  personnummer,
  settNavn,
  settPersonnummer,
  settBo,
  boHosDeg,
  settDato,
  barnDato,
}) => {
  const intl = useIntl();

  return (
    <>
      <KomponentGruppe>
        <Input
          onChange={(e) => settNavn(e.target.value)}
          value={navn}
          label="Barnets fulle navn, om dette er bestemt"
        />
      </KomponentGruppe>

      <KomponentGruppe>
        <FeltGruppe classname={'datoOgPersonnummer'}>
          <Datovelger
            valgtDato={barnDato}
            tekstid={'datovelger.fødselsdato'}
            datobegrensning={DatoBegrensning.TidligereDatoer}
            settDato={(e) => settDato(e)}
          />
          <Input
            key={'tlf'}
            label={intl.formatMessage({ id: 'person.nr' }).trim()}
            type="text"
            bredde={'S'}
            onChange={(e) => settPersonnummer(e.target.value, 'fødselsnummer')}
          />
        </FeltGruppe>
      </KomponentGruppe>

      <KomponentGruppe>
        <Normaltekst>
          {intl.formatMessage({ id: 'barnadine.spm.borBarnHosDeg' })}
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
            <FormattedMessage id="barnadine.advarsel.borikke" />
          </AlertStripeAdvarsel>
        )}
      </KomponentGruppe>
    </>
  );
};

export default LeggTilBarnFødt;
