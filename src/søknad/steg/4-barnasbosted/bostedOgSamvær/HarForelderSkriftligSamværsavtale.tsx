import React, { FC } from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { harDereSkriftligSamværsavtale } from '../ForeldreConfig';
import { EHarSkriftligSamværsavtale } from '../../../../models/steg/barnasbosted';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import { IForelder } from '../../../../models/steg/forelder';
import { ISpørsmål, ISvar } from '../../../../models/felles/spørsmålogsvar';
import { IBarn } from '../../../../models/steg/barn';
import MultiSvarSpørsmålMedNavn from '../../../../components/spørsmål/MultiSvarSpørsmålMedNavn';
import { hentBarnNavnEllerBarnet } from '../../../../utils/barn';
import { useIntl } from 'react-intl';
import AlertStripeDokumentasjon from '../../../../components/AlertstripeDokumentasjon';

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
  const harDereSkriftligSamværsavtaleSpm = harDereSkriftligSamværsavtale(intl);
  return (
    <>
      <KomponentGruppe>
        <MultiSvarSpørsmålMedNavn
          key={harDereSkriftligSamværsavtaleSpm.søknadid}
          spørsmål={harDereSkriftligSamværsavtaleSpm}
          spørsmålTekst={hentBarnNavnEllerBarnet(
            barn,
            harDereSkriftligSamværsavtaleSpm.tekstid,
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
            <AlertStripeDokumentasjon>
              <LocaleTekst
                tekst={'barnasbosted.alert.leggeVedSamværsavtalen'}
              />
            </AlertStripeDokumentasjon>
          </FeltGruppe>
        )}
      </KomponentGruppe>
    </>
  );
};

export default HarForelderSkriftligSamværsavtale;
