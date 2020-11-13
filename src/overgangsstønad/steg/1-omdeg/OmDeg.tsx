import React, { FC } from 'react';
import Medlemskap from '../../../søknad/steg/1-omdeg/medlemskap/Medlemskap';
import Personopplysninger from '../../../søknad/steg/1-omdeg/personopplysninger/Personopplysninger';
import Sivilstatus from '../../../søknad/steg/1-omdeg/sivilstatus/Sivilstatus';
import { useSøknad } from '../../../context/SøknadContext';
import { useLocation } from 'react-router-dom';
import { logSidevisningOvergangsstonad } from '../../../utils/amplitude';
import {
  erStegFerdigUtfylt,
  erSøknadsBegrunnelseBesvart,
  harSøkerTlfnr,
} from '../../../helpers/steg/omdeg';
import { IMedlemskap } from '../../../models/steg/omDeg/medlemskap';
import { ISøker } from '../../../models/søknad/person';
import { ISpørsmålBooleanFelt } from '../../../models/søknad/søknadsfelter';
import { ISivilstatus } from '../../../models/steg/omDeg/sivilstatus';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesOvergangsstonad } from '../../routing/routesOvergangsstonad';
import { hentPathOvergangsstønadOppsummering } from '../../utils';
import { useIntl } from 'react-intl';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { LocationStateSøknad } from '../../../models/søknad/søknad';
import Show from '../../../utils/showIf';
import { useMount } from '../../../utils/hooks';

const OmDeg: FC = () => {
  const intl = useIntl();
  const location = useLocation<LocationStateSøknad>();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;
  const {
    søknad,
    mellomlagreOvergangsstønad,
    settSøknad,
    settDokumentasjonsbehov,
  } = useSøknad();

  const {
    harSøktSeparasjon,
    datoSøktSeparasjon,
    datoFlyttetFraHverandre,
  } = søknad.sivilstatus;

  useMount(() => logSidevisningOvergangsstonad('OmDeg'));

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
        søkerBorPåRegistrertAdresse,
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
        sivilstatus,
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

  const skallViseMedlemskapDialog =
    harFylltUtSeparasjonSpørsmålet ||
    erSøknadsBegrunnelseBesvart(søknad.sivilstatus);

  return (
    <Side
      stønadstype={Stønadstype.overgangsstønad}
      stegtittel={intl.formatMessage({ id: 'stegtittel.omDeg' })}
      erSpørsmålBesvart={erAlleSpørsmålBesvart}
      skalViseKnapper={skalViseKnapper}
      routesStønad={RoutesOvergangsstonad}
      mellomlagreStønad={mellomlagreOvergangsstønad}
      tilbakeTilOppsummeringPath={hentPathOvergangsstønadOppsummering}
    >
      <Personopplysninger
        søker={søknad.person.søker}
        settSøker={settSøker}
        søkerBorPåRegistrertAdresse={søknad.søkerBorPåRegistrertAdresse}
        settSøkerBorPåRegistrertAdresse={settSøkerBorPåRegistrertAdresse}
        stønadstype={Stønadstype.overgangsstønad}
      />
      <Show if={søkerBorPåRegistrertAdresseOgHarTlfNr}>
        <Sivilstatus
          sivilstatus={søknad.sivilstatus}
          settSivilstatus={settSivilstatus}
          settDokumentasjonsbehov={settDokumentasjonsbehov}
          settMedlemskap={settMedlemskap}
        />
        <Show if={skallViseMedlemskapDialog}>
          <Medlemskap
            medlemskap={søknad.medlemskap}
            settMedlemskap={settMedlemskap}
          />
        </Show>
      </Show>
    </Side>
  );
};

export default OmDeg;
