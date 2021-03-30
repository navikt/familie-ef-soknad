import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import { useLocation } from 'react-router-dom';
import { returnerAvhukedeSvar } from '../../../utils/spørsmålogsvar';
import {
  filtrerAktivitetSvaralternativer,
  fjernAktivitet,
} from '../../../helpers/steg/aktivitet';
import { erAktivitetSeksjonFerdigUtfylt } from '../../../helpers/steg/aktivitetvalidering';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import { ErDuIArbeidSpm, hvaErDinArbeidssituasjonSpm } from './AktivitetConfig';
import AktivitetOppfølgingSpørsmål from './AktivitetOppfølgingSpørsmål';
import {
  EArbeidssituasjon,
  ErIArbeid,
  IAktivitet,
} from '../../../models/steg/aktivitet/aktivitet';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../language/LocaleTekst';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';
import { Element } from 'nav-frontend-typografi';
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';
import { hentPathBarnetilsynOppsummering } from '../../utils';
import Side, { ESide } from '../../../components/side/Side';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { LocationStateSøknad } from '../../../models/søknad/søknad';
import { logSidevisningBarnetilsyn } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';

const Aktivitet: React.FC = () => {
  const intl = useIntl();
  const {
    søknad,
    settSøknad,
    settDokumentasjonsbehov,
    mellomlagreBarnetilsyn,
  } = useBarnetilsynSøknad();
  const location = useLocation<LocationStateSøknad>();
  const [arbeidssituasjon, settArbeidssituasjon] = useState<IAktivitet>(
    søknad?.aktivitet
  );
  const { hvaErDinArbeidssituasjon, erIArbeid } = arbeidssituasjon;
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;
  useEffect(() => {
    settSøknad({ ...søknad, aktivitet: arbeidssituasjon });
    // eslint-disable-next-line
  }, [arbeidssituasjon]);

  useMount(() => logSidevisningBarnetilsyn('Aktivitet'));

  const oppdaterArbeidssituasjon = (nyArbeidssituasjon: IAktivitet) => {
    settArbeidssituasjon({ ...arbeidssituasjon, ...nyArbeidssituasjon });
  };

  const settErDuIArbeid = (spørsmål: ISpørsmål, svar: ISvar) => {
    let endretArbeidssituasjon = arbeidssituasjon;

    if (svar.id === ErIArbeid.NeiFordiJegErSyk) {
      delete endretArbeidssituasjon.egetAS;
      delete endretArbeidssituasjon.arbeidsforhold;
      delete endretArbeidssituasjon.firmaer;
      delete endretArbeidssituasjon.etablererEgenVirksomhet;

      endretArbeidssituasjon = {
        ...endretArbeidssituasjon,
        hvaErDinArbeidssituasjon: {
          spørsmålid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
          svarid: [],
          label: '',
          verdi: [],
          alternativer:
            endretArbeidssituasjon.hvaErDinArbeidssituasjon.alternativer,
        },
      };
    }
    oppdaterArbeidssituasjon({
      ...endretArbeidssituasjon,
      erIArbeid: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar.svar_tekst,
      },
    });
    settDokumentasjonsbehov(spørsmål, svar);
  };

  const settArbeidssituasjonFelt = (
    spørsmål: ISpørsmål,
    svarHuketAv: boolean,
    svar: ISvar
  ) => {
    const { avhukedeSvar, svarider } = returnerAvhukedeSvar(
      hvaErDinArbeidssituasjon,
      svarHuketAv,
      svar
    );

    const endretArbeidssituasjon = fjernAktivitet(svarider, arbeidssituasjon);

    oppdaterArbeidssituasjon({
      ...endretArbeidssituasjon,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svarider,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: avhukedeSvar,
        alternativer:
          endretArbeidssituasjon.hvaErDinArbeidssituasjon.alternativer,
      },
    });
    settDokumentasjonsbehov(spørsmål, svar, svarHuketAv);
  };

  const erAlleFelterUtfylt = hvaErDinArbeidssituasjon.svarid.every((id) =>
    erAktivitetSeksjonFerdigUtfylt(id, arbeidssituasjon, false)
  );

  const erSisteSpørsmålBesvartOgMinstEttAlternativValgt =
    (hvaErDinArbeidssituasjon?.svarid.length !== 0 && erAlleFelterUtfylt) ||
    erIArbeid?.svarid === ErIArbeid.NeiFordiJegErSyk;

  const erSpørsmålFørAktivitetBesvart = (
    svarid: string,
    arbeidssituasjon: IAktivitet
  ) => {
    const svaridPos = arbeidssituasjon.hvaErDinArbeidssituasjon?.svarid.indexOf(
      svarid
    );
    return (
      svaridPos &&
      arbeidssituasjon.hvaErDinArbeidssituasjon?.svarid
        .filter((aktivitet, index) => aktivitet && index < svaridPos)
        .every((id) =>
          erAktivitetSeksjonFerdigUtfylt(id, arbeidssituasjon, false)
        )
    );
  };

  return (
    <Side
      stønadstype={Stønadstype.barnetilsyn}
      stegtittel={intl.formatMessage({
        id: 'stegtittel.arbeidssituasjon.barnetilsyn',
      })}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={erSisteSpørsmålBesvartOgMinstEttAlternativValgt}
      routesStønad={RoutesBarnetilsyn}
      mellomlagreStønad={mellomlagreBarnetilsyn}
      tilbakeTilOppsummeringPath={hentPathBarnetilsynOppsummering}
    >
      <SeksjonGruppe aria-live="polite">
        <KomponentGruppe>
          <MultiSvarSpørsmål
            spørsmål={ErDuIArbeidSpm(intl)}
            settSpørsmålOgSvar={settErDuIArbeid}
            valgtSvar={arbeidssituasjon?.erIArbeid?.verdi}
          />
        </KomponentGruppe>
        {arbeidssituasjon.erIArbeid?.svarid === ErIArbeid.NeiFordiJegErSyk && (
          <>
            <AlertStripe type={'info'} form={'inline'}>
              <Element>
                <LocaleTekst tekst={'erDuIArbeid.alertsstripe-info'} />
              </Element>
            </AlertStripe>
            <AlertStripeDokumentasjon>
              <LocaleTekst tekst={'erDuIArbeid.alertsstripe-dokumentasjon'} />
            </AlertStripeDokumentasjon>
          </>
        )}
        {arbeidssituasjon.erIArbeid?.svarid === ErIArbeid.JA && (
          <KomponentGruppe>
            <CheckboxSpørsmål
              spørsmål={filtrerAktivitetSvaralternativer(
                søknad.person,
                hvaErDinArbeidssituasjonSpm(intl)
              )}
              settValgteSvar={settArbeidssituasjonFelt}
              valgteSvar={
                hvaErDinArbeidssituasjon?.verdi
                  ? hvaErDinArbeidssituasjon?.verdi
                  : []
              }
            />
          </KomponentGruppe>
        )}

        {arbeidssituasjon.hvaErDinArbeidssituasjon?.svarid.map(
          (svarid, index) => {
            const harValgtMinstEnAktivitet =
              hvaErDinArbeidssituasjon?.svarid.length !== 0;

            const erValgtFørsteAktivitet =
              hvaErDinArbeidssituasjon?.svarid[0] === svarid;

            const visSeksjon = harValgtMinstEnAktivitet
              ? !erValgtFørsteAktivitet
                ? erSpørsmålFørAktivitetBesvart(svarid, arbeidssituasjon)
                : true
              : true;

            return (
              visSeksjon && (
                <AktivitetOppfølgingSpørsmål
                  aria-live="polite"
                  key={index}
                  svarid={svarid}
                  arbeidssituasjon={arbeidssituasjon}
                  settArbeidssituasjon={settArbeidssituasjon}
                  settDokumentasjonsbehov={settDokumentasjonsbehov}
                />
              )
            );
          }
        )}
      </SeksjonGruppe>
    </Side>
  );
};

export default Aktivitet;
