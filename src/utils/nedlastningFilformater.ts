export const byteTilKilobyte = (tall: number): number => {
    return tall / 1024
}

export const rundOppTilToDesimaler = (tall: number) => {
    return Number(Number(tall).toFixed(2));
}

export const filtypeTekst = (typeTekst: string): string => {
    return typeTekst.slice(typeTekst.indexOf('/') + 1).toUpperCase()
}

export const filStorresleOgTypeStreng = (filtype: string, filstorrelse: number): string => {
    return filstorrelse != 0 ? ` (${filtypeTekst(filtype)}, ${rundOppTilToDesimaler(filstorrelse)}kb)` : ''
}
