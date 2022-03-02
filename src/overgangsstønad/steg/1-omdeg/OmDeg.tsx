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
import { ISøknad } from '../../../models/søknad/søknad';
import Show from '../../../utils/showIf';
import { useMount } from '../../../utils/hooks';
import { kommerFraOppsummeringen } from '../../../utils/locationState';

const OmDeg: FC = () => {
  const intl = useIntl();
  const location = useLocation();
  const kommerFraOppsummering = kommerFraOppsummeringen(location.state);
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;
  const {
    søknad,
    mellomlagreOvergangsstønad,
    settSøknad,
    settDokumentasjonsbehov,
  } = useSøknad();

  const { harSøktSeparasjon, datoSøktSeparasjon, datoFlyttetFraHverandre } =
    søknad.sivilstatus;

  useMount(() => logSidevisningOvergangsstonad('OmDeg'));

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
    settSøknad((prevSoknad: ISøknad) => {
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

  const søkerBorPåRegistrertAdresse =
    søknad.søkerBorPåRegistrertAdresse &&
    søknad.søkerBorPåRegistrertAdresse.verdi === true;

  const harFyltUtSeparasjonSpørsmålet =
    harSøktSeparasjon !== undefined
      ? harSøktSeparasjon.verdi
        ? datoSøktSeparasjon && datoFlyttetFraHverandre
        : true
      : false;

  const skalViseMedlemskapDialog =
    harFyltUtSeparasjonSpørsmålet ||
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
      <Show if={søkerBorPåRegistrertAdresse}>
        <Sivilstatus
          sivilstatus={søknad.sivilstatus}
          settSivilstatus={settSivilstatus}
          settDokumentasjonsbehov={settDokumentasjonsbehov}
          settMedlemskap={settMedlemskap}
        />
        <Show if={skalViseMedlemskapDialog}>
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
