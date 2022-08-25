import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import Banner from '../../components/Banner';
import { useLocation, useNavigate } from 'react-router-dom';
import SendBrevSVG from '../../assets/SendSøknadSVG';
import { hentTekst } from '../../utils/søknad';
import TilbakeNesteAvbrytKnapper from '../../components/knapper/TilbakeNesteAvbrytKnapper';
import { IRoute } from '../../models/routes';
import { Stønadstype } from '../../models/søknad/stønadstyper';
import { hentBannertittel } from '../../utils/stønadstype';
import LocaleTekst from '../../language/LocaleTekst';
import { useLokalIntlContext } from '../../context/LokalIntlContext';
import { Panel, Alert, Button, BodyShort, Heading } from '@navikt/ds-react';

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
  disableNesteKnapp?: boolean;
  children?: React.ReactNode;
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
  disableNesteKnapp,
}) => {
  const intl = useLokalIntlContext();
  const location = useLocation();
  const navigate = useNavigate();

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
            <Heading size="medium">{stegtittel}</Heading>
            {children}
          </div>
        </Panel>

        {informasjonstekstId && (
          <Alert
            size="small"
            variant="info"
            className="side__informasjon"
            inline
          >
            <LocaleTekst tekst={informasjonstekstId} />
          </Alert>
        )}

        {skalViseKnapper === ESide.visTilbakeNesteAvbrytKnapp ? (
          <>
            {!erSpørsmålBesvart && (
              <BodyShort size="small" className={'side__uu-tekst'}>
                {intl.formatMessage({ id: 'knapp.uu-tekst' })}
              </BodyShort>
            )}
            <TilbakeNesteAvbrytKnapper
              routesStønad={routesStønad}
              erSpørsmålBesvart={erSpørsmålBesvart}
              mellomlagreStønad={mellomlagreStønad}
              disableNesteKnapp={disableNesteKnapp}
            />
          </>
        ) : skalViseKnapper === ESide.visTilbakeTilOppsummeringKnapp ? (
          erSpørsmålBesvart && (
            <>
              <BodyShort size="small">
                {intl.formatMessage({ id: 'knapp.uu-tekst' })}
              </BodyShort>
              <Button
                variant="primary"
                className="tilbake-til-oppsummering"
                onClick={() => {
                  if (mellomlagreStønad) {
                    mellomlagreStønad(location.pathname);
                  }
                  navigate({
                    pathname: tilbakeTilOppsummeringPath,
                  });
                }}
              >
                {hentTekst('oppsummering.tilbake', intl)}
              </Button>
            </>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Side;
