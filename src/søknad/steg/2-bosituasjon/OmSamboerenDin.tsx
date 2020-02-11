import React, { FC, useEffect } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import PersonInfoGruppe from '../../../components/gruppe/PersonInfoGruppe';
import useSøknadContext from '../../../context/SøknadContext';
import { tomPersonInfo } from '../../../utils/person';
import { useIntl } from 'react-intl';

interface Props {
  tittel: string;
  ekteskapsLiknendeForhold: boolean;
}

const OmSamboerenDin: FC<Props> = ({ tittel, ekteskapsLiknendeForhold }) => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknadContext();
  const { bosituasjon } = søknad;
  const { samboerDetaljer } = bosituasjon;

  const settFødselsdato = (date: Date | null) => {
    date !== null &&
      samboerDetaljer &&
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

  const settDatoFlyttetSammen = (dato: Date | null) => {
    dato !== null &&
      settSøknad({
        ...søknad,
        bosituasjon: {
          ...bosituasjon,
          datoFlyttetSammenMedSamboer: {
            label: datovelgerTekst,
            verdi: dato,
          },
        },
      });
  };

  useEffect(() => {
    settSøknad({
      ...søknad,
      bosituasjon: { ...bosituasjon, samboerDetaljer: tomPersonInfo },
    });
    // eslint-disable-next-line
  }, []);

  const datovelgerTekst = intl.formatMessage({
    id: 'bosituasjon.datovelger.nårFlyttetDereSammen',
  });
  return (
    <KomponentGruppe>
      <PersonInfoGruppe
        tekstid={tittel}
        settPersonInfo={settSamboerInfo}
        settFødselsdato={settFødselsdato}
        valgtPersonInfo={samboerDetaljer ? samboerDetaljer : tomPersonInfo}
      />

      {ekteskapsLiknendeForhold === true ? (
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
      ) : null}
    </KomponentGruppe>
  );
};

export default OmSamboerenDin;
