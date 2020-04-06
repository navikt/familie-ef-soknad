import { useState } from 'react';
import createUseContext from 'constate';
import { ISøknad } from '../models/søknad';
import { dagensDato } from '../utils/dato';
import { EArbeidssituasjon } from '../models/steg/aktivitet/aktivitet';
import personIngenBarn from '../mock/personIngenBarn.json';
import { ESituasjon } from '../models/steg/dinsituasjon/meromsituasjon';
import { EBosituasjon } from '../models/steg/bosituasjon';
import { ISpørsmål, ISvar } from '../models/spørsmålogsvar';
import { hentIdHvisFinnesIListe } from '../utils/søknad';
import { IDokumentasjon } from '../models/dokumentasjon';

// -----------  CONTEXT  -----------
const initialState: ISøknad = {
  person: personIngenBarn,
  sivilstatus: {},
  medlemskap: {},
  bosituasjon: {
    delerBoligMedAndreVoksne: {
      spørsmålid: EBosituasjon.delerBoligMedAndreVoksne,
      svarid: '',
      label: '',
      verdi: '',
    },
  },
  aktivitet: {
    hvaErDinArbeidssituasjon: {
      spørsmålid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
      svarid: [],
      label: '',
      verdi: [],
    },
  },
  merOmDinSituasjon: {
    gjelderDetteDeg: {
      spørsmålid: ESituasjon.gjelderDetteDeg,
      svarid: [],
      label: '',
      verdi: [],
    },
    søknadsdato: { label: '', verdi: dagensDato },
  },
  dokumentasjonsbehov: [],
  vedleggsliste: [],
};

const [SøknadProvider, useSøknad] = createUseContext(() => {
  const [søknad, settSøknad] = useState<ISøknad>(initialState);

  const settDokumentasjonsbehov = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    let endretDokumentasjonsbehov = søknad.dokumentasjonsbehov;
    let svaridTilBehov: string | undefined = '';

    const dokumentasjonsbehovTilSpørsmålOgSvar:
      | IDokumentasjon
      | undefined = søknad.dokumentasjonsbehov.find((behov) => {
      svaridTilBehov =
        typeof behov.svarid === 'string'
          ? behov.svarid
          : hentIdHvisFinnesIListe(valgtSvar.id, behov.svarid);
      return behov.spørsmålid === spørsmål.søknadid && svaridTilBehov;
    });

    if (dokumentasjonsbehovTilSpørsmålOgSvar) {
      endretDokumentasjonsbehov = endretDokumentasjonsbehov.filter(
        (dokumentasjonbehov) => {
          return (
            dokumentasjonbehov.spørsmålid !== spørsmål.søknadid &&
            svaridTilBehov !== valgtSvar.id
          );
        }
      );
    } else {
      valgtSvar.dokumentasjonsbehov &&
        endretDokumentasjonsbehov.push(valgtSvar.dokumentasjonsbehov);
    }
    settSøknad({ ...søknad, dokumentasjonsbehov: endretDokumentasjonsbehov });
  };

  return { søknad, settSøknad, settDokumentasjonsbehov };
});

export { SøknadProvider, useSøknad };
