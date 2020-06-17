import React, { FC } from 'react';
import { IBosituasjon } from '../../../models/steg/bosituasjon';
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

  const settDatoFlyttetSammen = (dato: Date | null, label: string) => {
    dato !== null &&
      settBosituasjon({
        ...bosituasjon,
        datoFlyttetSammenMedSamboer: {
          label: label,
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
      {(samboerDetaljer?.ident || samboerDetaljer?.fødselsdato) && (
        <FeltGruppe>
          <Datovelger
            valgtDato={
              bosituasjon.datoFlyttetSammenMedSamboer
                ? bosituasjon.datoFlyttetSammenMedSamboer.verdi
                : undefined
            }
            tekstid={'bosituasjon.datovelger.nårFlyttetDereFraHverandre'}
            datobegrensning={DatoBegrensning.TidligereDatoer}
            settDato={(e) =>
              settDatoFlyttetSammen(
                e,
                hentTekst(
                  'bosituasjon.datovelger.nårFlyttetDereFraHverandre',
                  intl
                )
              )
            }
          />
        </FeltGruppe>
      )}
    </SeksjonGruppe>
  );
};

export default OmTidligereSamboer;
