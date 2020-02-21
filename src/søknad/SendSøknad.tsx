import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { sendInnSøknad } from '../innsending/api';
import useSøknadContext from '../context/SøknadContext';
import Side from '../components/side/Side';
import { Normaltekst } from 'nav-frontend-typografi';

interface IState {
  status: string;
  venter: boolean;
}

const SendSøknad = () => {
  const { søknad } = useSøknadContext();

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
      <Side tittel={'Oppsummering'}>
        <Normaltekst>
          Ingenting vil skje om du trykker på denne knappen.
        </Normaltekst>
        <Hovedknapp onClick={send} spinner={hocState.venter}>
          Send Søknad
        </Hovedknapp>
        <Normaltekst>Status: {hocState.status}</Normaltekst>
      </Side>
    </>
  );
};

export default SendSøknad;
