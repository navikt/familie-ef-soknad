import React, { FC } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { injectIntl, IntlShape } from 'react-intl';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import PersonInfoGruppe from '../../../components/gruppe/PersonInfoGruppe';
import useSøknadContext from '../../../context/SøknadContext';
import { IPersonDetaljer } from '../../../models/søknad';

interface Props {
  intl: IntlShape;
  samboerDetaljer: IPersonDetaljer;
}

const OmSamboerenDin: FC<Props> = ({ intl, samboerDetaljer }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { bosituasjon } = søknad;

  const settFødselsdato = (date: Date | null) => {
    date !== null &&
      settSøknad({
        ...søknad,
        bosituasjon: {
          ...bosituasjon,
          samboerDetaljer: { ...samboerDetaljer, fødselsdato: date },
        },
      });
  };

  const settSamboerInfo = (
    e: React.FormEvent<HTMLInputElement>,
    objektnøkkel: string
  ) => {
    samboerDetaljer &&
      settSøknad({
        ...søknad,
        bosituasjon: {
          ...bosituasjon,
          samboerDetaljer: {
            ...samboerDetaljer,
            [objektnøkkel]: e.currentTarget.value,
          },
        },
      });
  };

  const datofornå = new Date();
  const settDatoFlyttetSammen = (dato: Date | null, objektnøkkel: string) => {
    console.log('setter dato', dato);
  };

  return (
    <KomponentGruppe>
      <PersonInfoGruppe
        tekstid={'bosituasjon.tittel.omSamboer'}
        settPersonInfo={settSamboerInfo}
        settFødselsdato={settFødselsdato}
        valgtPersonInfo={samboerDetaljer}
      />
      <FeltGruppe>
        <Datovelger
          valgtDato={datofornå}
          tekstid={'bosituasjon.datovelger.nårFlyttetDereSammen'}
          datobegrensning={DatoBegrensning.TidligereDatoer}
          settDato={(e) =>
            settDatoFlyttetSammen(e, 'datoFlyttetSammenMedSamboer')
          }
        />
      </FeltGruppe>
    </KomponentGruppe>
  );
};

export default injectIntl(OmSamboerenDin);
