import React, { useEffect, useState } from 'react';
import Feilside from '../components/feil/Feilside';
import hentToggles from '../toggles/api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import TestsideInformasjon from '../components/TestsideInformasjon';
import { hentPersonData } from '../utils/søknad';
import { PersonActionTypes, usePersonContext } from '../context/PersonContext';
import { Switch, Route } from 'react-router-dom';
import { ToggleName } from '../models/toggles';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from '../utils/autentisering';
import mockPersonMedBarn from '../mock/mockPerson.json';
import mockPersonUtenBarn from '../mock/mockPersonUtenBarn.json';
import mockToggles from '../mock/mockToggles.json';
import { settLabelOgVerdi } from '../utils/søknad';
import { standardLabelsBarn } from '../helpers/labels';
import { useBarnetilsynSøknad } from './BarnetilsynContext';
import { useToggles } from '../context/TogglesContext';
import { IPerson } from '../models/person';
import { Helmet } from 'react-helmet';
import { erLokaltMedMock } from '../utils/miljø';
import SøknadsdialogBarnetilsyn from './Søknadsdialog';

const BarnetilsynApp = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const { settPerson } = usePersonContext();
  const {
    søknad,
    settSøknad,
    hentMellomlagretBarnetilsyn,
  } = useBarnetilsynSøknad();
  const { settToggles, toggles } = useToggles();

  autentiseringsInterceptor();

  useEffect(() => {
    verifiserAtBrukerErAutentisert(settAutentisering);
  }, [autentisert]);

  const fetchPersonData = () => {
    return hentPersonData()
      .then((response) => {
        settPerson({
          type: PersonActionTypes.HENT_PERSON,
          payload: response,
        });
        oppdaterSøknadMedBarn(response, response.barn);
      })
      .catch(() => settError(true));
  };

  const oppdaterSøknadMedBarn = (person: IPerson, barneliste: any[]) => {
    const barnMedLabels = barneliste.map((barn: any) => {
      const barnMedLabel = settLabelOgVerdi(barn, standardLabelsBarn);
      barnMedLabel['ident'] = barnMedLabel['fnr'];
      delete barnMedLabel.fnr;
      return barnMedLabel;
    });

    settSøknad &&
      settSøknad({ ...søknad, person: { ...person, barn: barnMedLabels } });
  };

  const fetchToggles = () => {
    return hentToggles(settToggles).catch((err: Error) => {
      settError(true);
    });
  };

  useEffect(() => {
    if (erLokaltMedMock()) {
      settPerson({
        type: PersonActionTypes.HENT_PERSON,
        payload: mockPersonUtenBarn,
      });
      oppdaterSøknadMedBarn(mockPersonUtenBarn, mockPersonMedBarn.barn);
      settToggles(mockToggles);
      settFetching(false);
      return;
    }
    Promise.all([
      fetchToggles(),
      fetchPersonData(),
      hentMellomlagretBarnetilsyn(),
    ])
      .then(() => settFetching(false))
      .catch(() => settFetching(false));
    // eslint-disable-next-line
  }, []);

  if (!fetching && autentisert) {
    if (!error) {
      return (
        <>
          <Helmet>
            <title>Søknad om barnetilsyn</title>
          </Helmet>

          {!toggles[ToggleName.send_barnetilsyn_søknad] && (
            <TestsideInformasjon />
          )}
          <Switch>
            <Route path={'/'}>
              {toggles[ToggleName.vis_innsending] && (
                <SøknadsdialogBarnetilsyn />
              )}
            </Route>
          </Switch>
        </>
      );
    } else if (error) {
      return <Feilside />;
    } else {
      return <NavFrontendSpinner className="spinner" />;
    }
  } else {
    return <NavFrontendSpinner className="spinner" />;
  }
};

export default BarnetilsynApp;
