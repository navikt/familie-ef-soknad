import React, { FC, useState } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { IBarn } from '../../../models/steg/barn';
import classnames from 'classnames';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmålMedNavn from '../../../components/spørsmål/MultiSvarSpørsmålMedNavn';
import PeriodeDatovelgere from '../../../components/dato/PeriodeDatovelger';
import SlettKnapp from '../../../components/knapper/SlettKnapp';
import TittelOgSlettKnapp from '../../../components/knapper/TittelOgSlettKnapp';
import { datoTilStreng, erPeriodeGyldig } from '../../../utils/dato';
import { hentBarnNavnEllerBarnet } from '../../../utils/barn';
import { hentTittelMedNr } from '../../../language/utils';
import { HvaSlagsBarnepassOrdningSpm } from './BarnepassConfig';
import { Input } from 'nav-frontend-skjema';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { tomPeriode } from '../../../helpers/tommeSøknadsfelter';
import { Undertittel } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import BarnepassBeløp from './BarnepassBeløp';
import { erÅrsakBarnepassSpmBesvart } from './hjelper';
import { harValgtSvar } from '../../../utils/spørsmålogsvar';
import { DatoBegrensning } from '../../../components/dato/Datovelger';
import {
  EBarnepass,
  ETypeBarnepassOrdning,
  IBarnepassOrdning,
} from '../../models/barnepass';
import { EPeriode } from '../../../models/felles/periode';

interface Props {
  barn: IBarn;
  barnepassOrdning: IBarnepassOrdning;
  settBarnepassOrdning: (barnepassOrdning: IBarnepassOrdning) => void;
  fjernBarnepassOrdning: (barnepassordning: IBarnepassOrdning) => void;
  settDokumentasjonsbehovForBarn: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    barneid: string,
    barnepassid: string
  ) => void;
}

const BarnepassSpørsmål: FC<Props> = ({
  barn,
  settBarnepassOrdning,
  fjernBarnepassOrdning,
  barnepassOrdning,
  settDokumentasjonsbehovForBarn,
}) => {
  const intl = useIntl();
  const { hvaSlagsBarnepassOrdning, periode } = barnepassOrdning;
  const [gyldigPeriode, settGyldigPeriode] = useState<boolean>(
    periode ? erPeriodeGyldig(periode) : false
  );

  const navnLabel =
    barnepassOrdning.hvaSlagsBarnepassOrdning?.svarid ===
    ETypeBarnepassOrdning.barnehageOgLiknende
      ? hentTekst('barnehageOgLiknende.label.navnPåBarnepass', intl)
      : hentBarnNavnEllerBarnet(barn, 'privat.label.navnPåBarnepass', intl);
  const spørsmålTekstBarnepassOrdning = hentBarnNavnEllerBarnet(
    barn,
    HvaSlagsBarnepassOrdningSpm.tekstid,
    intl
  );
  const periodeTekst = hentBarnNavnEllerBarnet(
    barn,
    'barnepass.datovelger.periodePåBarnepass',
    intl
  );
  const barnepassordningNummer = barn.barnepass?.barnepassordninger.findIndex(
    (barnepassordning) => barnepassordning.id === barnepassOrdning.id
  );
  const flereEnnEnOrdninger =
    barn?.barnepass?.barnepassordninger !== undefined &&
    barn?.barnepass?.barnepassordninger?.length > 1;

  const barnepassordningTittel =
    barnepassordningNummer !== undefined &&
    hentTittelMedNr(
      barn.barnepass?.barnepassordninger!,
      barnepassordningNummer,
      intl.formatMessage({ id: 'barnepass.tittel.ordning' })
    );

  const settSpørsmålFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    const endretBarnepassordning = barnepassOrdning;
    delete endretBarnepassordning.periode;
    delete endretBarnepassordning.navn;
    delete endretBarnepassordning.belop;

    settBarnepassOrdning({
      ...barnepassOrdning,
      hvaSlagsBarnepassOrdning: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentBarnNavnEllerBarnet(barn, spørsmål.tekstid, intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    });
    settDokumentasjonsbehovForBarn(
      spørsmål,
      svar,
      barn.id,
      barnepassOrdning.id
    );
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

  const settPeriode = (dato: Date | null, objektnøkkel: EPeriode) => {
    const periode = barnepassOrdning.periode
      ? barnepassOrdning.periode
      : tomPeriode;

    const datovelgerTekst =
      objektnøkkel === EPeriode.fra
        ? hentTekst('periode.startdato', intl)
        : hentTekst('periode.sluttdato', intl);

    dato !== null &&
      settBarnepassOrdning({
        ...barnepassOrdning,
        periode: {
          ...periode,
          label: periodeTekst,
          [objektnøkkel]: {
            label: datovelgerTekst,
            verdi: datoTilStreng(dato),
          },
        },
      });
  };

  return (
    <SeksjonGruppe>
      {flereEnnEnOrdninger && (
        <TittelOgSlettKnapp>
          <Undertittel className={'tittel'}>
            {barnepassordningTittel}
          </Undertittel>
          <SlettKnapp
            className={classnames('slettknapp', {
              kunEn: barn.barnepass?.barnepassordninger?.length === 1,
            })}
            onClick={() => fjernBarnepassOrdning(barnepassOrdning)}
            tekstid={'barnepass.knapp.slett'}
          />
        </TittelOgSlettKnapp>
      )}
      {erÅrsakBarnepassSpmBesvart(barn) && (
        <KomponentGruppe>
          <MultiSvarSpørsmålMedNavn
            spørsmål={HvaSlagsBarnepassOrdningSpm}
            spørsmålTekst={spørsmålTekstBarnepassOrdning}
            settSpørsmålOgSvar={settSpørsmålFelt}
            valgtSvar={hvaSlagsBarnepassOrdning?.verdi}
          />
        </KomponentGruppe>
      )}
      {hvaSlagsBarnepassOrdning?.verdi && (
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
      )}
      {harValgtSvar(barnepassOrdning?.navn?.verdi) && (
        <KomponentGruppe>
          <PeriodeDatovelgere
            tekst={periodeTekst}
            hjelpetekst={{
              åpneTekstid: '',
              innholdTekstid: 'barnepass.hjelpetekst.periodePåBarnepass',
              lukkeTekstid: '',
            }}
            fomTekstid={'periode.startdato'}
            tomTekstid={'periode.sluttdato'}
            periode={
              barnepassOrdning.periode ? barnepassOrdning.periode : tomPeriode
            }
            datobegrensing={DatoBegrensning.AlleDatoer}
            settDato={settPeriode}
            onValidate={settGyldigPeriode}
          />
        </KomponentGruppe>
      )}
      {erPeriodeGyldig(barnepassOrdning.periode) && gyldigPeriode && (
        <BarnepassBeløp
          barnepassOrdning={barnepassOrdning}
          settInputFelt={settInputFelt}
        />
      )}
    </SeksjonGruppe>
  );
};

export default BarnepassSpørsmål;
