import React, { RefObject, useRef, useState } from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLocation } from 'react-router-dom';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import BarnetsBostedLagtTil from '../../../søknad/steg/4-barnasbosted/BarnetsBostedLagtTil';
import BarnetsBostedEndre from '../../../søknad/steg/4-barnasbosted/BarnetsBostedEndre';
import { IBarn } from '../../../models/steg/barn';
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';
import { hentPathBarnetilsynOppsummering } from '../../utils';
import Side, { ESide } from '../../../components/side/Side';
import { Stønadstype } from '../../../models/søknad/stønadstyper';

import { logSidevisningBarnetilsyn } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import BarneHeader from '../../../components/BarneHeader';
import {
  antallBarnMedForeldreUtfylt,
  hentIndexFørsteBarnSomIkkeErUtfylt,
} from '../../../utils/barn';
import { ISøknad } from '../../models/søknad';
import { kommerFraOppsummeringen } from '../../../utils/locationState';
import { BodyShort } from '@navikt/ds-react';

const scrollTilRef = (ref: RefObject<HTMLDivElement>) => {
  if (!ref || !ref.current) return;
  window.scrollTo({ top: ref.current!.offsetTop, left: 0, behavior: 'smooth' });
};

const BarnasBosted: React.FC = () => {
  const intl = useLokalIntlContext();
  const location = useLocation();
  const {
    søknad,
    mellomlagreBarnetilsyn,
    settSøknad,
    settDokumentasjonsbehovForBarn,
  } = useBarnetilsynSøknad();

  useMount(() => logSidevisningBarnetilsyn('BarnasBosted'));

  const settBarneliste = (nyBarneListe: IBarn[]) => {
    settSøknad((prevSoknad: ISøknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, barn: nyBarneListe },
      };
    });
  };

  const barna = søknad.person.barn.filter(
    (barn: IBarn) =>
      barn.skalHaBarnepass?.verdi &&
      (!barn.medforelder?.verdi || barn.medforelder?.verdi?.død === false)
  );

  const barnMedDødMedforelder = søknad.person.barn.filter((barn: IBarn) => {
    return barn.skalHaBarnepass?.verdi && barn.medforelder?.verdi?.død === true;
  });

  const kommerFraOppsummering = kommerFraOppsummeringen(location.state);
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;

  const antallBarnMedForeldre = antallBarnMedForeldreUtfylt(barna);
  const [sisteBarnUtfylt, settSisteBarnUtfylt] = useState<boolean>(
    antallBarnMedForeldre === barna.length
  );

  const [aktivIndex, settAktivIndex] = useState<number>(
    hentIndexFørsteBarnSomIkkeErUtfylt(barna)
  );

  const lagtTilBarn = useRef(null);

  const scrollTilLagtTilBarn = () => {
    setTimeout(() => scrollTilRef(lagtTilBarn), 120);
  };

  return (
    <Side
      stønadstype={Stønadstype.barnetilsyn}
      stegtittel={hentTekst('barnasbosted.sidetittel', intl)}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={sisteBarnUtfylt}
      routesStønad={RoutesBarnetilsyn}
      mellomlagreStønad={mellomlagreBarnetilsyn}
      tilbakeTilOppsummeringPath={hentPathBarnetilsynOppsummering}
    >
      {barna
        .filter((barn: IBarn) => barn.skalHaBarnepass?.verdi)
        .map((barn: IBarn, index: number) => {
          const key = barn.fødselsdato.verdi + index;
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
                barneListe={søknad.person.barn}
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
    </Side>
  );
};

export default BarnasBosted;
