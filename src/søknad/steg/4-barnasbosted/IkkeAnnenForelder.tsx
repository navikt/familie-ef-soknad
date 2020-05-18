import React, { FC } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { boddSammenFør, borISammeHus, hvorMyeSammen } from './ForeldreConfig';
import { hentTekst } from '../../../utils/søknad';
import { Normaltekst } from 'nav-frontend-typografi';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { Textarea } from 'nav-frontend-skjema';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { IForelder } from '../../../models/forelder';
import { useIntl } from 'react-intl';
import { ESvar, ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import {
  EBorISammeHus,
  EHvorMyeSammen,
} from '../../../models/steg/barnasbosted';
import { hentBooleanFraValgtSvar } from '../../../utils/spørsmålogsvar';

interface Props {
  forelder: IForelder;
  settForelder: Function;
}
const IkkeAnnenForelder: FC<Props> = ({ forelder, settForelder }) => {
  const intl = useIntl();

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

  return (
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
                    label: hentTekst('barnasbosted.spm.hvordanBorDere', intl),
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
          onChange={(spørsmål, svar) => settHarBoddsammenFør(spørsmål, svar)}
          valgtSvar={forelder.boddSammenFør?.verdi}
        />
      </KomponentGruppe>
      {forelder.boddSammenFør?.verdi && (
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
      )}
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
        hentTekst('barnasbosted.spm.møtesUtenom', intl) && (
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
      )}
    </>
  );
};

export default IkkeAnnenForelder;
