import React, { useState } from 'react';
import AnnenForelderKnapper from './AnnenForelderKnapper';
import BarneHeader from '../../../components/BarneHeader';
import BostedOgSamvær from './bostedOgSamvær/BostedOgSamvær';
import OmAndreForelder from './OmAndreForelder';
import SkalBarnetBoHosSøker from './SkalBarnetBoHosSøker';
import { IBarn } from '../../../models/steg/barn';
import { IForelder } from '../../../models/steg/forelder';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { harValgtSvar } from '../../../utils/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import {
  erForelderUtfylt,
  utfyltNødvendigSpørsmålUtenOppgiAnnenForelder,
  visSpørsmålHvisIkkeSammeForelder,
} from '../../../helpers/steg/forelder';
import BorForelderINorge from './bostedOgSamvær/BorForelderINorge';
import { ESvar } from '../../../models/felles/spørsmålogsvar';
import BorAnnenForelderISammeHus from './ikkesammeforelder/BorAnnenForelderISammeHus';
import BoddSammenFør from './ikkesammeforelder/BoddSammenFør';
import HvorMyeSammen from './ikkesammeforelder/HvorMyeSammen';
import { hentUid } from '../../../utils/autentiseringogvalidering/uuid';
import { erGyldigDato } from '../../../utils/dato';
import { EBorAnnenForelderISammeHus } from '../../../models/steg/barnasbosted';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import BarnetsAndreForelderTittel from './BarnetsAndreForelderTittel';
import LocaleTekst from '../../../language/LocaleTekst';
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import { Alert, BodyShort, Button, Label } from '@navikt/ds-react';
import { SettDokumentasjonsbehovBarn } from '../../../models/søknad/søknad';
import styled from 'styled-components';
import { lagtTilAnnenForelderId } from '../../../utils/barn';

const AlertMedTopMargin = styled(Alert)`
  margin-top: 1rem;
`;

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

enum TypeBarn {
  BARN_MED_OPPRINNELIG_FORELDERINFORMASJON = 'BARN_MED_OPPRINNELIG_FORELDERINFORMASJON',
  BARN_MED_KOPIERT_FORELDERINFORMASJON = 'BARN_MED_KOPIERT_FORELDERINFORMASJON',
  BARN_UTEN_FELLES_FORELDERINFORMASJON = 'BARN_UTEN_FELLES_FORELDERINFORMASJON',
}

interface Props {
  barn: IBarn;
  settAktivIndex: React.Dispatch<React.SetStateAction<number>>;
  aktivIndex: number;
  settSisteBarnUtfylt: (sisteBarnUtfylt: boolean) => void;
  scrollTilLagtTilBarn: () => void;
  settDokumentasjonsbehovForBarn: SettDokumentasjonsbehovBarn;
  barneListe: IBarn[];
  oppdaterBarnISøknaden: (endretBarn: IBarn, erFørstebarn: boolean) => void;
  forelderidenterMedBarn: Map<string, IBarn[]>;
}

const BarnetsBostedEndre: React.FC<Props> = ({
  barn,
  settAktivIndex,
  aktivIndex,
  settSisteBarnUtfylt,
  scrollTilLagtTilBarn,
  barneListe,
  oppdaterBarnISøknaden,
  settDokumentasjonsbehovForBarn,
  forelderidenterMedBarn,
}) => {
  const intl = useLokalIntlContext();

  const [forelder, settForelder] = useState<IForelder>(
    barn.forelder
      ? {
          ...barn.forelder,
          kanIkkeOppgiAnnenForelderFar: {
            label: hentTekst('barnasbosted.kanikkeoppgiforelder', intl),
            verdi: barn.forelder.kanIkkeOppgiAnnenForelderFar?.verdi || false,
          },
        }
      : {
          id: hentUid(),
        }
  );

  const [kjennerIkkeIdent, settKjennerIkkeIdent] = useState<boolean>(
    forelder.fødselsdato?.verdi ? true : false
  );

  const {
    borAnnenForelderISammeHus,
    boddSammenFør,
    flyttetFra,
    fødselsdato,
    ident,
  } = forelder;

  const erIdentUtfyltOgGyldig = (ident?: string): boolean =>
    !!ident && erGyldigFødselsnummer(ident);
  const erFødselsdatoUtfyltOgGyldigEllerTomtFelt = (fødselsdato?: string) =>
    erGyldigDato(fødselsdato) || fødselsdato === '';
  const harForelderFraPdl = barn?.medforelder?.verdi?.navn || false;

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

  const alleBarnMedBarnetsForeldre = barn.forelder?.ident?.verdi
    ? forelderidenterMedBarn.get(barn.forelder?.ident?.verdi)
    : [];

  const harBarnetsMedforelderFlereBarn =
    !!alleBarnMedBarnetsForeldre && alleBarnMedBarnetsForeldre.length > 1;

  const typeBarn = harBarnetsMedforelderFlereBarn
    ? alleBarnMedBarnetsForeldre.findIndex((b) => b.id === barn.id) === 0
      ? TypeBarn.BARN_MED_OPPRINNELIG_FORELDERINFORMASJON
      : TypeBarn.BARN_MED_KOPIERT_FORELDERINFORMASJON
    : TypeBarn.BARN_UTEN_FELLES_FORELDERINFORMASJON;

  const [barnHarSammeForelder, settBarnHarSammeForelder] = useState<
    boolean | undefined
  >(
    typeBarn === TypeBarn.BARN_MED_KOPIERT_FORELDERINFORMASJON
      ? true
      : undefined
  );

  const leggTilForelder = () => {
    oppdaterBarnISøknaden(
      { ...barn, forelder: forelder },
      typeBarn === TypeBarn.BARN_MED_OPPRINNELIG_FORELDERINFORMASJON
    );

    const nyIndex = aktivIndex + 1;
    settAktivIndex(nyIndex);
    scrollTilLagtTilBarn();
  };

  const leggTilAnnenForelderId = (annenForelderId: string) => {
    oppdaterBarnISøknaden(
      { ...barn, annenForelderId: annenForelderId },
      typeBarn === TypeBarn.BARN_MED_OPPRINNELIG_FORELDERINFORMASJON
    );
  };

  const visOmAndreForelder =
    (!barn.medforelder?.verdi && førsteBarnTilHverForelder.length === 0) ||
    barn.annenForelderId === lagtTilAnnenForelderId ||
    (førsteBarnTilHverForelder.length > 0 && barnHarSammeForelder === false) ||
    (barnHarSammeForelder === false &&
      (barn.harSammeAdresse.verdi ||
        harValgtSvar(forelder.skalBarnetBoHosSøker?.verdi)));

  const visBorAnnenForelderINorge =
    (typeBarn !== TypeBarn.BARN_MED_KOPIERT_FORELDERINFORMASJON &&
      !!barn.medforelder?.verdi) ||
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
                  forelder={forelder}
                  oppdaterAnnenForelder={leggTilAnnenForelderId}
                  førsteBarnTilHverForelder={førsteBarnTilHverForelder}
                  settBarnHarSammeForelder={settBarnHarSammeForelder}
                  settForelder={settForelder}
                  oppdaterBarn={oppdaterBarnISøknaden}
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
                <Label as="p">{hentTekst('person.navn', intl)}</Label>
                <BodyShort>
                  {barn.medforelder.verdi.navn
                    ? barn.medforelder.verdi.navn
                    : `${hentTekst('barnekort.medforelder.hemmelig', intl)}, ${
                        barn.medforelder.verdi.alder
                      }`}
                </BodyShort>
              </>
            )}

            {barnHarSammeForelder && (
              <AlertMedTopMargin variant={'info'} inline>
                {hentTekst('barnasbosted.medforelder.gjenbrukt', intl)}
              </AlertMedTopMargin>
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

        {!barnHarSammeForelder &&
          visSpørsmålHvisIkkeSammeForelder(forelder) && (
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

        {erForelderUtfylt(forelder) &&
          (erIdentUtfyltOgGyldig(forelder.ident?.verdi) ||
            erFødselsdatoUtfyltOgGyldigEllerTomtFelt(
              forelder?.fødselsdato?.verdi
            ) ||
            utfyltNødvendigSpørsmålUtenOppgiAnnenForelder(forelder) ||
            harForelderFraPdl) && (
            <Button variant="secondary" onClick={leggTilForelder}>
              <LocaleTekst tekst={'knapp.neste'} />
            </Button>
          )}
      </div>
    </div>
  );
};

export default BarnetsBostedEndre;
