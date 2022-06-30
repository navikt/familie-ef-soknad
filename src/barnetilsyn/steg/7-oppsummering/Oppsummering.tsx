import React, { useEffect, useState } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import OppsummeringAktiviteter from '../../../søknad/steg/7-oppsummering/OppsummeringAktiviteter';
import OppsummeringBarnaDine from '../../../søknad/steg/7-oppsummering/OppsummeringBarnaDine';
import OppsummeringBarnasBosituasjon from '../../../søknad/steg/7-oppsummering/OppsummeringBarnasBosituasjon';
import OppsummeringBarnepass from './OppsummeringBarnepass';
import OppsummeringBosituasionenDin from '../../../søknad/steg/7-oppsummering/OppsummeringBosituasjon';
import OppsummeringOmDeg from '../../../søknad/steg/7-oppsummering/OppsummeringOmDeg';
import {
  ERouteBarnetilsyn,
  RoutesBarnetilsyn,
} from '../../routing/routesBarnetilsyn';
import { ESkjemanavn, skjemanavnIdMapping } from '../../../utils/skjemanavn';
import { IBarn } from '../../../models/steg/barn';
import { Normaltekst } from 'nav-frontend-typografi';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { hentPath } from '../../../utils/routing';
import Side, { ESide } from '../../../components/side/Side';
import { hentTekst } from '../../../utils/søknad';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import {
  logManglendeFelter,
  logSidevisningBarnetilsyn,
} from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import {
  aktivitetSchemaBT,
  listManglendeFelter,
  ManglendeFelter,
  manglendeFelterTilTekst,
} from '../../../utils/validering/validering';
import { Alert } from '@navikt/ds-react';

const Oppsummering: React.FC = () => {
  const intl = useLokalIntlContext();
  const { mellomlagreBarnetilsyn, søknad } = useBarnetilsynSøknad();
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Barnetilsyn];
  const barnSomSkalHaBarnepass: IBarn[] = søknad.person.barn.filter(
    (barn: IBarn) => barn.skalHaBarnepass?.verdi
  );
  const [manglendeFelter, settManglendeFelter] = useState<string[]>([]);

  useMount(() => logSidevisningBarnetilsyn('Oppsummering'));

  useEffect(() => {
    aktivitetSchemaBT
      .validate(søknad.aktivitet)
      .then()
      .catch((e) => {
        if (
          !manglendeFelter.includes(
            manglendeFelterTilTekst[ManglendeFelter.AKTIVITET]
          )
        ) {
          settManglendeFelter((prev: string[]): string[] => [
            ...prev,
            manglendeFelterTilTekst[ManglendeFelter.AKTIVITET],
          ]);
        }

        logManglendeFelter(ESkjemanavn.Barnetilsyn, skjemaId, {
          feilmelding: e,
        });
      });
  }, [søknad, manglendeFelter, skjemaId]);

  const harManglendeFelter = manglendeFelter.length > 0;

  return (
    <>
      <Side
        stønadstype={Stønadstype.barnetilsyn}
        stegtittel={intl.formatMessage({ id: 'oppsummering.sidetittel' })}
        erSpørsmålBesvart={true}
        mellomlagreStønad={mellomlagreBarnetilsyn}
        routesStønad={RoutesBarnetilsyn}
        skalViseKnapper={ESide.visTilbakeNesteAvbrytKnapp}
      >
        <div className="oppsummering">
          <Normaltekst className="disclaimer">
            {intl.formatMessage({ id: 'oppsummering.normaltekst.lesgjennom' })}
          </Normaltekst>

          <KomponentGruppe>
            <OppsummeringOmDeg
              tittel={hentTekst('stegtittel.omDeg', intl)}
              søker={søknad.person.søker}
              sivilstatus={søknad.sivilstatus}
              medlemskap={søknad.medlemskap}
              endreInformasjonPath={hentPath(
                RoutesBarnetilsyn,
                ERouteBarnetilsyn.OmDeg
              )}
            />
            <OppsummeringBosituasionenDin
              tittel={hentTekst('stegtittel.bosituasjon', intl)}
              bosituasjon={søknad.bosituasjon}
              endreInformasjonPath={hentPath(
                RoutesBarnetilsyn,
                ERouteBarnetilsyn.BosituasjonenDin
              )}
            />
            <OppsummeringBarnaDine
              tittel={hentTekst('barnadine.sidetittel', intl)}
              barn={søknad.person.barn}
              stønadstype={Stønadstype.barnetilsyn}
              endreInformasjonPath={hentPath(
                RoutesBarnetilsyn,
                ERouteBarnetilsyn.BarnaDine
              )}
            />
            <OppsummeringBarnasBosituasjon
              tittel={hentTekst('barnasbosted.sidetittel', intl)}
              barn={søknad.person.barn}
              endreInformasjonPath={hentPath(
                RoutesBarnetilsyn,
                ERouteBarnetilsyn.BostedOgSamvær
              )}
            />
            <OppsummeringAktiviteter
              tittel={hentTekst(
                'stegtittel.arbeidssituasjon.barnetilsyn',
                intl
              )}
              aktivitet={søknad.aktivitet}
              endreInformasjonPath={hentPath(
                RoutesBarnetilsyn,
                ERouteBarnetilsyn.Aktivitet
              )}
            />
            <OppsummeringBarnepass
              søkerFraBestemtDato={søknad.søkerFraBestemtMåned}
              søknadsdato={søknad.søknadsdato}
              barnSomSkalHaBarnepass={barnSomSkalHaBarnepass}
              endreInformasjonPath={hentPath(
                RoutesBarnetilsyn,
                ERouteBarnetilsyn.Barnepass
              )}
            />
          </KomponentGruppe>
          {harManglendeFelter && (
            <Alert variant="warning">
              Det er felter i søknaden som ikke er fylt ut eller har ugyldig
              verdi. Gå til {listManglendeFelter(manglendeFelter)} for å legge
              inn gyldige verdier før du sender inn søknaden.
            </Alert>
          )}
        </div>
      </Side>
    </>
  );
};

export default Oppsummering;
