import { useEffect, useRef, useState } from 'react';
import { client } from './sanity';
import { ForsideType } from '../models/søknad/stønadstyper';
import { DinSituasjonType } from '../models/steg/dinsituasjon/meromsituasjon';
import { leggTilSærligeBehov } from '../søknad/steg/6-meromsituasjon/SituasjonUtil';
import { ISøknad } from '../models/søknad/søknad';
import { IntlShape } from 'react-intl';
import { IBarn } from '../models/steg/barn';

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useForsideInnhold = (stønadstype: ForsideType): any => {
  const [innhold, settInnhold] = useState({});
  useEffect(() => {
    client
      .fetch('*[_type == $type][0]', { type: stønadstype })
      .then((res: any) => {
        settInnhold(res);
      });
    // eslint-disable-next-line
  }, []);
  return innhold;
};

export const useLeggTilSærligeBehovHvisHarEttBarMedSærligeBehov = (
  søknad: ISøknad,
  intl: IntlShape,
  oppdaterBarnISoknaden: (barn: IBarn) => void
): void => {
  useEffect(() => {
    if (søknad.person.barn.length === 1) {
      const barn = søknad.person.barn[0];
      const harSvartJaPåAtHarBarnMedSærligeBehov =
        søknad.merOmDinSituasjon.gjelderDetteDeg.svarid.findIndex(
          (v) => v === DinSituasjonType.harBarnMedSærligeBehov
        ) > -1;
      if (!barn.særligeTilsynsbehov && harSvartJaPåAtHarBarnMedSærligeBehov) {
        const oppdatertBarn = leggTilSærligeBehov(barn, intl);
        oppdaterBarnISoknaden(oppdatertBarn);
      }
      if (barn.særligeTilsynsbehov && !harSvartJaPåAtHarBarnMedSærligeBehov) {
        const { særligeTilsynsbehov, ...rest } = barn;
        oppdaterBarnISoknaden(rest);
      }
    }
  }, [
    søknad.person.barn,
    oppdaterBarnISoknaden,
    søknad.merOmDinSituasjon.gjelderDetteDeg.svarid,
    intl,
  ]);
};
