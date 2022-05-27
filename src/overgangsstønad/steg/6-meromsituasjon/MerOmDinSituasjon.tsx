import React, { useEffect, useState } from 'react';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import HarSøkerSagtOppEllerRedusertStilling from './HarSøkerSagtOppEllerRedusertStilling';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';

import {
  gjelderNoeAvDetteDeg,
  SøkerFraBestemtMånedSpm,
} from '../../../søknad/steg/6-meromsituasjon/SituasjonConfig';
import { hentTekst } from '../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useSøknad } from '../../../context/SøknadContext';
import {
  ESøkerFraBestemtMåned,
  IDinSituasjon,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import {
  harSøkerMindreEnnHalvStilling,
  harValgtSvarPåSagtOppEllerRedusertArbeidstidSpørsmål,
  hvisHarBarnMedSærligeTilsynMåHaFyltUtFritekst,
} from '../../../søknad/steg/6-meromsituasjon/SituasjonUtil';
import { useLocation } from 'react-router-dom';
import { returnerAvhukedeSvar } from '../../../utils/spørsmålogsvar';
import SituasjonOppfølgingSpørsmål from '../../../søknad/steg/6-meromsituasjon/SituasjonOppfølgingSpørsmål';
import NårSøkerDuStønadFra from '../../../components/stegKomponenter/NårSøkerDuStønadFraGruppe';
import {
  dagensDato,
  datoTilStreng,
  formatMånederTilbake,
} from '../../../utils/dato';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesOvergangsstonad } from '../../routing/routesOvergangsstonad';
import { hentPathOvergangsstønadOppsummering } from '../../utils';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { ISøknad } from '../../../models/søknad/søknad';
import { logSidevisningOvergangsstonad } from '../../../utils/amplitude';
import { useLeggTilSærligeBehovHvisHarEttBarMedSærligeBehov } from '../../../utils/hooks';
import { hentBeskjedMedNavn } from '../../../utils/språk';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { useMount } from '../../../utils/hooks';
import { kommerFraOppsummeringen } from '../../../utils/locationState';

const StyledHjelpetekst = styled.div`
  .typo-normal {
    padding-bottom: 1rem;
  }
`;
const MerOmDinSituasjon: React.FC = () => {
  const intl = useLokalIntlContext();
  const {
    søknad,
    settSøknad,
    settDokumentasjonsbehov,
    mellomlagreOvergangsstønad,
    oppdaterBarnISoknaden,
  } = useSøknad();
  const location = useLocation();
  const kommerFraOppsummering = kommerFraOppsummeringen(location.state);
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;
  const [dinSituasjon, settDinSituasjon] = useState<IDinSituasjon>(
    søknad.merOmDinSituasjon
  );
  const { gjelderDetteDeg, søknadsdato, søkerFraBestemtMåned } = dinSituasjon;
  const søkerJobberMindreEnnFemtiProsent =
    harSøkerMindreEnnHalvStilling(søknad);

  useMount(() => logSidevisningOvergangsstonad('MerOmDinSituasjon'));

  const datovelgerLabel = 'søkerFraBestemtMåned.datovelger.overgangsstønad';

  const hjelpetekstFørsteAvsnitt = hentBeskjedMedNavn(
    formatMånederTilbake(dagensDato, 3),
    hentTekst(
      'søkerFraBestemtMåned.hjelpetekst-innhold.overgangsstønad-del1',
      intl
    )
  );
  const hjelpetekstAndreAvsnitt = hentBeskjedMedNavn(
    formatMånederTilbake(dagensDato, 5),
    hentTekst(
      'søkerFraBestemtMåned.hjelpetekst-innhold.overgangsstønad-del2',
      intl
    )
  );
  const hjelpetekstTredjeAvsnitt = hentTekst(
    'søkerFraBestemtMåned.hjelpetekst-innhold.overgangsstønad-del3',
    intl
  );
  const hjelpetekst: JSX.Element = (
    <StyledHjelpetekst>
      <Normaltekst>{hjelpetekstFørsteAvsnitt}</Normaltekst>
      <Normaltekst>{hjelpetekstAndreAvsnitt}</Normaltekst>
      <Normaltekst>{hjelpetekstTredjeAvsnitt}</Normaltekst>
    </StyledHjelpetekst>
  );

  useEffect(() => {
    settSøknad((prevSøknad: ISøknad) => ({
      ...prevSøknad,
      merOmDinSituasjon: dinSituasjon,
    }));
  }, [dinSituasjon, settSøknad]);

  useLeggTilSærligeBehovHvisHarEttBarMedSærligeBehov(
    søknad,
    intl,
    oppdaterBarnISoknaden
  );

  const settDinSituasjonFelt = (
    spørsmål: ISpørsmål,
    svarHuketAv: boolean,
    svar: ISvar
  ) => {
    const spørsmålTekst = hentTekst(spørsmål.tekstid, intl);
    const { avhukedeSvar, svarider } = returnerAvhukedeSvar(
      dinSituasjon.gjelderDetteDeg,
      svarHuketAv,
      svar
    );

    settDinSituasjon({
      ...dinSituasjon,
      gjelderDetteDeg: {
        spørsmålid: spørsmål.søknadid,
        svarid: svarider,
        label: spørsmålTekst,
        verdi: avhukedeSvar,
        alternativer: dinSituasjon.gjelderDetteDeg.alternativer,
      },
    });
    settDokumentasjonsbehov(spørsmål, svar, svarHuketAv);
  };

  const settSøknadsdato = (dato: Date | null) => {
    dato !== null &&
      settDinSituasjon({
        ...dinSituasjon,
        søknadsdato: {
          label: hentTekst(datovelgerLabel, intl),
          verdi: datoTilStreng(dato),
        },
      });
  };

  const settSøkerFraBestemtMåned = (spørsmål: ISpørsmål, svar: ISvar) => {
    settDinSituasjon({
      ...dinSituasjon,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar.id === ESøkerFraBestemtMåned.ja,
      },
      søknadsdato:
        svar.id === ESøkerFraBestemtMåned.neiNavKanVurdere
          ? undefined
          : dinSituasjon.søknadsdato,
    });
  };

  const harValgtMinstEttAlternativ = gjelderDetteDeg.svarid.length !== 0;

  const visNårSøkerDuStønadFra = søkerJobberMindreEnnFemtiProsent
    ? harValgtMinstEttAlternativ &&
      harValgtSvarPåSagtOppEllerRedusertArbeidstidSpørsmål(dinSituasjon) &&
      hvisHarBarnMedSærligeTilsynMåHaFyltUtFritekst(søknad)
    : harValgtMinstEttAlternativ &&
      hvisHarBarnMedSærligeTilsynMåHaFyltUtFritekst(søknad);

  const erAlleSpørsmålBesvart =
    søknadsdato?.verdi !== undefined ||
    søkerFraBestemtMåned?.svarid === ESøkerFraBestemtMåned.neiNavKanVurdere;

  return (
    <Side
      stønadstype={Stønadstype.overgangsstønad}
      stegtittel={intl.formatMessage({ id: 'stegtittel.dinSituasjon' })}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={erAlleSpørsmålBesvart}
      mellomlagreStønad={mellomlagreOvergangsstønad}
      routesStønad={RoutesOvergangsstonad}
      tilbakeTilOppsummeringPath={hentPathOvergangsstønadOppsummering}
    >
      <SeksjonGruppe>
        <KomponentGruppe>
          <CheckboxSpørsmål
            spørsmål={gjelderNoeAvDetteDeg(intl)}
            settValgteSvar={settDinSituasjonFelt}
            valgteSvar={søknad.merOmDinSituasjon.gjelderDetteDeg.verdi}
            skalLogges={true}
          />
        </KomponentGruppe>
        {dinSituasjon.gjelderDetteDeg.svarid.map((svarid, index) => {
          const harValgtMinstEttAlternativ =
            gjelderDetteDeg.svarid.length !== 0;

          return (
            harValgtMinstEttAlternativ && (
              <SituasjonOppfølgingSpørsmål key={index} svarid={svarid} />
            )
          );
        })}
      </SeksjonGruppe>
      {søkerJobberMindreEnnFemtiProsent &&
        harValgtMinstEttAlternativ &&
        hvisHarBarnMedSærligeTilsynMåHaFyltUtFritekst(søknad) && (
          <SeksjonGruppe>
            <HarSøkerSagtOppEllerRedusertStilling
              dinSituasjon={dinSituasjon}
              settDinSituasjon={settDinSituasjon}
            />
          </SeksjonGruppe>
        )}
      {visNårSøkerDuStønadFra && (
        <SeksjonGruppe>
          <NårSøkerDuStønadFra
            spørsmål={SøkerFraBestemtMånedSpm(intl)}
            settSøkerFraBestemtMåned={settSøkerFraBestemtMåned}
            søkerFraBestemtMåned={dinSituasjon.søkerFraBestemtMåned}
            settDato={settSøknadsdato}
            valgtDato={dinSituasjon.søknadsdato}
            datovelgerLabel={datovelgerLabel}
            hjelpetekstInnholdTekst={hjelpetekst}
          />
        </SeksjonGruppe>
      )}
    </Side>
  );
};

export default MerOmDinSituasjon;
