import React, { FC } from 'react';
import { IForelder } from '../../../../models/steg/forelder';
import {
  ESvar,
  ISpørsmål,
  ISvar,
} from '../../../../models/felles/spørsmålogsvar';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { avtaleOmDeltBosted } from '../ForeldreConfig';
import { hentSvarAlertFraSpørsmål } from '../../../../utils/søknad';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';
import JaNeiSpørsmålMedNavn from '../../../../components/spørsmål/JaNeiSpørsmålMedNavn';
import { IBarn } from '../../../../models/steg/barn';
import { useIntl } from 'react-intl';
import { hentBarnNavnEllerBarnet } from '../../../../utils/barn';
import AlertStripeDokumentasjon from '../../../../components/AlertstripeDokumentasjon';

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
  const intl = useIntl();
  return (
    <KomponentGruppe>
      <JaNeiSpørsmålMedNavn
        spørsmål={avtaleOmDeltBosted}
        spørsmålTekst={hentBarnNavnEllerBarnet(
          barn,
          avtaleOmDeltBosted.tekstid,
          intl
        )}
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
          <AlertStripeDokumentasjon>
            <LocaleTekst tekst={'barnasbosted.alert-info.avtaleOmDeltBosted'} />
          </AlertStripeDokumentasjon>
        </>
      )}
    </KomponentGruppe>
  );
};

export default HarForelderAvtaleOmDeltBosted;
