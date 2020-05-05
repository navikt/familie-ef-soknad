import React from 'react';
import Side from '../side/Side';
import { useIntl } from 'react-intl';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { dagensDato, formatDateHour } from '../../utils/dato';
import { hentTekst } from '../../utils/søknad';
import KomponentGruppe from '../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../language/LocaleTekst';

const Kvittering: React.FC = () => {
  const intl = useIntl();

  const mottattAlert: string =
    hentTekst('skjema.alert.mottatt', intl) + ` ${formatDateHour(dagensDato)} `;

  return (
    <Side
      tittel={intl.formatMessage({ id: 'skjema.takk' })}
      skalViseKnapper={false}
    >
      <KomponentGruppe>
        <AlertStripe type={'suksess'}>{mottattAlert}</AlertStripe>
      </KomponentGruppe>
      <KomponentGruppe>
        <Normaltekst>
          <LocaleTekst tekst={'skjema.beskrivelse'} />
        </Normaltekst>
      </KomponentGruppe>
    </Side>
  );
};

export default Kvittering;
