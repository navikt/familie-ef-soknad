import React, { useEffect } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import LastOppVedlegg from '../../../søknad/steg/8-dokumentasjon/LastOppVedlegg';
import Lenke from 'nav-frontend-lenker';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { ESvar } from '../../../models/felles/spørsmålogsvar';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import { hentTekst, unikeDokumentasjonsbehov } from '../../../utils/søknad';
import { Normaltekst } from 'nav-frontend-typografi';
import { useSøknad } from '../../../context/SøknadContext';
import SendSøknadKnapper from './SendSøknad';
import { useLocation } from 'react-router-dom';
import { usePrevious } from '../../../utils/hooks';
import { erVedleggstidspunktGyldig } from '../../../utils/dato';
import * as Sentry from '@sentry/browser';
import { Severity } from '@sentry/browser';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesOvergangsstonad } from '../../routing/routesOvergangsstonad';
import { IVedlegg } from '../../../models/steg/vedlegg';

const Dokumentasjon: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad, mellomlagreOvergangsstønad } = useSøknad();
  const location = useLocation();
  const { aktivitet, dokumentasjonsbehov } = søknad;
  const sidetittel: string = hentTekst('dokumentasjon.tittel', intl);
  const forrigeDokumentasjonsbehov = usePrevious(søknad.dokumentasjonsbehov);

  const oppdaterDokumentasjon = (
    dokumentasjonsid: string,
    opplastedeVedlegg: IVedlegg[] | undefined,
    harSendtInnTidligere: boolean
  ) => {
    settSøknad((prevSoknad) => {
      const dokumentasjonMedVedlegg = prevSoknad.dokumentasjonsbehov.map(
        (dok) => {
          return dok.id === dokumentasjonsid
            ? {
                ...dok,
                opplastedeVedlegg: opplastedeVedlegg,
                harSendtInn: harSendtInnTidligere,
              }
            : dok;
        }
      );
      return { ...prevSoknad, dokumentasjonsbehov: dokumentasjonMedVedlegg };
    });
  };

  useEffect(() => {
    if (forrigeDokumentasjonsbehov !== undefined) {
      mellomlagreOvergangsstønad(location.pathname);
    }
    // eslint-disable-next-line
  }, [søknad.dokumentasjonsbehov]);

  // Fjern vedlegg som evt. har blitt slettet i familie-dokument
  useEffect(() => {
    søknad.dokumentasjonsbehov.forEach((dokBehov) => {
      if (dokBehov.opplastedeVedlegg) {
        const gyldigeVedlegg = dokBehov.opplastedeVedlegg.filter((vedlegg) =>
          erVedleggstidspunktGyldig(vedlegg.tidspunkt)
        );
        if (gyldigeVedlegg.length !== dokBehov.opplastedeVedlegg.length) {
          Sentry.captureEvent({
            message: `Fjernet ugyldig vedlegg fra søknaden.`,
            level: Severity.Warning,
          });
          oppdaterDokumentasjon(
            dokBehov.id,
            gyldigeVedlegg,
            dokBehov.harSendtInn
          );
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  const harDokumentasjonsbehov = søknad.dokumentasjonsbehov.length > 0;
  return (
    <Side
      tittel={sidetittel}
      skalViseKnapper={ESide.skjulKnapper}
      erSpørsmålBesvart={false}
      mellomlagreStønad={mellomlagreOvergangsstønad}
      routesStønad={RoutesOvergangsstonad}
    >
      <SeksjonGruppe>
        <Normaltekst>
          <FormattedHTMLMessage
            id={
              harDokumentasjonsbehov
                ? 'dokumentasjon.beskrivelse'
                : 'dokumentasjon.ingenDokumentasjonsbehov.beskrivelse'
            }
          />
        </Normaltekst>
      </SeksjonGruppe>
      <SeksjonGruppe>
        {aktivitet.arbeidssøker?.registrertSomArbeidssøkerNav?.svarid ===
          ESvar.NEI && (
          <KomponentGruppe>
            <Lenke href={'https://arbeidssokerregistrering.nav.no/'}>
              Registrer deg som arbeidssøker hos NAV
            </Lenke>
          </KomponentGruppe>
        )}
        {dokumentasjonsbehov
          .filter(unikeDokumentasjonsbehov)
          .map((dokumentasjon, i) => {
            return (
              <LastOppVedlegg
                key={i}
                dokumentasjon={dokumentasjon}
                oppdaterDokumentasjon={oppdaterDokumentasjon}
              />
            );
          })}
      </SeksjonGruppe>

      <SendSøknadKnapper />
    </Side>
  );
};

export default Dokumentasjon;
