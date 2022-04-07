import { object, string, array } from 'yup';

// eslint-disable-next-line
const datoRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

export enum ManglendeFelter {
  BOSITUASJONEN_DIN = 'BOSITUASJONEN_DIN',
  OM_DEG = 'OM_DEG',
  MER_OM_DIN_SITUASJON = 'MER_OM_DIN_SITUASJON',
}

export const manglendeFelterTilTekst: Record<ManglendeFelter, string> = {
  BOSITUASJONEN_DIN: 'Bosituasjonen din',
  OM_DEG: 'Om deg',
  MER_OM_DIN_SITUASJON: 'Mer om din situasjon',
};

export const listManglendeFelter = (manglendeFelter: string[]) => {
  const unikeManglendeFelter = [...new Set(manglendeFelter)];

  if (unikeManglendeFelter.length === 1) {
    return 'steg ' + unikeManglendeFelter[0];
  }

  return unikeManglendeFelter.map((item, index) => {
    if (index === 0) {
      return 'stegene ' + item;
    } else if (index === unikeManglendeFelter.length - 1) {
      return ' og ' + item;
    } else {
      return item + ', ';
    }
  });
};

export const medlemskapSchema = object({
  perioderBoddIUtlandet: array()
    .of(
      object({
        periode: object({
          fra: object({
            label: string().required(),
            verdi: string()
              .required()
              .matches(datoRegex, 'Ikke en gyldig dato'),
          }),
          til: object({
            label: string().required(),
            verdi: string()
              .required()
              .matches(datoRegex, 'Ikke en gyldig dato'),
          }),
        }),
      })
    )
    .default(undefined),
});

export const merOmDinSituasjonSchema = object({
  datoSagtOppEllerRedusertStilling: object({
    label: string().required(),
    verdi: string().required().matches(datoRegex, 'Ikke en gyldig dato'),
  }).default(undefined),
});

export const sivilstatusSchema = object({
  datoForSamlivsbrudd: object({
    label: string().required(),
    verdi: string().required().matches(datoRegex, 'Ikke en gyldig dato'),
  }).default(undefined),
});

export const bosituasjonSchema = object({
  datoSkalGifteSegEllerBliSamboer: object({
    label: string().required(),
    verdi: string().required().matches(datoRegex, 'Ikke en gyldig dato'),
  }).default(undefined),
  vordendeSamboerEktefelle: object({
    fødselsdato: object({
      label: string().required(),
      verdi: string().required().matches(datoRegex, 'Ikke en gyldig dato'),
    }),
  }).default(undefined),
});
