import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import Side from '../../side/Side';
import { IBosituasjon } from '../../../models/steg/bosituasjon';
import { useLocation } from 'react-router-dom';
import { erFerdigUtfylt } from '../../../helpers/steg/bosituasjon';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import BosituasjonSpørsmål from '../../../søknad/steg/2-bosituasjon/BosituasjonSpørsmål';

const Bosituasjon: FC = () => {
  const intl = useIntl();
  const {
    søknad,
    settSøknad,
    settDokumentasjonsbehov,
    mellomlagreBarnetilsyn,
  } = useBarnetilsynSøknad();
  const bosituasjon = søknad.bosituasjon;
  const location = useLocation();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  const settBosituasjon = (bosituasjon: IBosituasjon) => {
    settSøknad((prevSoknad) => {
      return {
        ...prevSoknad,
        bosituasjon: bosituasjon,
      };
    });
  };

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.bosituasjon' })}
      skalViseKnapper={!kommerFraOppsummering}
      erSpørsmålBesvart={erFerdigUtfylt(bosituasjon)}
      mellomlagreBarnetilsyn={mellomlagreBarnetilsyn}
    >
      <BosituasjonSpørsmål
        bosituasjon={bosituasjon}
        settBosituasjon={settBosituasjon}
        settDokumentasjonsbehov={settDokumentasjonsbehov}
      />
    </Side>
  );
};
export default Bosituasjon;
