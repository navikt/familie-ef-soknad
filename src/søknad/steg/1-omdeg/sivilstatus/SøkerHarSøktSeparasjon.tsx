import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import NårFlyttetDereFraHverandre from './begrunnelse/NårFlyttetDereFraHverandre';
import { ISivilstatus } from '../../../../models/steg/omDeg/sivilstatus';

interface Props {
  sivilstatus: ISivilstatus;
  settDato: (date: Date | null, objektnøkkel: string, tekst: string) => void;
}
const SøkerHarSøktSeparasjon: React.FC<Props> = ({ settDato, sivilstatus }) => {
  const { datoSøktSeparasjon, datoFlyttetFraHverandre } = sivilstatus;
  const datovelgerTekstid = 'sivilstatus.datovelger.søktSeparasjon';
  return (
    <KomponentGruppe>
      <FeltGruppe>
        <Datovelger
          settDato={(e) => settDato(e, 'datoSøktSeparasjon', datovelgerTekstid)}
          valgtDato={datoSøktSeparasjon ? datoSøktSeparasjon.verdi : undefined}
          tekstid={datovelgerTekstid}
          datobegrensning={DatoBegrensning.TidligereDatoer}
        />
      </FeltGruppe>
      <FeltGruppe>
        <AlertStripe type={'info'} form={'inline'}>
          <LocaleTekst tekst={'sivilstatus.alert-info.søktSeparasjon'} />
        </AlertStripe>
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
