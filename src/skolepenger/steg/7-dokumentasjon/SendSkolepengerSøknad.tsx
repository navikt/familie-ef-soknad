import React, { FC } from 'react';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../../language/LocaleTekst';
import { IStatus } from '../../../arbeidssøkerskjema/innsending/typer';
import { parseISO } from 'date-fns';
import { useHistory, useLocation } from 'react-router';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { StyledKnapper } from '../../../arbeidssøkerskjema/komponenter/StyledKnapper';
import { ERouteSkolepenger, RoutesSkolepenger } from '../../routing/routes';
import {
  mapBarnTilEntenIdentEllerFødselsdato,
  mapBarnUtenBarnepass,
  sendInnSkolepengerSøknad,
} from '../../../innsending/api';
import {
  hentForrigeRoute,
  hentNesteRoute,
  hentPath,
} from '../../../utils/routing';
import { unikeDokumentasjonsbehov } from '../../../utils/søknad';
import { ISøknad } from '../../models/søknad';
import { useSkolepengerSøknad } from '../../SkolepengerContext';
import { LocationStateSøknad } from '../../../models/søknad/søknad';
import {
  logDokumetasjonsbehov,
  logInnsendingFeilet,
} from '../../../utils/amplitude';
import { ESkjemanavn, skjemanavnIdMapping } from '../../../utils/skjemanavn';
import { Link } from 'react-router-dom';
import {
  ERouteOvergangsstønad,
  RoutesOvergangsstonad,
} from '../../../overgangsstønad/routing/routesOvergangsstonad';

interface Innsending {
  status: string;
  melding: string;
  venter: boolean;
}

const validerSøkerBosattINorgeSisteTreÅr = (søknad: ISøknad) => {
  return søknad.medlemskap.søkerBosattINorgeSisteTreÅr;
};

const SendSøknadKnapper: FC = () => {
  const { søknad, settSøknad } = useSkolepengerSøknad();
  const location = useLocation<LocationStateSøknad>();
  const history = useHistory();
  const nesteRoute = hentNesteRoute(RoutesSkolepenger, location.pathname);
  const forrigeRoute = hentForrigeRoute(RoutesSkolepenger, location.pathname);
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Skolepenger];

  const [innsendingState, settinnsendingState] = React.useState<Innsending>({
    status: IStatus.KLAR_TIL_INNSENDING,
    melding: `Søknad kan sendes`,
    venter: false,
  });

  const sendSøknad = (søknad: ISøknad) => {
    const barnMedEntenIdentEllerFødselsdato = mapBarnUtenBarnepass(
      mapBarnTilEntenIdentEllerFødselsdato(søknad.person.barn)
    );
    const dokumentasjonsbehov = søknad.dokumentasjonsbehov.filter(
      unikeDokumentasjonsbehov
    );

    logDokumetasjonsbehov(dokumentasjonsbehov, ESkjemanavn.Skolepenger);

    const søknadMedFiltrerteBarn: ISøknad = {
      ...søknad,
      person: { ...søknad.person, barn: barnMedEntenIdentEllerFødselsdato },
      dokumentasjonsbehov: dokumentasjonsbehov,
    };

    settinnsendingState({ ...innsendingState, venter: true });
    sendInnSkolepengerSøknad(søknadMedFiltrerteBarn)
      .then((kvittering) => {
        settinnsendingState({
          ...innsendingState,
          status: IStatus.SUKSESS,
          melding: `Vi har kontakt: ${kvittering.text}`,
          venter: false,
        });
        settSøknad({
          ...søknad,
          innsendingsdato: parseISO(kvittering.mottattDato),
        });
        history.push(nesteRoute.path);
      })
      .catch((e) => {
        settinnsendingState({
          ...innsendingState,
          status: IStatus.FEILET,
          melding: `Noe gikk galt: ${e}`,
          venter: false,
        });

        logInnsendingFeilet(ESkjemanavn.Skolepenger, skjemaId, e);
      });
  };

  return (
    <>
      {innsendingState.status === IStatus.FEILET && (
        <KomponentGruppe>
          <AlertStripe type={'advarsel'} form={'inline'}>
            <Normaltekst>{innsendingState.melding}</Normaltekst>
          </AlertStripe>
        </KomponentGruppe>
      )}
      {!validerSøkerBosattINorgeSisteTreÅr(søknad) && (
        <KomponentGruppe>
          <AlertStripe type={'advarsel'} form={'inline'}>
            <LocaleTekst tekst="dokumentasjon.alert.gåTilbake" />{' '}
            <Link
              to={{
                pathname: hentPath(RoutesSkolepenger, ERouteSkolepenger.OmDeg),
                state: { kommerFraOppsummering: true },
              }}
            >
              <LocaleTekst tekst="dokumentasjon.alert.link.fylleInn" />
            </Link>
            <LocaleTekst tekst="dokumentasjon.alert.manglende" />
          </AlertStripe>
        </KomponentGruppe>
      )}
      <SeksjonGruppe className={'sentrert'}>
        <StyledKnapper>
          <KnappBase
            className={'tilbake'}
            type={'standard'}
            onClick={() => history.push(forrigeRoute.path)}
          >
            <LocaleTekst tekst={'knapp.tilbake'} />
          </KnappBase>

          {validerSøkerBosattINorgeSisteTreÅr(søknad) && (
            <KnappBase
              type={'hoved'}
              onClick={() => !innsendingState.venter && sendSøknad(søknad)}
              className={'neste'}
              spinner={innsendingState.venter}
            >
              <LocaleTekst tekst={'knapp.sendSøknad'} />
            </KnappBase>
          )}
          <KnappBase
            className={'avbryt'}
            type={'flat'}
            onClick={() => history.push(RoutesSkolepenger[0].path)}
          >
            <LocaleTekst tekst={'knapp.avbryt'} />
          </KnappBase>
        </StyledKnapper>
      </SeksjonGruppe>
    </>
  );
};

export default SendSøknadKnapper;
