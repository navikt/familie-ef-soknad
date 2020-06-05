import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import LastOppVedlegg from './LastOppVedlegg';
import Lenke from 'nav-frontend-lenker';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../../components/side/Side';
import { ESvar } from '../../../models/spørsmålogsvar';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import { Normaltekst } from 'nav-frontend-typografi';
import { useSøknad } from '../../../context/SøknadContext';
import SendSøknadKnapper from './SendSøknad';

const Dokumentasjon: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknad();
  const { dokumentasjonsbehov, aktivitet } = søknad;

  const sidetittel: string = hentTekst('dokumentasjon.tittel', intl);

  return (
    <Side tittel={sidetittel} skalViseKnapper={false}>
      <SeksjonGruppe>
        <Normaltekst>
          <FormattedHTMLMessage id={'dokumentasjon.beskrivelse'} />
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
        {dokumentasjonsbehov !== [] &&
          dokumentasjonsbehov.map((dokumentasjon) => {
            return <LastOppVedlegg dokumentasjon={dokumentasjon} />;
          })}
      </SeksjonGruppe>

      <SendSøknadKnapper />
    </Side>
  );
};

export default Dokumentasjon;
