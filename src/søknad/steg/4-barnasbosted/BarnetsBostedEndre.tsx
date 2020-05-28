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
import IkkeAnnenForelder from './IkkeAnnenForelder';
import { Element } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import {
  erJaNeiSvar,
  harValgtSvar,
  hentBooleanFraValgtSvar,
} from '../../../utils/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import {
  visBostedOgSamværSeksjon,
  visSpørsmålUavhengigAvSammeForelder,
} from '../../../helpers/forelder';
import BorForelderINorge from './bostedOgSamvær/BorForelderINorge';
import { ESvar, ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { isValid } from 'date-fns';

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
  const { settDokumentasjonsbehov } = useSøknad();
  const { søknad, settSøknad } = useSøknad();

  const [forelder, settForelder] = useState<IForelder>({});
  const [barnHarSammeForelder, settBarnHarSammeForelder] = useState<
    boolean | undefined
  >(undefined);

  const intl = useIntl();

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

  const andreBarnMedForelder: IBarn[] = søknad.person.barn.filter((b) => {
    return b !== barn && b.forelder;
  });

  const visOmAndreForelder =
    andreBarnMedForelder.length === 0 ||
    (andreBarnMedForelder.length > 0 && barnHarSammeForelder === false) ||
    (barnHarSammeForelder === false &&
      (barn.harSammeAdresse.verdi ||
        harValgtSvar(forelder.skalBarnBoHosDeg?.verdi)));
  const erAlleFelterOgSpørsmålBesvart: boolean = true;

  console.log(barnHarSammeForelder);

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

  const nyForelderOgKanOppgiAndreForelder =
    !barnHarSammeForelder &&
    !forelder.kanIkkeOppgiAnnenForelderFar?.verdi &&
    isValid(forelder.fødselsdato?.verdi);

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

          {visBostedOgSamværSeksjon(
            forelder,
            nyForelderOgKanOppgiAndreForelder
          ) && (
            <BostedOgSamvær settForelder={settForelder} forelder={forelder} />
          )}

          {!barnHarSammeForelder &&
            visSpørsmålUavhengigAvSammeForelder(forelder) && (
              <IkkeAnnenForelder
                forelder={forelder}
                settForelder={settForelder}
              />
            )}
          {erAlleFelterOgSpørsmålBesvart && (
            <Knapp onClick={leggTilForelder}>Neste Barn</Knapp>
          )}
        </div>
      </div>
    </>
  );
};

export default BarnetsBostedEndre;
