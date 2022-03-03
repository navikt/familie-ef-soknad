import React, { FC } from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { useLocation } from 'react-router-dom';
import {
  erStegFerdigUtfylt,
  erSøknadsBegrunnelseBesvart,
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
import Show from '../../../utils/showIf';
import { logSidevisningBarnetilsyn } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { ISøknad } from '../../models/søknad';
import { erGyldigDato } from '../../../utils/dato';
import { kommerFraOppsummeringen } from '../../../utils/locationState';

const OmDeg: FC<{ intl: IntlShape }> = ({ intl }) => {
  useMount(() => logSidevisningBarnetilsyn('OmDeg'));

  const location = useLocation();
  const kommerFraOppsummering = kommerFraOppsummeringen(location.state);
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;
  const {
    søknad,
    mellomlagreBarnetilsyn,
    settSøknad,
    settDokumentasjonsbehov,
  } = useBarnetilsynSøknad();

  const { harSøktSeparasjon, datoSøktSeparasjon, datoFlyttetFraHverandre } =
    søknad.sivilstatus;

  const settMedlemskap = (medlemskap: IMedlemskap) => {
    settSøknad((prevSoknad: ISøknad) => {
      return {
        ...prevSoknad,
        medlemskap: medlemskap,
      };
    });
  };

  const settSøker = (søker: ISøker) => {
    settSøknad((prevSoknad: ISøknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, søker: søker },
      };
    });
  };

  const settSøkerBorPåRegistrertAdresse = (
    søkerBorPåRegistrertAdresse: ISpørsmålBooleanFelt
  ) => {
    settSøknad((prevSoknad: ISøknad) => {
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
    settSøknad((prevSoknad: ISøknad) => {
      return {
        ...prevSoknad,
        sivilstatus: sivilstatus,
      };
    });
  };

  const erAlleSpørsmålBesvart = erStegFerdigUtfylt(
    søknad.sivilstatus,
    søknad.medlemskap
  );

  const søkerBorPåRegistrertAdresse =
    søknad.søkerBorPåRegistrertAdresse &&
    søknad.søkerBorPåRegistrertAdresse.verdi === true;

  const harFyltUtSeparasjonSpørsmålet =
    harSøktSeparasjon !== undefined
      ? harSøktSeparasjon.verdi
        ? erGyldigDato(datoSøktSeparasjon?.verdi) &&
          erGyldigDato(datoFlyttetFraHverandre?.verdi)
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

      <Show if={søkerBorPåRegistrertAdresse}>
        <Sivilstatus
          sivilstatus={søknad.sivilstatus}
          settSivilstatus={settSivilstatus}
          settDokumentasjonsbehov={settDokumentasjonsbehov}
          settMedlemskap={settMedlemskap}
        />

        <Show
          if={
            harFyltUtSeparasjonSpørsmålet ||
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
