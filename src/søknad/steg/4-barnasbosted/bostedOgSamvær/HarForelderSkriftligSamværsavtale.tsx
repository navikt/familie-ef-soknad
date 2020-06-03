import React, { FC } from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';
import { harDereSkriftligSamværsavtale } from '../ForeldreConfig';
import { EHarSkriftligSamværsavtale } from '../../../../models/steg/barnasbosted';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';
import { IForelder } from '../../../../models/forelder';
import { ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';

interface Props {
  forelder: IForelder;
  settBostedOgSamværFelt: (spørsmål: ISpørsmål, svar: ISvar) => void;
}
const HarForelderSkriftligSamværsavtale: FC<Props> = ({
  forelder,
  settBostedOgSamværFelt,
}) => {
  return (
    <>
      <KomponentGruppe>
        <MultiSvarSpørsmål
          key={harDereSkriftligSamværsavtale.søknadid}
          spørsmål={harDereSkriftligSamværsavtale}
          valgtSvar={forelder.harDereSkriftligSamværsavtale?.verdi}
          settSpørsmålOgSvar={settBostedOgSamværFelt}
        />
        {(forelder.harDereSkriftligSamværsavtale?.svarid ===
          EHarSkriftligSamværsavtale.jaIkkeKonkreteTidspunkter ||
          forelder.harDereSkriftligSamværsavtale?.svarid ===
            EHarSkriftligSamværsavtale.jaKonkreteTidspunkter) && (
          <FeltGruppe>
            <AlertStripe type={'info'} form="inline">
              <LocaleTekst
                tekst={'barnasbosted.alert.leggeVedSamværsavtalen'}
              />
            </AlertStripe>
          </FeltGruppe>
        )}
      </KomponentGruppe>
    </>
  );
};

export default HarForelderSkriftligSamværsavtale;
