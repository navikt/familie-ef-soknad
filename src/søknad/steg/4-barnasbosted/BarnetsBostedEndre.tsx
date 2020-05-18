import React, { useState, useEffect } from 'react';
import AnnenForelderKnapper from './AnnenForelderKnapper';
import BarnasBostedHeader from './BarnasBostedHeader';
import BostedOgSamvær from './BostedOgSamvær';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import OmAndreForelder from './OmAndreForelder';
import SkalBarnBoHosDeg from './SkalBarnBoHosDeg';
import { IBarn } from '../../../models/barn';
import { IForelder } from '../../../models/forelder';
import { Knapp } from 'nav-frontend-knapper';
import { useSøknad } from '../../../context/SøknadContext';
import IkkeAnnenForelder from './IkkeAnnenForelder';

interface Props {
  barn: IBarn;
  settAktivIndex: Function;
  aktivIndex: number;
}

const BarnetsBostedEndre: React.FC<Props> = ({
  barn,
  settAktivIndex,
  aktivIndex,
}) => {
  const { søknad, settSøknad } = useSøknad();

  const [forelder, settForelder] = useState<IForelder>({});

  const [huketAvAnnenForelder, settHuketAvAnnenForelder] = useState<boolean>(
    false
  );

  useEffect(() => {
    if (barn.forelder) {
      settForelder(barn.forelder);
    }

    // eslint-disable-next-line
  }, []);

  const leggTilForelder = () => {
    const nyBarneListe = søknad.person.barn.map((b) => {
      if (b === barn) {
        let nyttBarn = barn;
        nyttBarn.forelder = forelder;
        return nyttBarn;
      } else {
        return b;
      }
    });

    settSøknad({ ...søknad, person: { ...søknad.person, barn: nyBarneListe } });

    const nyIndex = aktivIndex + 1;

    settAktivIndex(nyIndex);
  };

  const andreBarnMedForelder = søknad.person.barn.filter((b) => {
    return b !== barn && b.forelder;
  });

  return (
    <>
      <div className="barnas-bosted">
        <BarnasBostedHeader barn={barn} />
        <div className="barnas-bosted__innhold">
          <SkalBarnBoHosDeg
            forelder={forelder}
            settForelder={settForelder}
            barn={barn}
          />
          <FeltGruppe>
            <AnnenForelderKnapper
              barn={barn}
              andreBarnMedForelder={andreBarnMedForelder}
              settForelder={settForelder}
              forelder={forelder}
              settHuketAvAnnenForelder={settHuketAvAnnenForelder}
            />
          </FeltGruppe>
          {!huketAvAnnenForelder && (
            <OmAndreForelder
              barn={barn}
              settForelder={settForelder}
              forelder={forelder}
            />
          )}
          <BostedOgSamvær
            settForelder={settForelder}
            forelder={forelder}
            huketAvAnnenForelder={huketAvAnnenForelder}
          />
          {!huketAvAnnenForelder && (
            <IkkeAnnenForelder
              forelder={forelder}
              settForelder={settForelder}
            />
          )}
          <Knapp onClick={leggTilForelder}>Neste Barn</Knapp>
        </div>
      </div>
    </>
  );
};

export default BarnetsBostedEndre;
