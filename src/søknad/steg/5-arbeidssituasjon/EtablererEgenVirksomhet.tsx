import React from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { hvaErDinArbeidssituasjon } from './ArbeidssituasjonConfig';
import { IArbeidssituasjon } from '../../../models/arbeidssituasjon/arbeidssituasjon';
import { ISpørsmål } from '../../../models/spørsmal';
import { Textarea } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';

interface Props {
  arbeidssituasjon: IArbeidssituasjon;
  settArbeidssituasjon: (nyArbeidssituasjon: IArbeidssituasjon) => void;
}

const EtablererEgenVirksomhet: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const spørsmål: ISpørsmål = hvaErDinArbeidssituasjon;
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

      <AlertStripeInfo className="fjernBakgrunn">
        <LocaleTekst tekst={'arbeidssituasjon.alert.etablererEgenVirksomhet'} />
      </AlertStripeInfo>
    </SeksjonGruppe>
  );
};

export default EtablererEgenVirksomhet;
