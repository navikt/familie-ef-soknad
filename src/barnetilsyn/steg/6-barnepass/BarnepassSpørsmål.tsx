import React, { FC } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { IBarn } from '../../../models/steg/barn';
import classnames from 'classnames';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmålMedNavn from '../../../components/spørsmål/MultiSvarSpørsmålMedNavn';
import PeriodeDatovelgere from '../../../components/dato/PeriodeDatovelger';
import SlettKnapp from '../../../components/knapper/SlettKnapp';
import TittelOgSlettKnapp from '../../../components/knapper/TittelOgSlettKnapp';
import { hentBarnNavnEllerBarnet } from '../../../utils/barn';
import { hentTittelMedNr } from '../../../language/utils';
import { HvaSlagsBarnepassOrdningSpm } from './BarnepassConfig';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { tomPeriode } from '../../../helpers/tommeSøknadsfelter';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { hentTekst } from '../../../utils/søknad';
import BarnepassBeløp from './BarnepassBeløp';
import { erÅrsakBarnepassSpmBesvart } from './hjelper';
import { harValgtSvar } from '../../../utils/spørsmålogsvar';
import {
  EBarnepass,
  ETypeBarnepassOrdning,
  IBarnepassOrdning,
} from '../../models/barnepass';
import { EPeriode } from '../../../models/felles/periode';
import { DatoBegrensning } from '../../../components/dato/Datovelger';
import { erPeriodeGyldigOgInnaforBegrensninger } from '../../../components/dato/utils';
import { Heading, TextField } from '@navikt/ds-react';

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
  const intl = useLokalIntlContext();
  const { hvaSlagsBarnepassOrdning, periode } = barnepassOrdning;

  const navnLabel =
    barnepassOrdning.hvaSlagsBarnepassOrdning?.svarid ===
    ETypeBarnepassOrdning.barnehageOgLiknende
      ? hentTekst('barnehageOgLiknende.label.navnPåBarnepass', intl)
      : hentBarnNavnEllerBarnet(barn, 'privat.label.navnPåBarnepass', intl);
  const spørsmålTekstBarnepassOrdning = hentBarnNavnEllerBarnet(
    barn,
    HvaSlagsBarnepassOrdningSpm(intl).tekstid,
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
        verdi: svar.svar_tekst,
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

  const settPeriode = (dato: string, objektnøkkel: EPeriode) => {
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
            verdi: dato,
          },
        },
      });
  };

  return (
    <SeksjonGruppe>
      {flereEnnEnOrdninger && (
        <TittelOgSlettKnapp>
          <Heading size="small" className="tittel">
            {barnepassordningTittel}
          </Heading>
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
            spørsmål={HvaSlagsBarnepassOrdningSpm(intl)}
            spørsmålTekst={spørsmålTekstBarnepassOrdning}
            settSpørsmålOgSvar={settSpørsmålFelt}
            valgtSvar={hvaSlagsBarnepassOrdning?.verdi}
          />
        </KomponentGruppe>
      )}
      {hvaSlagsBarnepassOrdning?.verdi && (
        <KomponentGruppe>
          <TextField
            key={EBarnepass.navn}
            label={navnLabel}
            size={'medium'}
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
              headerTekstid: '',
              innholdTekstid: 'barnepass.hjelpetekst.periodePåBarnepass',
            }}
            fomTekstid={'periode.startdato'}
            tomTekstid={'periode.sluttdato'}
            periode={
              barnepassOrdning.periode ? barnepassOrdning.periode : tomPeriode
            }
            datobegrensning={DatoBegrensning.AlleDatoer}
            settDato={settPeriode}
          />
        </KomponentGruppe>
      )}
      {periode &&
        erPeriodeGyldigOgInnaforBegrensninger(
          periode,
          DatoBegrensning.AlleDatoer
        ) && (
          <BarnepassBeløp
            barnepassOrdning={barnepassOrdning}
            settInputFelt={settInputFelt}
          />
        )}
    </SeksjonGruppe>
  );
};

export default BarnepassSpørsmål;
