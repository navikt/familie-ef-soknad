import React from 'react';

import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import { hentTekst } from '../../../utils/søknad';
import { dagensDato, formatDateHour } from '../../../utils/dato';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import LocaleTekst from '../../../language/LocaleTekst';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import Side from '../../../components/side/Side';
import RegistrerDegSomArbeidssøker from './RegistrerDegSomArbeidssøker';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { ESvar } from '../../../models/spørsmålogsvar';
import TilleggsstønaderUnderUtdanning from './TilleggsstønaderUnderUtdanning';
import TilleggsstønaderArbeidssøker from './TilleggsstønaderArbeidssøker';

const Kvittering: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknad();

  const mottattAlert: string =
    hentTekst('kvittering.alert.mottatt', intl) +
    ` ${formatDateHour(
      søknad?.innsendingsdato ? søknad?.innsendingsdato : dagensDato
    )} `;

  return (
    <Side
      tittel={intl.formatMessage({ id: 'kvittering.takk' })}
      skalViseKnapper={false}
    >
      <SeksjonGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </SeksjonGruppe>

      {søknad.aktivitet.arbeidssøker?.registrertSomArbeidssøkerNav?.svarid ===
        ESvar.NEI && <RegistrerDegSomArbeidssøker />}

      <SeksjonGruppe>
        <FeltGruppe>
          <Normaltekst>
            <LocaleTekst tekst={'kvittering.tekst.dineSaker'} />
          </Normaltekst>
        </FeltGruppe>
        <a
          className={'knapp knapp--standard kvittering'}
          href={'https://www.nav.no/soknader/nb/person/arbeid/tilleggsstonader'}
        >
          <LocaleTekst tekst={'kvittering.knapp.dineSaker'} />
        </a>
      </SeksjonGruppe>

      {søknad.aktivitet.arbeidssøker && <TilleggsstønaderArbeidssøker />}

      {søknad.aktivitet.underUtdanning && <TilleggsstønaderUnderUtdanning />}
    </Side>
  );
};

export default Kvittering;
