import { IForelder } from '../../../../models/steg/forelder';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { boddSammenFør } from '../ForeldreConfig';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';
import {
  ESvar,
  ISpørsmål,
  ISvar,
} from '../../../../models/felles/spørsmålogsvar';
import { hentTekst } from '../../../../utils/søknad';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';
import { datoTilStreng } from '../../../../utils/dato';
import JaNeiSpørsmålMedNavn from '../../../../components/spørsmål/JaNeiSpørsmålMedNavn';
import { hentBarnNavnEllerBarnet } from '../../../../utils/barn';
import { IBarn } from '../../../../models/steg/barn';

interface Props {
  forelder: IForelder;
  settForelder: (verdi: IForelder) => void;
  barn: IBarn;
}
const BoddSammenFør: FC<Props> = ({ forelder, barn, settForelder }) => {
  const intl = useIntl();

  const settHarBoddsammenFør = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const nyForelder = {
      ...forelder,
      [boddSammenFør.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: valgtSvar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentBooleanFraValgtSvar(valgtSvar),
      },
    };

    if (valgtSvar.id === ESvar.NEI) {
      delete nyForelder.flyttetFra;
    }

    settForelder(nyForelder);
  };

  return (
    <>
      <KomponentGruppe>
        <JaNeiSpørsmålMedNavn
          spørsmål={boddSammenFør}
          spørsmålTekst={hentBarnNavnEllerBarnet(
            barn,
            boddSammenFør.tekstid,
            intl
          )}
          onChange={(spørsmål, svar) => settHarBoddsammenFør(spørsmål, svar)}
          valgtSvar={forelder.boddSammenFør?.verdi}
        />
      </KomponentGruppe>
      {forelder.boddSammenFør?.verdi && (
        <KomponentGruppe>
          <Datovelger
            settDato={(e: Date | null) => {
              e !== null &&
                settForelder({
                  ...forelder,
                  flyttetFra: {
                    label: intl.formatMessage({
                      id: 'barnasbosted.normaltekst.nårflyttetfra',
                    }),
                    verdi: datoTilStreng(e),
                  },
                });
            }}
            valgtDato={
              forelder.flyttetFra && forelder.flyttetFra.verdi
                ? forelder.flyttetFra.verdi
                : undefined
            }
            tekstid={'barnasbosted.normaltekst.nårflyttetfra'}
            datobegrensning={DatoBegrensning.TidligereDatoer}
            fetSkrift={true}
          />
        </KomponentGruppe>
      )}
    </>
  );
};
export default BoddSammenFør;
