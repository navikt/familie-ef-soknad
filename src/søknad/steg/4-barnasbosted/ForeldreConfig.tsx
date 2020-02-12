import { IJaNeiSpørsmål, standardJaNeiSvar } from '../../../models/spørsmal';

export const borINorge: IJaNeiSpørsmål = {
    spørsmål_id: 'borINorge',
    tekstid: 'barnasbosted.borinorge',
    svaralternativer: standardJaNeiSvar,
};

export const avtaleOmDeltBosted: IJaNeiSpørsmål = {
    spørsmål_id: 'avtaleOmdeltBosted',
    tekstid: 'barnasbosted.avtale',
    svaralternativer: standardJaNeiSvar,
};