import React from 'react';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { Undertittel } from 'nav-frontend-typografi';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { Checkbox } from 'nav-frontend-skjema';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { hentTekst } from '../../../utils/søknad';

const Dokumentasjonsbehov: React.FC = () => {
  const intl = useIntl();

  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Undertittel>Tittel på dokumentasjonsbehov</Undertittel>
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
