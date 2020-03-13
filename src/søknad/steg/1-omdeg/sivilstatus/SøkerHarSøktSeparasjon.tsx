import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';
import useSøknadContext from '../../../../context/SøknadContext';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import NårFlyttetDereFraHverandre from './begrunnelse/NårFlyttetDereFraHverandre';

interface Props {
  settDato: (date: Date | null, objektnøkkel: string, tekst: string) => void;
}
const SøkerHarSøktSeparasjon: React.FC<Props> = ({ settDato }) => {
  const { søknad } = useSøknadContext();
  const { datoSøktSeparasjon, datoFlyttetFraHverandre } = søknad.sivilstatus;
  return (
    <KomponentGruppe>
      <Datovelger
        settDato={(e) =>
          settDato(e, 'datoSøktSeparasjon', 'sivilstatus.separasjon.datosøkt')
        }
        valgtDato={datoSøktSeparasjon ? datoSøktSeparasjon.verdi : undefined}
        tekstid={'sivilstatus.separasjon.datosøkt'}
        datobegrensning={DatoBegrensning.TidligereDatoer}
      />
      <FeltGruppe>
        <AlertStripeInfo className={'fjernBakgrunn'}>
          <LocaleTekst tekst={'sivilstatus.somgift'} />
        </AlertStripeInfo>
      </FeltGruppe>
      {datoSøktSeparasjon && (
        <NårFlyttetDereFraHverandre
          settDato={settDato}
          datoFlyttetFraHverandre={datoFlyttetFraHverandre}
        />
      )}
    </KomponentGruppe>
  );
};

export default SøkerHarSøktSeparasjon;
