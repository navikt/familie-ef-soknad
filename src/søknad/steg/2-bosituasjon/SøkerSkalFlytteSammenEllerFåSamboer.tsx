import React, { FC, useEffect } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import { skalSøkerGifteSegMedSamboer } from './BosituasjonConfig';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { dagensDato } from '../../../utils/dato';
import OmSamboerenDin from './OmSamboerenDin';
import useSøknadContext from '../../../context/SøknadContext';
import { injectIntl, IntlShape } from 'react-intl';
import { IJaNeiSpørsmål } from '../../../models/spørsmal';

const SøkerSkalFlytteSammenEllerFåSamboer: FC<{ intl: IntlShape }> = ({
  intl,
}) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { bosituasjon } = søknad;
  const {
    søkerDelerBoligMedAndreVoksne,
    søkerSkalGifteSegEllerBliSamboer,
    datoSkalGifteSegEllerBliSamboer,
    samboerDetaljer,
  } = bosituasjon;

  const spørsmål: IJaNeiSpørsmål = skalSøkerGifteSegMedSamboer;

  const settSøkerSkalGifteSegEllerBliSamboer = (
    spørsmål: IJaNeiSpørsmål,
    svar: boolean
  ) => {
    settSøknad({
      ...søknad,
      bosituasjon: {
        ...bosituasjon,
        søkerSkalGifteSegEllerBliSamboer: {
          label: intl.formatMessage({
            id: spørsmål.tekstid,
          }),
          verdi: svar,
        },
      },
    });
  };

  const settDatoSøkerSkalGifteSegEllerBliSamboer = (
    dato: Date | null,
    label: string
  ) => {
    dato !== null &&
      settSøknad({
        ...søknad,
        bosituasjon: {
          ...bosituasjon,
          datoSkalGifteSegEllerBliSamboer: {
            label: label,
            verdi: dato,
          },
        },
      });
  };

  useEffect(() => {
    const resetSamboerDetaljer = () => {
      settSøknad({
        ...søknad,
        bosituasjon: {
          søkerDelerBoligMedAndreVoksne: søkerDelerBoligMedAndreVoksne,
          søkerSkalGifteSegEllerBliSamboer: søkerSkalGifteSegEllerBliSamboer,
        },
      });
    };
    søkerSkalGifteSegEllerBliSamboer &&
      søkerSkalGifteSegEllerBliSamboer.verdi === false &&
      samboerDetaljer &&
      resetSamboerDetaljer();
  }, [
    søkerSkalGifteSegEllerBliSamboer,
    samboerDetaljer,
    settSøknad,
    søknad,
    søkerDelerBoligMedAndreVoksne,
  ]);

  const datovelgerTekst = intl.formatMessage({
    id: 'datovelger.nårSkalDetteSkje',
  });

  return (
    <>
      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={spørsmål}
          onChange={settSøkerSkalGifteSegEllerBliSamboer}
          valgtSvar={
            søkerSkalGifteSegEllerBliSamboer
              ? søkerSkalGifteSegEllerBliSamboer.verdi
              : undefined
          }
        />
      </KomponentGruppe>
      {søkerSkalGifteSegEllerBliSamboer &&
      søkerSkalGifteSegEllerBliSamboer.verdi === true ? (
        <>
          <KomponentGruppe>
            <Datovelger
              valgtDato={
                datoSkalGifteSegEllerBliSamboer
                  ? datoSkalGifteSegEllerBliSamboer.verdi
                  : dagensDato
              }
              tekstid={'datovelger.nårSkalDetteSkje'}
              datobegrensning={DatoBegrensning.FremtidigeDatoer}
              settDato={(e) =>
                settDatoSøkerSkalGifteSegEllerBliSamboer(e, datovelgerTekst)
              }
            />
          </KomponentGruppe>
          <KomponentGruppe>
            <OmSamboerenDin
              tittel={'bosituasjon.tittel.hvemSkalSøkerGifteEllerBliSamboerMed'}
              ekteskapsLiknendeForhold={false}
            />
          </KomponentGruppe>
        </>
      ) : null}
    </>
  );
};

export default injectIntl(SøkerSkalFlytteSammenEllerFåSamboer);
