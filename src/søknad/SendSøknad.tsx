import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { sendInnSøknad } from '../innsending/api';
import { Normaltekst } from 'nav-frontend-typografi';
import Filopplaster from '../components/filopplaster/Filopplaster';
import tekster from '../language/tekster';
import { useSøknad } from '../context/SøknadContext';

interface IState {
  status: string;
  venter: boolean;
}

const SendSøknad = () => {
  const { søknad } = useSøknad();

  const [hocState, setHocState] = useState<IState>({
    status: `Søknad kan sendes`,
    venter: false,
  });

  const send = () => {
    setHocState({ ...hocState, venter: true });
    sendInnSøknad(søknad)
      .then((kvittering) =>
        setHocState({
          ...hocState,
          status: `Vi har kontakt: ${kvittering.text}`,
          venter: false,
        })
      )
      .catch((e) =>
        setHocState({
          ...hocState,
          status: `Noe gikk galt: ${e}`,
          venter: false,
        })
      );
  };

  return (
    <>
      {søknad.sivilstatus.begrunnelseForSøknad &&
      (søknad.sivilstatus.begrunnelseForSøknad.verdi ===
        tekster.nb['sivilstatus.svar.samlivsbruddAndre'] ||
        søknad.sivilstatus.begrunnelseForSøknad.verdi ===
          tekster.nb['sivilstatus.svar.samlivsbruddForeldre']) ? (
        <Filopplaster
          tittel={'Erklæring om samlivsbrudd'}
          dokumentasjonsType={'samlivsbrudd'}
        />
      ) : null}
      <Normaltekst>
        Ingenting vil skje om du trykker på denne knappen.
      </Normaltekst>
      <Hovedknapp onClick={send} spinner={hocState.venter}>
        Send Søknad
      </Hovedknapp>
      <Normaltekst>Status: {hocState.status}</Normaltekst>
    </>
  );
};

export default SendSøknad;
