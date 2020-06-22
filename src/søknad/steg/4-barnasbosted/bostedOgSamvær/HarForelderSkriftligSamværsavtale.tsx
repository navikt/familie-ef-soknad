import React, { FC } from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { harDereSkriftligSamværsavtale } from '../ForeldreConfig';
import { EHarSkriftligSamværsavtale } from '../../../../models/steg/barnasbosted';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';
import { IForelder } from '../../../../models/forelder';
import { ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import { IBarn } from '../../../../models/barn';
import MultiSvarSpørsmålMedNavn from '../../../../components/spørsmål/MultiSvarSpørsmålMedNavn';
import { hentBarnNavnEllerBarnet } from '../../../../utils/barn';
import { useIntl } from 'react-intl';

interface Props {
  forelder: IForelder;
  settBostedOgSamværFelt: (spørsmål: ISpørsmål, svar: ISvar) => void;
  barn: IBarn;
}
const HarForelderSkriftligSamværsavtale: FC<Props> = ({
  forelder,
  settBostedOgSamværFelt,
  barn,
}) => {
  const intl = useIntl();
  return (
    <>
      <KomponentGruppe>
        <MultiSvarSpørsmålMedNavn
          key={harDereSkriftligSamværsavtale.søknadid}
          spørsmål={harDereSkriftligSamværsavtale}
          spørsmålTekst={hentBarnNavnEllerBarnet(
            barn,
            harDereSkriftligSamværsavtale.tekstid,
            intl
          )}
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
