import React, { FC } from 'react';
import Medlemskap from '../../../søknad/steg/1-omdeg/medlemskap/Medlemskap';
import Personopplysninger from '../../../søknad/steg/1-omdeg/personopplysninger/Personopplysninger';
import Sivilstatus from '../../../søknad/steg/1-omdeg/sivilstatus/Sivilstatus';
import { IntlShape, injectIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import { useLocation } from 'react-router-dom';
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

const OmDeg: FC<{ intl: IntlShape }> = ({ intl }) => {
  const location = useLocation();
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
  const { harSøktSeparasjon } = søknad.sivilstatus;

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

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.omDeg' })}
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
      />

      {søknad.søkerBorPåRegistrertAdresse &&
        søknad.søkerBorPåRegistrertAdresse.verdi === true &&
        harSøkerTlfnr(søknad.person) && (
          <>
            <Sivilstatus
              sivilstatus={søknad.sivilstatus}
              settSivilstatus={settSivilstatus}
              settDokumentasjonsbehov={settDokumentasjonsbehov}
            />

            {harSøktSeparasjon ||
            harSøktSeparasjon === false ||
            erSøknadsBegrunnelseBesvart(søknad.sivilstatus) ? (
              <Medlemskap
                medlemskap={søknad.medlemskap}
                settMedlemskap={settMedlemskap}
              />
            ) : null}
          </>
        )}
    </Side>
  );
};

export default injectIntl(OmDeg);
