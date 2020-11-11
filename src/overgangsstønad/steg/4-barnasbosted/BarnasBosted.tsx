import React, { useState, useRef, useEffect } from 'react';
import BarnetsBostedEndre from '../../../søknad/steg/4-barnasbosted/BarnetsBostedEndre';
import BarnetsBostedLagtTil from '../../../søknad/steg/4-barnasbosted/BarnetsBostedLagtTil';
import { hentTekst } from '../../../utils/søknad';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import { RefObject } from 'react';
import { IBarn } from '../../../models/steg/barn';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesOvergangsstonad } from '../../routing/routesOvergangsstonad';
import { hentPathOvergangsstønadOppsummering } from '../../utils';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { LocationStateSøknad } from '../../../models/søknad/søknad';
import { logSidevisningOvergangsstonad } from '../../../utils/amplitude';

const scrollTilRef = (ref: RefObject<HTMLDivElement>) => {
  if (!ref || !ref.current) return;
  window.scrollTo({ top: ref.current!.offsetTop, left: 0, behavior: 'smooth' });
};

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const location = useLocation<LocationStateSøknad>();
  const {
    søknad,
    mellomlagreOvergangsstønad,
    settDokumentasjonsbehovForBarn,
    settSøknad,
  } = useSøknad();
  const barna = søknad.person.barn;
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;
  const [sisteBarnUtfylt, settSisteBarnUtfylt] = useState<boolean>(false);

  useEffect(() => {
    logSidevisningOvergangsstonad('BarnasBosted');
  }, []);

  const settBarneliste = (nyBarneListe: IBarn[]) => {
    settSøknad((prevSoknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, barn: nyBarneListe },
      };
    });
  };

  const hentIndexFørsteBarnSomIkkeErUtfylt: number = barna.findIndex(
    (barn) => barn.forelder === undefined
  );

  const [aktivIndex, settAktivIndex] = useState<number>(
    hentIndexFørsteBarnSomIkkeErUtfylt
  );

  const lagtTilBarn = useRef(null);

  const scrollTilLagtTilBarn = () => {
    setTimeout(() => scrollTilRef(lagtTilBarn), 120);
  };

  const antallBarnMedForeldre = barna.filter((barn) => barn.forelder).length;

  if (antallBarnMedForeldre === barna.length && !sisteBarnUtfylt) {
    settSisteBarnUtfylt(true);
  }

  return (
    <Side
      stønadstype={Stønadstype.overgangsstønad}
      stegtittel={hentTekst('barnasbosted.sidetittel', intl)}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={sisteBarnUtfylt}
      routesStønad={RoutesOvergangsstonad}
      mellomlagreStønad={mellomlagreOvergangsstønad}
      tilbakeTilOppsummeringPath={hentPathOvergangsstønadOppsummering}
    >
      {barna.map((barn, index) => {
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
              barneListe={søknad.person.barn}
              settBarneListe={settBarneliste}
              settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
            />
          );
        } else {
          return (
            <>
              {index + 1 === antallBarnMedForeldre && <div ref={lagtTilBarn} />}
              <BarnetsBostedLagtTil
                barn={barn}
                settAktivIndex={settAktivIndex}
                index={index}
                key={key}
              />
            </>
          );
        }
      })}
    </Side>
  );
};

export default BarnasBosted;
