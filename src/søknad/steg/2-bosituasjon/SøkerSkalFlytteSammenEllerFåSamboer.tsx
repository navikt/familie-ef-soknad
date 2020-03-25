import React, { FC } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import { skalSøkerGifteSegMedSamboer } from './BosituasjonConfig';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { dagensDato } from '../../../utils/dato';
import OmSamboerenDin from './OmSamboerenDin';
import { ISpørsmål } from '../../../models/spørsmalogsvar';
import { IBosituasjon } from '../../../models/steg/bosituasjon';
import { useIntl } from 'react-intl';

interface Props {
  settBosituasjon: (bosituasjon: IBosituasjon) => void;
  bosituasjon: IBosituasjon;
}

const SøkerSkalFlytteSammenEllerFåSamboer: FC<Props> = ({
  settBosituasjon,
  bosituasjon,
}) => {
  const intl = useIntl();

  const {
    søkerDelerBoligMedAndreVoksne,
    søkerSkalGifteSegEllerBliSamboer,
    datoSkalGifteSegEllerBliSamboer,
  } = bosituasjon;

  const spørsmål: ISpørsmål = skalSøkerGifteSegMedSamboer;

  const settSøkerSkalGifteSegEllerBliSamboer = (
    spørsmål: ISpørsmål,
    svar: boolean
  ) => {
    settBosituasjon({
      søkerDelerBoligMedAndreVoksne: søkerDelerBoligMedAndreVoksne,
      søkerSkalGifteSegEllerBliSamboer: {
        label: intl.formatMessage({
          id: spørsmål.tekstid,
        }),
        verdi: svar,
      },
    });
  };

  const settDatoSøkerSkalGifteSegEllerBliSamboer = (
    dato: Date | null,
    label: string
  ) => {
    dato !== null &&
      settBosituasjon({
        ...bosituasjon,
        datoSkalGifteSegEllerBliSamboer: {
          label: label,
          verdi: dato,
        },
      });
  };

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
              settDato={(e) => {
                settDatoSøkerSkalGifteSegEllerBliSamboer(e, datovelgerTekst);
              }}
            />
          </KomponentGruppe>
          {datoSkalGifteSegEllerBliSamboer && (
            <KomponentGruppe>
              <OmSamboerenDin
                tittel={
                  'bosituasjon.tittel.hvemSkalSøkerGifteEllerBliSamboerMed'
                }
                ekteskapsLiknendeForhold={false}
                settBosituasjon={settBosituasjon}
                bosituasjon={bosituasjon}
              />
            </KomponentGruppe>
          )}
        </>
      ) : null}
    </>
  );
};

export default SøkerSkalFlytteSammenEllerFåSamboer;
