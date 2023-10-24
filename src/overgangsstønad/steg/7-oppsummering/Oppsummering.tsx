import React, {useEffect, useState} from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import {useLokalIntlContext} from '../../../context/LokalIntlContext';
import OppsummeringOmDeg from '../../../søknad/steg/7-oppsummering/OppsummeringOmDeg';
import OppsummeringBarnasBosituasjon from '../../../søknad/steg/7-oppsummering/OppsummeringBarnasBosituasjon';
import OppsummeringBarnaDine from '../../../søknad/steg/7-oppsummering/OppsummeringBarnaDine';
import OppsummeringAktiviteter from '../../../søknad/steg/7-oppsummering/OppsummeringAktiviteter';
import OppsummeringDinSituasjon from '../../../søknad/steg/7-oppsummering/OppsummeringDinSituasjon';
import OppsummeringBosituasjonenDin from '../../../søknad/steg/7-oppsummering/OppsummeringBosituasjon';
import {useSøknad} from '../../../context/SøknadContext';
import {ERouteOvergangsstønad, RoutesOvergangsstonad,} from '../../routing/routesOvergangsstonad';
import {hentPath} from '../../../utils/routing';
import Side, {ESide} from '../../../components/side/Side';
import {hentTekst} from '../../../utils/søknad';
import {Stønadstype} from '../../../models/søknad/stønadstyper';
import {logBrowserBackOppsummering, logManglendeFelter, logSidevisningOvergangsstonad,} from '../../../utils/amplitude';
import {useMount} from '../../../utils/hooks';
import {IBarn} from '../../../models/steg/barn';
import {useNavigationType} from 'react-router-dom';
import {ESkjemanavn, skjemanavnIdMapping} from '../../../utils/skjemanavn';
import {
  aktivitetSchema,
  datoSkalGifteSegEllerBliSamboerScema,
  fødselsdatoSchema,
  identSchema,
  listManglendeFelter,
  ManglendeFelter,
  manglendeFelterTilTekst,
  medlemskapSchema,
  merOmDinSituasjonSchema,
  sivilstatusSchema,
} from '../../../utils/validering/validering';
import {Accordion, Alert, BodyShort} from '@navikt/ds-react';
import {ToggleName} from "../../../models/søknad/toggles";
import {useToggles} from "../../../context/TogglesContext";

const Oppsummering: React.FC = () => {
  const { toggles } = useToggles();
  const intl = useLokalIntlContext();
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

  const validerHvisSøkerSkalGifteSeg = () =>{
    if(søknad.bosituasjon.skalGifteSegEllerBliSamboer?.verdi){
      console.log("søknad.bosituasjon", søknad.bosituasjon)
      const gyldigDatoForgiftemål =  datoSkalGifteSegEllerBliSamboerScema.isValidSync(søknad.bosituasjon.datoSkalGifteSegEllerBliSamboer);
      const gyldigIdent =  søknad.bosituasjon.vordendeSamboerEktefelle && identSchema.isValidSync(søknad.bosituasjon.vordendeSamboerEktefelle.ident);
      const gyldigFødselsdato = søknad.bosituasjon.vordendeSamboerEktefelle && fødselsdatoSchema.isValidSync(søknad.bosituasjon.vordendeSamboerEktefelle.fødselsdato);
      //const harIkkeGyldigIdentEllerDatoPåVordende = (!gyldigFødselsdato && !gyldigIdent);
      const harGyldigIdentEllerDatoPåVordende = gyldigFødselsdato || gyldigIdent;

      console.log(" gyldig dato for giftemål", gyldigFødselsdato)
      console.log(" gyldig ident", gyldigIdent)
      console.log(" gyldig gyldigFødselsdato", gyldigDatoForgiftemål)

      if (!harGyldigIdentEllerDatoPåVordende || !gyldigDatoForgiftemål) {

        if (!manglendeFelter.includes(
            manglendeFelterTilTekst[ManglendeFelter.BOSITUASJONEN_DIN]
        )) {
          settManglendeFelter((prev: string[]): string[] => [
            ...prev,
            manglendeFelterTilTekst[ManglendeFelter.BOSITUASJONEN_DIN],
          ]);
        }
        logManglendeFelter(ESkjemanavn.Overgangsstønad, skjemaId, "ValidationError: vordendeSamboerEktefelle mangler gyldig ident eller fødselsdato");
      }
    }
  }



  useEffect(() => {

    {(toggles[ToggleName.validerBosituasjon]) && validerHvisSøkerSkalGifteSeg()}

    aktivitetSchema
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

        logManglendeFelter(ESkjemanavn.Overgangsstønad, skjemaId, e);
      });

    sivilstatusSchema
      .validate(søknad.sivilstatus)
      .then()
      .catch((e) => {
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

        logManglendeFelter(ESkjemanavn.Overgangsstønad, skjemaId, e);
      });

    merOmDinSituasjonSchema
      .validate(søknad.merOmDinSituasjon)
      .then()
      .catch((e) => {
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

        logManglendeFelter(ESkjemanavn.Overgangsstønad, skjemaId, e);
      });

    medlemskapSchema
      .validate(søknad.medlemskap)
      .then()
      .catch((e) => {
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

        logManglendeFelter(ESkjemanavn.Overgangsstønad, skjemaId, e);
      });
  }, [søknad, manglendeFelter, skjemaId]);

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
                      RoutesOvergangsstonad,
                      ERouteOvergangsstønad.OmDeg
                    )}
                  />
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>
                  {hentTekst('stegtittel.bosituasjon', intl)}
                </Accordion.Header>
                <Accordion.Content>
                  <OppsummeringBosituasjonenDin
                    bosituasjon={søknad.bosituasjon}
                    endreInformasjonPath={hentPath(
                      RoutesOvergangsstonad,
                      ERouteOvergangsstønad.BosituasjonenDin
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
                    stønadstype={Stønadstype.overgangsstønad}
                    endreInformasjonPath={hentPath(
                      RoutesOvergangsstonad,
                      ERouteOvergangsstønad.Barn
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
                      RoutesOvergangsstonad,
                      ERouteOvergangsstønad.BarnasBosted
                    )}
                  />
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>
                  {hentTekst('stegtittel.arbeidssituasjon', intl)}
                </Accordion.Header>
                <Accordion.Content>
                  <OppsummeringAktiviteter
                    aktivitet={søknad.aktivitet}
                    endreInformasjonPath={hentPath(
                      RoutesOvergangsstonad,
                      ERouteOvergangsstønad.Aktivitet
                    )}
                  />
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header>
                  {hentTekst('stegtittel.dinSituasjon', intl)}
                </Accordion.Header>
                <Accordion.Content>
                  <OppsummeringDinSituasjon
                    tittel={hentTekst('stegtittel.dinSituasjon', intl)}
                    dinSituasjon={søknad.merOmDinSituasjon}
                    barnMedsærligeTilsynsbehov={barnMedsærligeTilsynsbehov}
                    endreInformasjonPath={hentPath(
                      RoutesOvergangsstonad,
                      ERouteOvergangsstønad.DinSituasjon
                    )}
                  />
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </KomponentGruppe>
          {harManglendeFelter && (
            <Alert size="small" variant="warning">
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
