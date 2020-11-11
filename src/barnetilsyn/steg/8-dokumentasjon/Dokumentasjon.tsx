import React, { useEffect } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import { hentTekst, unikeDokumentasjonsbehov } from '../../../utils/søknad';
import { Normaltekst } from 'nav-frontend-typografi';
import { useLocation } from 'react-router-dom';
import { usePrevious } from '../../../utils/hooks';
import LastOppVedlegg from '../../../søknad/steg/8-dokumentasjon/LastOppVedlegg';
import SendSøknadKnapper from './SendBarnetilsynSøknad';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';
import { IVedlegg } from '../../../models/steg/vedlegg';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { LocationStateSøknad } from '../../../models/søknad/søknad';
import { logEvent } from '../../../utils/amplitude';

const Dokumentasjon: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad, mellomlagreBarnetilsyn } = useBarnetilsynSøknad();
  const location = useLocation<LocationStateSøknad>();
  const { dokumentasjonsbehov } = søknad;
  const sidetittel: string = hentTekst('dokumentasjon.tittel', intl);
  const forrigeDokumentasjonsbehov = usePrevious(søknad.dokumentasjonsbehov);

  useEffect(() => {
    logEvent('sidevisning', {
      side: 'Dokumentasjon',
      team: 'familie',
      app: 'BT-soknadsdialog',
    });
  }, []);

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
      mellomlagreBarnetilsyn(location.pathname);
    }
    // eslint-disable-next-line
  }, [søknad.dokumentasjonsbehov]);

  const harDokumentasjonsbehov = søknad.dokumentasjonsbehov.length > 0;
  return (
    <Side
      stønadstype={Stønadstype.barnetilsyn}
      stegtittel={sidetittel}
      skalViseKnapper={ESide.skjulKnapper}
      erSpørsmålBesvart={false}
      routesStønad={RoutesBarnetilsyn}
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
