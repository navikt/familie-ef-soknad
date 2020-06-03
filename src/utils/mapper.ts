import { ISivilstatus } from '../models/steg/omDeg/sivilstatus';
import { ISøknad } from '../models/søknad';
import { IMedlemskap } from '../models/steg/omDeg/medlemskap';
import { IBosituasjon } from '../models/steg/bosituasjon';

export const mapSøknad = (søknad: ISøknad) => {
  const mappetSøknad = {
    ...søknad,
    sivilstatus: mapOmDeg(søknad.sivilstatus),
    medlemskap: mapOmDeg(søknad.medlemskap),
    bosituasjon: mapBosituasjon(søknad.bosituasjon),
  };


  return mappetSøknad;
};

export const mapOmDeg = (objekt: ISivilstatus | IMedlemskap) => {
  const nyttSivilstatusObjekt: any = {};

  for (const [key, value] of Object.entries(objekt)) {
    nyttSivilstatusObjekt[key] = {
      label: value['label'],
      verdi: value['verdi'],
    };
  }
  return nyttSivilstatusObjekt;
};
export const mapBosituasjon = (bosituasjon: IBosituasjon) => {
  const nyttObjekt: any = {};

  for (const [key, value] of Object.entries(bosituasjon)) {
    if (value['label']) {
      nyttObjekt[key] = {
        label: value['label'],
        verdi: value['verdi'],
      };
    } else {
      nyttObjekt[key] = value;
    }
  }
  return nyttObjekt;
};
