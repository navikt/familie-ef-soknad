import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { hentTekst } from '../../../utils/søknad';
import { IAktivitet } from '../../../models/steg/aktivitet/aktivitet';
import { Ingress, Undertittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import {
  VisLabelOgSvar,
  visLabelOgVerdiForSpørsmålFelt,
  visLabelOgVerdiForSpørsmålListeFelt,
  visListeAvLabelOgSvar,
} from '../../../utils/visning';
import {
  SeksjonSpacingBottom,
  SeksjonSpacingTop,
  StyledOppsummeringMedUndertitler,
} from '../../../components/stegKomponenter/StyledOppsummering';

interface Props {
  aktivitet: IAktivitet;
  endreInformasjonPath?: string;
  tittel: string;
}

const OppsummeringAktiviteter: React.FC<Props> = ({
  aktivitet,
  endreInformasjonPath,
  tittel,
}) => {
  const history = useHistory();
  const intl = useIntl();

  return (
    <Ekspanderbartpanel
      className="aktiviteter"
      tittel={<Undertittel tag="h3">{tittel}</Undertittel>}
    >
      <StyledOppsummeringMedUndertitler>
        {aktivitet.erIArbeid &&
          visLabelOgVerdiForSpørsmålFelt(aktivitet?.erIArbeid, intl)}

        {aktivitet.hvaErDinArbeidssituasjon && (
          <SeksjonSpacingBottom>
            {visLabelOgVerdiForSpørsmålListeFelt(
              aktivitet.hvaErDinArbeidssituasjon
            )}
          </SeksjonSpacingBottom>
        )}

        {aktivitet.etablererEgenVirksomhet && (
          <SeksjonSpacingBottom>
            {visLabelOgVerdiForSpørsmålFelt(
              aktivitet.etablererEgenVirksomhet,
              intl,
              hentTekst('arbeidssituasjon.tittel.etablererEgenVirksomhet', intl)
            )}
          </SeksjonSpacingBottom>
        )}

        {aktivitet.arbeidsforhold && (
          <SeksjonSpacingBottom>
            {visListeAvLabelOgSvar(
              aktivitet.arbeidsforhold,
              hentTekst('arbeidsforhold.tittel.arbeidsgiver', intl)
            )}
          </SeksjonSpacingBottom>
        )}

        {aktivitet.firmaer && (
          <SeksjonSpacingBottom>
            {visListeAvLabelOgSvar(
              aktivitet.firmaer,
              hentTekst('firmaer.tittel', intl)
            )}
          </SeksjonSpacingBottom>
        )}

        {aktivitet.egetAS && (
          <SeksjonSpacingBottom>
            {visListeAvLabelOgSvar(
              aktivitet.egetAS,
              hentTekst('arbeidsforhold.tittel.egetAS', intl)
            )}
          </SeksjonSpacingBottom>
        )}

        {aktivitet.arbeidssøker && (
          <SeksjonSpacingBottom>
            <Ingress>{hentTekst('arbeidssøker.tittel', intl)}</Ingress>
            {VisLabelOgSvar(aktivitet.arbeidssøker)}
          </SeksjonSpacingBottom>
        )}

        {aktivitet.underUtdanning && (
          <SeksjonSpacingBottom>
            <Ingress>{hentTekst('utdanning.tittel', intl)}</Ingress>
            {VisLabelOgSvar(aktivitet.underUtdanning)}
            {aktivitet.underUtdanning?.tidligereUtdanning && (
              <SeksjonSpacingTop>
                {visListeAvLabelOgSvar(
                  aktivitet.underUtdanning.tidligereUtdanning,
                  hentTekst('utdanning.tittel.tidligere', intl)
                )}
              </SeksjonSpacingTop>
            )}
          </SeksjonSpacingBottom>
        )}
        <LenkeMedIkon
          onClick={() =>
            history.replace({
              pathname: endreInformasjonPath,
              state: { kommerFraOppsummering: true },
            })
          }
          tekst_id="barnasbosted.knapp.endre"
          ikon={endre}
        />
      </StyledOppsummeringMedUndertitler>
    </Ekspanderbartpanel>
  );
};

export default OppsummeringAktiviteter;
