import React, { FC, useEffect } from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { useLocation } from 'react-router-dom';
import {
  erStegFerdigUtfylt,
  erSøknadsBegrunnelseBesvart,
  harSøkerTlfnr,
} from '../../../helpers/steg/omdeg';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import { IMedlemskap } from '../../../models/steg/omDeg/medlemskap';
import Medlemskap from '../../../søknad/steg/1-omdeg/medlemskap/Medlemskap';
import Personopplysninger from '../../../søknad/steg/1-omdeg/personopplysninger/Personopplysninger';
import { ISøker } from '../../../models/søknad/person';
import { ISpørsmålBooleanFelt } from '../../../models/søknad/søknadsfelter';
import Sivilstatus from '../../../søknad/steg/1-omdeg/sivilstatus/Sivilstatus';
import { ISivilstatus } from '../../../models/steg/omDeg/sivilstatus';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';
import { hentPathBarnetilsynOppsummering } from '../../utils';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { LocationStateSøknad } from '../../../models/søknad/søknad';
import Show from '../../../utils/showIf';
import { logEvent } from '../../../utils/amplitude';

const OmDeg: FC<{ intl: IntlShape }> = ({ intl }) => {
  useEffect(() => {
    logEvent('sidevisning', {
      side: 'OmDeg',
      team: 'familie',
      app: 'BT-soknadsdialog',
    });
  }, []);

  const location = useLocation<LocationStateSøknad>();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;
  const {
    søknad,
    mellomlagreBarnetilsyn,
    settSøknad,
    settDokumentasjonsbehov,
  } = useBarnetilsynSøknad();

  const {
    harSøktSeparasjon,
    datoSøktSeparasjon,
    datoFlyttetFraHverandre,
  } = søknad.sivilstatus;

  const settMedlemskap = (medlemskap: IMedlemskap) => {
    settSøknad((prevSoknad) => {
      return {
        ...prevSoknad,
        medlemskap: medlemskap,
      };
    });
  };

  const settSøker = (søker: ISøker) => {
    settSøknad((prevSoknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, søker: søker },
      };
    });
  };

  const settSøkerBorPåRegistrertAdresse = (
    søkerBorPåRegistrertAdresse: ISpørsmålBooleanFelt
  ) => {
    settSøknad((prevSoknad) => {
      return {
        ...prevSoknad,
        søkerBorPåRegistrertAdresse: søkerBorPåRegistrertAdresse,
        sivilstatus: {},
        medlemskap: {},
        person: {
          ...prevSoknad.person,
          søker: { ...prevSoknad.person.søker, kontakttelefon: '' },
        },
      };
    });
  };

  const settSivilstatus = (sivilstatus: ISivilstatus) => {
    settSøknad((prevSoknad) => {
      return {
        ...prevSoknad,
        sivilstatus: sivilstatus,
      };
    });
  };

  const erAlleSpørsmålBesvart = erStegFerdigUtfylt(
    søknad.person,
    søknad.sivilstatus,
    søknad.medlemskap
  );

  const søkerBorPåRegistrertAdresseOgHarTlfNr =
    søknad.søkerBorPåRegistrertAdresse &&
    søknad.søkerBorPåRegistrertAdresse.verdi === true &&
    harSøkerTlfnr(søknad.person);

  const harFylltUtSeparasjonSpørsmålet =
    harSøktSeparasjon !== undefined
      ? harSøktSeparasjon.verdi
        ? datoSøktSeparasjon && datoFlyttetFraHverandre
        : true
      : false;

  return (
    <Side
      stønadstype={Stønadstype.barnetilsyn}
      stegtittel={intl.formatMessage({ id: 'stegtittel.omDeg' })}
      erSpørsmålBesvart={erAlleSpørsmålBesvart}
      skalViseKnapper={skalViseKnapper}
      routesStønad={RoutesBarnetilsyn}
      mellomlagreStønad={mellomlagreBarnetilsyn}
      tilbakeTilOppsummeringPath={hentPathBarnetilsynOppsummering}
    >
      <Personopplysninger
        søker={søknad.person.søker}
        settSøker={settSøker}
        søkerBorPåRegistrertAdresse={søknad.søkerBorPåRegistrertAdresse}
        settSøkerBorPåRegistrertAdresse={settSøkerBorPåRegistrertAdresse}
        stønadstype={Stønadstype.barnetilsyn}
      />

      <Show if={søkerBorPåRegistrertAdresseOgHarTlfNr}>
        <Sivilstatus
          sivilstatus={søknad.sivilstatus}
          settSivilstatus={settSivilstatus}
          settDokumentasjonsbehov={settDokumentasjonsbehov}
          settMedlemskap={settMedlemskap}
        />

        <Show
          if={
            harFylltUtSeparasjonSpørsmålet ||
            erSøknadsBegrunnelseBesvart(søknad.sivilstatus)
          }
        >
          <Medlemskap
            medlemskap={søknad.medlemskap}
            settMedlemskap={settMedlemskap}
          />
        </Show>
      </Show>
    </Side>
  );
};

export default injectIntl(OmDeg);
