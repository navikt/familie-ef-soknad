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
const EkteskapsliknendeForhold: FC<Props> = ({
  settBosituasjon,
  bosituasjon,
}) => {
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

  console.log('SAMBOERDETALJER', samboerDetaljer);

  return (
    <SeksjonGruppe>
      <OmSamboerenDin
        tittel={'bosituasjon.tittel.omSamboer'}
        erIdentEllerFødselsdatoObligatorisk={true}
        settBosituasjon={settBosituasjon}
        bosituasjon={bosituasjon}
      />
      {(samboerDetaljer?.ident?.verdi ||
        samboerDetaljer?.fødselsdato?.verdi) && (
        <FeltGruppe>
          <Datovelger
            valgtDato={
              bosituasjon.datoFlyttetSammenMedSamboer
                ? bosituasjon.datoFlyttetSammenMedSamboer.verdi
                : undefined
            }
            tekstid={'bosituasjon.datovelger.nårFlyttetDereSammen'}
            datobegrensning={DatoBegrensning.TidligereDatoer}
            settDato={(e) =>
              settDatoFlyttetSammen(
                e,
                hentTekst('bosituasjon.datovelger.nårFlyttetDereSammen', intl)
              )
            }
          />
        </FeltGruppe>
      )}
    </SeksjonGruppe>
  );
};

export default EkteskapsliknendeForhold;
