import React, { FC } from 'react';
import Medlemskap from '../../../søknad/steg/1-omdeg/medlemskap/Medlemskap';
import Personopplysninger from '../../../søknad/steg/1-omdeg/personopplysninger/Personopplysninger';
import Side from '../../side/Side';
import Sivilstatus from '../../../søknad/steg/1-omdeg/sivilstatus/Sivilstatus';
import { IntlShape, injectIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { hentTekst } from '../../../utils/søknad';
import {
  erSøknadsBegrunnelseBesvart,
  harSøkerTlfnr,
} from '../../../helpers/omdeg';
import { IMedlemskap } from '../../../models/steg/omDeg/medlemskap';
import { ISøker } from '../../../models/søknad/person';
import { ISpørsmålBooleanFelt } from '../../../models/søknad/søknadsfelter';
import { ISivilstatus } from '../../../models/steg/omDeg/sivilstatus';

const OmDeg: FC<{ intl: IntlShape }> = ({ intl }) => {
  const {
    søknad,
    mellomlagreOvergangsstønad,
    settSøknad,
    settDokumentasjonsbehov,
  } = useSøknad();
  const { harSøktSeparasjon } = søknad.sivilstatus;
  const {
    søkerBosattINorgeSisteTreÅr,
    perioderBoddIUtlandet,
  } = søknad.medlemskap;
  const location = useLocation();
  const history = useHistory();

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

  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  const søkerFyltUtAlleFelterOgSpørsmål = () => {
    if (søkerBosattINorgeSisteTreÅr?.verdi === false) {
      const harFelterUtenUtfyltBegrunnelse = perioderBoddIUtlandet?.some(
        (utenlandsopphold) =>
          utenlandsopphold.begrunnelse.verdi === '' ||
          !utenlandsopphold.begrunnelse
      );
      return harFelterUtenUtfyltBegrunnelse ? false : true;
    } else if (søkerBosattINorgeSisteTreÅr?.verdi) return true;
    else return false;
  };

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.omDeg' })}
      erSpørsmålBesvart={søkerFyltUtAlleFelterOgSpørsmål()}
      skalViseKnapper={!kommerFraOppsummering}
      mellomlagreOvergangsstønad={mellomlagreOvergangsstønad}
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

      {kommerFraOppsummering && søkerFyltUtAlleFelterOgSpørsmål() ? (
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

export default injectIntl(OmDeg);
