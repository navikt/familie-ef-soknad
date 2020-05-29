import React, { useState, useEffect } from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import AnnenForelderKnapper from './AnnenForelderKnapper';
import BarnasBostedHeader from './BarnasBostedHeader';
import BostedOgSamvær from './BostedOgSamvær';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import OmAndreForelder from './OmAndreForelder';
import SkalBarnetBoHosSøker from './SkalBarnetBoHosSøker';
import { boddSammenFør, borISammeHus, hvorMyeSammen } from './ForeldreConfig';
import { EHvorMyeSammen } from '../../../models/steg/barnasbosted';
import { ESvar, ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { hentBooleanFraValgtSvar } from '../../../utils/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import { EBorISammeHus } from '../../../models/steg/barnasbosted';
import { IBarn } from '../../../models/barn';
import { Normaltekst } from 'nav-frontend-typografi';
import { IForelder } from '../../../models/forelder';
import { Knapp } from 'nav-frontend-knapper';
import { Textarea } from 'nav-frontend-skjema';
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';

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
  const intl = useIntl();
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

  const settHarBoddsammenFør = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const nyForelder = {
      ...forelder,
      [boddSammenFør.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: valgtSvar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentBooleanFraValgtSvar(valgtSvar),
      },
    };

    if (valgtSvar.id === ESvar.NEI) {
      delete nyForelder.flyttetFra;
    }

    settForelder(nyForelder);
  };

  const settBorISammeHus = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const nyForelder = {
      ...forelder,
      [borISammeHus.søknadid]: {
        label: intl.formatMessage({
          id: 'barnasbosted.spm.borISammeHus',
        }),
        verdi: hentTekst(valgtSvar.svar_tekstid, intl),
      },
    };

    if (
      valgtSvar.id === EBorISammeHus.nei ||
      valgtSvar.id === EBorISammeHus.vetikke
    ) {
      delete nyForelder.hvordanBorDere;
    }

    settForelder(nyForelder);
  };

  const settHvorMyeSammen = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const nyForelder = {
      ...forelder,
      [hvorMyeSammen.søknadid]: {
        label: intl.formatMessage({
          id: 'barnasbosted.spm.hvorMyeSammen',
        }),
        verdi: hentTekst(valgtSvar.svar_tekstid, intl),
      },
    };

    if (
      valgtSvar.id === EHvorMyeSammen.kunNårLeveres ||
      valgtSvar.id === EHvorMyeSammen.møtesIkke
    ) {
      delete nyForelder.beskrivSamværUtenBarn;
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
          <SkalBarnetBoHosSøker
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
                  valgtSvar={forelder.borISammeHus?.verdi}
                  settSpørsmålOgSvar={(spørsmål, svar) =>
                    settBorISammeHus(spørsmål, svar)
                  }
                />
              </KomponentGruppe>
              {forelder.borISammeHus?.verdi ===
              hentTekst('barnasbosted.spm.ja', intl) ? (
                <>
                  <div className="margin-bottom-05">
                    <Normaltekst>
                      {intl.formatMessage({
                        id: 'barnasbosted.spm.hvordanBorDere',
                      })}
                    </Normaltekst>
                  </div>
                  <FeltGruppe>
                    <Textarea
                      value={
                        forelder.hvordanBorDere && forelder.hvordanBorDere.verdi
                          ? forelder.hvordanBorDere.verdi
                          : ''
                      }
                      onChange={(e: any) =>
                        settForelder({
                          ...forelder,
                          hvordanBorDere: {
                            label: hentTekst(
                              'barnasbosted.spm.hvordanBorDere',
                              intl
                            ),
                            verdi: e.target.value,
                          },
                        })
                      }
                      label=""
                    />
                  </FeltGruppe>
                </>
              ) : null}

              <KomponentGruppe>
                <JaNeiSpørsmål
                  spørsmål={boddSammenFør}
                  onChange={(spørsmål, svar) =>
                    settHarBoddsammenFør(spørsmål, svar)
                  }
                  valgtSvar={forelder.boddSammenFør?.verdi}
                />
              </KomponentGruppe>
              {forelder.boddSammenFør?.verdi ? (
                <KomponentGruppe>
                  <Datovelger
                    settDato={(e: Date | null) => {
                      e !== null &&
                        settForelder({
                          ...forelder,
                          flyttetFra: {
                            label: intl.formatMessage({
                              id: 'barnasbosted.normaltekst.nårflyttetfra',
                            }),
                            verdi: e,
                          },
                        });
                    }}
                    valgtDato={
                      forelder.flyttetFra && forelder.flyttetFra.verdi
                        ? forelder.flyttetFra.verdi
                        : undefined
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
                  valgtSvar={forelder.hvorMyeSammen?.verdi}
                  settSpørsmålOgSvar={(spørsmål, svar) =>
                    settHvorMyeSammen(spørsmål, svar)
                  }
                />
              </KomponentGruppe>
              {forelder.hvorMyeSammen?.verdi ===
              hentTekst('barnasbosted.spm.møtesUtenom', intl) ? (
                <>
                  <div className="margin-bottom-05">
                    <Normaltekst>
                      {intl.formatMessage({
                        id: 'barnasbosted.spm.beskrivSamværUtenBarn',
                      })}
                    </Normaltekst>
                  </div>
                  <FeltGruppe>
                    <Textarea
                      value={
                        forelder.beskrivSamværUtenBarn &&
                        forelder.beskrivSamværUtenBarn.verdi
                          ? forelder.beskrivSamværUtenBarn.verdi
                          : ''
                      }
                      onChange={(e: any) =>
                        settForelder({
                          ...forelder,
                          beskrivSamværUtenBarn: {
                            label: hentTekst(
                              'barnasbosted.spm.beskrivSamværUtenBarn',
                              intl
                            ),
                            verdi: e.target.value,
                          },
                        })
                      }
                      label=""
                    />
                  </FeltGruppe>
                </>
              ) : null}
            </>
          ) : null}
          <Knapp onClick={leggTilForelder}>Lagre</Knapp>
        </div>
      </div>
    </>
  );
};

export default BarnetsBostedEndre;
