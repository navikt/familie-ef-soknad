import React, { RefObject, useRef, useState } from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import BarnetsBostedLagtTil from '../../../søknad/steg/4-barnasbosted/BarnetsBostedLagtTil';
import BarnetsBostedEndre from '../../../søknad/steg/4-barnasbosted/BarnetsBostedEndre';
import { IBarn } from '../../../models/steg/barn';
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';
import { hentPathBarnetilsynOppsummering } from '../../utils';
import Side, { ESide } from '../../../components/side/Side';

const scrollTilRef = (ref: RefObject<HTMLDivElement>) => {
  if (!ref || !ref.current) return;
  window.scrollTo({ top: ref.current!.offsetTop, left: 0, behavior: 'smooth' });
};

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const location = useLocation();
  const {
    søknad,
    mellomlagreBarnetilsyn,
    settSøknad,
    settDokumentasjonsbehov,
  } = useBarnetilsynSøknad();

  const settBarneliste = (nyBarneListe: IBarn[]) => {
    settSøknad((prevSoknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, barn: nyBarneListe },
      };
    });
  };

  const barna = søknad.person.barn.filter(
    (barn) => barn.skalHaBarnepass?.verdi
  );
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;
  const [sisteBarnUtfylt, settSisteBarnUtfylt] = useState<boolean>(false);

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
      tittel={hentTekst('barnasbosted.sidetittel', intl)}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={sisteBarnUtfylt}
      routesStønad={RoutesBarnetilsyn}
      mellomlagreStønad={mellomlagreBarnetilsyn}
      tilbakeTilOppsummeringPath={hentPathBarnetilsynOppsummering}
    >
      {barna
        .filter((barn) => barn.skalHaBarnepass?.verdi)
        .map((barn, index) => {
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
                settDokumentasjonsbehov={settDokumentasjonsbehov}
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
                />
              </React.Fragment>
            );
          }
        })}
    </Side>
  );
};

export default BarnasBosted;
