import React, { useState, useEffect } from 'react';
import AnnenForelderKnapper from './AnnenForelderKnapper';
import BarneHeader from '../../../components/BarneHeader';
import BostedOgSamvær from './bostedOgSamvær/BostedOgSamvær';
import OmAndreForelder from './OmAndreForelder';
import SkalBarnetBoHosSøker from './SkalBarnetBoHosSøker';
import { IBarn } from '../../../models/steg/barn';
import { EForelder, IForelder } from '../../../models/steg/forelder';
import { Knapp } from 'nav-frontend-knapper';
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
} from '../../../helpers/steg/forelder';
import BorForelderINorge from './bostedOgSamvær/BorForelderINorge';
import { ESvar, ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import BorAnnenForelderISammeHus from './ikkesammeforelder/BorAnnenForelderISammeHus';
import BoddSammenFør from './ikkesammeforelder/BoddSammenFør';
import HvorMyeSammen from './ikkesammeforelder/HvorMyeSammen';
import { hentUid } from '../../../utils/autentiseringogvalidering/uuid';
import { erGyldigDato } from '../../../utils/dato';
import { EBorAnnenForelderISammeHus } from '../../../models/steg/barnasbosted';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import BarnetsAndreForelderTittel from './BarnetsAndreForelderTittel';
import LocaleTekst from '../../../language/LocaleTekst';

interface Props {
  barn: IBarn;
  settAktivIndex: Function;
  aktivIndex: number;
  sisteBarnUtfylt: boolean;
  settSisteBarnUtfylt: (sisteBarnUtfylt: boolean) => void;
  scrollTilLagtTilBarn: () => void;
  settDokumentasjonsbehovForBarn: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    barneid: string,
    barnapassid?: string
  ) => void;
  barneListe: IBarn[];
  settBarneListe: (barneListe: IBarn[]) => void;
}

const BarnetsBostedEndre: React.FC<Props> = ({
  barn,
  settAktivIndex,
  aktivIndex,
  settSisteBarnUtfylt,
  sisteBarnUtfylt,
  scrollTilLagtTilBarn,
  barneListe,
  settBarneListe,
  settDokumentasjonsbehovForBarn,
}) => {
  const [forelder, settForelder] = useState<IForelder>(
    barn.forelder ? barn.forelder : { id: hentUid() }
  );
  const [barnHarSammeForelder, settBarnHarSammeForelder] = useState<
    boolean | undefined
  >(undefined);
  const [kjennerIkkeIdent, settKjennerIkkeIdent] = useState<boolean>(false);

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

  const andreBarnMedForelder: IBarn[] = barneListe.filter((b) => {
    return b !== barn && b.forelder;
  });

  const unikeForeldreIDer = Array.from(
    new Set(andreBarnMedForelder.map((b) => b.forelder?.id))
  );

  const førsteBarnTilHverForelder = unikeForeldreIDer
    .map((id) => {
      if (!id) return null;
      return andreBarnMedForelder.find((b) => b.forelder?.id === id);
    })
    .filter(Boolean) as IBarn[];

  const erPåSisteBarn: boolean =
    barneListe.length - 1 === andreBarnMedForelder.length;

  const leggTilForelder = () => {
    if (erPåSisteBarn && !sisteBarnUtfylt) settSisteBarnUtfylt(true);

    const nyBarneListe = barneListe.map((b) => {
      if (b === barn) {
        let nyttBarn = barn;
        nyttBarn.forelder = forelder;
        return nyttBarn;
      } else {
        return b;
      }
    });

    settBarneListe(nyBarneListe);

    const nyIndex = aktivIndex + 1;
    settAktivIndex(nyIndex);

    scrollTilLagtTilBarn();
  };

  const visOmAndreForelder =
    førsteBarnTilHverForelder.length === 0 ||
    (førsteBarnTilHverForelder.length > 0 && barnHarSammeForelder === false) ||
    (barnHarSammeForelder === false &&
      (barn.harSammeAdresse.verdi ||
        harValgtSvar(forelder.skalBarnetBoHosSøker?.verdi)));

  const nyForelderOgKanOppgiAndreForelder =
    !barnHarSammeForelder &&
    !forelder.kanIkkeOppgiAnnenForelderFar?.verdi &&
    harValgtSvar(forelder?.navn?.verdi);

  const settBorINorgeFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    const nyForelder = {
      ...forelder,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: erJaNeiSvar(svar)
          ? hentBooleanFraValgtSvar(svar)
          : svar.svar_tekst,
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
    settDokumentasjonsbehovForBarn(spørsmål, svar, barn.id);
  };

  const skalFylleUtHarBoddSammenFør =
    (harValgtSvar(borAnnenForelderISammeHus?.verdi) &&
      borAnnenForelderISammeHus?.svarid !== EBorAnnenForelderISammeHus.ja) ||
    harValgtSvar(forelder.borAnnenForelderISammeHusBeskrivelse?.verdi) ||
    !forelder.borINorge?.verdi;
  return (
    <>
      <div className="barnas-bosted">
        <SeksjonGruppe>
          <BarneHeader barn={barn} />
        </SeksjonGruppe>
        <div className="barnas-bosted__innhold">
          {!barn.harSammeAdresse.verdi && (
            <SkalBarnetBoHosSøker
              barn={barn}
              forelder={forelder}
              settForelder={settForelder}
              settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
            />
          )}

          {(barn.harSammeAdresse?.verdi ||
            harValgtSvar(forelder.skalBarnetBoHosSøker?.verdi)) && (
            <SeksjonGruppe>
              <BarnetsAndreForelderTittel barn={barn} />

              {førsteBarnTilHverForelder.length > 0 && (
                <AnnenForelderKnapper
                  barn={barn}
                  førsteBarnTilHverForelder={førsteBarnTilHverForelder}
                  settForelder={settForelder}
                  forelder={forelder}
                  settBarnHarSammeForelder={settBarnHarSammeForelder}
                />
              )}
              {visOmAndreForelder && (
                <OmAndreForelder
                  settForelder={settForelder}
                  forelder={forelder}
                  kjennerIkkeIdent={kjennerIkkeIdent}
                  settKjennerIkkeIdent={settKjennerIkkeIdent}
                />
              )}
            </SeksjonGruppe>
          )}

          {nyForelderOgKanOppgiAndreForelder && (
            <BorForelderINorge
              barn={barn}
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
            <BostedOgSamvær
              settForelder={settForelder}
              forelder={forelder}
              barn={barn}
              settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
            />
          )}

          {!barnHarSammeForelder && visSpørsmålHvisIkkeSammeForelder(forelder) && (
            <>
              {forelder.borINorge?.verdi && (
                <BorAnnenForelderISammeHus
                  forelder={forelder}
                  settForelder={settForelder}
                  barn={barn}
                />
              )}

              {skalFylleUtHarBoddSammenFør && (
                <BoddSammenFør
                  forelder={forelder}
                  barn={barn}
                  settForelder={settForelder}
                />
              )}
              {(boddSammenFør?.svarid === ESvar.NEI ||
                erGyldigDato(flyttetFra?.verdi)) && (
                <HvorMyeSammen
                  forelder={forelder}
                  barn={barn}
                  settForelder={settForelder}
                />
              )}
            </>
          )}
          {erAlleFelterOgSpørsmålBesvart(forelder, barnHarSammeForelder) && (
            <Knapp onClick={leggTilForelder}>
              <LocaleTekst
                tekst={
                  !sisteBarnUtfylt && !erPåSisteBarn
                    ? 'knapp.neste.barn'
                    : 'knapp.neste'
                }
              />
            </Knapp>
          )}
        </div>
      </div>
    </>
  );
};

export default BarnetsBostedEndre;
