import React from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import { hvaErDinArbeidssituasjonSpm } from './AktivitetConfig';
import { IAktivitet } from '../../../models/steg/aktivitet/aktivitet';
import { ISpørsmål } from '../../../models/spørsmal';
import { Textarea } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (nyArbeidssituasjon: IAktivitet) => void;
}

const EtablererEgenVirksomhet: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const spørsmål: ISpørsmål = hvaErDinArbeidssituasjonSpm;
  const { etablererEgenVirksomhet } = arbeidssituasjon;
  const intl = useIntl();

  const settTekstfelt = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    settArbeidssituasjon({
      ...arbeidssituasjon,
      etablererEgenVirksomhet: {
        label: intl.formatMessage({ id: spørsmål.tekstid }),
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

      <AlertStripe type={'info'} form={'inline'}>
        <LocaleTekst tekst={'arbeidssituasjon.alert.etablererEgenVirksomhet'} />
      </AlertStripe>
    </SeksjonGruppe>
  );
};

export default EtablererEgenVirksomhet;
