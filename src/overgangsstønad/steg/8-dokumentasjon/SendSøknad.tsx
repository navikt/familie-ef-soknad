import React, { FC } from 'react';
import { IStatus } from '../../../arbeidssøkerskjema/innsending/typer';
import { ISøknad, LocationStateSøknad } from '../../../models/søknad/søknad';
import { parseISO } from 'date-fns';
import { useSøknad } from '../../../context/SøknadContext';
import { useHistory, useLocation } from 'react-router';
import { RoutesOvergangsstonad } from '../../routing/routesOvergangsstonad';
import {
  mapBarnTilEntenIdentEllerFødselsdato,
  mapBarnUtenBarnepass,
  sendInnSøknad,
} from '../../../innsending/api';
import { hentNesteRoute } from '../../../utils/routing';
import { unikeDokumentasjonsbehov } from '../../../utils/søknad';
import { useSpråkContext } from '../../../context/SpråkContext';
import { useIntl } from 'react-intl';
import { barnetsNavnEllerBarnet } from '../../../utils/barn';
import { IBarn } from '../../../models/steg/barn';
import { useToggles } from '../../../context/TogglesContext';
import { ToggleName } from '../../../models/søknad/toggles';
import { logDokumetasjonsbehov } from '../../../utils/amplitude';
import { ESkjemanavn } from '../../../utils/skjemanavn';
import InnsendingFeilet from './InnsendingFeilet';
import ManglendeInformasjonAlert from './ManglendeInformasjonAlert';
import TilbakeSendAvBrytKnapper from './TilbakeSendAvBrytKnapper';
import SaksbehandleINyLøsningKnapp from './SaksbehandleINyLøsning';

export interface Innsending {
  status: string;
  melding: string;
  venter: boolean;
}

const SendSøknadKnapper: FC = () => {
  const { søknad, settSøknad } = useSøknad();
  const { toggles } = useToggles();
  const location = useLocation<LocationStateSøknad>();
  const [locale] = useSpråkContext();
  const history = useHistory();
  const nesteRoute = hentNesteRoute(RoutesOvergangsstonad, location.pathname);
  const intl = useIntl();

  const [innsendingState, settinnsendingState] = React.useState<Innsending>({
    status: IStatus.KLAR_TIL_INNSENDING,
    melding: `Søknad kan sendes`,
    venter: false,
  });

  const validerSøkerBosattINorgeSisteTreÅr = (søknad: ISøknad) => {
    return søknad.medlemskap.søkerBosattINorgeSisteTreÅr;
  };

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

  const sendSøknad = (søknad: ISøknad): void => {
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
        <InnsendingFeilet
          søknadForOvergangsstønad={søknad}
          innsendingState={innsendingState}
        />
      )}
      {!validerSøkerBosattINorgeSisteTreÅr(søknad) && (
        <ManglendeInformasjonAlert />
      )}
      {toggles[ToggleName.visSkalBehandlesINySaksbehandling] && (
        <SaksbehandleINyLøsningKnapp
          innsendingState={innsendingState}
          søknad={søknad}
          sendSøknad={sendSøknad}
        />
      )}
      <TilbakeSendAvBrytKnapper
        innsendingState={innsendingState}
        søknad={søknad}
        sendSøknad={sendSøknad}
      />
    </>
  );
};

export default SendSøknadKnapper;
