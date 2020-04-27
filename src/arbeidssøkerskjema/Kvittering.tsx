import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../language/LocaleTekst';
import Side from './side/Side';
import { hentTekst } from '../utils/søknad';
import { useIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../components/gruppe/KomponentGruppe';
import { dagensDato, formatDate } from '../utils/dato';

const Kvittering: React.FC = () => {
  const intl = useIntl();

  const klokkeslett: string = `${dagensDato.getHours()}:${dagensDato.getMinutes()}`;

  const mottattAlert: string =
    hentTekst('skjema.alert.mottatt', intl) +
    ` ${klokkeslett}, ${formatDate(dagensDato)} `;

  return (
    <Side
      tittel={intl.formatMessage({ id: 'skjema.takk' })}
      visNesteKnapp={false}
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
