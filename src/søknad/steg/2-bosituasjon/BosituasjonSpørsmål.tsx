import React, { FC } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';
import {
  ESøkerDelerBolig,
  IBosituasjon,
} from '../../../models/steg/bosituasjon';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import LocaleTekst from '../../../language/LocaleTekst';
import SøkerSkalFlytteSammenEllerFåSamboer from './SøkerSkalFlytteSammenEllerFåSamboer';
import EkteskapsliknendeForhold from './EkteskapsliknendeForhold';
import OmTidligereSamboer from './OmTidligereSamboer';
import { erFerdigUtfylt } from '../../../helpers/steg/bosituasjon';
import { Hovedknapp } from 'nav-frontend-knapper';
import { hentTekst } from '../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { delerSøkerBoligMedAndreVoksne } from './BosituasjonConfig';
import { erValgtSvarLiktSomSvar } from '../../../utils/spørsmålogsvar';
import { useHistory, useLocation } from 'react-router';
import AlertStripe from 'nav-frontend-alertstriper';

interface Props {
  bosituasjon: IBosituasjon;
  settBosituasjon: (bosituasjon: IBosituasjon) => void;
  settDokumentasjonsbehov: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    erHuketAv?: boolean
  ) => void;
}

const BosituasjonSpørsmål: FC<Props> = ({
  bosituasjon,
  settBosituasjon,
  settDokumentasjonsbehov,
}) => {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  const hovedSpørsmål: ISpørsmål = delerSøkerBoligMedAndreVoksne;

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
    <>
      <SeksjonGruppe>
        <MultiSvarSpørsmål
          key={hovedSpørsmål.søknadid}
          spørsmål={hovedSpørsmål}
          valgtSvar={bosituasjon.delerBoligMedAndreVoksne.verdi}
          settSpørsmålOgSvar={settBosituasjonFelt}
        />
        {valgtSvar && valgtSvar.alert_tekstid && (
          <FeltGruppe>
            {bosituasjon.delerBoligMedAndreVoksne.svarid ===
            ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse ? (
              <AlertStripeDokumentasjon>
                <FormattedHTMLMessage id={valgtSvar.alert_tekstid} />
              </AlertStripeDokumentasjon>
            ) : (
              <AlertStripe type={'advarsel'} form={'inline'}>
                <LocaleTekst tekst={valgtSvar.alert_tekstid} />
              </AlertStripe>
            )}
          </FeltGruppe>
        )}
      </SeksjonGruppe>

      {planerOmÅFlytteSammenEllerFåSamboer && (
        <SeksjonGruppe>
          <SøkerSkalFlytteSammenEllerFåSamboer
            settBosituasjon={settBosituasjon}
            bosituasjon={bosituasjon}
            settDokumentasjonsbehov={settDokumentasjonsbehov}
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
    </>
  );
};

export default BosituasjonSpørsmål;
