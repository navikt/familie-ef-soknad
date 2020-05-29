import React, { useState, useEffect } from 'react';
import AnnenForelderKnapper from './AnnenForelderKnapper';
import BarnasBostedHeader from './BarnasBostedHeader';
import BostedOgSamvær from './bostedOgSamvær/BostedOgSamvær';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import OmAndreForelder from './OmAndreForelder';
import SkalBarnBoHosDeg from './SkalBarnBoHosDeg';
import { IBarn } from '../../../models/barn';
import { EForelder, IForelder } from '../../../models/forelder';
import { Knapp } from 'nav-frontend-knapper';
import { useSøknad } from '../../../context/SøknadContext';
import { Element } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import {
  erJaNeiSvar,
  harValgtSvar,
  hentBooleanFraValgtSvar,
} from '../../../utils/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import {
  erAlleFelterOgSpørsmålBesvart,
  visBostedOgSamværSeksjon,
  visSpørsmålHvisIkkeSammeForelder,
} from '../../../helpers/forelder';
import BorForelderINorge from './bostedOgSamvær/BorForelderINorge';
import { ESvar, ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { isValid } from 'date-fns';
import BorISammeHus from './ikkesammeforelder/BorISammeHus';
import BoddSammenFør from './ikkesammeforelder/BoddSammenFør';
import HvorMyeSammen from './ikkesammeforelder/HvorMyeSammen';
import { EBorISammeHus } from '../../../models/steg/barnasbosted';

interface Props {
  barn: IBarn;
  settAktivIndex: Function;
  aktivIndex: number;
  sisteBarnUtfylt: boolean;
  settSisteBarnUtfylt: (sisteBarnUtfylt: boolean) => void;
}

const BarnetsBostedEndre: React.FC<Props> = ({
  barn,
  settAktivIndex,
  aktivIndex,
  settSisteBarnUtfylt,
  sisteBarnUtfylt,
}) => {
  const { settDokumentasjonsbehov } = useSøknad();
  const { søknad, settSøknad } = useSøknad();

  const [forelder, settForelder] = useState<IForelder>({});
  const [barnHarSammeForelder, settBarnHarSammeForelder] = useState<
    boolean | undefined
  >(undefined);
  const { borISammeHus, boddSammenFør, flyttetFra } = forelder;

  const intl = useIntl();

  useEffect(() => {
    if (barn.forelder) {
      settForelder(barn.forelder);
    }

    // eslint-disable-next-line
  }, []);

  const andreBarnMedForelder: IBarn[] = søknad.person.barn.filter((b) => {
    return b !== barn && b.forelder;
  });

  const erPåSisteBarn: boolean =
    søknad.person.barn.length - 1 === andreBarnMedForelder.length;

  const leggTilForelder = () => {
    if (erPåSisteBarn && !sisteBarnUtfylt) settSisteBarnUtfylt(true);

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

  const visOmAndreForelder =
    andreBarnMedForelder.length === 0 ||
    (andreBarnMedForelder.length > 0 && barnHarSammeForelder === false) ||
    (barnHarSammeForelder === false &&
      (barn.harSammeAdresse.verdi ||
        harValgtSvar(forelder.skalBarnBoHosDeg?.verdi)));

  const nyForelderOgKanOppgiAndreForelder =
    !barnHarSammeForelder &&
    !forelder.kanIkkeOppgiAnnenForelderFar?.verdi &&
    isValid(forelder.fødselsdato?.verdi);

  const settBorINorgeFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    const nyForelder = {
      ...forelder,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: erJaNeiSvar(svar)
          ? hentBooleanFraValgtSvar(svar)
          : hentTekst(svar.svar_tekstid, intl),
      },
    };

    if (
      spørsmål.søknadid === EForelder.borINorge &&
      nyForelder.land &&
      svar.id === ESvar.JA
    ) {
      delete nyForelder.land;
    }
    settForelder(nyForelder);
    settDokumentasjonsbehov(spørsmål, svar);
  };

  return (
    <>
      <div className="barnas-bosted">
        <BarnasBostedHeader barn={barn} />
        <div className="barnas-bosted__innhold">
          {!barn.harSammeAdresse.verdi && (
            <SkalBarnBoHosDeg
              barn={barn}
              forelder={forelder}
              settForelder={settForelder}
            />
          )}

          {(barn.harSammeAdresse?.verdi ||
            harValgtSvar(forelder.skalBarnBoHosDeg?.verdi)) && (
            <>
              <FeltGruppe>
                <Element>
                  {barn.navn.verdi}
                  {hentTekst('barnasbosted.element.andreforelder', intl)}
                </Element>
              </FeltGruppe>

              {andreBarnMedForelder.length > 0 && (
                <AnnenForelderKnapper
                  barn={barn}
                  andreBarnMedForelder={andreBarnMedForelder}
                  settForelder={settForelder}
                  forelder={forelder}
                  settBarnHarSammeForelder={settBarnHarSammeForelder}
                />
              )}
              {visOmAndreForelder && (
                <OmAndreForelder
                  barn={barn}
                  settForelder={settForelder}
                  forelder={forelder}
                />
              )}
            </>
          )}

          {nyForelderOgKanOppgiAndreForelder && (
            <BorForelderINorge
              forelder={forelder}
              settForelder={settForelder}
              settFelt={settBorINorgeFelt}
            />
          )}

          {(visBostedOgSamværSeksjon(
            forelder,
            nyForelderOgKanOppgiAndreForelder
          ) ||
            barnHarSammeForelder) && (
            <BostedOgSamvær settForelder={settForelder} forelder={forelder} />
          )}

          {!barnHarSammeForelder && visSpørsmålHvisIkkeSammeForelder(forelder) && (
            <>
              <BorISammeHus forelder={forelder} settForelder={settForelder} />

              {((harValgtSvar(borISammeHus?.verdi) &&
                borISammeHus?.svarid !== EBorISammeHus.ja) ||
                harValgtSvar(forelder.hvordanBorDere?.verdi)) && (
                <BoddSammenFør
                  forelder={forelder}
                  settForelder={settForelder}
                />
              )}
              {(boddSammenFør?.svarid === ESvar.NEI ||
                isValid(flyttetFra?.verdi)) && (
                <HvorMyeSammen
                  forelder={forelder}
                  settForelder={settForelder}
                />
              )}
            </>
          )}
          {erAlleFelterOgSpørsmålBesvart(forelder, barnHarSammeForelder) && (
            <Knapp onClick={leggTilForelder}>
              {!sisteBarnUtfylt && !erPåSisteBarn ? 'Neste Barn' : 'Lagre'}
            </Knapp>
          )}
        </div>
      </div>
    </>
  );
};

export default BarnetsBostedEndre;
