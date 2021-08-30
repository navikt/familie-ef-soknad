import React, { FC } from 'react';
import KnappBase from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { Innsending } from './SendSøknad';
import { ISøknad } from '../../../models/søknad/søknad';

interface Props {
  innsendingState: Innsending;
  søknad: ISøknad;
  sendSøknad: (søknad: ISøknad) => void;
}

const SaksbehandleINyLøsningKnapp: FC<Props> = ({
  innsendingState,
  søknad,
  sendSøknad,
}) => {
  return (
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
        (For å IKKE forsøke automatisk journalføring og blankettbehandling trykk
        på "Saksbehandle i ny løsning" knapp)
      </Normaltekst>
    </>
  );
};
export default SaksbehandleINyLøsningKnapp;
