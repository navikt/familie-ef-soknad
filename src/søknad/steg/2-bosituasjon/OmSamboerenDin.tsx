import React, { FC } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import PersonInfoGruppe from '../../../components/gruppe/PersonInfoGruppe';
import { useIntl } from 'react-intl';
import { IBosituasjon } from '../../../models/steg/bosituasjon';
import { datoTilStreng } from '../../../utils/dato';
import { hentTekst } from '../../../utils/søknad';

interface Props {
  tittel: string;
  ekteskapsLiknendeForhold: boolean;
  settBosituasjon: (bositasjon: IBosituasjon) => void;
  bosituasjon: IBosituasjon;
}

const OmSamboerenDin: FC<Props> = ({
  tittel,
  ekteskapsLiknendeForhold,
  settBosituasjon,
  bosituasjon,
}) => {
  const intl = useIntl();
  const { samboerDetaljer } = bosituasjon;

  const settFødselsdato = (date: Date | null) => {
    date !== null &&
      settBosituasjon({
        ...bosituasjon,
        samboerDetaljer: {
          ...samboerDetaljer,
          fødselsdato: {
            label: hentTekst('datovelger.fødselsdato', intl),
            verdi: datoTilStreng(date),
          },
        },
      });
  };

  const settSamboerInfo = (
    e: React.FormEvent<HTMLInputElement>,
    objektnøkkel: string
  ) => {
    settBosituasjon({
      ...bosituasjon,
      samboerDetaljer: {
        ...samboerDetaljer,
        [objektnøkkel]: e.currentTarget.value,
      },
    });
  };

  const settDatoFlyttetSammen = (dato: Date | null) => {
    dato !== null &&
      settBosituasjon({
        ...bosituasjon,
        datoFlyttetSammenMedSamboer: {
          label: datovelgerTekst,
          verdi: datoTilStreng(dato),
        },
      });
  };

  const datovelgerTekst = intl.formatMessage({
    id: 'bosituasjon.datovelger.nårFlyttetDereSammen',
  });
  return (
    <KomponentGruppe>
      <PersonInfoGruppe
        tekstid={tittel}
        settPersonInfo={settSamboerInfo}
        settFødselsdato={settFødselsdato}
        valgtPersonInfo={samboerDetaljer ? samboerDetaljer : {}}
      />

      {ekteskapsLiknendeForhold && samboerDetaljer?.fødselsdato && (
        <FeltGruppe>
          <Datovelger
            valgtDato={
              bosituasjon.datoFlyttetSammenMedSamboer
                ? bosituasjon.datoFlyttetSammenMedSamboer.verdi
                : undefined
            }
            tekstid={'bosituasjon.datovelger.nårFlyttetDereSammen'}
            datobegrensning={DatoBegrensning.TidligereDatoer}
            settDato={(e) => settDatoFlyttetSammen(e)}
          />
        </FeltGruppe>
      )}
    </KomponentGruppe>
  );
};

export default OmSamboerenDin;
