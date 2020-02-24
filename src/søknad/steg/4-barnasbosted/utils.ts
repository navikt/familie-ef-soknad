import {
    harAnnenForelderSamværMedBarn,
    harDereSkriftligSamværsavtale,
    boddSammenFør,
  } from './ForeldreConfig';
import { ISpørsmål } from '../../../models/spørsmal';
import { IForelder } from '../../../models/person';

export const visHvordanPraktiseresSamværet = (valgtSamværsrett: string, intl: any) => {
    return valgtSamværsrett === intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt' });
}

export const visSkriftligSamværsavtaleSpørsmål = (svarAndreForelderenSamvær: string, intl: any) => {
    return svarAndreForelderenSamvær && svarAndreForelderenSamvær !== intl.formatMessage({ id: 'barnasbosted.spm.andreForelderenSamværNei' });
}

export const visSamværsavtaleAdvarsel = (valgtSvar: string, intl: any) => {
    return valgtSvar === intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt' });
}

export const settHarBoddsammenFør = (spørsmål: ISpørsmål, valgtSvar: boolean, settForelder: Function, forelder: IForelder, intl: any) => {
    const nyForelder = {...forelder, [boddSammenFør.spørsmål_id]: valgtSvar};

    if (valgtSvar === false) {
      delete nyForelder.flyttetFra;
    }

    settForelder(nyForelder);
}

export const settHarForelderSamværMedBarn = (spørsmål: string, valgtSvar: string, settForelder: Function, forelder: IForelder, intl: any) => {
    const nyForelder = {...forelder, [harAnnenForelderSamværMedBarn.spørsmål_id]: valgtSvar};

    if (valgtSvar === intl.formatMessage({ id: 'barnasbosted.spm.andreForelderenSamværNei'})) {
      delete nyForelder.harDereSkriftligSamværsavtale;
      delete nyForelder.hvordanPraktiseresSamværet;
    }

    settForelder(nyForelder);
}

export const settHarDereSkriftligSamværsavtale = (spørsmål: string, valgtSvar: string, settForelder: Function, forelder: IForelder, intl: any) => {
    const nyForelder = {...forelder, [harDereSkriftligSamværsavtale.spørsmål_id]: valgtSvar};

    if (valgtSvar !== intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt'})) {
      delete nyForelder.hvordanPraktiseresSamværet;
    }

    settForelder(nyForelder);
}