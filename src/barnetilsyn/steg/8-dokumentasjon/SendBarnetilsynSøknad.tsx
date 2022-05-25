import React, { FC } from 'react';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../../language/LocaleTekst';
import { IStatus } from '../../../arbeidssøkerskjema/innsending/typer';
import { parseISO } from 'date-fns';
import { useLocation } from 'react-router';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { StyledKnapper } from '../../../arbeidssøkerskjema/komponenter/StyledKnapper';
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';
import {
  mapBarnTilEntenIdentEllerFødselsdato,
  sendInnBarnetilsynSøknad,
} from '../../../innsending/api';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import { ISøknad } from '../../models/søknad';
import { IBarn } from '../../../models/steg/barn';
import {
  hentForrigeRoute,
  hentNesteRoute,
  hentPath,
} from '../../../utils/routing';
import { unikeDokumentasjonsbehov } from '../../../utils/søknad';

import {
  logDokumetasjonsbehov,
  logInnsendingFeilet,
} from '../../../utils/amplitude';
import { ESkjemanavn, skjemanavnIdMapping } from '../../../utils/skjemanavn';
import { Link, useNavigate } from 'react-router-dom';
import {
  ERouteSkolepenger,
  RoutesSkolepenger,
} from '../../../skolepenger/routing/routes';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { oppdaterBarnLabels } from '../../../utils/barn';

interface Innsending {
  status: string;
  melding: string;
  venter: boolean;
}

const validerSøkerBosattINorgeSisteTreÅr = (søknad: ISøknad) => {
  return søknad.medlemskap.søkerBosattINorgeSisteTreÅr;
};

const SendSøknadKnapper: FC = () => {
  const { søknad, settSøknad } = useBarnetilsynSøknad();
  const location = useLocation();
  const navigate = useNavigate();
  const nesteRoute = hentNesteRoute(RoutesBarnetilsyn, location.pathname);
  const forrigeRoute = hentForrigeRoute(RoutesBarnetilsyn, location.pathname);
  const intl = useLokalIntlContext();

  const [innsendingState, settinnsendingState] = React.useState<Innsending>({
    status: IStatus.KLAR_TIL_INNSENDING,
    melding: `Søknad kan sendes`,
    venter: false,
  });

  const filtrerBarnSomSkalHaBarnepass = (barneliste: IBarn[]) => {
    return barneliste.filter((barn) => barn.skalHaBarnepass?.verdi === true);
  };

  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Barnetilsyn];

  const sendSøknad = (søknad: ISøknad) => {
    const barnMedEntenIdentEllerFødselsdato = filtrerBarnSomSkalHaBarnepass(
      mapBarnTilEntenIdentEllerFødselsdato(søknad.person.barn)
    );
    const barnMedOppdaterteLabels = oppdaterBarnLabels(
      barnMedEntenIdentEllerFødselsdato,
      intl
    );

    const dokumentasjonsbehov = søknad.dokumentasjonsbehov.filter(
      unikeDokumentasjonsbehov
    );
    logDokumetasjonsbehov(dokumentasjonsbehov, ESkjemanavn.Barnetilsyn);

    const søknadMedFiltrerteBarn: ISøknad = {
      ...søknad,
      person: { ...søknad.person, barn: barnMedOppdaterteLabels },
      dokumentasjonsbehov: dokumentasjonsbehov,
    };
    settinnsendingState({ ...innsendingState, venter: true });
    sendInnBarnetilsynSøknad(søknadMedFiltrerteBarn)
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
        navigate(nesteRoute.path);
      })
      .catch((e) => {
        settinnsendingState({
          ...innsendingState,
          status: IStatus.FEILET,
          melding: `Noe gikk galt: ${e}`,
          venter: false,
        });

        logInnsendingFeilet(ESkjemanavn.Barnetilsyn, skjemaId, e);
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
              }}
              state={{ kommerFraOppsummering: true }}
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
            onClick={() => navigate(forrigeRoute.path)}
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
            onClick={() => navigate(RoutesBarnetilsyn[0].path)}
          >
            <LocaleTekst tekst={'knapp.avbryt'} />
          </KnappBase>
        </StyledKnapper>
      </SeksjonGruppe>
    </>
  );
};

export default SendSøknadKnapper;
