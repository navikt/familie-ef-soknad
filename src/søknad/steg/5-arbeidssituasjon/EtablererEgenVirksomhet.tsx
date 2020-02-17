import React from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import useSøknadContext from '../../../context/SøknadContext';
import { Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../language/LocaleTekst';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Textarea } from 'nav-frontend-skjema';
import { useIntl } from 'react-intl';
import { ISpørsmål } from '../../../models/spørsmal';
import { hvaErDinArbeidssituasjon } from './ArbeidssituasjonConfig';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';

const EtablererEgenVirksomhet: React.FC<{ erHuketAv: boolean }> = ({
  erHuketAv,
}) => {
  const spørsmål: ISpørsmål = hvaErDinArbeidssituasjon;
  const { søknad, settSøknad } = useSøknadContext();
  const { etablererEgenVirksomhet } = søknad.arbeidssituasjon;
  const intl = useIntl();
  const tittelTekstid: string = intl.formatMessage({
    id: 'arbeidssituasjon.tittel.etablererEgenVirksomhet',
  });

  const settTekstfelt = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    settSøknad({
      ...søknad,
      arbeidssituasjon: {
        ...søknad.arbeidssituasjon,
        etablererEgenVirksomhet: {
          label: intl.formatMessage({ id: spørsmål.tekstid }),
          verdi: e.target.value,
        },
      },
    });
  };

  return (
    <>
      {erHuketAv ? (
        <SeksjonGruppe>
          <FeltGruppe>
            <Undertittel>
              <LocaleTekst tekst={tittelTekstid} />
            </Undertittel>
          </FeltGruppe>

          <Textarea
            label={tittelTekstid}
            value={
              etablererEgenVirksomhet?.verdi
                ? etablererEgenVirksomhet.verdi
                : ''
            }
            maxLength={2000}
            onChange={(e) => settTekstfelt(e)}
          />

          <AlertStripeInfo className="fjernBakgrunn">
            <LocaleTekst
              tekst={'arbeidssituasjon.alert.etablererEgenVirksomhet'}
            />
          </AlertStripeInfo>
        </SeksjonGruppe>
      ) : null}
    </>
  );
};

export default EtablererEgenVirksomhet;
