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
import { IBarn } from '../../../models/steg/barn';
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
import { Accordion, BodyShort } from '@navikt/ds-react';
import {
  ManglendeFelter,
  aktivitetSchemaBT,
  manglendeFelterTilTekst,
  medlemskapSchema,
  sivilstatusSchema,
} from '../../../utils/validering/validering';
import { ESkjemanavn, skjemanavnIdMapping } from '../../../utils/skjemanavn';
import ManglendeFelterAlert from '../../../components/feil/ManglendeFelterAlert';

const Oppsummering: React.FC = () => {
  const intl = useLokalIntlContext();
  const { mellomlagreBarnetilsyn, søknad } = useBarnetilsynSøknad();
  const barnSomSkalHaBarnepass: IBarn[] = søknad.person.barn.filter(
    (barn: IBarn) => barn.skalHaBarnepass?.verdi
  );
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Barnetilsyn];
  const [manglendeFelter, settManglendeFelter] = useState<string[]>([]);

  useMount(() => logSidevisningBarnetilsyn('Oppsummering'));

  const oppdaterManglendeFelter = (manglendeFelt: ManglendeFelter) => {
    settManglendeFelter((prev: string[]): string[] => [
      ...prev,
      manglendeFelterTilTekst[manglendeFelt],
    ]);
  };

  const feilIkkeRegistrertFor = (felt: ManglendeFelter) => {
    return !manglendeFelter.includes(manglendeFelterTilTekst[felt]);
  };

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

        logManglendeFelter(ESkjemanavn.Barnetilsyn, skjemaId, e);
      });

    sivilstatusSchema
      .validate(søknad.sivilstatus)
      .then()
      .catch((e) => {
        if (feilIkkeRegistrertFor(ManglendeFelter.OM_DEG)) {
          oppdaterManglendeFelter(ManglendeFelter.OM_DEG);
        }
        logManglendeFelter(ESkjemanavn.Overgangsstønad, skjemaId, e);
      });

    medlemskapSchema
      .validate(søknad.medlemskap)
      .then()
      .catch((e) => {
        if (feilIkkeRegistrertFor(ManglendeFelter.OM_DEG)) {
          oppdaterManglendeFelter(ManglendeFelter.OM_DEG);
        }
        logManglendeFelter(ESkjemanavn.Overgangsstønad, skjemaId, e);
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
        disableNesteKnapp={harManglendeFelter}
      >
        <div className="oppsummering">
          <BodyShort className="disclaimer">
            {intl.formatMessage({ id: 'oppsummering.normaltekst.lesgjennom' })}
          </BodyShort>

          <KomponentGruppe>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>
                  {hentTekst('stegtittel.omDeg', intl)}
                </Accordion.Header>
                <Accordion.Content>
                  <OppsummeringOmDeg
                    søker={søknad.person.søker}
                    søkerBorPåRegistrertAdresse={
                      søknad.søkerBorPåRegistrertAdresse
                    }
                    harMeldtAdresseendring={
                      søknad.adresseopplysninger?.harMeldtAdresseendring
                    }
                    sivilstatus={søknad.sivilstatus}
                    medlemskap={søknad.medlemskap}
                    endreInformasjonPath={hentPath(
                      RoutesBarnetilsyn,
                      ERouteBarnetilsyn.OmDeg
                    )}
                  />
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>
                  {hentTekst('stegtittel.bosituasjon', intl)}
                </Accordion.Header>
                <Accordion.Content>
                  <OppsummeringBosituasionenDin
                    bosituasjon={søknad.bosituasjon}
                    endreInformasjonPath={hentPath(
                      RoutesBarnetilsyn,
                      ERouteBarnetilsyn.BosituasjonenDin
                    )}
                  />
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>
                  {hentTekst('barnadine.sidetittel', intl)}
                </Accordion.Header>
                <Accordion.Content>
                  <OppsummeringBarnaDine
                    barn={søknad.person.barn}
                    stønadstype={Stønadstype.barnetilsyn}
                    endreInformasjonPath={hentPath(
                      RoutesBarnetilsyn,
                      ERouteBarnetilsyn.BarnaDine
                    )}
                  />
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>
                  {hentTekst('barnasbosted.sidetittel', intl)}
                </Accordion.Header>
                <Accordion.Content>
                  <OppsummeringBarnasBosituasjon
                    barn={søknad.person.barn}
                    endreInformasjonPath={hentPath(
                      RoutesBarnetilsyn,
                      ERouteBarnetilsyn.BostedOgSamvær
                    )}
                    stønadstype={Stønadstype.barnetilsyn}
                  />
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>
                  {hentTekst('stegtittel.arbeidssituasjon.barnetilsyn', intl)}
                </Accordion.Header>
                <Accordion.Content>
                  <OppsummeringAktiviteter
                    aktivitet={søknad.aktivitet}
                    endreInformasjonPath={hentPath(
                      RoutesBarnetilsyn,
                      ERouteBarnetilsyn.Aktivitet
                    )}
                  />
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>
                  {hentTekst('barnepass.sidetittel', intl)}
                </Accordion.Header>
                <Accordion.Content>
                  <OppsummeringBarnepass
                    søkerFraBestemtDato={søknad.søkerFraBestemtMåned}
                    søknadsdato={søknad.søknadsdato}
                    barnSomSkalHaBarnepass={barnSomSkalHaBarnepass}
                    endreInformasjonPath={hentPath(
                      RoutesBarnetilsyn,
                      ERouteBarnetilsyn.Barnepass
                    )}
                  />
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </KomponentGruppe>

          {harManglendeFelter && (
            <ManglendeFelterAlert manglendeFelter={manglendeFelter} />
          )}
        </div>
      </Side>
    </>
  );
};

export default Oppsummering;
