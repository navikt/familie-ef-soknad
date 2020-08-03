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
import BarnepassOrdninger from './BarnepassOrdninger';
import ÅrsakBarnepass from './ÅrsakBarnepass';
import BarneHeader from '../../../components/BarneHeader';
import {
  erBarnepassFerdigUtfylt,
  erBarnepassForAlleBarnUtfylt,
  erÅrsakBarnepassSpmBesvart,
  harBarnAvsluttetFjerdeKlasse,
} from './hjelper';

interface Props {}
const Barnepass: FC<Props> = () => {
  const intl = useIntl();
  const {
    søknad,
    settSøknad,
    mellomlagreBarnetilsyn,
    settDokumentasjonsbehov,
  } = useBarnetilsynSøknad();
  const { søknadsdato, søkerFraBestemtMåned } = søknad;

  const barnMedISøknaden = søknad.person.barn.filter((barn) => barn.medISøknad);

  const datovelgerLabel = 'søkerStønadFraBestemtMnd.datovelger.barnepass';
  const hjelpetekstInnholdTekstid =
    'søkerFraBestemtMåned.hjelpetekst-innhold.barnepass';

  const settBarnepass = (barnepass: IBarnepass, barnid: string) => {
    const endretBarn = barnMedISøknaden.map((barn) => {
      if (barn.id === barnid) {
        return {
          ...barn,
          barnepass: barnepass,
        };
      }
      return barn;
    });
    settSøknad((prevSøknad) => {
      return {
        ...prevSøknad,
        person: { ...prevSøknad.person, barn: endretBarn },
      };
    });
  };

  const settSøknadsdato = (dato: Date | null) => {
    dato !== null &&
      settSøknad((prevSøknad) => {
        return {
          ...prevSøknad,
          søknadsdato: {
            label: hentTekst(datovelgerLabel, intl),
            verdi: datoTilStreng(dato),
          },
        };
      });
  };

  const settSøkerFraBestemtMåned = (spørsmål: ISpørsmål, svar: ISvar) => {
    settSøknad((prevSoknad) => {
      if (
        svar.id === ESøkerFraBestemtMåned.neiNavKanVurdere &&
        søknadsdato?.verdi
      )
        delete prevSoknad.søknadsdato;
      return {
        ...prevSoknad,
        [spørsmål.søknadid]: {
          spørsmålid: spørsmål.søknadid,
          svarid: svar.id,
          label: hentTekst(spørsmål.tekstid, intl),
          verdi: svar.id === ESøkerFraBestemtMåned.ja,
        },
      };
    });
    settDokumentasjonsbehov(spørsmål, svar);
  };

  return (
    <Side
      tittel={intl.formatMessage({ id: 'barnepass.sidetittel' })}
      skalViseKnapper={true}
      mellomlagreBarnetilsyn={mellomlagreBarnetilsyn}
      erSpørsmålBesvart={erBarnepassFerdigUtfylt(barnMedISøknaden, søknad)}
    >
      <SeksjonGruppe>
        {barnMedISøknaden.map((barn) => (
          <>
            <SeksjonGruppe>
              <BarneHeader barn={barn} />
            </SeksjonGruppe>
            {harBarnAvsluttetFjerdeKlasse(barn) && (
              <ÅrsakBarnepass
                barn={barn}
                settBarnepass={settBarnepass}
                settDokumentasjonsbehov={settDokumentasjonsbehov}
              />
            )}
            {erÅrsakBarnepassSpmBesvart(barn) && (
              <BarnepassOrdninger
                barn={barn}
                settBarnepass={settBarnepass}
                settDokumentasjonsbehov={settDokumentasjonsbehov}
              />
            )}
          </>
        ))}
      </SeksjonGruppe>
      {erBarnepassForAlleBarnUtfylt(barnMedISøknaden) && (
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
      )}
    </Side>
  );
};

export default Barnepass;
