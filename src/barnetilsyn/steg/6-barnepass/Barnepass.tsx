import React, { FC } from 'react';
import Side from '../../side/Side';
import { useIntl } from 'react-intl';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import NårSøkerDuStønadFra from '../../../components/NårSøkerDuStønadFraGruppe';
import { hentTekst } from '../../../utils/søknad';
import { datoTilStreng } from '../../../utils/dato';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { ESøkerFraBestemtMåned } from '../../../models/steg/dinsituasjon/meromsituasjon';
import { SøkerDuStønadFraBestemtMndSpm } from './BarnepassConfig';
import { IBarnepass } from '../../models/barnepass';

interface Props {}
const Barnepass: FC<Props> = () => {
  const intl = useIntl();
  const { søknad, settSøknad, mellomlagreBarnetilsyn } = useBarnetilsynSøknad();
  const { søknadsdato, søkerFraBestemtMåned } = søknad.barnepass;

  const datovelgerLabel = 'søkerStønadFraBestemtMnd.datovelger.barnepass';
  const hjelpetekstInnholdTekstid =
    'søkerFraBestemtMåned.hjelpetekst-innhold.barnepass';

  const settBarnepass = (barnepass: IBarnepass) => {
    settSøknad((prevSøknad) => {
      return { ...prevSøknad, barnepass: barnepass };
    });
  };

  const settSøknadsdato = (dato: Date | null) => {
    dato !== null &&
      settBarnepass({
        søknadsdato: {
          label: hentTekst(datovelgerLabel, intl),
          verdi: datoTilStreng(dato),
        },
      });
  };

  const settSøkerFraBestemtMåned = (spørsmål: ISpørsmål, svar: ISvar) => {
    const endretBarnepass = søknad.barnepass;
    if (
      svar.id === ESøkerFraBestemtMåned.neiNavKanVurdere &&
      søknadsdato?.verdi
    )
      delete endretBarnepass.søknadsdato;

    settBarnepass({
      ...endretBarnepass,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar.id === ESøkerFraBestemtMåned.ja,
      },
    });
  };

  const erBarnepassSpmBesvart: boolean =
    (søkerFraBestemtMåned?.svarid === ESøkerFraBestemtMåned.ja &&
      søknadsdato?.verdi !== undefined) ||
    søkerFraBestemtMåned?.svarid === ESøkerFraBestemtMåned.neiNavKanVurdere;

  return (
    <Side
      tittel={intl.formatMessage({ id: 'barnepass.sidetittel' })}
      skalViseKnapper={true}
      mellomlagreBarnetilsyn={mellomlagreBarnetilsyn}
      erSpørsmålBesvart={erBarnepassSpmBesvart}
    >
      <SeksjonGruppe>
        <NårSøkerDuStønadFra
          spørsmål={SøkerDuStønadFraBestemtMndSpm}
          settSøkerFraBestemtMåned={settSøkerFraBestemtMåned}
          settDato={settSøknadsdato}
          søkerFraBestemtMåned={søkerFraBestemtMåned}
          valgtDato={søknadsdato}
          datovelgerLabel={datovelgerLabel}
          hjelpetekstInnholdTekstid={hjelpetekstInnholdTekstid}
        />
      </SeksjonGruppe>
    </Side>
  );
};

export default Barnepass;
