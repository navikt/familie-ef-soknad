import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import { harAnnenForelderSamværMedBarn } from '../ForeldreConfig';

import HvordanPraktiseresSamværet from '../HvordanPraktiseresSamværet';
import {
  ESvar,
  ISpørsmål,
  ISvar,
} from '../../../../models/felles/spørsmålogsvar';
import { hentTekst } from '../../../../utils/søknad';
import { EForelder, IForelder } from '../../../../models/steg/forelder';
import {
  erJaNeiSvar,
  hentBooleanFraValgtSvar,
} from '../../../../utils/spørsmålogsvar';

import HarForelderAvtaleOmDeltBosted from './HarForelderAvtaleOmDeltBosted';
import HarForelderSkriftligSamværsavtale from './HarForelderSkriftligSamværsavtale';
import {
  harForelderSamværMedBarn,
  hvisEndretSvarSlettFeltHvordanPraktiseresSamværet,
  harSkriftligAvtaleOmDeltBosted,
  måBeskriveSamværet,
} from '../../../../helpers/steg/forelder';
import { IBarn } from '../../../../models/steg/barn';
import MultiSvarSpørsmålMedNavn from '../../../../components/spørsmål/MultiSvarSpørsmålMedNavn';
import { hentBarnNavnEllerBarnet } from '../../../../utils/barn';

interface Props {
  settForelder: (verdi: IForelder) => void;
  forelder: IForelder;
  barn: IBarn;
  settDokumentasjonsbehovForBarn: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    barneid: string,
    barnepassid?: string
  ) => void;
}

const BostedOgSamvær: React.FC<Props> = ({
  settForelder,
  forelder,
  barn,
  settDokumentasjonsbehovForBarn,
}) => {
  const intl = useIntl();

  const settBostedOgSamværFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    const nyForelder = {
      ...forelder,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: erJaNeiSvar(svar)
          ? hentBooleanFraValgtSvar(svar)
          : hentTekst(svar.svar_tekstid, intl),
      },
    };

    if (
      hvisEndretSvarSlettFeltHvordanPraktiseresSamværet &&
      nyForelder.hvordanPraktiseresSamværet
    )
      delete nyForelder.hvordanPraktiseresSamværet;

    if (
      spørsmål.søknadid === EForelder.borINorge &&
      nyForelder.land &&
      svar.id === ESvar.JA
    ) {
      delete nyForelder.land;
    }

    if (harSkriftligAvtaleOmDeltBosted(spørsmål, svar)) {
      delete nyForelder.harAnnenForelderSamværMedBarn;
      delete nyForelder.harDereSkriftligSamværsavtale;
    }

    settForelder(nyForelder);
    settDokumentasjonsbehovForBarn(spørsmål, svar, barn.id);
  };

  return (
    <>
      <HarForelderAvtaleOmDeltBosted
        settBostedOgSamværFelt={settBostedOgSamværFelt}
        forelder={forelder}
        barn={barn}
      />

      {forelder.avtaleOmDeltBosted?.svarid === ESvar.NEI && (
        <KomponentGruppe>
          <MultiSvarSpørsmålMedNavn
            key={harAnnenForelderSamværMedBarn.søknadid}
            spørsmål={harAnnenForelderSamværMedBarn}
            spørsmålTekst={hentBarnNavnEllerBarnet(
              barn,
              harAnnenForelderSamværMedBarn.tekstid,
              intl
            )}
            valgtSvar={forelder.harAnnenForelderSamværMedBarn?.verdi}
            settSpørsmålOgSvar={settBostedOgSamværFelt}
          />
        </KomponentGruppe>
      )}
      {forelder.avtaleOmDeltBosted?.svarid === ESvar.NEI &&
        harForelderSamværMedBarn(
          forelder.harAnnenForelderSamværMedBarn?.svarid
        ) && (
          <HarForelderSkriftligSamværsavtale
            forelder={forelder}
            settBostedOgSamværFelt={settBostedOgSamværFelt}
            barn={barn}
          />
        )}
      {måBeskriveSamværet(
        forelder.harDereSkriftligSamværsavtale?.svarid,
        forelder.harAnnenForelderSamværMedBarn?.svarid
      ) && (
        <HvordanPraktiseresSamværet
          forelder={forelder}
          settForelder={settForelder}
        />
      )}
    </>
  );
};

export default BostedOgSamvær;
