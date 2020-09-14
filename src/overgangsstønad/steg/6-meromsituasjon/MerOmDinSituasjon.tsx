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
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import {
  ESøkerFraBestemtMåned,
  IDinSituasjon,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import {
  harSøkerMindreEnnHalvStilling,
  harValgtSvarPåSagtOppEllerRedusertArbeidstidSpørsmål,
} from '../../../søknad/steg/6-meromsituasjon/SituasjonUtil';
import { useLocation } from 'react-router-dom';
import { returnerAvhukedeSvar } from '../../../utils/spørsmålogsvar';
import SituasjonOppfølgingSpørsmål from '../../../søknad/steg/6-meromsituasjon/SituasjonOppfølgingSpørsmål';
import NårSøkerDuStønadFra from '../../../components/stegKomponenter/NårSøkerDuStønadFraGruppe';
import { datoTilStreng } from '../../../utils/dato';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesOvergangsstonad } from '../../routing/routesOvergangsstonad';
import { hentPathOvergangsstønadOppsummering } from '../../utils';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { LocationStateSøknad } from '../../../models/søknad/søknad';

const MerOmDinSituasjon: React.FC = () => {
  const intl = useIntl();
  const {
    søknad,
    settSøknad,
    settDokumentasjonsbehov,
    mellomlagreOvergangsstønad,
  } = useSøknad();
  const location = useLocation<LocationStateSøknad>();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;
  const [dinSituasjon, settDinSituasjon] = useState<IDinSituasjon>(
    søknad.merOmDinSituasjon
  );
  const { gjelderDetteDeg, søknadsdato, søkerFraBestemtMåned } = dinSituasjon;
  const søkerJobberMindreEnnFemtiProsent = harSøkerMindreEnnHalvStilling(
    søknad
  );

  const datovelgerLabel = 'søkerFraBestemtMåned.datovelger.overgangsstønad';
  const hjelpetekstInnhold =
    'søkerFraBestemtMåned.hjelpetekst-innhold.overgangsstønad';

  useEffect(() => {
    settSøknad((prevSøknad) => ({
      ...prevSøknad,
      merOmDinSituasjon: dinSituasjon,
    }));
  }, [dinSituasjon]);

  const settDinSituasjonFelt = (
    spørsmål: ISpørsmål,
    svarHuketAv: boolean,
    svar: ISvar
  ) => {
    const spørsmålTekst = hentTekst(spørsmål.tekstid, intl);
    const { avhukedeSvar, svarider } = returnerAvhukedeSvar(
      dinSituasjon.gjelderDetteDeg,
      svarHuketAv,
      svar,
      intl
    );

    settDinSituasjon({
      ...dinSituasjon,
      gjelderDetteDeg: {
        spørsmålid: spørsmål.søknadid,
        svarid: svarider,
        label: spørsmålTekst,
        verdi: avhukedeSvar,
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
      harValgtSvarPåSagtOppEllerRedusertArbeidstidSpørsmål(dinSituasjon)
    : harValgtMinstEttAlternativ;

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
      {søkerJobberMindreEnnFemtiProsent && harValgtMinstEttAlternativ && (
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
            hjelpetekstInnholdTekstid={hjelpetekstInnhold}
          />
        </SeksjonGruppe>
      )}
    </Side>
  );
};

export default MerOmDinSituasjon;
