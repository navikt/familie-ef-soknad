import React from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import {
  EAktivitet,
  EArbeidssituasjon,
  IAktivitet,
} from '../../../models/steg/aktivitet/aktivitet';
import { Textarea } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (nyArbeidssituasjon: IAktivitet) => void;
}

const EtablererEgenVirksomhet: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const { etablererEgenVirksomhet } = arbeidssituasjon;
  const intl = useIntl();

  const settTekstfelt = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    settArbeidssituasjon({
      ...arbeidssituasjon,
      etablererEgenVirksomhet: {
        spørsmålid: EArbeidssituasjon.etablererEgenVirksomhet,
        svarid: EAktivitet.etablererEgenVirksomhet,
        label: hentTekst(
          'arbeidssituasjon.label.etablererEgenVirksomhet',
          intl
        ),
        verdi: e.target.value,
      },
    });
  };

  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Undertittel>
          <LocaleTekst
            tekst={'arbeidssituasjon.tittel.etablererEgenVirksomhet'}
          />
        </Undertittel>
      </FeltGruppe>

      <Textarea
        label={intl.formatMessage({
          id: 'arbeidssituasjon.label.etablererEgenVirksomhet',
        })}
        value={
          etablererEgenVirksomhet?.verdi ? etablererEgenVirksomhet.verdi : ''
        }
        maxLength={2000}
        onChange={(e) => settTekstfelt(e)}
      />
      <FeltGruppe>
        <AlertStripe type={'info'} form={'inline'}>
          <LocaleTekst
            tekst={'arbeidssituasjon.alert.etablererEgenVirksomhet'}
          />
        </AlertStripe>
      </FeltGruppe>
    </SeksjonGruppe>
  );
};

export default EtablererEgenVirksomhet;
