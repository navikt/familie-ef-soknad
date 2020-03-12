import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';
import useSøknadContext from '../../../../context/SøknadContext';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';

interface Props {
  settDato: (date: Date | null, objektnøkkel: string, tekst: string) => void;
}
const SøkerHarSøktSeparasjon: React.FC<Props> = ({ settDato }) => {
  const { søknad } = useSøknadContext();
  const { sivilstatus } = søknad;
  return (
    <KomponentGruppe>
      <Datovelger
        settDato={(e) =>
          settDato(e, 'datoSøktSeparasjon', 'sivilstatus.separasjon.datosøkt')
        }
        valgtDato={
          sivilstatus.datoSøktSeparasjon
            ? sivilstatus.datoSøktSeparasjon.verdi
            : undefined
        }
        tekstid={'sivilstatus.separasjon.datosøkt'}
        datobegrensning={DatoBegrensning.TidligereDatoer}
      />
      <FeltGruppe>
        <AlertStripe type={'info'} form={'inline'}>
          <LocaleTekst tekst={'sivilstatus.somgift'} />
        </AlertStripe>
      </FeltGruppe>
    </KomponentGruppe>
  );
};

export default SøkerHarSøktSeparasjon;
