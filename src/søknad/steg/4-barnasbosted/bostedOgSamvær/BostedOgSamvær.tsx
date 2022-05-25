import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
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
import { useLokalIntlContext } from '../../../../context/LokalIntlContext';

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
  const intl = useLokalIntlContext();

  const harAnnenForelderSamværMedBarnConfig = harAnnenForelderSamværMedBarn(
    intl,
    barn
  );

  const settBostedOgSamværFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    const nyForelder = {
      ...forelder,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: erJaNeiSvar(svar)
          ? hentBooleanFraValgtSvar(svar)
          : svar.svar_tekst,
      },
    };

    if (
      hvisEndretSvarSlettFeltHvordanPraktiseresSamværet(spørsmål, svar) &&
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

      {forelder.avtaleOmDeltBosted?.verdi !== undefined && (
        <KomponentGruppe>
          <MultiSvarSpørsmålMedNavn
            key={harAnnenForelderSamværMedBarnConfig.søknadid}
            spørsmål={harAnnenForelderSamværMedBarnConfig}
            spørsmålTekst={hentBarnNavnEllerBarnet(
              barn,
              harAnnenForelderSamværMedBarnConfig.tekstid,
              intl
            )}
            valgtSvar={forelder.harAnnenForelderSamværMedBarn?.verdi}
            settSpørsmålOgSvar={settBostedOgSamværFelt}
          />
        </KomponentGruppe>
      )}
      {forelder.avtaleOmDeltBosted?.verdi !== undefined &&
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
