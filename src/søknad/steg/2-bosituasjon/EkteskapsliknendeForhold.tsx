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
const EkteskapsliknendeForhold: FC<Props> = ({
  settBosituasjon,
  bosituasjon,
}) => {
  const intl = useIntl();
  const { samboerDetaljer } = bosituasjon;

  const settDatoFlyttetSammen = (dato: string, label: string) => {
    dato !== null &&
      settBosituasjon({
        ...bosituasjon,
        datoFlyttetSammenMedSamboer: {
          label: label,
          verdi: dato,
        },
      });
  };

  return (
    <SeksjonGruppe>
      <OmSamboerenDin
        tittel={'bosituasjon.tittel.omSamboer'}
        erIdentEllerFødselsdatoObligatorisk={true}
        settBosituasjon={settBosituasjon}
        bosituasjon={bosituasjon}
        samboerDetaljerType={EBosituasjon.samboerDetaljer}
      />
      {samboerDetaljer && harFyltUtSamboerDetaljer(samboerDetaljer, false) && (
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
            fetSkrift={true}
          />
        </FeltGruppe>
      )}
    </SeksjonGruppe>
  );
};

export default EkteskapsliknendeForhold;
