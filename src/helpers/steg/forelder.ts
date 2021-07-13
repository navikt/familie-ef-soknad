import {
    EBorAnnenForelderISammeHus,
    EHarSamværMedBarn,
    EHarSkriftligSamværsavtale,
    EHvorforIkkeOppgi,
    EHvorMyeSammen,
} from '../../models/steg/barnasbosted';
import {EForelder, IForelder} from '../../models/steg/forelder';
import {ESvar, ISpørsmål, ISvar} from '../../models/felles/spørsmålogsvar';
import {harValgtSvar} from '../../utils/spørsmålogsvar';
import {erDatoGyldigOgInnaforBegrensninger} from '../../components/dato/utils';
import {DatoBegrensning} from '../../components/dato/Datovelger';
import {erGyldigDato} from '../../utils/dato';

export const erAlleForeldreUtfylt = (foreldre: IForelder[]) =>
    foreldre.every((forelder) => erForelderUtfylt(forelder));

export const erForelderUtfylt = (forelder: IForelder): boolean | undefined => {
    const {navn, fødselsdato, ident, borINorge, land, avtaleOmDeltBosted} = forelder;
    const utfyltBorINorge =
        borINorge?.verdi || (borINorge?.verdi === false && land?.verdi !== '');

    const utfyltFødselsdato = (
        fødselsdato?.verdi !== "" ? erGyldigDato(fødselsdato?.verdi) : true
    );
    const utfyltForelderInfo = navn?.verdi !== "" && (ident?.verdi !== "" || utfyltFødselsdato);

    const utfyltAvtaleDeltBosted = harValgtSvar(avtaleOmDeltBosted?.verdi);
    const forelderInfoOgSpørsmålBesvart: boolean | undefined =
        utfyltForelderInfo &&
        utfyltBorINorge &&
        utfyltAvtaleDeltBosted &&
        utfyltNødvendigeSamværSpørsmål(forelder) &&
        utfyltNødvendigBostedSpørsmål(forelder);

    const kanIkkeOppgiAnnenForelderRuteUtfylt = utfyltNødvendigSpørsmålUtenOppgiAnnenForelder(
        forelder
    );

    return forelderInfoOgSpørsmålBesvart || kanIkkeOppgiAnnenForelderRuteUtfylt;
};

export const utfyltNødvendigSpørsmålUtenOppgiAnnenForelder = (
    forelder: IForelder
) => {
    const {
        hvorforIkkeOppgi,
        ikkeOppgittAnnenForelderBegrunnelse,
        kanIkkeOppgiAnnenForelderFar,
    } = forelder;

    const pgaDonorBarn = hvorforIkkeOppgi?.svarid === EHvorforIkkeOppgi.donorbarn;
    const pgaAnnet =
        hvorforIkkeOppgi?.svarid === EHvorforIkkeOppgi.annet &&
        harValgtSvar(forelder?.ikkeOppgittAnnenForelderBegrunnelse?.verdi) &&
        ikkeOppgittAnnenForelderBegrunnelse?.verdi !== hvorforIkkeOppgi?.verdi;

    return kanIkkeOppgiAnnenForelderFar?.verdi && (pgaDonorBarn || pgaAnnet);
};

export const utfyltNødvendigeSamværSpørsmål = (forelder: IForelder) => {
    const {
        avtaleOmDeltBosted,
        harAnnenForelderSamværMedBarn,
        harDereSkriftligSamværsavtale,
        hvordanPraktiseresSamværet,
    } = forelder;
    const harIkkeAvtaleOmDeltBosted = avtaleOmDeltBosted?.svarid === ESvar.NEI;

    if (
        harIkkeAvtaleOmDeltBosted &&
        harForelderSamværMedBarn(harAnnenForelderSamværMedBarn?.svarid)
    )
        return harValgtSvar(harAnnenForelderSamværMedBarn?.verdi);
    else if (
        harIkkeAvtaleOmDeltBosted &&
        måBeskriveSamværet(
            harDereSkriftligSamværsavtale?.svarid,
            harAnnenForelderSamværMedBarn?.svarid
        )
    )
        return harValgtSvar(hvordanPraktiseresSamværet?.verdi);
    else return true;
};

export const utfyltNødvendigBostedSpørsmål = (forelder?: IForelder) => {
    const utfyltBorISammeHus =
        forelder?.borINorge?.verdi &&
        forelder?.borAnnenForelderISammeHus?.svarid ===
        EBorAnnenForelderISammeHus.ja
            ? forelder?.borAnnenForelderISammeHusBeskrivelse?.verdi !== ''
            : true;

    const harFlyttetFraDato: boolean =
        forelder?.flyttetFra?.verdi &&
        erDatoGyldigOgInnaforBegrensninger(
            forelder.flyttetFra?.verdi,
            DatoBegrensning.TidligereDatoer
        )
            ? true
            : false;

    const utfyltBoddSammenFør =
        forelder?.boddSammenFør?.svarid === ESvar.JA
            ? harValgtSvar(forelder?.boddSammenFør?.verdi) && harFlyttetFraDato
            : harValgtSvar(forelder?.boddSammenFør?.verdi);
    const utfyltHvorMyeSammen =
        forelder?.hvorMyeSammen?.svarid === EHvorMyeSammen.møtesUtenom
            ? harValgtSvar(forelder.beskrivSamværUtenBarn?.verdi)
            : harValgtSvar(forelder?.hvorMyeSammen?.verdi);

    return utfyltBorISammeHus && utfyltBoddSammenFør && utfyltHvorMyeSammen;
};

export const harForelderSamværMedBarn = (svarid: string | undefined) => {
    switch (svarid) {
        case EHarSamværMedBarn.jaIkkeMerEnnVanlig:
            return true;
        case EHarSamværMedBarn.jaMerEnnVanlig:
            return true;
        case EHarSamværMedBarn.nei:
            return false;

        default:
            return false;
    }
};
export const harSkriftligSamværsavtale = (svarid: string | undefined) => {
    switch (svarid) {
        case EHarSkriftligSamværsavtale.jaKonkreteTidspunkter:
            return false;
        case EHarSkriftligSamværsavtale.jaIkkeKonkreteTidspunkter:
            return true;
        case EHarSkriftligSamværsavtale.nei:
            return true;

        default:
            return false;
    }
};

export const måBeskriveSamværet = (
    samværsavtale: string | undefined,
    samværMedBarn: string | undefined
) => {
    return (
        samværMedBarn === EHarSamværMedBarn.jaMerEnnVanlig &&
        (samværsavtale === EHarSkriftligSamværsavtale.jaIkkeKonkreteTidspunkter ||
            samværsavtale === EHarSkriftligSamværsavtale.nei)
    );
};

export const visSpørsmålHvisIkkeSammeForelder = (forelder: IForelder) => {
    if (forelder.harAnnenForelderSamværMedBarn?.svarid === EHarSamværMedBarn.nei)
        return true;
    else if (
        forelder.hvordanPraktiseresSamværet &&
        forelder.hvordanPraktiseresSamværet?.verdi !== ''
    )
        return true;
    else if (forelder.avtaleOmDeltBosted?.svarid === ESvar.JA) return true;
    else if (forelder.harDereSkriftligSamværsavtale?.svarid)
        return !måBeskriveSamværet(
            forelder.harDereSkriftligSamværsavtale.svarid,
            forelder.harAnnenForelderSamværMedBarn?.svarid
        );

    return false;
};

export const hvisEndretSvarSlettFeltHvordanPraktiseresSamværet = (
    spørsmål: ISpørsmål,
    svar: ISvar
) => {
    return (
        (spørsmål.søknadid === EForelder.harDereSkriftligSamværsavtale &&
            svar.id === EHarSkriftligSamværsavtale.nei) ||
        (spørsmål.søknadid === EForelder.harAnnenForelderSamværMedBarn &&
            svar.id === EHarSamværMedBarn.nei)
    );
};

export const harSkriftligAvtaleOmDeltBosted = (
    spørsmål: ISpørsmål,
    svar: ISvar
) => {
    return (
        spørsmål.søknadid === EForelder.avtaleOmDeltBosted && svar.id === ESvar.JA
    );
};
