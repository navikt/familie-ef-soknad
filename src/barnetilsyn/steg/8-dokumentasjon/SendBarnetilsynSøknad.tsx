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
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';
import {
  mapBarnTilEntenIdentEllerFødselsdato,
  sendInnBarnetilsynSøknad,
} from '../../../innsending/api';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import { ISøknad } from '../../models/søknad';
import { IBarn } from '../../../models/steg/barn';
import { hentForrigeRoute, hentNesteRoute } from '../../../utils/routing';
import { unikeDokumentasjonsbehov } from '../../../utils/søknad';
import { LocationStateSøknad } from '../../../models/søknad/søknad';
import { logDokumetasjonsbehov } from '../../../utils/amplitude';
import { ESkjemanavn } from '../../../utils/skjemanavn';

interface Innsending {
  status: string;
  melding: string;
  venter: boolean;
}

const SendSøknadKnapper: FC = () => {
  const { søknad, settSøknad } = useBarnetilsynSøknad();
  const location = useLocation<LocationStateSøknad>();
  const history = useHistory();
  const nesteRoute = hentNesteRoute(RoutesBarnetilsyn, location.pathname);
  const forrigeRoute = hentForrigeRoute(RoutesBarnetilsyn, location.pathname);

  const [innsendingState, settinnsendingState] = React.useState<Innsending>({
    status: IStatus.KLAR_TIL_INNSENDING,
    melding: `Søknad kan sendes`,
    venter: false,
  });

  const filtrerBarnSomSkalHaBarnepass = (barneliste: IBarn[]) => {
    return barneliste.filter((barn) => barn.skalHaBarnepass?.verdi === true);
  };

  const sendSøknad = (søknad: ISøknad) => {
    const barnMedEntenIdentEllerFødselsdato = filtrerBarnSomSkalHaBarnepass(
      mapBarnTilEntenIdentEllerFødselsdato(søknad.person.barn)
    );
    const dokumentasjonsbehov = søknad.dokumentasjonsbehov.filter(
      unikeDokumentasjonsbehov
    );
    logDokumetasjonsbehov(dokumentasjonsbehov, ESkjemanavn.Barnetilsyn);

    const søknadMedFiltrerteBarn: ISøknad = {
      ...søknad,
      person: { ...søknad.person, barn: barnMedEntenIdentEllerFødselsdato },
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
      <SeksjonGruppe className={'sentrert'}>
        <StyledKnapper>
          <KnappBase
            className={'tilbake'}
            type={'standard'}
            onClick={() => history.push(forrigeRoute.path)}
          >
            <LocaleTekst tekst={'knapp.tilbake'} />
          </KnappBase>

          <KnappBase
            type={'hoved'}
            onClick={() => !innsendingState.venter && sendSøknad(søknad)}
            className={'neste'}
            spinner={innsendingState.venter}
          >
            <LocaleTekst tekst={'knapp.sendSøknad'} />
          </KnappBase>
          <KnappBase
            className={'avbryt'}
            type={'flat'}
            onClick={() => history.push(RoutesBarnetilsyn[0].path)}
          >
            <LocaleTekst tekst={'knapp.avbryt'} />
          </KnappBase>
        </StyledKnapper>
      </SeksjonGruppe>
    </>
  );
};

export default SendSøknadKnapper;
