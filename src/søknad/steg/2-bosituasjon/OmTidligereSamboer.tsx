import React, { FC } from 'react';
import { EBosituasjon, IBosituasjon } from '../../../models/steg/bosituasjon';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import OmSamboerenDin from './OmSamboerenDin';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import { harFyltUtSamboerDetaljer } from '../../../utils/person';
interface Props {
  settBosituasjon: (bosituasjon: IBosituasjon) => void;
  bosituasjon: IBosituasjon;
}
const OmTidligereSamboer: FC<Props> = ({ settBosituasjon, bosituasjon }) => {
  const intl = useIntl();

  const settDatoFlyttetFraHverandre = (dato: string) => {
    dato !== null &&
      settBosituasjon({
        ...bosituasjon,
        [EBosituasjon.datoFlyttetFraHverandre]: {
          label: hentTekst(
            'bosituasjon.datovelger.nårFlyttetDereFraHverandre',
            intl
          ),
          verdi: dato,
        },
      });
  };

  return (
    <SeksjonGruppe aria-live="polite">
      <OmSamboerenDin
        tittel={'bosituasjon.tittel.omTidligereSamboer'}
        erIdentEllerFødselsdatoObligatorisk={false}
        settBosituasjon={settBosituasjon}
        bosituasjon={bosituasjon}
        samboerDetaljerType={EBosituasjon.samboerDetaljer}
      />
      {bosituasjon.samboerDetaljer &&
        harFyltUtSamboerDetaljer(bosituasjon.samboerDetaljer) && (
          <FeltGruppe>
            <Datovelger
              aria-live="polite"
              valgtDato={
                bosituasjon.datoFlyttetFraHverandre
                  ? bosituasjon.datoFlyttetFraHverandre.verdi
                  : undefined
              }
              tekstid={'bosituasjon.datovelger.nårFlyttetDereFraHverandre'}
              datobegrensning={DatoBegrensning.TidligereDatoer}
              settDato={settDatoFlyttetFraHverandre}
              fetSkrift={true}
            />
          </FeltGruppe>
        )}
    </SeksjonGruppe>
  );
};

export default OmTidligereSamboer;
