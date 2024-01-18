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
  utfyltBorINorge,
  utfyltNødvendigSpørsmålUtenOppgiAnnenForelder,
  visSpørsmålHvisIkkeSammeForelder,
} from '../../../helpers/steg/forelder';
import BorForelderINorge from './bostedOgSamvær/BorForelderINorge';
import BorAnnenForelderISammeHus from './ikkesammeforelder/BorAnnenForelderISammeHus';
import BoddSammenFør from './ikkesammeforelder/BoddSammenFør';
import HvorMyeSammen from './ikkesammeforelder/HvorMyeSammen';
import { hentUid } from '../../../utils/autentiseringogvalidering/uuid';
import { erGyldigDato } from '../../../utils/dato';
import { TypeBarn } from '../../../models/steg/barnasbosted';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import BarnetsAndreForelderTittel from './BarnetsAndreForelderTittel';
import LocaleTekst from '../../../language/LocaleTekst';
import { Alert, BodyShort, Button, Label } from '@navikt/ds-react';
import { SettDokumentasjonsbehovBarn } from '../../../models/søknad/søknad';
import styled from 'styled-components';
import { lagtTilAnnenForelderId } from '../../../utils/barn';
import {
  erFødselsdatoUtfyltOgGyldigEllerTomtFelt,
  erIdentUtfyltOgGyldig,
  finnFørsteBarnTilHverForelder,
  finnTypeBarnForMedForelder,
  harValgtBorISammeHus,
  skalBorAnnenForelderINorgeVises,
  skalOmAndreForelderVises,
} from '../../../helpers/steg/barnetsBostedEndre';

const AlertMedTopMargin = styled(Alert)`
  margin-top: 1rem;
`;

const visBostedOgSamværSeksjon = (
  forelder: IForelder,
  visesBorINorgeSpørsmål: boolean
) => {
  return visesBorINorgeSpørsmål
    ? utfyltBorINorge(forelder)
    : erGyldigDato(forelder.fødselsdato?.verdi);
};

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

  const { boddSammenFør, flyttetFra, fødselsdato, ident } = forelder;

  const harForelderFraPdl = barn?.medforelder?.verdi?.navn || false;

  const førsteBarnTilHverForelder = finnFørsteBarnTilHverForelder(
    barneListe,
    barn
  );

  const typeBarn = finnTypeBarnForMedForelder(barn, forelderidenterMedBarn);

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

  const finnesBarnSomSkalHaBarnepassOgRegistrertAnnenForelderBlantValgteBarn =
    barneListe.some(
      (b) =>
        b.skalHaBarnepass?.verdi &&
        b.medforelder?.verdi?.ident &&
        b.medforelder?.verdi?.navn
    );

  const visOmAndreForelder = skalOmAndreForelderVises(
    barn,
    førsteBarnTilHverForelder,
    lagtTilAnnenForelderId,
    barnHarSammeForelder,
    forelder,
    finnesBarnSomSkalHaBarnepassOgRegistrertAnnenForelderBlantValgteBarn
  );

  const visBorAnnenForelderINorge = skalBorAnnenForelderINorgeVises(
    barn,
    typeBarn,
    barnHarSammeForelder,
    forelder,
    ident,
    fødselsdato,
    kjennerIkkeIdent
  );

  const skalFylleUtHarBoddSammenFør =
    harValgtBorISammeHus(forelder) && utfyltBorINorge(forelder);

  const barnErFraForrigSøknadOgSkalViseAnnenForelderValg =
    barn.erFraForrigeSøknad &&
    finnesBarnSomSkalHaBarnepassOgRegistrertAnnenForelderBlantValgteBarn &&
    !barn.medforelder?.verdi &&
    barn.forelder &&
    !erForelderUtfylt(barn.forelder, barn.harSammeAdresse);

  const skalViseAnnenForelderValg =
    barn.erFraForrigeSøknad !== true &&
    finnesBarnSomSkalHaBarnepassOgRegistrertAnnenForelderBlantValgteBarn &&
    !barn.medforelder?.verdi &&
    !barn.forelder;

  const visAnnenForelderValg =
    barnErFraForrigSøknadOgSkalViseAnnenForelderValg ||
    skalViseAnnenForelderValg;

  console.log(
    'barnErFraForrigSøknadOgSkalViseAnnenForelderValg',
    barnErFraForrigSøknadOgSkalViseAnnenForelderValg
  );
  console.log('skalViseAnnenForelderValg', skalViseAnnenForelderValg);

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

            {visAnnenForelderValg && (
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
              {utfyltBorINorge(forelder) && (
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

              {((skalFylleUtHarBoddSammenFør &&
                boddSammenFør?.verdi === false) ||
                (skalFylleUtHarBoddSammenFør &&
                  erGyldigDato(flyttetFra?.verdi))) && (
                <HvorMyeSammen
                  forelder={forelder}
                  barn={barn}
                  settForelder={settForelder}
                />
              )}
            </>
          )}

        {erForelderUtfylt(forelder, barn.harSammeAdresse) &&
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
