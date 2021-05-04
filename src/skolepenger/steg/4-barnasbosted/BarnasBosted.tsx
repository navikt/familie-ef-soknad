import React, { useState, useRef } from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { RefObject } from 'react';
import { useSkolepengerSøknad } from '../../SkolepengerContext';
import BarnetsBostedLagtTil from '../../../søknad/steg/4-barnasbosted/BarnetsBostedLagtTil';
import BarnetsBostedEndre from '../../../søknad/steg/4-barnasbosted/BarnetsBostedEndre';
import { IBarn } from '../../../models/steg/barn';
import { Normaltekst } from 'nav-frontend-typografi';
import { RoutesSkolepenger } from '../../routing/routes';
import { hentPathSkolepengerOppsummering } from '../../utils';
import Side, { ESide } from '../../../components/side/Side';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { LocationStateSøknad } from '../../../models/søknad/søknad';
import { logSidevisningSkolepenger } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import {
  antallBarnMedForeldreUtfylt,
  hentIndexFørsteBarnSomIkkeErUtfylt,
} from '../../../utils/barn';
import { ISøknad } from '../../models/søknad';

const scrollTilRef = (ref: RefObject<HTMLDivElement>) => {
  if (!ref || !ref.current) return;
  window.scrollTo({ top: ref.current!.offsetTop, left: 0, behavior: 'smooth' });
};

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const location = useLocation<LocationStateSøknad>();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;
  const {
    søknad,
    mellomlagreSkolepenger,
    settSøknad,
    settDokumentasjonsbehovForBarn,
  } = useSkolepengerSøknad();

  useMount(() => logSidevisningSkolepenger('BarnasBosted'));

  const barna = søknad.person.barn.filter((barn: IBarn) => {
    return !barn.medforelder?.verdi || barn.medforelder?.verdi?.død === false;
  });

  const antallBarnMedForeldre = antallBarnMedForeldreUtfylt(barna);
  const [sisteBarnUtfylt, settSisteBarnUtfylt] = useState<boolean>(
    antallBarnMedForeldre === barna.length
  );

  const settBarneliste = (nyBarneListe: IBarn[]) => {
    settSøknad((prevSoknad: ISøknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, barn: nyBarneListe },
      };
    });
  };

  const [aktivIndex, settAktivIndex] = useState<number>(
    hentIndexFørsteBarnSomIkkeErUtfylt(barna)
  );

  const lagtTilBarn = useRef(null);

  const scrollTilLagtTilBarn = () => {
    setTimeout(() => scrollTilRef(lagtTilBarn), 120);
  };

  return (
    <Side
      stønadstype={Stønadstype.skolepenger}
      stegtittel={hentTekst('barnasbosted.sidetittel', intl)}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={sisteBarnUtfylt}
      routesStønad={RoutesSkolepenger}
      mellomlagreStønad={mellomlagreSkolepenger}
      tilbakeTilOppsummeringPath={hentPathSkolepengerOppsummering}
    >
      {barna.map((barn: IBarn, index: number) => {
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
      {!barna.length && (
        <Normaltekst style={{ textAlign: 'center' }}>
          {hentTekst('barnasbosted.kanGåVidere', intl)}
        </Normaltekst>
      )}
    </Side>
  );
};

export default BarnasBosted;
