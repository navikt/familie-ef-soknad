import React, { FC } from 'react';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../../language/LocaleTekst';
import { IStatus } from '../../../arbeidssøkerskjema/innsending/typer';
import { ISøknad, LocationStateSøknad } from '../../../models/søknad/søknad';
import { parseISO } from 'date-fns';
import { useSøknad } from '../../../context/SøknadContext';
import { useHistory, useLocation } from 'react-router';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { hentPath } from '../../../utils/routing';
import { Link } from 'react-router-dom';
import {
  RoutesOvergangsstonad,
  ERouteOvergangsstønad,
} from '../../routing/routesOvergangsstonad';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { StyledKnapper } from '../../../arbeidssøkerskjema/komponenter/StyledKnapper';
import {
  mapBarnTilEntenIdentEllerFødselsdato,
  mapBarnUtenBarnepass,
  sendInnSøknad,
} from '../../../innsending/api';
import { hentForrigeRoute, hentNesteRoute } from '../../../utils/routing';
import { unikeDokumentasjonsbehov } from '../../../utils/søknad';
import { useSpråkContext } from '../../../context/SpråkContext';
import { useIntl } from 'react-intl';
import { barnetsNavnEllerBarnet } from '../../../utils/barn';
import { IBarn } from '../../../models/steg/barn';
import { useToggles } from '../../../context/TogglesContext';
import { ToggleName } from '../../../models/søknad/toggles';
import { logDokumetasjonsbehov } from '../../../utils/amplitude';
import { ESkjemanavn } from '../../../utils/skjemanavn';

interface Innsending {
  status: string;
  melding: string;
  venter: boolean;
}

const validerSøkerBosattINorgeSisteTreÅr = (søknad: ISøknad) => {
  return søknad.medlemskap.søkerBosattINorgeSisteTreÅr;
};

const SendSøknadKnapper: FC = () => {
  const { søknad, settSøknad } = useSøknad();
  const { toggles } = useToggles();
  const location = useLocation<LocationStateSøknad>();
  const [locale] = useSpråkContext();
  const history = useHistory();
  const nesteRoute = hentNesteRoute(RoutesOvergangsstonad, location.pathname);
  const intl = useIntl();
  const forrigeRoute = hentForrigeRoute(
    RoutesOvergangsstonad,
    location.pathname
  );

  const [innsendingState, settinnsendingState] = React.useState<Innsending>({
    status: IStatus.KLAR_TIL_INNSENDING,
    melding: `Søknad kan sendes`,
    venter: false,
  });

  const oppdaterBarnLabels = (barn: IBarn[]) => {
    const oppdaterteBarn = barn.map((barnet: any) => {
      const navnEllerBarn = barnetsNavnEllerBarnet(barnet, intl);

      const oppdatertBarn = { ...barnet };

      if (oppdatertBarn?.forelder) {
        Object.keys(oppdatertBarn.forelder).forEach((key) => {
          if (!oppdatertBarn.forelder[key]?.label) {
            return;
          }

          let labelMedNavnEllerBarnet = oppdatertBarn.forelder[key].label;

          labelMedNavnEllerBarnet = labelMedNavnEllerBarnet?.replace(
            '[0]',
            navnEllerBarn
          );

          oppdatertBarn.forelder[key].label = labelMedNavnEllerBarnet;
        });
      }

      return oppdatertBarn;
    });

    return oppdaterteBarn;
  };

  const sendSøknad = (søknad: ISøknad) => {
    const barnMedEntenIdentEllerFødselsdato = mapBarnUtenBarnepass(
      mapBarnTilEntenIdentEllerFødselsdato(søknad.person.barn)
    );
    const barnMedOppdaterteLabels = oppdaterBarnLabels(
      barnMedEntenIdentEllerFødselsdato
    );
    const dokumentasjonsbehov = søknad.dokumentasjonsbehov.filter(
      unikeDokumentasjonsbehov
    );
    logDokumetasjonsbehov(dokumentasjonsbehov, ESkjemanavn.Overgangsstønad);
    const søknadKlarForSending: ISøknad = {
      ...søknad,
      person: { ...søknad.person, barn: barnMedOppdaterteLabels },
      dokumentasjonsbehov: dokumentasjonsbehov,
      locale: locale,
    };

    settinnsendingState({ ...innsendingState, venter: true });
    sendInnSøknad(søknadKlarForSending)
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
      .catch((e) =>
        settinnsendingState({
          ...innsendingState,
          status: IStatus.FEILET,
          melding: `Noe gikk galt: ${e}`,
          venter: false,
        })
      );
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
                pathname: hentPath(
                  RoutesOvergangsstonad,
                  ERouteOvergangsstønad.OmDeg
                ),
                state: { kommerFraOppsummering: true },
              }}
            >
              <LocaleTekst tekst="dokumentasjon.alert.link.fylleInn" />
            </Link>{' '}
            <LocaleTekst tekst="dokumentasjon.alert.manglende" />
          </AlertStripe>
        </KomponentGruppe>
      )}
      {toggles[ToggleName.visSkalBehandlesINySaksbehandling] && (
        <>
          <div className={'sentrert'}>
            <KnappBase
              type={'hoved'}
              onClick={() =>
                !innsendingState.venter &&
                sendSøknad({ ...søknad, skalBehandlesINySaksbehandling: true })
              }
              spinner={innsendingState.venter}
            >
              Saksbehandle i ny løsning
            </KnappBase>
          </div>
          <Normaltekst style={{ marginBottom: 30 }}>
            (For å IKKE forsøke automatisk journalføring og blankettbehandling
            trykk på "Saksbehandle i ny løsning" knapp)
          </Normaltekst>
        </>
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
            onClick={() => history.push(RoutesOvergangsstonad[0].path)}
          >
            <LocaleTekst tekst={'knapp.avbryt'} />
          </KnappBase>
        </StyledKnapper>
      </SeksjonGruppe>
    </>
  );
};

export default SendSøknadKnapper;
