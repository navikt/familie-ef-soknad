import { useEffect, useRef, useState } from 'react';
import { DinSituasjonType } from '../models/steg/dinsituasjon/meromsituasjon';
import { leggTilSærligeBehov } from '../søknad/steg/6-meromsituasjon/SituasjonUtil';
import { ISøknad } from '../models/søknad/søknad';
import { IBarn } from '../models/steg/barn';
import { LokalIntlShape } from '../language/typer';
import {
  byteTilKilobyte,
  filtypeOgFilstørrelseStreng,
} from './nedlastningFilformater';

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useLeggTilSærligeBehovHvisHarEttBarMedSærligeBehov = (
  søknad: ISøknad,
  intl: LokalIntlShape,
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

export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};

export const useHentFilInformasjon = (path: string) => {
  const [filInformasjon, settFilInformasjon] = useState('');

  useEffect(() => {
    const hentFilInformasjon = (url: string) => {
      fetch(url, { method: 'HEAD' }).then((res) => {
        const filStørrelse = byteTilKilobyte(
          res.headers.get('Content-Length') ?? 0
        );
        const filType = res.headers.get('Content-Type') ?? '';
        settFilInformasjon(
          filtypeOgFilstørrelseStreng(filType, Number(filStørrelse))
        );
      });
    };
    hentFilInformasjon(path);
  }, []);

  return { filInformasjon };
};
