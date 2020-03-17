import React from 'react';
import Side from '../../../components/side/Side';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import useSøknadContext from '../../../context/SøknadContext';
import SendSøknad from '../../SendSøknad';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

const LastOppDokumentasjon: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknadContext();

  const sidetittel: string = hentTekst('dokumentasjon.tittel', intl);

  return (
    <Side tittel={sidetittel}>
      <KomponentGruppe>
        <SendSøknad />
      </KomponentGruppe>
    </Side>
  );
};

export default LastOppDokumentasjon;
