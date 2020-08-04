import React, { FC } from 'react';
import { EBosituasjon, IBosituasjon } from '../../../models/steg/bosituasjon';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import OmSamboerenDin from './OmSamboerenDin';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { hentTekst } from '../../../utils/søknad';
import { datoTilStreng } from '../../../utils/dato';
import { useIntl } from 'react-intl';
interface Props {
  settBosituasjon: (bosituasjon: IBosituasjon) => void;
  bosituasjon: IBosituasjon;
}
const OmTidligereSamboer: FC<Props> = ({ settBosituasjon, bosituasjon }) => {
  const intl = useIntl();
  const { samboerDetaljer } = bosituasjon;

  const settDatoFlyttetFraHverandre = (dato: Date | null) => {
    dato !== null &&
      settBosituasjon({
        ...bosituasjon,
        [EBosituasjon.datoFlyttetFraHverandre]: {
          label: hentTekst(
            'bosituasjon.datovelger.nårFlyttetDereFraHverandre',
            intl
          ),
          verdi: datoTilStreng(dato),
        },
      });
  };

  return (
    <SeksjonGruppe>
      <OmSamboerenDin
        tittel={'bosituasjon.tittel.omTidligereSamboer'}
        erIdentEllerFødselsdatoObligatorisk={false}
        settBosituasjon={settBosituasjon}
        bosituasjon={bosituasjon}
      />
      {samboerDetaljer?.navn && (
        <FeltGruppe>
          <Datovelger
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
