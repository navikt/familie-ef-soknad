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
import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import { ESvar } from '../../../models/spørsmålogsvar';

interface Props {
  navn?: string;
  personnummer?: string;
  settNavn: Function;
  settPersonnummer: Function;
  settBo: Function;
  boHosDeg: string;
  settDato: Function;
  barnDato: Date | undefined;
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
      {navn && (
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
              label={intl.formatMessage({ id: 'person.nr.barn' }).trim()}
              type="text"
              value={personnummer}
              bredde={'S'}
              onChange={(e) =>
                settPersonnummer(e.target.value, 'fødselsnummer')
              }
            />
          </FeltGruppe>
        </KomponentGruppe>
      )}
      {barnDato && (
        <KomponentGruppe>
          <Normaltekst>
            {intl.formatMessage({ id: 'barnadine.spm.borBarnHosDeg' })}
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
              <FormattedMessage id="barnadine.advarsel.borikke" />
            </AlertStripe>
          )}
        </KomponentGruppe>
      )}
    </>
  );
};

export default LeggTilBarnFødt;
