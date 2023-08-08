import React, { RefObject, useEffect, useRef, useState } from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import BarnetsBostedLagtTil from '../../../søknad/steg/4-barnasbosted/BarnetsBostedLagtTil';
import BarnetsBostedEndre from '../../../søknad/steg/4-barnasbosted/BarnetsBostedEndre';
import { IBarn } from '../../../models/steg/barn';

import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import BarneHeader from '../../../components/BarneHeader';
import {
  antallBarnMedForeldreUtfylt,
  hentIndexFørsteBarnSomIkkeErUtfylt,
} from '../../../utils/barn';
import { BodyShort } from '@navikt/ds-react';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';

const scrollTilRef = (ref: RefObject<HTMLDivElement>) => {
  if (!ref || !ref.current) return;
  window.scrollTo({ top: ref.current!.offsetTop, left: 0, behavior: 'smooth' });
};

interface Props {
  barn: IBarn[];
  barneliste: IBarn[];
  settBarneliste: (barneliste: IBarn[]) => void;
  settDokumentasjonsbehovForBarn: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    barneid: string,
    barnapassid?: string
  ) => void;
  sisteBarnUtfylt: boolean;
  settSisteBarnUtfylt: React.Dispatch<React.SetStateAction<boolean>>;
}

const BarnasBostedInnhold: React.FC<Props> = ({
  barn,
  settBarneliste,
  barneliste,
  settDokumentasjonsbehovForBarn,
  sisteBarnUtfylt,
  settSisteBarnUtfylt,
}) => {
  const intl = useLokalIntlContext();

  const barna = barn.filter(
    (barn: IBarn) =>
      !barn.medforelder?.verdi || barn.medforelder?.verdi?.død === false
  );

  const barnMedDødMedforelder = barn.filter((barn: IBarn) => {
    return barn.medforelder?.verdi?.død === true;
  });

  const antallBarnMedForeldre = antallBarnMedForeldreUtfylt(barna);

  const [aktivIndex, settAktivIndex] = useState<number>(
    hentIndexFørsteBarnSomIkkeErUtfylt(barna)
  );

  const lagtTilBarn = useRef(null);

  const scrollTilLagtTilBarn = () => {
    setTimeout(() => scrollTilRef(lagtTilBarn), 120);
  };

  return (
    <>
      {barna.map((barn: IBarn, index: number) => {
        const key = barn.fødselsdato.verdi + index;
        console.log('index: ', index);
        if (index === aktivIndex) {
          return (
            <BarnetsBostedEndre
              barn={barn}
              sisteBarnUtfylt={sisteBarnUtfylt}
              settSisteBarnUtfylt={settSisteBarnUtfylt}
              settAktivIndex={settAktivIndex}
              aktivIndex={aktivIndex}
              key={key}
              scrollTilLagtTilBarn={scrollTilLagtTilBarn}
              settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
              settBarneListe={settBarneliste}
              barneListe={barneliste}
            />
          );
        } else {
          return (
            <React.Fragment key={barn.id}>
              {index + 1 === antallBarnMedForeldre && (
                <div ref={lagtTilBarn} key={barn.id + '-ref'} />
              )}
              <BarnetsBostedLagtTil
                barn={barn}
                settAktivIndex={settAktivIndex}
                index={index}
                key={barn.id}
                sisteBarnUtfylt={sisteBarnUtfylt}
                settSisteBarnUtfylt={settSisteBarnUtfylt}
              />
            </React.Fragment>
          );
        }
      })}
      {sisteBarnUtfylt &&
        barnMedDødMedforelder.map((barn: IBarn) => (
          <SeksjonGruppe key={barn.id}>
            <BarneHeader barn={barn} />
            <BodyShort style={{ textAlign: 'center', marginTop: '2rem' }}>
              {hentTekst('barnasbosted.kanGåVidere', intl)}
            </BodyShort>
          </SeksjonGruppe>
        ))}
    </>
  );
};

export default BarnasBostedInnhold;
