import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { hentTekst } from '../../../utils/søknad';
import { IAktivitet } from '../../../models/steg/aktivitet/aktivitet';
import { Undertittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import {
  VisLabelOgSvar,
  visLabelOgVerdiForSpørsmålFelt,
  visLabelOgVerdiForSpørsmålListeFelt,
  visListeAvLabelOgSvar,
} from '../../../utils/visning';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';

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
      tittel={<Undertittel>{tittel}</Undertittel>}
    >
      {aktivitet.erIArbeid && (
        <SeksjonGruppe>
          {visLabelOgVerdiForSpørsmålFelt(aktivitet?.erIArbeid, intl)}
        </SeksjonGruppe>
      )}
      {aktivitet.hvaErDinArbeidssituasjon && (
        <SeksjonGruppe>
          {visLabelOgVerdiForSpørsmålListeFelt(
            aktivitet.hvaErDinArbeidssituasjon
          )}
        </SeksjonGruppe>
      )}

      {aktivitet.etablererEgenVirksomhet && (
        <SeksjonGruppe>
          {visLabelOgVerdiForSpørsmålFelt(
            aktivitet.etablererEgenVirksomhet,
            intl,
            hentTekst('arbeidssituasjon.tittel.etablererEgenVirksomhet', intl)
          )}
        </SeksjonGruppe>
      )}

      {aktivitet.arbeidsforhold && (
        <SeksjonGruppe>
          {visListeAvLabelOgSvar(
            aktivitet.arbeidsforhold,
            hentTekst('arbeidsforhold.tittel.arbeidsgiver', intl)
          )}
        </SeksjonGruppe>
      )}

      {aktivitet.firmaer && (
        <SeksjonGruppe>
          {visListeAvLabelOgSvar(
            aktivitet.firmaer,
            hentTekst('firmaer.tittel', intl)
          )}
        </SeksjonGruppe>
      )}

      {aktivitet.egetAS && (
        <SeksjonGruppe>
          {visListeAvLabelOgSvar(
            aktivitet.egetAS,
            hentTekst('arbeidsforhold.tittel.egetAS', intl)
          )}
        </SeksjonGruppe>
      )}

      {aktivitet.arbeidssøker && (
        <SeksjonGruppe>{VisLabelOgSvar(aktivitet.arbeidssøker)}</SeksjonGruppe>
      )}

      {aktivitet.underUtdanning && (
        <SeksjonGruppe>
          {VisLabelOgSvar(aktivitet.underUtdanning)}
          {aktivitet.underUtdanning?.tidligereUtdanning &&
            visListeAvLabelOgSvar(
              aktivitet.underUtdanning.tidligereUtdanning,
              hentTekst('utdanning.tittel.tidligere', intl)
            )}
        </SeksjonGruppe>
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
    </Ekspanderbartpanel>
  );
};

export default OppsummeringAktiviteter;
