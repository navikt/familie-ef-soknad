import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import NårSøkerDuStønadFra from '../../../components/stegKomponenter/NårSøkerDuStønadFraGruppe';
import { hentTekst } from '../../../utils/søknad';
import { datoTilStreng } from '../../../utils/dato';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { ESøkerFraBestemtMåned } from '../../../models/steg/dinsituasjon/meromsituasjon';
import { SøkerDuStønadFraBestemtMndSpm } from './BarnepassConfig';
import { IBarnepass } from '../../models/barnepass';
import BarnepassOrdninger from './BarnepassOrdninger';
import ÅrsakBarnepass from './ÅrsakBarnepass';
import BarneHeader from '../../../components/BarneHeader';
import {
  erBarnepassForAlleBarnUtfylt,
  erBarnepassForBarnFørNåværendeUtfylt,
  erBarnepassStegFerdigUtfylt,
  erÅrsakBarnepassSpmBesvart,
  harBarnAvsluttetFjerdeKlasse,
  skalDokumentereTidligereFakturaer,
} from './hjelper';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';
import { hentPathBarnetilsynOppsummering } from '../../utils';
import { useLocation } from 'react-router';

interface Props {}
const Barnepass: FC<Props> = () => {
  const intl = useIntl();
  const location = useLocation();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;
  const {
    søknad,
    settSøknad,
    mellomlagreBarnetilsyn,
    settDokumentasjonsbehov,
  } = useBarnetilsynSøknad();
  const { søknadsdato, søkerFraBestemtMåned } = søknad;
  const barnSomSkalHaBarnepass = søknad.person.barn.filter(
    (barn) => barn.skalHaBarnepass?.verdi
  );

  const datovelgerLabel = 'søkerStønadFraBestemtMnd.datovelger.barnepass';
  const hjelpetekstInnholdTekstid =
    'søkerFraBestemtMåned.hjelpetekst-innhold.barnepass';

  const settBarnepass = (barnepass: IBarnepass, barnid: string) => {
    const endretBarn = barnSomSkalHaBarnepass.map((barn) => {
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
  };

  const alertTekst: string = skalDokumentereTidligereFakturaer(
    barnSomSkalHaBarnepass,
    søkerFraBestemtMåned,
    søknadsdato
  )
    ? hentTekst('barnepass.dokumentasjon.søkerStønadFraBestemtMnd', intl)
    : '';

  return (
    <Side
      tittel={intl.formatMessage({ id: 'barnepass.sidetittel' })}
      skalViseKnapper={skalViseKnapper}
      mellomlagreStønad={mellomlagreBarnetilsyn}
      erSpørsmålBesvart={erBarnepassStegFerdigUtfylt(
        barnSomSkalHaBarnepass,
        søknad
      )}
      routesStønad={RoutesBarnetilsyn}
      tilbakeTilOppsummeringPath={hentPathBarnetilsynOppsummering}
    >
      <SeksjonGruppe>
        {barnSomSkalHaBarnepass.map((barn, index) => {
          const visSeksjon =
            index === 0 ||
            erBarnepassForBarnFørNåværendeUtfylt(barn, barnSomSkalHaBarnepass);
          return (
            visSeksjon && (
              <React.Fragment key={barn.id}>
                <SeksjonGruppe>
                  <BarneHeader barn={barn} />
                </SeksjonGruppe>
                {harBarnAvsluttetFjerdeKlasse(barn.fødselsdato.verdi) && (
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
              </React.Fragment>
            )
          );
        })}
      </SeksjonGruppe>
      {erBarnepassForAlleBarnUtfylt(barnSomSkalHaBarnepass) && (
        <SeksjonGruppe>
          <NårSøkerDuStønadFra
            spørsmål={SøkerDuStønadFraBestemtMndSpm}
            settSøkerFraBestemtMåned={settSøkerFraBestemtMåned}
            settDato={settSøknadsdato}
            søkerFraBestemtMåned={søkerFraBestemtMåned}
            valgtDato={søknadsdato}
            datovelgerLabel={datovelgerLabel}
            hjelpetekstInnholdTekstid={hjelpetekstInnholdTekstid}
            alertTekst={alertTekst}
          />
        </SeksjonGruppe>
      )}
    </Side>
  );
};

export default Barnepass;
