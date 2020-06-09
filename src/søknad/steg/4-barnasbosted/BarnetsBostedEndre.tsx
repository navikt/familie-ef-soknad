import React, { useState, useEffect } from 'react';
import AnnenForelderKnapper from './AnnenForelderKnapper';
import BarnasBostedHeader from './BarnasBostedHeader';
import BostedOgSamvær from './bostedOgSamvær/BostedOgSamvær';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import OmAndreForelder from './OmAndreForelder';
import SkalBarnetBoHosSøker from './SkalBarnetBoHosSøker';
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
import BorAnnenForelderISammeHus from './ikkesammeforelder/BorAnnenForelderISammeHus';
import BoddSammenFør from './ikkesammeforelder/BoddSammenFør';
import HvorMyeSammen from './ikkesammeforelder/HvorMyeSammen';
import { hentUid } from '../../../utils/uuid';
import { EBorAnnenForelderISammeHus } from '../../../models/steg/barnasbosted';

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

  const [forelder, settForelder] = useState<IForelder>(
    barn.forelder ? barn.forelder : {id: hentUid()}
  );
  const [barnHarSammeForelder, settBarnHarSammeForelder] = useState<
    boolean | undefined
  >(undefined);
  const { borAnnenForelderISammeHus, boddSammenFør, flyttetFra } = forelder;

  const intl = useIntl();

  const jegKanIkkeOppgiLabel = hentTekst(
    'barnasbosted.kanikkeoppgiforelder',
    intl
  );

  useEffect(() => {
    settForelder({
      ...forelder,
      kanIkkeOppgiAnnenForelderFar: {
        label: jegKanIkkeOppgiLabel,
        verdi: forelder.kanIkkeOppgiAnnenForelderFar?.verdi || false,
      },
    });

    //eslint-disable-next-line
  }, []);

  const andreBarnMedForelder: IBarn[] = søknad.person.barn.filter((b) => {
    return b !== barn && b.forelder;
  });

  const andreBarnMedForelderUnik = Array.from(new Set(andreBarnMedForelder.map(b => b.forelder?.id)))
  .map(id => {
    if (!id) return;
    return andreBarnMedForelder.find(b => b.forelder?.id === id);
  }).filter(Boolean);

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
    andreBarnMedForelderUnik.length === 0 ||
    (andreBarnMedForelderUnik.length > 0 && barnHarSammeForelder === false) ||
    (barnHarSammeForelder === false &&
      (barn.harSammeAdresse.verdi ||
        harValgtSvar(forelder.skalBarnetBoHosSøker?.verdi)));

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

  console.log("OPPDATERTFORELDER", forelder);

  return (
    <>
      <div className="barnas-bosted">
        <BarnasBostedHeader barn={barn} />
        <div className="barnas-bosted__innhold">
          {!barn.harSammeAdresse.verdi && (
            <SkalBarnetBoHosSøker
              barn={barn}
              forelder={forelder}
              settForelder={settForelder}
            />
          )}

          {(barn.harSammeAdresse?.verdi ||
            harValgtSvar(forelder.skalBarnetBoHosSøker?.verdi)) && (
            <>
              <FeltGruppe>
                <Element>
                  {barn.navn.verdi}
                  {hentTekst('barnasbosted.element.andreforelder', intl)}
                </Element>
              </FeltGruppe>

              {andreBarnMedForelderUnik.length > 0 && (
                <AnnenForelderKnapper
                  barn={barn}
                  andreBarnMedForelderUnik={andreBarnMedForelderUnik}
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
              <BorAnnenForelderISammeHus
                forelder={forelder}
                settForelder={settForelder}
              />

              {((harValgtSvar(borAnnenForelderISammeHus?.verdi) &&
                borAnnenForelderISammeHus?.svarid !==
                  EBorAnnenForelderISammeHus.ja) ||
                harValgtSvar(
                  forelder.borAnnenForelderISammeHusBeskrivelse?.verdi
                )) && (
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
