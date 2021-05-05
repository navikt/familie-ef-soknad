import React, { useEffect, useState } from 'react';
import AnnenForelderKnapper from './AnnenForelderKnapper';
import BarneHeader from '../../../components/BarneHeader';
import BostedOgSamvær from './bostedOgSamvær/BostedOgSamvær';
import OmAndreForelder from './OmAndreForelder';
import SkalBarnetBoHosSøker from './SkalBarnetBoHosSøker';
import { IBarn } from '../../../models/steg/barn';
import { IForelder } from '../../../models/steg/forelder';
import { Knapp } from 'nav-frontend-knapper';
import { useIntl } from 'react-intl';
import { harValgtSvar } from '../../../utils/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import {
  erForelderUtfylt,
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
import { Element, Normaltekst } from 'nav-frontend-typografi';

const lagOppdatertBarneliste = (
  barneliste: IBarn[],
  nåværendeBarn: IBarn,
  forelder: IForelder
) => {
  return barneliste.map((b) => {
    if (b === nåværendeBarn) {
      let nyttBarn = nåværendeBarn;

      nyttBarn.forelder = forelder;
      return nyttBarn;
    } else {
      return b;
    }
  });
};

const visBostedOgSamværSeksjon = (
  forelder: IForelder,
  visesBorINorgeSpørsmål: boolean
) => {
  const borForelderINorgeSpm =
    forelder.borINorge?.svarid === ESvar.JA ||
    (forelder.land && forelder.land?.verdi !== '');

  return visesBorINorgeSpørsmål
    ? borForelderINorgeSpm
    : erGyldigDato(forelder.fødselsdato?.verdi);
};

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
  const medforelderMedLabel = (medforelder: any) => {
    const intl = useIntl();

    return {
      navn: {
        label: hentTekst('barnasbosted.medforelder.navn', intl),
        verdi: medforelder.verdi.navn,
      },
      alder: {
        label: hentTekst('barnasbosted.medforelder.alder', intl),
        verdi: medforelder.verdi.alder,
      },
      død: medforelder.død,
      harAdressesperre: medforelder.harAdressesperre,
    };
  };

  const [forelder, settForelder] = useState<IForelder>(
    barn.forelder
      ? barn.forelder
      : barn.medforelder?.verdi
      ? {
          id: hentUid(),
          ...medforelderMedLabel(barn.medforelder),
        }
      : {
          id: hentUid(),
        }
  );

  const [barnHarSammeForelder, settBarnHarSammeForelder] = useState<
    boolean | undefined
  >(undefined);
  const [kjennerIkkeIdent, settKjennerIkkeIdent] = useState<boolean>(
    forelder.fødselsdato?.verdi ? true : false
  );
  const intl = useIntl();

  const {
    borAnnenForelderISammeHus,
    boddSammenFør,
    flyttetFra,
    fødselsdato,
    ident,
  } = forelder;
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

  useEffect(() => {
    if (sisteBarnUtfylt === true && !erForelderUtfylt(forelder)) {
      const nyBarneListe = lagOppdatertBarneliste(barneListe, barn, forelder);
      settBarneListe(nyBarneListe);
      settSisteBarnUtfylt(false);
    }
  }, [
    sisteBarnUtfylt,
    settSisteBarnUtfylt,
    forelder,
    barneListe,
    barn,
    settBarneListe,
  ]);

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
    if (erForelderUtfylt(forelder)) settSisteBarnUtfylt(true);
    const nyIndex = aktivIndex + 1;
    const nyBarneListe = lagOppdatertBarneliste(barneListe, barn, forelder);

    settBarneListe(nyBarneListe);
    settAktivIndex(nyIndex);
    scrollTilLagtTilBarn();
  };

  const visOmAndreForelder =
    (!barn.medforelder?.verdi && førsteBarnTilHverForelder.length === 0) ||
    (førsteBarnTilHverForelder.length > 0 && barnHarSammeForelder === false) ||
    (barnHarSammeForelder === false &&
      (barn.harSammeAdresse.verdi ||
        harValgtSvar(forelder.skalBarnetBoHosSøker?.verdi)));

  const visBorAnnenForelderINorge =
    !!barn.medforelder?.verdi ||
    (!barnHarSammeForelder &&
      !forelder.kanIkkeOppgiAnnenForelderFar?.verdi &&
      harValgtSvar(forelder?.navn?.verdi) &&
      (harValgtSvar(ident?.verdi || fødselsdato?.verdi) || kjennerIkkeIdent));

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

              {førsteBarnTilHverForelder.length > 0 &&
                !barn.medforelder?.verdi && (
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
                  settSisteBarnUtfylt={settSisteBarnUtfylt}
                />
              )}
              {barn.medforelder?.verdi && (
                <>
                  <Element>Navn</Element>
                  <Normaltekst>
                    {barn.medforelder.verdi.navn
                      ? barn.medforelder.verdi.navn
                      : `${hentTekst(
                          'barnekort.medforelder.hemmelig',
                          intl
                        )}, ${barn.medforelder.verdi.alder}`}
                  </Normaltekst>
                </>
              )}
            </SeksjonGruppe>
          )}

          {visBorAnnenForelderINorge && (
            <BorForelderINorge
              barn={barn}
              forelder={forelder}
              settForelder={settForelder}
              settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
            />
          )}

          {(visBostedOgSamværSeksjon(forelder, visBorAnnenForelderINorge) ||
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
          {erForelderUtfylt(forelder) && (
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
