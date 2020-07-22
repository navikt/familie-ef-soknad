import React, { FC } from 'react';
import { IForelder } from '../../../../models/forelder';
import { ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { borINorge } from '../ForeldreConfig';
import { Input } from 'nav-frontend-skjema';
import { hentTekst } from '../../../../utils/søknad';
import { useIntl } from 'react-intl';
import JaNeiSpørsmålMedNavn from '../../../../components/spørsmål/JaNeiSpørsmålMedNavn';
import { IBarn } from '../../../../models/barn';
import { hentBarnNavnEllerBarnet } from '../../../../utils/barn';

interface Props {
  barn: IBarn;
  settFelt: (spørsmål: ISpørsmål, svar: ISvar) => void;
  forelder: IForelder;
  settForelder: (verdi: IForelder) => void;
}

const BorForelderINorge: FC<Props> = ({
  settForelder,
  barn,
  forelder,
  settFelt,
}) => {
  const intl = useIntl();
  return (
    <>
      <KomponentGruppe>
        <JaNeiSpørsmålMedNavn
          spørsmål={borINorge}
          spørsmålTekst={hentBarnNavnEllerBarnet(barn, borINorge.tekstid, intl)}
          onChange={settFelt}
          valgtSvar={forelder.borINorge?.verdi}
        />
      </KomponentGruppe>
      {forelder.borINorge?.verdi === false && (
        <KomponentGruppe>
          <Input
            onChange={(e) =>
              settForelder({
                ...forelder,
                land: {
                  label: hentTekst('barnasbosted.land', intl),
                  verdi: e.target.value,
                },
              })
            }
            value={forelder.land ? forelder.land?.verdi : ''}
            label={hentTekst('barnasbosted.hvilketLand', intl)}
          />
        </KomponentGruppe>
      )}
    </>
  );
};

export default BorForelderINorge;
