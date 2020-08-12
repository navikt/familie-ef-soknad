import React, { useState, useRef } from 'react';
import BarnetsBostedEndre from '../../../søknad/steg/4-barnasbosted/BarnetsBostedEndre';
import BarnetsBostedLagtTil from '../../../søknad/steg/4-barnasbosted/BarnetsBostedLagtTil';
import Side from '../../side/Side';
import { hentTekst } from '../../../utils/søknad';
import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import { Hovedknapp } from 'nav-frontend-knapper';
import { RefObject } from 'react';
import { IBarn } from '../../../models/steg/barn';

const scrollTilRef = (ref: RefObject<HTMLDivElement>) => {
  if (!ref || !ref.current) return;
  window.scrollTo({ top: ref.current!.offsetTop, left: 0, behavior: 'smooth' });
};

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const {
    søknad,
    mellomlagreOvergangsstønad,
    settDokumentasjonsbehov,
    settSøknad,
  } = useSøknad();
  const barna = søknad.person.barn;
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const [sisteBarnUtfylt, settSisteBarnUtfylt] = useState<boolean>(false);

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
      tittel={hentTekst('barnasbosted.sidetittel', intl)}
      skalViseKnapper={!kommerFraOppsummering}
      erSpørsmålBesvart={sisteBarnUtfylt}
      mellomlagreOvergangsstønad={mellomlagreOvergangsstønad}
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
              settDokumentasjonsbehov={settDokumentasjonsbehov}
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
      {kommerFraOppsummering ? (
        <div className={'side'}>
          <Hovedknapp
            className="tilbake-til-oppsummering"
            onClick={() =>
              history.push({
                pathname: '/oppsummering',
              })
            }
          >
            {hentTekst('oppsummering.tilbake', intl)}
          </Hovedknapp>
        </div>
      ) : null}
    </Side>
  );
};

export default BarnasBosted;
