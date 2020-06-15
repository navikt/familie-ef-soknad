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
  ESøkerFraBestemtMåned,
  IDinSituasjon,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import {
  harSøkerMindreEnnHalvStilling,
  harValgtSvarPåSagtOppEllerRedusertArbeidstidSpørsmål,
} from './SituasjonUtil';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { returnerAvhukedeSvar } from '../../../utils/spørsmålogsvar';
import SituasjonOppfølgingSpørsmål from './SituasjonOppfølgingSpørsmål';

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
  const { gjelderDetteDeg, søknadsdato, søkerFraBestemtMåned } = dinSituasjon;
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const søkerJobberMindreEnnFemtiProsent = harSøkerMindreEnnHalvStilling(
    søknad
  );

  useEffect(() => {
    settSøknad({ ...søknad, merOmDinSituasjon: dinSituasjon });
    // eslint-disable-next-line
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
      tittel={intl.formatMessage({ id: 'stegtittel.dinSituasjon' })}
      skalViseKnapper={!kommerFraOppsummering}
      mellomlagreOvergangsstønad={mellomlagreOvergangsstønad}
      erSpørsmålBesvart={erAlleSpørsmålBesvart}
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

          return (
            harValgtMinstEttAlternativ && (
              <SituasjonOppfølgingSpørsmål svarid={svarid} />
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
