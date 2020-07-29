import React, { FC } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { IBarn } from '../../../models/barn';
import {
  EBarnepass,
  ETypeBarnepassOrdning,
  IBarnepassOrdning,
} from '../../models/barnepass';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmålMedNavn from '../../../components/spørsmål/MultiSvarSpørsmålMedNavn';
import { HvaSlagsBarnepassOrdningSpm } from './BarnepassConfig';
import { hentBarnNavnEllerBarnet } from '../../../utils/barn';
import { useIntl } from 'react-intl';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { hentTekst } from '../../utils/søknad';
import InputLabelGruppe from '../../../components/gruppe/InputLabelGruppe';
import { Input } from 'nav-frontend-skjema';
import PeriodeDatovelgere from '../../../components/dato/PeriodeDatovelger';
import { tomPeriode } from '../../../helpers/tommeSøknadsfelter';
import { datoTilStreng } from '../../../utils/dato';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';
import LocaleTekst from '../../../language/LocaleTekst';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';

interface Props {
  barn: IBarn;
  barnepassOrdning: IBarnepassOrdning;
  settBarnepassOrdning: (barnepassOrdning: IBarnepassOrdning) => void;
  settDokumentasjonsbehov: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    erHuketAv?: boolean
  ) => void;
}

const BarnepassSpørsmål: FC<Props> = ({
  barn,
  settBarnepassOrdning,
  barnepassOrdning,
  settDokumentasjonsbehov,
}) => {
  const intl = useIntl();
  const { hvaSlagsBarnepassOrdning } = barnepassOrdning;

  const navnLabel =
    barnepassOrdning.hvaSlagsBarnepassOrdning?.svarid ===
    ETypeBarnepassOrdning.barnehageOgLiknende
      ? hentTekst('barnehageOgLiknende.label.navnPåBarnepass', intl)
      : hentBarnNavnEllerBarnet(barn, 'privat.label.navnPåBarnepass', intl);
  const beløpLabel = hentTekst('barnepass.label.beløp', intl);
  const spørsmålTekstBarnepassOrdning = hentBarnNavnEllerBarnet(
    barn,
    HvaSlagsBarnepassOrdningSpm.tekstid,
    intl
  );
  const alertstripeTekst =
    barnepassOrdning.hvaSlagsBarnepassOrdning?.svarid ===
    ETypeBarnepassOrdning.barnehageOgLiknende
      ? 'barnepass.alert-dokumentasjon.beløp.barnehageOgLiknende'
      : 'barnepass.alert-dokumentasjon.beløp.privat';

  const datovelgerTekst = hentBarnNavnEllerBarnet(
    barn,
    'barnepass.datovelger.periodePåBarnepass',
    intl
  );

  const settSpørsmålFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    settBarnepassOrdning({
      ...barnepassOrdning,
      hvaSlagsBarnepassOrdning: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    });
    settDokumentasjonsbehov(spørsmål, svar);
  };

  const settInputFelt = (
    e: React.FormEvent<HTMLInputElement>,
    nøkkel: string,
    label: string
  ) => {
    settBarnepassOrdning({
      ...barnepassOrdning,
      [nøkkel]: { label: label, verdi: e.currentTarget.value },
    });
  };

  const settPeriode = (dato: Date | null, objektnøkkel: string) => {
    const periode = barnepassOrdning.periode
      ? barnepassOrdning.periode
      : tomPeriode;

    dato !== null &&
      settBarnepassOrdning({
        ...barnepassOrdning,
        periode: {
          ...periode,
          [objektnøkkel]: {
            label: datovelgerTekst,
            verdi: datoTilStreng(dato),
          },
        },
      });
  };

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmålMedNavn
          spørsmål={HvaSlagsBarnepassOrdningSpm}
          spørsmålTekst={spørsmålTekstBarnepassOrdning}
          settSpørsmålOgSvar={settSpørsmålFelt}
          valgtSvar={hvaSlagsBarnepassOrdning?.verdi}
        />
      </KomponentGruppe>
      <KomponentGruppe>
        <Input
          key={EBarnepass.navn}
          label={navnLabel}
          bredde={'L'}
          type={'text'}
          onChange={(e) => settInputFelt(e, EBarnepass.navn, navnLabel)}
          value={barnepassOrdning?.navn ? barnepassOrdning?.navn.verdi : ''}
        />
      </KomponentGruppe>
      <KomponentGruppe>
        <PeriodeDatovelgere
          tekst={datovelgerTekst}
          periode={
            barnepassOrdning.periode ? barnepassOrdning.periode : tomPeriode
          }
          settDato={settPeriode}
        />
      </KomponentGruppe>
      <KomponentGruppe>
        <FeltGruppe>
          <InputLabelGruppe
            label={hentTekst('barnepass.label.beløp', intl)}
            nøkkel={EBarnepass.belop}
            type={'text'}
            hjelpetekst={{
              innholdTekstid: 'barnepass.hjelpetekst-innhold.beløp',
              åpneTekstid: 'barnepass.hjelpetekst-åpne.beløp',
              lukkeTekstid: '',
            }}
            bredde={'S'}
            settInputFelt={(e) =>
              settInputFelt(e, EBarnepass.belop, beløpLabel)
            }
            beskrivendeTekst={hentTekst('input.kroner', intl)}
            value={barnepassOrdning.belop ? barnepassOrdning.belop.verdi : ''}
          />
        </FeltGruppe>
        <FeltGruppe>
          <AlertStripeDokumentasjon>
            <LocaleTekst tekst={alertstripeTekst} />
          </AlertStripeDokumentasjon>
        </FeltGruppe>
      </KomponentGruppe>
    </SeksjonGruppe>
  );
};

export default BarnepassSpørsmål;
