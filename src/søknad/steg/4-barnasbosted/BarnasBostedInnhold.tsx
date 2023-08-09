import React, { RefObject, useRef, useState } from 'react';
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
import { SettDokumentasjonsbehovBarn } from '../../../models/søknad/søknad';

const scrollTilRef = (ref: RefObject<HTMLDivElement>) => {
  if (!ref || !ref.current) return;
  window.scrollTo({ top: ref.current!.offsetTop, left: 0, behavior: 'smooth' });
};

interface Props {
  aktuelleBarn: IBarn[];
  barneliste: IBarn[];
  oppdaterBarnISoknaden: (oppdatertBarn: IBarn) => void;
  settDokumentasjonsbehovForBarn: SettDokumentasjonsbehovBarn;
  sisteBarnUtfylt: boolean;
  settSisteBarnUtfylt: React.Dispatch<React.SetStateAction<boolean>>;
}

const BarnasBostedInnhold: React.FC<Props> = ({
  aktuelleBarn,
  oppdaterBarnISoknaden,
  barneliste,
  settDokumentasjonsbehovForBarn,
  sisteBarnUtfylt,
  settSisteBarnUtfylt,
}) => {
  const intl = useLokalIntlContext();

  const barnMedLevendeMedforelder = aktuelleBarn.filter(
    (barn: IBarn) =>
      !barn.medforelder?.verdi || barn.medforelder?.verdi?.død === false
  );

  const barnMedDødMedforelder = aktuelleBarn.filter((barn: IBarn) => {
    return barn.medforelder?.verdi?.død === true;
  });

  const antallBarnMedForeldre = antallBarnMedForeldreUtfylt(
    barnMedLevendeMedforelder
  );

  const [aktivIndex, settAktivIndex] = useState<number>(
    hentIndexFørsteBarnSomIkkeErUtfylt(barnMedLevendeMedforelder)
  );

  const lagtTilBarn = useRef(null);

  const scrollTilLagtTilBarn = () => {
    setTimeout(() => scrollTilRef(lagtTilBarn), 120);
  };

  return (
    <>
      {barnMedLevendeMedforelder.map((barn: IBarn, index: number) => {
        const key = barn.fødselsdato.verdi + index;
        if (index === aktivIndex) {
          return (
            <BarnetsBostedEndre
              barn={barn}
              settSisteBarnUtfylt={settSisteBarnUtfylt}
              settAktivIndex={settAktivIndex}
              aktivIndex={aktivIndex}
              key={key}
              scrollTilLagtTilBarn={scrollTilLagtTilBarn}
              settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
              oppdaterBarnISoknaden={oppdaterBarnISoknaden}
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
