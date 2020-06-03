import React, { FC } from 'react';
import { IForelder } from '../../../../models/forelder';
import { ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import { borINorge } from '../ForeldreConfig';
import { Input } from 'nav-frontend-skjema';
import { hentTekst } from '../../../../utils/søknad';
import { useIntl } from 'react-intl';

interface Props {
  settFelt: (spørsmål: ISpørsmål, svar: ISvar) => void;
  forelder: IForelder;
  settForelder: Function;
}

const BorForelderINorge: FC<Props> = ({ settForelder, forelder, settFelt }) => {
  const intl = useIntl();
  return (
    <>
      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={borINorge}
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
