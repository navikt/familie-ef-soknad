import React from 'react';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { Checkbox } from 'nav-frontend-skjema';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { hentTekst } from '../../../utils/søknad';
import { IDokumentasjon } from '../../../models/dokumentasjon';
import LocaleTekst from '../../../language/LocaleTekst';

interface Props {
  dokumentasjon: IDokumentasjon;
}

const Dokumentasjonsbehov: React.FC<Props> = ({ dokumentasjon }) => {
  const intl = useIntl();

  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Undertittel>
          <LocaleTekst tekst={dokumentasjon.tittel} />
        </Undertittel>
      </FeltGruppe>
      <FeltGruppe>
        <Normaltekst>
          <LocaleTekst tekst={dokumentasjon.beskrivelse} />
        </Normaltekst>
      </FeltGruppe>
      <FeltGruppe>
        <Checkbox
          label={hentTekst('dokumentasjon.checkbox.sendtTidligere', intl)}
        />
      </FeltGruppe>

      <KomponentGruppe>Sett inn vedleggsopplaster her</KomponentGruppe>
    </SeksjonGruppe>
  );
};

export default Dokumentasjonsbehov;
