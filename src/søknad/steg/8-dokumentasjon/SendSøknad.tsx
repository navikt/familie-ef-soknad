import React, { FC } from 'react';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../../language/LocaleTekst';
import { IStatus } from '../../../arbeidssøkerskjema/innsending/typer';
import { ISøknad } from '../../../models/søknad';
import { parseISO } from 'date-fns';
import { sendInnSkjema } from '../../../arbeidssøkerskjema/innsending/api';
import { useSøknad } from '../../../context/SøknadContext';
import {
  hentNesteRoute,
  Routes,
} from '../../../arbeidssøkerskjema/routes/Routes';
import { useHistory, useLocation } from 'react-router';
import { mapSøknad } from '../../../utils/mapper';

interface Innsending {
  status: string;
  melding: string;
  venter: boolean;
}

const SendSøknadKnapp: FC = () => {
  const { søknad, settSøknad } = useSøknad();
  const location = useLocation();
  const history = useHistory();
  const nesteRoute = hentNesteRoute(Routes, location.pathname);

  const [innsendingState, settinnsendingState] = React.useState<Innsending>({
    status: IStatus.KLAR_TIL_INNSENDING,
    melding: `Søknad kan sendes`,
    venter: false,
  });

  const sendSøknad = (søknad: ISøknad) => {
    // Map søknad fra ISpørsmålFelt til {label, verdi}
    // const mappetSkjema = mapDataTilLabelOgVerdiTyper(søknad);
    console.log(test);
    const mappetSøknad = søknad;

    settinnsendingState({ ...innsendingState, venter: true });
    sendInnSkjema(mappetSøknad)
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
    <KnappBase
      type={'hoved'}
      onClick={() => !innsendingState.venter && sendSøknad(søknad)}
      className={'neste'}
      spinner={innsendingState.venter}
    >
      <LocaleTekst tekst={'knapp.sendSøknad'} />
    </KnappBase>
  );
};

export default SendSøknadKnapp;
