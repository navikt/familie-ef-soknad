import React, { FC } from 'react';
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

  const settSøkerSkalGifteSegEllerBliSamboer = (svar: boolean) => {
    settSøknad({
      ...søknad,
      bosituasjon: {
        ...bosituasjon,
        søkerSkalGifteSegEllerBliSamboer: {
          nøkkel: skalSøkerGifteSegMedSamboer.spørsmål_id,
          spørsmål_tekst: intl.formatMessage({
            id: skalSøkerGifteSegMedSamboer.tekstid,
          }),
          svar: svar,
        },
      },
    });
  };

  const settDatoSøkerSkalGifteSegEllerBliSamboer = (dato: Date | null) => {
    dato !== null &&
      settSøknad({
        ...søknad,
        bosituasjon: {
          ...bosituasjon,
          datoSkalGifteSegEllerBliSamboer: dato,
        },
      });
  };

  const resetSamboerDetaljer = () => {
    settSøknad({
      ...søknad,
      bosituasjon: {
        søkerDelerBoligMedAndreVoksne: søkerDelerBoligMedAndreVoksne,
      },
    });
  };

  søkerSkalGifteSegEllerBliSamboer &&
    søkerSkalGifteSegEllerBliSamboer.svar === false &&
    samboerDetaljer &&
    resetSamboerDetaljer();

  return (
    <>
      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={skalSøkerGifteSegMedSamboer}
          onChange={settSøkerSkalGifteSegEllerBliSamboer}
          valgtSvar={
            søkerSkalGifteSegEllerBliSamboer
              ? søkerSkalGifteSegEllerBliSamboer.svar
              : undefined
          }
        />
      </KomponentGruppe>
      {søkerSkalGifteSegEllerBliSamboer &&
      søkerSkalGifteSegEllerBliSamboer.svar === true ? (
        <>
          <KomponentGruppe>
            <Datovelger
              valgtDato={
                datoSkalGifteSegEllerBliSamboer
                  ? datoSkalGifteSegEllerBliSamboer
                  : dagensDato
              }
              tekstid={'datovelger.nårSkalDetteSkje'}
              datobegrensning={DatoBegrensning.FremtidigeDatoer}
              settDato={(e) => settDatoSøkerSkalGifteSegEllerBliSamboer(e)}
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
