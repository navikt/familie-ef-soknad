import React, { FC } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import { skalSøkerGifteSegMedSamboer } from './BosituasjonConfig';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import OmSamboerenDin from './OmSamboerenDin';
import { ISpørsmål } from '../../../models/spørsmålogsvar';
import { IBosituasjon } from '../../../models/steg/bosituasjon';
import { useIntl } from 'react-intl';
import { hentBooleanFraValgtSvar } from '../../../utils/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import { ISvar } from '../../../models/spørsmålogsvar';
import { useSøknad } from '../../../context/SøknadContext';

interface Props {
  settBosituasjon: (bosituasjon: IBosituasjon) => void;
  bosituasjon: IBosituasjon;
}

const SøkerSkalFlytteSammenEllerFåSamboer: FC<Props> = ({
  settBosituasjon,
  bosituasjon,
}) => {
  const intl = useIntl();
  const { settDokumentasjonsbehov } = useSøknad();

  const {
    delerBoligMedAndreVoksne,
    skalGifteSegEllerBliSamboer,
    datoSkalGifteSegEllerBliSamboer,
  } = bosituasjon;

  const spørsmål: ISpørsmål = skalSøkerGifteSegMedSamboer;

  const settSøkerSkalGifteSegEllerBliSamboer = (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar
  ) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);

    settBosituasjon({
      delerBoligMedAndreVoksne: delerBoligMedAndreVoksne,
      skalGifteSegEllerBliSamboer: {
        spørsmålid: spørsmål.søknadid,
        svarid: valgtSvar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar,
      },
    });
    settDokumentasjonsbehov(spørsmål, valgtSvar);
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
            skalGifteSegEllerBliSamboer
              ? skalGifteSegEllerBliSamboer.verdi
              : undefined
          }
        />
      </KomponentGruppe>
      {skalGifteSegEllerBliSamboer &&
      skalGifteSegEllerBliSamboer.verdi === true ? (
        <>
          <KomponentGruppe>
            <Datovelger
              valgtDato={datoSkalGifteSegEllerBliSamboer?.verdi}
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
