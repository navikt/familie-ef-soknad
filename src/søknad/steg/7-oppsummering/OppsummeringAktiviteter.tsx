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
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import EkspanderbarOppsummering from '../../../components/stegKomponenter/EkspanderbarOppsummering';
import styled from 'styled-components';

interface Props {
  aktivitet: IAktivitet;
  endreInformasjonPath?: string;
  tittel: string;
}

const TidligereUtdanningOppsummering = styled.div`
  margin-top: 1.5rem;
`;

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
      <EkspanderbarOppsummering>
        {aktivitet.erIArbeid && (
          <KomponentGruppe>
            {visLabelOgVerdiForSpørsmålFelt(aktivitet?.erIArbeid, intl)}
          </KomponentGruppe>
        )}
        {aktivitet.hvaErDinArbeidssituasjon && (
          <KomponentGruppe>
            {visLabelOgVerdiForSpørsmålListeFelt(
              aktivitet.hvaErDinArbeidssituasjon
            )}
          </KomponentGruppe>
        )}

        {aktivitet.etablererEgenVirksomhet && (
          <KomponentGruppe>
            {visLabelOgVerdiForSpørsmålFelt(
              aktivitet.etablererEgenVirksomhet,
              intl,
              hentTekst('arbeidssituasjon.tittel.etablererEgenVirksomhet', intl)
            )}
          </KomponentGruppe>
        )}

        {aktivitet.arbeidsforhold && (
          <KomponentGruppe>
            {visListeAvLabelOgSvar(
              aktivitet.arbeidsforhold,
              hentTekst('arbeidsforhold.tittel.arbeidsgiver', intl)
            )}
          </KomponentGruppe>
        )}

        {aktivitet.firmaer && (
          <KomponentGruppe>
            {visListeAvLabelOgSvar(
              aktivitet.firmaer,
              hentTekst('firmaer.tittel', intl)
            )}
          </KomponentGruppe>
        )}

        {aktivitet.egetAS && (
          <KomponentGruppe>
            {visListeAvLabelOgSvar(
              aktivitet.egetAS,
              hentTekst('arbeidsforhold.tittel.egetAS', intl)
            )}
          </KomponentGruppe>
        )}

        {aktivitet.arbeidssøker && (
          <KomponentGruppe className={'listeelement'}>
            <Ingress>{hentTekst('arbeidssøker.tittel', intl)}</Ingress>
            {VisLabelOgSvar(aktivitet.arbeidssøker)}
          </KomponentGruppe>
        )}

        {aktivitet.underUtdanning && (
          <KomponentGruppe className={'listeelement'}>
            <Ingress>{hentTekst('utdanning.tittel', intl)}</Ingress>
            {VisLabelOgSvar(aktivitet.underUtdanning)}
            {aktivitet.underUtdanning?.tidligereUtdanning && (
              <TidligereUtdanningOppsummering>
                {visListeAvLabelOgSvar(
                  aktivitet.underUtdanning.tidligereUtdanning,
                  hentTekst('utdanning.tittel.tidligere', intl)
                )}
              </TidligereUtdanningOppsummering>
            )}
          </KomponentGruppe>
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
      </EkspanderbarOppsummering>
    </Ekspanderbartpanel>
  );
};

export default OppsummeringAktiviteter;
