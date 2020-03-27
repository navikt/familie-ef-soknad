import React, { useState, useEffect } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import { ISpørsmål, ISvar } from '../../../models/spørsmalogsvar';
import { boddSammenFør, borISammeHus, hvorMyeSammen } from './ForeldreConfig';
import { IForelder, IBarn } from '../../../models/person';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { Knapp } from 'nav-frontend-knapper';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import BarnasBostedHeader from './BarnasBostedHeader';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import OmAndreForelder from './OmAndreForelder';
import BostedOgSamvær from './BostedOgSamvær';
import SkalBarnBoHosDeg from './SkalBarnBoHosDeg';
import AnnenForelderKnapper from './AnnenForelderKnapper';
import { hentBooleanFraValgtSvar } from '../../../utils/spørsmålogsvar';

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
  const { søknad, settSøknad } = useSøknadContext();

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

  const settHarBoddsammenFør = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);

    const nyForelder = { ...forelder, [boddSammenFør.søknadid]: svar };

    if (svar === false) {
      delete nyForelder.flyttetFra;
    }

    settForelder(nyForelder);
  };

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
          {!huketAvAnnenForelder ? (
            <OmAndreForelder
              barn={barn}
              settForelder={settForelder}
              forelder={forelder}
            />
          ) : null}
          <BostedOgSamvær
            settForelder={settForelder}
            forelder={forelder}
            huketAvAnnenForelder={huketAvAnnenForelder}
          />
          {!huketAvAnnenForelder ? (
            <>
              <KomponentGruppe>
                <MultiSvarSpørsmål
                  key={borISammeHus.søknadid}
                  spørsmål={borISammeHus}
                  valgtSvar={forelder.borISammeHus}
                  settSpørsmålOgSvar={(_, svar) =>
                    settForelder({ ...forelder, [borISammeHus.søknadid]: svar })
                  }
                />
              </KomponentGruppe>
              <KomponentGruppe>
                <JaNeiSpørsmål
                  spørsmål={boddSammenFør}
                  onChange={(spørsmål, svar) =>
                    settHarBoddsammenFør(spørsmål, svar)
                  }
                  valgtSvar={forelder.boddSammenFør}
                />
              </KomponentGruppe>
              {forelder.boddSammenFør ? (
                <KomponentGruppe>
                  <Datovelger
                    settDato={(e: Date | null) =>
                      settForelder({ ...forelder, flyttetFra: e })
                    }
                    valgtDato={
                      forelder.flyttetFra ? forelder.flyttetFra : undefined
                    }
                    tekstid={'barnasbosted.normaltekst.nårflyttetfra'}
                    datobegrensning={DatoBegrensning.TidligereDatoer}
                  />
                </KomponentGruppe>
              ) : null}
              <KomponentGruppe>
                <MultiSvarSpørsmål
                  key={hvorMyeSammen.søknadid}
                  spørsmål={hvorMyeSammen}
                  valgtSvar={forelder.hvorMyeSammen}
                  settSpørsmålOgSvar={(_, svar) =>
                    settForelder({
                      ...forelder,
                      [hvorMyeSammen.søknadid]: svar,
                    })
                  }
                />
              </KomponentGruppe>
            </>
          ) : null}
          <Knapp onClick={leggTilForelder}>Lagre</Knapp>
        </div>
      </div>
    </>
  );
};

export default BarnetsBostedEndre;
