import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar, visListeAvLabelOgSvar } from '../../../utils/visning';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { useHistory } from 'react-router-dom';
import { Routes, RouteEnum, hentPath } from '../../../routing/Routes';
import { IAktivitet } from '../../../models/steg/aktivitet/aktivitet';

interface Props {
  aktivitet: IAktivitet;
}

const OppsummeringAktiviteter: React.FC<Props> = ({ aktivitet }) => {
  const history = useHistory();
  const intl = useIntl();
  const erIArbeid = aktivitet.erIArbeid
    ? VisLabelOgSvar(aktivitet.erIArbeid)
    : null;

  const virksomhet = aktivitet.etablererEgenVirksomhet
    ? VisLabelOgSvar(aktivitet.etablererEgenVirksomhet)
    : null;

  const arbeidssituasjon = VisLabelOgSvar(aktivitet);

  const firma = aktivitet.firma ? VisLabelOgSvar(aktivitet.firma) : null;

  const arbeidsforhold = aktivitet.arbeidsforhold
    ? visListeAvLabelOgSvar(
        aktivitet.arbeidsforhold,
        hentTekst('arbeidsforhold.tittel.arbeidsgiver', intl)
      )
    : null;

  const egetAS = aktivitet.egetAS
    ? visListeAvLabelOgSvar(
        aktivitet.egetAS,
        hentTekst('arbeidsforhold.tittel.egetAS', intl)
      )
    : null;

  const tidligereUtdanning = aktivitet.underUtdanning?.tidligereUtdanning
    ? visListeAvLabelOgSvar(
        aktivitet.underUtdanning.tidligereUtdanning,
        hentTekst('utdanning.tittel.tidligere', intl)
      )
    : null;

  const arbeidssøker = aktivitet.arbeidssøker
    ? VisLabelOgSvar(aktivitet.arbeidssøker)
    : null;

  const underUtdanning = aktivitet.underUtdanning
    ? VisLabelOgSvar(aktivitet.underUtdanning)
    : null;

  return (
    <Ekspanderbartpanel
      className="aktiviteter"
      tittel={
        <Undertittel>
          {hentTekst('stegtittel.arbeidssituasjon', intl)}
        </Undertittel>
      }
    >
      {erIArbeid && <div className={'seksjon'}>{erIArbeid} </div>}
      {virksomhet ? <div className="seksjon">{virksomhet}</div> : null}
      {arbeidssituasjon ? (
        <div className="seksjon">{arbeidssituasjon}</div>
      ) : null}
      {arbeidsforhold ? <div className="seksjon">{arbeidsforhold}</div> : null}
      {firma ? <div className="seksjon">{firma}</div> : null}
      {egetAS ? <div className="seksjon">{egetAS}</div> : null}
      {arbeidssøker ? <div className="seksjon">{arbeidssøker}</div> : null}
      {underUtdanning ? (
        <div className="seksjon">
          {underUtdanning}
          {tidligereUtdanning}
        </div>
      ) : null}
      <LenkeMedIkon
        onClick={() =>
          history.replace({
            pathname: hentPath(Routes, RouteEnum.Aktivitet),
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
