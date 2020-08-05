import React, { FC, useState } from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import InputLabelGruppe from '../../../components/gruppe/InputLabelGruppe';
import { hentTekst } from '../../../utils/søknad';
import {
  EBarnepass,
  ETypeBarnepassOrdning,
  IBarnepassOrdning,
} from '../../models/barnepass';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';
import LocaleTekst from '../../../language/LocaleTekst';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import { erStrengGyldigTall } from '../../../utils/feltvalidering';
import { Feilmelding } from 'nav-frontend-typografi';

interface Props {
  barnepassOrdning: IBarnepassOrdning;
  settInputFelt: (
    e: React.FormEvent<HTMLInputElement>,
    nøkkel: string,
    label: string
  ) => void;
}
const BarnepassBeløp: FC<Props> = ({ barnepassOrdning, settInputFelt }) => {
  const intl = useIntl();
  const beløp = barnepassOrdning.belop ? barnepassOrdning.belop.verdi : '';
  const beløpLabel = hentTekst('barnepass.label.beløp', intl);
  const alertstripeTekst =
    barnepassOrdning.hvaSlagsBarnepassOrdning?.svarid ===
    ETypeBarnepassOrdning.barnehageOgLiknende
      ? 'barnepass.alert-dokumentasjon.beløp.barnehageOgLiknende'
      : 'barnepass.alert-dokumentasjon.beløp.privat';

  return (
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
          settInputFelt={(e) => settInputFelt(e, EBarnepass.belop, beløpLabel)}
          beskrivendeTekst={hentTekst('input.kroner', intl)}
          value={beløp}
          placeholder={intl.formatMessage({ id: 'placeholder.beløp' })}
        />
      </FeltGruppe>
      {!erStrengGyldigTall(beløp) && barnepassOrdning.belop && (
        <FeltGruppe>
          <Feilmelding>
            <LocaleTekst tekst={'feil.ugyldigTall.beløp'} />
          </Feilmelding>
        </FeltGruppe>
      )}
      <FeltGruppe>
        <AlertStripeDokumentasjon>
          <LocaleTekst tekst={alertstripeTekst} />
        </AlertStripeDokumentasjon>
      </FeltGruppe>
    </KomponentGruppe>
  );
};

export default BarnepassBeløp;
