import React, { FC, useEffect, useState } from 'react';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import LocaleTekst from '../../../language/LocaleTekst';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../side/Side';
import SøkerSkalFlytteSammenEllerFåSamboer from './SøkerSkalFlytteSammenEllerFåSamboer';
import { delerSøkerBoligMedAndreVoksne } from './BosituasjonConfig';
import { erValgtSvarLiktSomSvar } from '../../../utils/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { useSøknad } from '../../../context/SøknadContext';
import {
  ESøkerDelerBolig,
  IBosituasjon,
} from '../../../models/steg/bosituasjon';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { erFerdigUtfylt } from '../../../helpers/steg/bosituasjon';

import EkteskapsliknendeForhold from './EkteskapsliknendeForhold';
import OmTidligereSamboer from './OmTidligereSamboer';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';

const Bosituasjon: FC = () => {
  const intl = useIntl();
  const {
    søknad,
    settSøknad,
    settDokumentasjonsbehov,
    mellomlagreOvergangsstønad,
  } = useSøknad();
  const history = useHistory();
  const location = useLocation();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const hovedSpørsmål: ISpørsmål = delerSøkerBoligMedAndreVoksne;
  const [bosituasjon, settBosituasjon] = useState<IBosituasjon>(
    søknad.bosituasjon
  );

  console.log('BOSITUASJON', bosituasjon);

  useEffect(() => {
    settSøknad({ ...søknad, bosituasjon: bosituasjon });
    // eslint-disable-next-line
  }, [bosituasjon]);

  const settBosituasjonFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    const svarTekst: string = hentTekst(svar.svar_tekstid, intl);
    const spørsmålTekst: string = hentTekst(spørsmål.tekstid, intl);

    const nyBosituasjon = {
      delerBoligMedAndreVoksne: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: spørsmålTekst,
        verdi: svarTekst,
      },
    };

    settBosituasjon(nyBosituasjon);
    settDokumentasjonsbehov(spørsmål, svar);
  };

  const valgtSvar:
    | ISvar
    | undefined = hovedSpørsmål.svaralternativer.find((svar) =>
    erValgtSvarLiktSomSvar(
      bosituasjon.delerBoligMedAndreVoksne.verdi,
      svar.svar_tekstid,
      intl
    )
  );

  const harSøkerEkteskapsliknendeForhold =
    bosituasjon.delerBoligMedAndreVoksne.svarid ===
    ESøkerDelerBolig.harEkteskapsliknendeForhold;

  const planerOmÅFlytteSammenEllerFåSamboer =
    bosituasjon.delerBoligMedAndreVoksne.svarid ===
      ESøkerDelerBolig.borAleneMedBarnEllerGravid ||
    bosituasjon.delerBoligMedAndreVoksne.svarid ===
      ESøkerDelerBolig.delerBoligMedAndreVoksne;

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.bosituasjon' })}
      skalViseKnapper={!kommerFraOppsummering}
      erSpørsmålBesvart={erFerdigUtfylt(bosituasjon)}
      mellomlagreOvergangsstønad={mellomlagreOvergangsstønad}
    >
      <SeksjonGruppe>
        <MultiSvarSpørsmål
          key={hovedSpørsmål.søknadid}
          spørsmål={hovedSpørsmål}
          valgtSvar={bosituasjon.delerBoligMedAndreVoksne.verdi}
          settSpørsmålOgSvar={settBosituasjonFelt}
        />
        {valgtSvar && valgtSvar.alert_tekstid && (
          <FeltGruppe>
            <AlertStripeDokumentasjon>
              {bosituasjon.delerBoligMedAndreVoksne.svarid ===
              ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse ? (
                <FormattedHTMLMessage id={valgtSvar.alert_tekstid} />
              ) : (
                <LocaleTekst tekst={valgtSvar.alert_tekstid} />
              )}
            </AlertStripeDokumentasjon>
          </FeltGruppe>
        )}
      </SeksjonGruppe>

      {planerOmÅFlytteSammenEllerFåSamboer && (
        <SeksjonGruppe>
          <SøkerSkalFlytteSammenEllerFåSamboer
            settBosituasjon={settBosituasjon}
            bosituasjon={bosituasjon}
          />
        </SeksjonGruppe>
      )}

      {harSøkerEkteskapsliknendeForhold && (
        <EkteskapsliknendeForhold
          settBosituasjon={settBosituasjon}
          bosituasjon={bosituasjon}
        />
      )}

      {bosituasjon.delerBoligMedAndreVoksne.svarid ===
        ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse && (
        <SeksjonGruppe>
          <OmTidligereSamboer
            bosituasjon={bosituasjon}
            settBosituasjon={settBosituasjon}
          />
        </SeksjonGruppe>
      )}
      {kommerFraOppsummering && erFerdigUtfylt(bosituasjon) ? (
        <div className={'side'}>
          <Hovedknapp
            className="tilbake-til-oppsummering"
            onClick={() =>
              history.push({
                pathname: '/oppsummering',
              })
            }
          >
            {hentTekst('oppsummering.tilbake', intl)}
          </Hovedknapp>
        </div>
      ) : null}
    </Side>
  );
};
export default Bosituasjon;
