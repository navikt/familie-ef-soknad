import React from 'react';
import Banner from '../../components/Banner';
import classNames from 'classnames';
import LocaleTekst from '../../language/LocaleTekst';
import Stegindikator from 'nav-frontend-stegindikator';
import { RoutesArbeidssokerskjema } from '../routes/routesArbeidssokerskjema';
import { useLocation, useNavigate } from 'react-router-dom';
import { hentForrigeRoute, hentNesteRoute } from '../../utils/routing';
import { useLokalIntlContext } from '../../context/LokalIntlContext';
import { Button, Panel, Heading, BodyShort } from '@navikt/ds-react';

interface ISide {
  tittel: string;
  erSpørsmålBesvart?: boolean;
  skalViseKnapper: boolean;
  children?: React.ReactNode;
}

const Side: React.FC<ISide> = ({
  tittel,
  children,
  skalViseKnapper,
  erSpørsmålBesvart,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const intl = useLokalIntlContext();

  const routes = Object.values(RoutesArbeidssokerskjema);
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
  const nesteRoute = hentNesteRoute(
    RoutesArbeidssokerskjema,
    location.pathname
  );
  const forrigeRoute = hentForrigeRoute(
    RoutesArbeidssokerskjema,
    location.pathname
  );
  const nesteKnappStyling = classNames('neste', {
    hideButton: nesteRoute === undefined,
  });

  return (
    <div className={'skjema'}>
      <Banner tekstid={'banner.tittel.arbeidssøker'} />
      <div className={'side'}>
        <Stegindikator
          autoResponsiv={true}
          aktivtSteg={aktivtSteg}
          steg={stegobjekter}
        />
        <Panel className={'side__innhold'}>
          <div className={'innholdscontainer'}>
            <Heading size="medium">{tittel}</Heading>
            {children}
          </div>
        </Panel>
        {skalViseKnapper && (
          <>
            {!erSpørsmålBesvart && (
              <BodyShort className={'side__uu-tekst'}>
                {intl.formatMessage({ id: 'knapp.uu-tekst' })}
              </BodyShort>
            )}
            <div
              className={
                erSpørsmålBesvart ? 'side__knapper treKnapper' : 'side__knapper'
              }
            >
              <Button
                className={'tilbake'}
                variant="primary"
                onClick={() => navigate(forrigeRoute.path)}
              >
                <LocaleTekst tekst={'knapp.tilbake'} />
              </Button>
              {erSpørsmålBesvart && (
                <Button
                  variant="secondary"
                  onClick={() => navigate(nesteRoute.path)}
                  className={nesteKnappStyling}
                >
                  <LocaleTekst tekst={'knapp.neste'} />
                </Button>
              )}

              <Button
                className={'avbryt'}
                variant="tertiary"
                onClick={() => navigate(RoutesArbeidssokerskjema[0].path)}
              >
                <LocaleTekst tekst={'knapp.avbryt'} />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Side;
