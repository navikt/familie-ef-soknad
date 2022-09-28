import tekster_nb from "../../src/language/tekster_nb";

export const norskTekst = (tekstid: string, navn?: string): string => {
    // @ts-ignore
    const tekst = tekster_nb[tekstid];
    return navn ? tekst.replace('[0]', navn) : tekst;
};

export const barnetsNavn = 'Hei På Deg';

export const JaSvar = tekster_nb['svar.ja'];

export const NeiSvar = tekster_nb['svar.nei'];