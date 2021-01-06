import React, { useEffect, useState } from 'react';
import Feilside from '../components/feil/Feilside';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentMeldingMottatt } from '../utils/søknad';
import { useLocation } from 'react-router-dom';
import {
  autentiseringsInterceptor,
  verifiserAtBrukerErAutentisert,
} from '../utils/autentiseringogvalidering/autentisering';
import { Helmet } from 'react-helmet';
import { erLokaltMedMock } from '../utils/miljø';
import mockDokumentasjonsbehovResponse from '../mock/mockDokumentasjonsbehovResponse.json';
import { Panel } from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { hentBannertittel } from '../utils/stønadstype';
import Banner from '../components/Banner';
import { DokumentasjonsbehovResponse } from './DokumentasjonsbehovModel';
import {
  hentIngressTekst,
  søknadTypeTilEttersendelseUrl,
  søknadTypeTilStønadType,
} from './DokumentasjonsbehovUtils';
import ManglendeVedlegg from './components/ManglendeVedlegg';
import InnsendteVedlegg from './components/InnsendteVedlegg';
import AlleredeInnsendtVedlegg from './components/AlleredeInnsendtVedlegg';
import { Hovedknapp } from 'nav-frontend-knapper';

const useQuery = () => new URLSearchParams(useLocation().search);

const DokumentasjonsbehovApp = () => {
  const [autentisert, settAutentisering] = useState<boolean>(false);
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);
  const [
    dokumentasjonsbehovResponse,
    settDokumentasjonsbehovResponse,
  ] = useState<DokumentasjonsbehovResponse>();
  let query = useQuery().get('soknad');
  const søknadId = query !== null ? query.toString() : '';

  autentiseringsInterceptor();

  useEffect(() => {
    verifiserAtBrukerErAutentisert(settAutentisering);
  }, [autentisert]);

  const fetchMeldingMottatt = () => {
    return hentMeldingMottatt(søknadId)
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
    if (søknadId === '') {
      settError(true);
      return;
    }

    fetchMeldingMottatt()
      .then(() => settFetching(false))
      .catch(() => settFetching(false));
    // eslint-disable-next-line
  }, []);

  if (!fetching && autentisert) {
    if (!error && dokumentasjonsbehovResponse) {
      const manglendeVedlegg = dokumentasjonsbehovResponse.dokumentasjonsbehov.filter(
        (it) => !it.harSendtInn && it.opplastedeVedlegg.length === 0
      );

      const alleredeSendtInn = dokumentasjonsbehovResponse.dokumentasjonsbehov.filter(
        (it) => it.harSendtInn
      );

      const vedlegg = dokumentasjonsbehovResponse.dokumentasjonsbehov.filter(
        (it) => it.opplastedeVedlegg.length > 0
      );
      return (
        <>
          <Helmet>
            <title>Dokumentasjonsbehov</title>
          </Helmet>

          <div className={'dokumentasjonsbehov'}>
            <Banner
              tekstid={hentBannertittel(
                søknadTypeTilStønadType(dokumentasjonsbehovResponse.søknadType)
              )}
            />

            <div className={'dokumentasjonsbehov__innhold'}>
              <Panel className={'dokumentasjonsbehov__panel'}>
                <Sidetittel>Dokumentasjon til søknaden</Sidetittel>
                <div className="seksjon">
                  <Normaltekst>
                    {hentIngressTekst(manglendeVedlegg.length > 0)}
                  </Normaltekst>
                  {manglendeVedlegg.length === 0 && (
                    <Hovedknapp
                      onClick={() => {
                        window.location.href = søknadTypeTilEttersendelseUrl(
                          dokumentasjonsbehovResponse?.søknadType
                        );
                      }}
                      className={'ettersend__button'}
                    >
                      Ettersend dokumentasjon
                    </Hovedknapp>
                  )}
                </div>

                {manglendeVedlegg.length > 0 && (
                  <ManglendeVedlegg
                    manglendeVedlegg={manglendeVedlegg}
                    søknadType={dokumentasjonsbehovResponse?.søknadType}
                  />
                )}

                {vedlegg.length > 0 && <InnsendteVedlegg vedlegg={vedlegg} />}

                {alleredeSendtInn.length > 0 && (
                  <AlleredeInnsendtVedlegg
                    alleredeSendtInn={alleredeSendtInn}
                  />
                )}
              </Panel>
            </div>
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

export default DokumentasjonsbehovApp;
