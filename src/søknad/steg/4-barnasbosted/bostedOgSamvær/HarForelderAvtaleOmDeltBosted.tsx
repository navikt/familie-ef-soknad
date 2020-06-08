import React, { FC } from 'react';
import { IForelder } from '../../../../models/forelder';
import { ESvar, ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import { avtaleOmDeltBosted } from '../ForeldreConfig';
import { hentSvarAlertFraSpørsmål } from '../../../../utils/søknad';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';

interface Props {
  settBostedOgSamværFelt: (spørsmål: ISpørsmål, svar: ISvar) => void;
  forelder: IForelder;
}

const HarForelderAvtaleOmDeltBosted: FC<Props> = ({
  forelder,
  settBostedOgSamværFelt,
}) => {
  return (
    <KomponentGruppe>
      <JaNeiSpørsmål
        spørsmål={avtaleOmDeltBosted}
        onChange={settBostedOgSamværFelt}
        valgtSvar={forelder.avtaleOmDeltBosted?.verdi}
      />
      {forelder.avtaleOmDeltBosted?.svarid === ESvar.JA && (
        <>
          <AlertStripe type={'advarsel'} form={'inline'}>
            <LocaleTekst
              tekst={hentSvarAlertFraSpørsmål(ESvar.JA, avtaleOmDeltBosted)}
            />
          </AlertStripe>
          <AlertStripe type={'info'} form={'inline'}>
            <LocaleTekst tekst={'barnasbosted.alert-info.avtaleOmDeltBosted'} />
          </AlertStripe>
        </>
      )}
    </KomponentGruppe>
  );
};

export default HarForelderAvtaleOmDeltBosted;
