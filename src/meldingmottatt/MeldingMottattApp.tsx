import React, { useEffect, useState } from 'react';
import Feilside from '../components/feil/Feilside';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentMeldingMottatt } from '../utils/søknad';
import { useParams } from 'react-router-dom';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from '../utils/autentiseringogvalidering/autentisering';
import { Helmet } from 'react-helmet';
import { erLokaltMedMock } from '../utils/miljø';
import mockDokumentasjonsbehovResponse from '../mock/mockDokumentasjonsbehovResponse.json';
import styled from 'styled-components/macro';

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

interface Dokumentasjonsehov {
  label: string;
  id: string;
  harSendtInn: boolean;
  opplastedeVedlegg: string[];
}

enum SøknadType {
  OVERGANGSSTØNAD = 'OVERGANGSSTØNAD',
  BARNETILSYN = 'BARNETILSYN',
  SKOLEPENGER = 'SKOLEPENGER',
}

interface DokumentasjonsbehovResponse {
  dokumentasjonsbehov: Dokumentasjonsehov[];
  innsendingstidspunkt: string;
  søknadType: SøknadType;
  personIdent: String;
}

const MeldingMottattApp = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const [
    dokumentasjonsbehovResponse,
    settDokumentasjonsbehovResponse,
  ] = useState<DokumentasjonsbehovResponse>();
  let { soknadId } = useParams();

  autentiseringsInterceptor();

  useEffect(() => {
    verifiserAtBrukerErAutentisert(settAutentisering);
  }, [autentisert]);

  const fetchMeldingMottatt = () => {
    return hentMeldingMottatt(soknadId)
      .then((response) => {
        settDokumentasjonsbehovResponse(response);
      })
      .catch(() => settError(true));
  };

  useEffect(() => {
    if (erLokaltMedMock()) {
      // @ts-ignore
      settDokumentasjonsbehovResponse(mockDokumentasjonsbehovResponse);
      settFetching(false);
      return;
    }
    Promise.all([fetchMeldingMottatt()])
      .then(() => settFetching(false))
      .catch(() => settFetching(false));
    // eslint-disable-next-line
  }, []);

  if (!fetching && autentisert) {
    if (!error && dokumentasjonsbehovResponse) {
      const manglendeVedlegg = dokumentasjonsbehovResponse.dokumentasjonsbehov
        .filter((it) => !it.harSendtInn && it.opplastedeVedlegg.length === 0)
        .map((it) => <div>{it.label}</div>);

      const harAlleredeSendtInn = dokumentasjonsbehovResponse.dokumentasjonsbehov
        .filter((it) => it.harSendtInn)
        .map((it) => <div>{it.label}</div>);

      const vedlegg = dokumentasjonsbehovResponse.dokumentasjonsbehov
        .filter((it) => it.opplastedeVedlegg.length > 0)
        .map((it) => (
          <div>
            <div>{it.label}</div>
            {it.opplastedeVedlegg.map((vedlegg) => (
              <div>{vedlegg}</div>
            ))}
          </div>
        ));

      return (
        <>
          <Helmet>
            <title>Melding mottatt</title>
          </Helmet>

          <div>
            <div>
              <div>
                Sendt inn: {dokumentasjonsbehovResponse.innsendingstidspunkt}
              </div>
              <div>Type søknad: {dokumentasjonsbehovResponse.søknadType}</div>
            </div>
            <br />

            {manglendeVedlegg && (
              <div>
                <Header>Det ble ikke sendt inn noen vedlegg for:</Header>
                {manglendeVedlegg}
              </div>
            )}
            <br />

            {harAlleredeSendtInn && (
              <div>
                <Header>Det er allerede sendt inn vedlegg for</Header>
                {harAlleredeSendtInn}
              </div>
            )}
            <br />

            {vedlegg && (
              <div>
                <Header>Vedlegg som ble sendt inn</Header>
                {vedlegg}
              </div>
            )}
          </div>
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

export default MeldingMottattApp;
