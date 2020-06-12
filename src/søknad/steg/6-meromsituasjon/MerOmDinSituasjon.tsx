import React, { useEffect, useState } from 'react';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import HarSøkerSagtOppEllerRedusertStilling from './HarSøkerSagtOppEllerRedusertStilling';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import NårSøkerDuOvergangsstønadFra from './NårSøkerDuOvergangsstønadFra';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../../components/side/Side';

import { gjelderNoeAvDetteDeg } from './SituasjonConfig';
import { hentTekst } from '../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import {
  DinSituasjonType,
  IDinSituasjon,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import {
  erSituasjonIAvhukedeSvar,
  harSøkerMindreEnnHalvStilling,
  harValgtSvarPåSagtOppEllerRedusertArbeidstidSpørsmål,
} from './SituasjonUtil';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { returnerAvhukedeSvar } from '../../../utils/spørsmålogsvar';
import SituasjonOppfølgingSpørsmål from './SituasjonOppfølgingSpørsmål';
import { erSituasjonSeksjonFerdigUtfylt } from '../../../helpers/steg/dinsituasjon';

const MerOmDinSituasjon: React.FC = () => {
  const intl = useIntl();
  const {
    søknad,
    settSøknad,
    settDokumentasjonsbehov,
    mellomlagreOvergangsstønad,
  } = useSøknad();
  const history = useHistory();
  const location = useLocation();
  const [dinSituasjon, settDinSituasjon] = useState<IDinSituasjon>(
    søknad.merOmDinSituasjon
  );
  const {
    gjelderDetteDeg,
    datoOppstartJobb,
    datoOppstartUtdanning,
    sagtOppEllerRedusertStilling,
    begrunnelseSagtOppEllerRedusertStilling,
  } = dinSituasjon;
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const avhukedeSvarISøknad: string[] = gjelderDetteDeg.verdi;
  const søkerJobberMindreEnnFemtiProsent = harSøkerMindreEnnHalvStilling(
    søknad
  );

  useEffect(() => {
    settSøknad({ ...søknad, merOmDinSituasjon: dinSituasjon });
    // eslint-disable-next-line
  }, [dinSituasjon]);

  const erFåttJobbTilbudISvar = erSituasjonIAvhukedeSvar(
    DinSituasjonType.harFåttJobbTilbud,
    avhukedeSvarISøknad,
    intl
  );
  const erSkalTaUtdanningISvar = erSituasjonIAvhukedeSvar(
    DinSituasjonType.skalTaUtdanning,
    avhukedeSvarISøknad,
    intl
  );

  const hentEndretSituasjon = (dinSituasjon: IDinSituasjon): IDinSituasjon => {
    if (datoOppstartJobb || datoOppstartUtdanning) {
      const endretSituasjon = dinSituasjon;
      if (!erFåttJobbTilbudISvar && datoOppstartJobb) {
        delete endretSituasjon.datoOppstartJobb;
      } else if (!erSkalTaUtdanningISvar && datoOppstartUtdanning) {
        delete endretSituasjon.datoOppstartUtdanning;
      }
      return endretSituasjon;
    } else return dinSituasjon;
  };

  const settDinSituasjonFelt = (
    spørsmål: ISpørsmål,
    svarHuketAv: boolean,
    svar: ISvar
  ) => {
    const spørsmålTekst = hentTekst(spørsmål.tekstid, intl);
    const endretSituasjon = hentEndretSituasjon(dinSituasjon);
    const { avhukedeSvar, svarider } = returnerAvhukedeSvar(
      endretSituasjon.gjelderDetteDeg,
      svarHuketAv,
      svar,
      intl
    );

    settDinSituasjon({
      ...endretSituasjon,
      gjelderDetteDeg: {
        spørsmålid: spørsmål.søknadid,
        svarid: svarider,
        label: spørsmålTekst,
        verdi: avhukedeSvar,
      },
    });
    settDokumentasjonsbehov(spørsmål, svar, svarHuketAv);
  };

  const erSpørsmålFørValgtAlternativBesvart = (
    svarid: string,
    dinSituasjon: IDinSituasjon
  ) => {
    const svaridPos = dinSituasjon.gjelderDetteDeg.svarid.indexOf(svarid);
    return dinSituasjon.gjelderDetteDeg.svarid
      .filter((situasjon, index) => index < svaridPos)
      .every((id) => erSituasjonSeksjonFerdigUtfylt(id, dinSituasjon));
  };

  const harValgtMinstEttAlternativOgFelterFerdigUtfylt =
    gjelderDetteDeg.svarid.length !== 0 &&
    gjelderDetteDeg.svarid.every((id) =>
      erSituasjonSeksjonFerdigUtfylt(id, dinSituasjon)
    );

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.dinSituasjon' })}
      skalViseKnapper={!kommerFraOppsummering}
      mellomlagreOvergangsstønad={mellomlagreOvergangsstønad}
    >
      <SeksjonGruppe>
        <KomponentGruppe>
          <CheckboxSpørsmål
            spørsmål={gjelderNoeAvDetteDeg}
            settValgteSvar={settDinSituasjonFelt}
            valgteSvar={søknad.merOmDinSituasjon.gjelderDetteDeg.verdi}
          />
        </KomponentGruppe>
        {dinSituasjon.gjelderDetteDeg.svarid.map((svarid) => {
          const harValgtMinstEttAlternativ =
            gjelderDetteDeg.svarid.length !== 0;

          const erValgtAlternativDetFørste =
            gjelderDetteDeg.svarid[0] === svarid;

          const visSeksjon = harValgtMinstEttAlternativ
            ? !erValgtAlternativDetFørste
              ? erSpørsmålFørValgtAlternativBesvart(svarid, dinSituasjon)
              : true
            : true;

          return (
            visSeksjon && (
              <SituasjonOppfølgingSpørsmål
                dinSituasjon={dinSituasjon}
                settDinSituasjon={settDinSituasjon}
                svarid={svarid}
              />
            )
          );
        })}
      </SeksjonGruppe>
      {søkerJobberMindreEnnFemtiProsent &&
        harValgtMinstEttAlternativOgFelterFerdigUtfylt && (
          <SeksjonGruppe>
            <HarSøkerSagtOppEllerRedusertStilling
              dinSituasjon={dinSituasjon}
              settDinSituasjon={settDinSituasjon}
            />
          </SeksjonGruppe>
        )}
      {søkerJobberMindreEnnFemtiProsent &&
        harValgtMinstEttAlternativOgFelterFerdigUtfylt &&
        harValgtSvarPåSagtOppEllerRedusertArbeidstidSpørsmål(dinSituasjon) && (
          <SeksjonGruppe>
            <NårSøkerDuOvergangsstønadFra
              dinSituasjon={dinSituasjon}
              settDinSituasjon={settDinSituasjon}
            />
          </SeksjonGruppe>
        )}
      {kommerFraOppsummering ? (
        <div className={'side'}>
          <Hovedknapp
            className="tilbake-til-oppsummering"
            onClick={() =>
              history.push({
                pathname: '/oppsummering',
              })
            }
          >
            {hentTekst('oppsummering.tilbake', intl)}
          </Hovedknapp>
        </div>
      ) : null}
    </Side>
  );
};

export default MerOmDinSituasjon;
