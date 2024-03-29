import React, { FC } from 'react';
import { IForelder } from '../../../../models/steg/forelder';
import { ISpørsmål, ISvar } from '../../../../models/felles/spørsmålogsvar';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { avtaleOmDeltBosted } from '../ForeldreConfig';
import LocaleTekst from '../../../../language/LocaleTekst';
import JaNeiSpørsmålMedNavn from '../../../../components/spørsmål/JaNeiSpørsmålMedNavn';
import { IBarn } from '../../../../models/steg/barn';
import { hentBarnNavnEllerBarnet } from '../../../../utils/barn';
import AlertStripeDokumentasjon from '../../../../components/AlertstripeDokumentasjon';
import { useLokalIntlContext } from '../../../../context/LokalIntlContext';

interface Props {
  settBostedOgSamværFelt: (spørsmål: ISpørsmål, svar: ISvar) => void;
  forelder: IForelder;
  barn: IBarn;
}

const HarForelderAvtaleOmDeltBosted: FC<Props> = ({
  forelder,
  barn,
  settBostedOgSamværFelt,
}) => {
  const intl = useLokalIntlContext();
  const født = !!barn.født?.verdi;
  return (
    <KomponentGruppe>
      <JaNeiSpørsmålMedNavn
        spørsmål={avtaleOmDeltBosted(intl, født)}
        spørsmålTekst={hentBarnNavnEllerBarnet(
          barn,
          avtaleOmDeltBosted(intl, født).tekstid,
          intl
        )}
        onChange={settBostedOgSamværFelt}
        valgtSvar={forelder.avtaleOmDeltBosted?.verdi}
      />
      {forelder.avtaleOmDeltBosted?.verdi === true && (
        <>
          <AlertStripeDokumentasjon>
            <LocaleTekst tekst={'barnasbosted.alert-info.avtaleOmDeltBosted'} />
          </AlertStripeDokumentasjon>
        </>
      )}
    </KomponentGruppe>
  );
};

export default HarForelderAvtaleOmDeltBosted;
