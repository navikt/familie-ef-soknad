import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';
import { harAnnenForelderSamværMedBarn } from '../ForeldreConfig';

import HvordanPraktiseresSamværet from '../HvordanPraktiseresSamværet';
import { ESvar, ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import { hentTekst } from '../../../../utils/søknad';
import { EForelder, IForelder } from '../../../../models/forelder';
import {
  erJaNeiSvar,
  harValgtSvar,
  hentBooleanFraValgtSvar,
} from '../../../../utils/spørsmålogsvar';
import { useSøknad } from '../../../../context/SøknadContext';
import {
  EHarSamværMedBarn,
  EHarSkriftligSamværsavtale,
} from '../../../../models/steg/barnasbosted';
import HarForelderAvtaleOmDeltBosted from './HarForelderAvtaleOmDeltBosted';
import HarForelderSkriftligSamværsavtale from './HarForelderSkriftligSamværsavtale';
import {
  harForelderSamværMedBarn,
  harSkriftligSamværsavtale,
} from '../../../../helpers/forelder';

interface Props {
  settForelder: Function;
  forelder: IForelder;
}

const BostedOgSamvær: React.FC<Props> = ({ settForelder, forelder }) => {
  const intl = useIntl();
  const { settDokumentasjonsbehov } = useSøknad();

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
      spørsmål.søknadid === EForelder.harDereSkriftligSamværsavtale &&
      svar.id === EHarSkriftligSamværsavtale.nei &&
      nyForelder.hvordanPraktiseresSamværet
    )
      delete nyForelder.hvordanPraktiseresSamværet;

    if (
      spørsmål.søknadid === EForelder.harAnnenForelderSamværMedBarn &&
      svar.id === EHarSamværMedBarn.nei &&
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

    settForelder(nyForelder);
    settDokumentasjonsbehov(spørsmål, svar);
  };

  return (
    <>
      <HarForelderAvtaleOmDeltBosted
        settBostedOgSamværFelt={settBostedOgSamværFelt}
        forelder={forelder}
      />

      {harValgtSvar(forelder.avtaleOmDeltBosted?.verdi) && (
        <KomponentGruppe>
          <MultiSvarSpørsmål
            key={harAnnenForelderSamværMedBarn.søknadid}
            spørsmål={harAnnenForelderSamværMedBarn}
            valgtSvar={forelder.harAnnenForelderSamværMedBarn?.verdi}
            settSpørsmålOgSvar={settBostedOgSamværFelt}
          />
        </KomponentGruppe>
      )}
      {harForelderSamværMedBarn(
        forelder.harAnnenForelderSamværMedBarn?.svarid
      ) && (
        <HarForelderSkriftligSamværsavtale
          forelder={forelder}
          settBostedOgSamværFelt={settBostedOgSamværFelt}
        />
      )}
      {harSkriftligSamværsavtale(
        forelder.harDereSkriftligSamværsavtale?.svarid
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
