import React from 'react';
import Side from '../../../components/side/Side';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import SendSøknad from '../../SendSøknad';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { Normaltekst } from 'nav-frontend-typografi';
import Dokumentasjonsbehov from './Dokumentasjonsbehov';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { useSøknad } from '../../../context/SøknadContext';

const LastOppDokumentasjon: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknad();
  const { dokumentasjonsbehov } = søknad;

  const sidetittel: string = hentTekst('dokumentasjon.tittel', intl);

  return (
    <Side tittel={sidetittel}>
      <SeksjonGruppe>
        <Normaltekst>
          <FormattedHTMLMessage id={'dokumentasjon.beskrivelse'} />
        </Normaltekst>
      </SeksjonGruppe>
      {dokumentasjonsbehov !== [] &&
        dokumentasjonsbehov.map((dokumentasjon) => {
          return <Dokumentasjonsbehov dokumentasjon={dokumentasjon} />;
        })}

      <KomponentGruppe>
        <SendSøknad />
      </KomponentGruppe>
    </Side>
  );
};

export default LastOppDokumentasjon;
