import React, { FC } from 'react';
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
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { ESvar } from '../../../models/felles/spørsmålogsvar';
import { erSøkerGift } from '../../../utils/sivilstatus';

const OmDeg: FC = () => {
  useMount(() => logSidevisningBarnetilsyn('OmDeg'));
  const intl = useLokalIntlContext();
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
  const { sivilstatus, medlemskap } = søknad;
  const { harSøktSeparasjon, datoSøktSeparasjon, datoFlyttetFraHverandre } =
    sivilstatus;

  const settMedlemskap = (medlemskap: IMedlemskap) => {
    settSøknad((prevSoknad: ISøknad) => {
      return {
        ...prevSoknad,
        medlemskap:
          Object.keys(medlemskap).length !== 0
            ? medlemskap
            : prevSoknad.medlemskap,
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
        adresseopplysninger: undefined,
        søkerBorPåRegistrertAdresse: søkerBorPåRegistrertAdresse,
      };
    });
  };

  const settHarMeldtAdresseendring = (
    harMeldtAdresseendring: ISpørsmålBooleanFelt
  ) => {
    settSøknad((prevSøknad: ISøknad) => ({
      ...prevSøknad,
      adresseopplysninger: {
        ...prevSøknad.adresseopplysninger,
        harMeldtAdresseendring,
      },
    }));
  };

  const settSivilstatus = (sivilstatus: ISivilstatus) => {
    settSøknad((prevSoknad: ISøknad) => {
      return {
        ...prevSoknad,
        sivilstatus: sivilstatus,
      };
    });
  };

  const harSvartPåUformeltGift =
    sivilstatus.erUformeltGift?.svarid === ESvar.JA ||
    sivilstatus.erUformeltGift?.svarid === ESvar.NEI;

  const erAlleSpørsmålBesvart = erStegFerdigUtfylt(sivilstatus, medlemskap);

  const søkerBorPåRegistrertAdresseEllerHarMeldtAdresseendring =
    søknad.person.søker.erStrengtFortrolig ||
    søknad.søkerBorPåRegistrertAdresse?.verdi === true ||
    søknad.adresseopplysninger?.harMeldtAdresseendring?.verdi === true;

  const harFyltUtSeparasjonSpørsmålet = harSøktSeparasjon?.verdi
    ? harSøktSeparasjon.verdi
      ? erGyldigDato(datoSøktSeparasjon?.verdi) &&
        erGyldigDato(datoFlyttetFraHverandre?.verdi)
      : true
    : false;

  const erSeparasjonSpørsmålBesvart = (sivilstatus: ISivilstatus) => {
    return (
      (sivilstatus.harSøktSeparasjon?.verdi &&
        erGyldigDato(sivilstatus.datoSøktSeparasjon?.verdi)) ||
      sivilstatus.harSøktSeparasjon?.verdi === false
    );
  };

  console.log(
    'erGyldigDato(datoSøktSeparasjon?.verdi) && erGyldigDato(datoFlyttetFraHverandre?.verdi): ',
    erGyldigDato(datoSøktSeparasjon?.verdi) &&
      erGyldigDato(datoFlyttetFraHverandre?.verdi)
  );

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
        settDokumentasjonsbehov={settDokumentasjonsbehov}
        søkerBorPåRegistrertAdresse={søknad.søkerBorPåRegistrertAdresse}
        settSøkerBorPåRegistrertAdresse={settSøkerBorPåRegistrertAdresse}
        harMeldtAdresseendring={
          søknad.adresseopplysninger?.harMeldtAdresseendring
        }
        settHarMeldtAdresseendring={settHarMeldtAdresseendring}
        stønadstype={Stønadstype.barnetilsyn}
      />

      <Show if={søkerBorPåRegistrertAdresseEllerHarMeldtAdresseendring}>
        <Sivilstatus
          sivilstatus={søknad.sivilstatus}
          settSivilstatus={settSivilstatus}
          settDokumentasjonsbehov={settDokumentasjonsbehov}
          settMedlemskap={settMedlemskap}
        />

        <Show
          if={
            (harFyltUtSeparasjonSpørsmålet && harSvartPåUformeltGift) ||
            (erSøknadsBegrunnelseBesvart(sivilstatus) &&
              harSvartPåUformeltGift) ||
            (erSøkerGift(søknad.person.søker.sivilstand) &&
              erSeparasjonSpørsmålBesvart(sivilstatus) &&
              erSøknadsBegrunnelseBesvart(sivilstatus))
          }
        >
          <Medlemskap medlemskap={medlemskap} settMedlemskap={settMedlemskap} />
        </Show>
      </Show>
    </Side>
  );
};

export default OmDeg;
