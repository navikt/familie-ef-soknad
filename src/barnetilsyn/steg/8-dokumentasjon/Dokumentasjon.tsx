import React, { useEffect } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Lenke from 'nav-frontend-lenker';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../side/Side';
import { ESvar } from '../../../models/felles/spørsmålogsvar';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { IDokumentasjon } from '../../../models/steg/dokumentasjon';
import { useLocation } from 'react-router-dom';
import { usePrevious } from '../../../utils/hooks';
import LastOppVedlegg from '../../../søknad/steg/8-dokumentasjon/LastOppVedlegg';
import SendSøknadKnapper from './SendBarnetilsynSøknad';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';

const Dokumentasjon: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad, mellomlagreBarnetilsyn } = useBarnetilsynSøknad();
  const location = useLocation();
  const { aktivitet, dokumentasjonsbehov } = søknad;
  const sidetittel: string = hentTekst('dokumentasjon.tittel', intl);
  const forrigeDokumentasjonsbehov = usePrevious(søknad.dokumentasjonsbehov);

  const settDokumentasjon = (dokumentasjon: IDokumentasjon) => {
    settSøknad((prevSoknad) => {
      const dokumentasjonMedVedlegg = prevSoknad.dokumentasjonsbehov.map(
        (dok) => {
          return dok.id === dokumentasjon.id ? dokumentasjon : dok;
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
    <Side tittel={sidetittel} skalViseKnapper={false} erSpørsmålBesvart={true}>
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
        {dokumentasjonsbehov.map((dokumentasjon, i) => {
          return (
            <LastOppVedlegg
              key={i}
              dokumentasjon={dokumentasjon}
              settDokumentasjon={settDokumentasjon}
            />
          );
        })}
      </SeksjonGruppe>
      <div>
        <Element>
          JSON som sendes inn (kopier denne og send til utviklere dersom
          innsending feiler):
        </Element>
        <pre>{JSON.stringify(søknad, null, 2)}</pre>
      </div>
      <SendSøknadKnapper />
    </Side>
  );
};

export default Dokumentasjon;
