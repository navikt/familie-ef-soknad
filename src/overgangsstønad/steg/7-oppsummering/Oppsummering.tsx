import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import OppsummeringOmDeg from '../../../søknad/steg/7-oppsummering/OppsummeringOmDeg';
import OppsummeringBarnasBosituasjon from '../../../søknad/steg/7-oppsummering/OppsummeringBarnasBosituasjon';
import OppsummeringBarnaDine from '../../../søknad/steg/7-oppsummering/OppsummeringBarnaDine';
import OppsummeringAktiviteter from '../../../søknad/steg/7-oppsummering/OppsummeringAktiviteter';
import OppsummeringDinSituasjon from '../../../søknad/steg/7-oppsummering/OppsummeringDinSituasjon';
import OppsummeringBosituasjonenDin from '../../../søknad/steg/7-oppsummering/OppsummeringBosituasjon';
import { useSøknad } from '../../../context/SøknadContext';
import {
  ERouteOvergangsstønad,
  RoutesOvergangsstonad,
} from '../../routing/routesOvergangsstonad';
import { hentPath } from '../../../utils/routing';
import Side, { ESide } from '../../../components/side/Side';
import { hentTekst } from '../../../utils/søknad';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import {
  logSidevisningOvergangsstonad,
  logBrowserBackOppsummering,
} from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { IBarn } from '../../../models/steg/barn';
import { useEffect } from 'react';
import { useNavigationType } from 'react-router-dom';
import { ESkjemanavn, skjemanavnIdMapping } from '../../../utils/skjemanavn';
import { object, string, number, date, InferType } from 'yup';
import {
  datoRegex,
  manglendeFelterTilTekst,
  ManglendeFelter,
} from '../../../utils/validering';
import { Alert } from '@navikt/ds-react';

const Oppsummering: React.FC = () => {
  const intl = useIntl();
  const { mellomlagreOvergangsstønad, søknad } = useSøknad();
  const skjemaId = skjemanavnIdMapping[ESkjemanavn.Overgangsstønad];
  const action = useNavigationType();

  const [manglendeFelter, settManglendeFelter] = useState<string[]>([]);

  useMount(() => logSidevisningOvergangsstonad('Oppsummering'));

  const barnMedsærligeTilsynsbehov = søknad.person.barn
    .filter((barn: IBarn) => barn.særligeTilsynsbehov)
    .map((barn: IBarn) => barn.særligeTilsynsbehov);

  useEffect(() => {
    if (action === 'POP') {
      logBrowserBackOppsummering(ESkjemanavn.Overgangsstønad, skjemaId);
    }
    // eslint-disable-next-line
  }, []);

  console.log('søknad', søknad);

  let bosituasjonSchema = object({
    datoSkalGifteSegEllerBliSamboer: object({
      label: string().required(),
      verdi: string().required().matches(datoRegex, 'Ikke en gyldig dato'),
    }).optional(),
    vordendeSamboerEktefelle: object({
      fødselsdato: object({
        label: string().required(),
        verdi: string().required().matches(datoRegex, 'Ikke en gyldig dato'),
      }),
    }).optional(),
  });

  let sivilstatusSchema = object({
    datoForSamlivsbrudd: object({
      label: string().required(),
      verdi: string().required().matches(datoRegex, 'Ikke en gyldig dato'),
    }).optional(),
  });

  let merOmDinSituasjonSchema = object({
    datoSagtOppEllerRedusertStilling: object({
      label: string().required(),
      verdi: string().required().matches(datoRegex, 'Ikke en gyldig dato'),
    }).optional(),
  });

  useEffect(() => {
    bosituasjonSchema
      .validate(søknad.bosituasjon)
      .then()
      .catch(() => {
        if (
          !manglendeFelter.includes(
            manglendeFelterTilTekst[ManglendeFelter.BOSITUASJONEN_DIN]
          )
        ) {
          settManglendeFelter((prev: string[]): string[] => [
            ...prev,
            manglendeFelterTilTekst[ManglendeFelter.BOSITUASJONEN_DIN],
          ]);
        }
      });

    sivilstatusSchema
      .validate(søknad.sivilstatus)
      .then()
      .catch(() => {
        if (
          !manglendeFelter.includes(
            manglendeFelterTilTekst[ManglendeFelter.OM_DEG]
          )
        ) {
          settManglendeFelter((prev: string[]): string[] => [
            ...prev,
            manglendeFelterTilTekst[ManglendeFelter.OM_DEG],
          ]);
        }
      });

    merOmDinSituasjonSchema
      .validate(søknad.merOmDinSituasjon)
      .then()
      .catch(() => {
        if (
          !manglendeFelter.includes(
            manglendeFelterTilTekst[ManglendeFelter.MER_OM_DIN_SITUASJON]
          )
        ) {
          settManglendeFelter((prev: string[]): string[] => [
            ...prev,
            manglendeFelterTilTekst[ManglendeFelter.MER_OM_DIN_SITUASJON],
          ]);
        }
      });
  }, [søknad]);

  const harManglendeFelter = manglendeFelter.length > 0;

  return (
    <>
      <Side
        stønadstype={Stønadstype.overgangsstønad}
        stegtittel={intl.formatMessage({ id: 'oppsummering.sidetittel' })}
        skalViseKnapper={ESide.visTilbakeNesteAvbrytKnapp}
        erSpørsmålBesvart={true}
        mellomlagreStønad={mellomlagreOvergangsstønad}
        routesStønad={RoutesOvergangsstonad}
        disableNesteKnapp={harManglendeFelter}
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
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.OmDeg
              )}
            />
            <OppsummeringBosituasjonenDin
              tittel={hentTekst('stegtittel.bosituasjon', intl)}
              bosituasjon={søknad.bosituasjon}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.BosituasjonenDin
              )}
            />
            <OppsummeringBarnaDine
              tittel={hentTekst('barnadine.sidetittel', intl)}
              barn={søknad.person.barn}
              stønadstype={Stønadstype.overgangsstønad}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.Barn
              )}
            />
            <OppsummeringBarnasBosituasjon
              tittel={hentTekst('barnasbosted.sidetittel', intl)}
              barn={søknad.person.barn}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.BarnasBosted
              )}
            />
            <OppsummeringAktiviteter
              tittel={hentTekst('stegtittel.arbeidssituasjon', intl)}
              aktivitet={søknad.aktivitet}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.Aktivitet
              )}
            />
            <OppsummeringDinSituasjon
              tittel={hentTekst('stegtittel.dinSituasjon', intl)}
              dinSituasjon={søknad.merOmDinSituasjon}
              barnMedsærligeTilsynsbehov={barnMedsærligeTilsynsbehov}
              endreInformasjonPath={hentPath(
                RoutesOvergangsstonad,
                ERouteOvergangsstønad.DinSituasjon
              )}
            />
          </KomponentGruppe>
          {harManglendeFelter && (
            <Alert variant="warning">
              Mangler felter på følgende steg:{' '}
              {manglendeFelter.map((felt) => felt).join(', ')}.
            </Alert>
          )}
        </div>
      </Side>
    </>
  );
};

export default Oppsummering;
