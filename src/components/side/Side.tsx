import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import Banner from '../../components/Banner';
import { Panel } from 'nav-frontend-paneler';
import { useHistory, useLocation } from 'react-router-dom';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import SendBrevSVG from '../../assets/SendSøknadSVG';
import { hentTekst } from '../../utils/søknad';
import { useIntl } from 'react-intl';
import TilbakeNesteAvbrytKnapper from '../../components/knapper/TilbakeNesteAvbrytKnapper';
import { IRoute } from '../../models/routes';
import { Stønadstype } from '../../models/søknad/stønadstyper';
import { hentBannertittel } from '../../utils/stønadstype';
import { LocationStateSøknad } from '../../models/søknad/søknad';
import LocaleTekst from '../../language/LocaleTekst';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

export enum ESide {
  visTilbakeNesteAvbrytKnapp = 'visTilbakeNesteAvbrytKnapp',
  visTilbakeTilOppsummeringKnapp = 'visTilbakeTilOppsummeringKnapp',
  skjulKnapper = 'skjulKnapper',
}

interface ISide {
  stønadstype: Stønadstype;
  stegtittel: string;
  routesStønad: IRoute[];
  skalViseKnapper: ESide;
  erSpørsmålBesvart?: boolean;
  mellomlagreStønad?: (steg: string) => void;
  tilbakeTilOppsummeringPath?: string;
  informasjonstekstId?: string;
}

const Side: React.FC<ISide> = ({
  stønadstype,
  stegtittel,
  children,
  routesStønad,
  erSpørsmålBesvart,
  skalViseKnapper,
  mellomlagreStønad,
  tilbakeTilOppsummeringPath,
  informasjonstekstId,
}) => {
  const intl = useIntl();
  const location = useLocation<LocationStateSøknad>();
  const history = useHistory();

  const routes = Object.values(routesStønad);
  routes.shift();
  const stegobjekter = routes.map((steg, index) => {
    return {
      ...steg,
      index: index,
    };
  });
  const aktivtSteg = stegobjekter.findIndex(
    (steg) => steg.path === location.pathname
  );

  return (
    <div className={'søknadsdialog'}>
      <Banner tekstid={hentBannertittel(stønadstype)} />
      <div className={'side'}>
        <Stegindikator
          autoResponsiv={true}
          aktivtSteg={aktivtSteg}
          steg={stegobjekter}
        />
        {!skalViseKnapper && (
          <div className={'brev_ikon'}>
            <SendBrevSVG />
          </div>
        )}

        <Panel className={'side__innhold'}>
          <div className={'innholdscontainer'}>
            <Systemtittel>{stegtittel}</Systemtittel>
            {children}
          </div>
        </Panel>

        {skalViseKnapper === ESide.visTilbakeNesteAvbrytKnapp ? (
          <>
            <Normaltekst className={'side__uu-tekst'}>
              {intl.formatMessage({ id: 'knapp.uu-tekst' })}
            </Normaltekst>
            <TilbakeNesteAvbrytKnapper
              routesStønad={routesStønad}
              erSpørsmålBesvart={erSpørsmålBesvart}
              mellomlagreStønad={mellomlagreStønad}
            />
          </>
        ) : skalViseKnapper === ESide.visTilbakeTilOppsummeringKnapp ? (
          erSpørsmålBesvart && (
            <>
              <Normaltekst>
                {intl.formatMessage({ id: 'knapp.uu-tekst' })}
              </Normaltekst>
              <Hovedknapp
                className="tilbake-til-oppsummering"
                onClick={() => {
                  if (mellomlagreStønad) {
                    mellomlagreStønad(location.pathname);
                  }
                  history.push({
                    pathname: tilbakeTilOppsummeringPath,
                  });
                }}
              >
                {hentTekst('oppsummering.tilbake', intl)}
              </Hovedknapp>
            </>
          )
        ) : null}
        {informasjonstekstId && (
          <AlertStripeInfo className="side__informasjon" form="inline">
            <LocaleTekst tekst={informasjonstekstId} />
          </AlertStripeInfo>
        )}
      </div>
    </div>
  );
};

export default Side;
