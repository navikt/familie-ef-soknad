import React, { FC, useEffect } from 'react';
import Side from '../side/Side';
import { useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { hentTekst } from '../../utils/søknad';
import SeksjonGruppe from '../../components/gruppe/SeksjonGruppe';
import JaNeiSpørsmål from '../../components/spørsmål/JaNeiSpørsmål';
import {
  erSøkerArbeidssøker,
  erVilligTilÅTaImotTilbud,
  kanBegynneInnenEnUke,
  ønskerHalvStilling,
  ønsketArbeidssted,
} from '../../søknad/steg/5-aktivitet/arbeidssøker/ArbeidssøkerConfig';
import AlertStripe from 'nav-frontend-alertstriper';
import { usePersonContext } from '../../context/PersonContext';
import LocaleTekst from '../../language/LocaleTekst';
import FeltGruppe from '../../components/gruppe/FeltGruppe';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../components/gruppe/KomponentGruppe';
import { ESvar, ISpørsmål, ISvar } from '../../models/felles/spørsmålogsvar';
import { hentBooleanFraValgtSvar } from '../../utils/spørsmålogsvar';
import { useSkjema } from '../SkjemaContext';
import MultiSvarSpørsmål from '../../components/spørsmål/MultiSvarSpørsmål';
import {
  ERouteArbeidssøkerskjema,
  RoutesArbeidssokerskjema,
} from '../routes/routesArbeidssokerskjema';
import { hentPath } from '../../utils/routing';
import { LocationStateSøknad } from '../../models/søknad/søknad';
import { logSidevisningArbeidssokerskjema } from '../../utils/amplitude';

const Spørsmål: FC = () => {
  const location = useLocation<LocationStateSøknad>();
  const { person } = usePersonContext();
  const history = useHistory();
  const intl = useIntl();
  const { skjema, settSkjema } = useSkjema();
  const [arbeidssøker, settArbeidssøker] = React.useState(skjema.arbeidssøker);

  useEffect(() => {
    logSidevisningArbeidssokerskjema('OmArbeidssoker');
  }, []);

  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  React.useEffect(() => {
    settSkjema({ ...skjema, arbeidssøker: arbeidssøker });
    // eslint-disable-next-line
  }, [arbeidssøker]);

  const settJaNeiSpørsmål = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);

    settArbeidssøker({
      ...arbeidssøker,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: valgtSvar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar,
      },
    });
  };

  const settMultiSvarSpørsmål = (spørsmål: ISpørsmål, svar: ISvar) => {
    settArbeidssøker({
      ...arbeidssøker,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar.svar_tekst,
      },
    });
  };

  return (
    <Side
      tittel={intl.formatMessage({ id: 'skjema.tittel.omarbeidssøker' })}
      erSpørsmålBesvart={
        arbeidssøker.ønskerSøker50ProsentStilling?.verdi !== undefined
      }
      skalViseKnapper={!kommerFraOppsummering}
    >
      <SeksjonGruppe>
        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'person.ident.visning'} />
          </Element>
          <Normaltekst>{person.søker.fnr}</Normaltekst>
        </FeltGruppe>
        <KomponentGruppe>
          <JaNeiSpørsmål
            spørsmål={erSøkerArbeidssøker(intl)}
            onChange={settJaNeiSpørsmål}
            valgtSvar={arbeidssøker.registrertSomArbeidssøkerNav?.verdi}
          />
          {arbeidssøker.registrertSomArbeidssøkerNav?.verdi === false && (
            <AlertStripe type={'info'} form={'inline'}>
              <LocaleTekst tekst={'skjema.alert.registrert'} />
            </AlertStripe>
          )}
        </KomponentGruppe>

        {arbeidssøker.registrertSomArbeidssøkerNav && (
          <KomponentGruppe>
            <JaNeiSpørsmål
              spørsmål={erVilligTilÅTaImotTilbud(intl)}
              onChange={settJaNeiSpørsmål}
              valgtSvar={arbeidssøker.villigTilÅTaImotTilbudOmArbeid?.verdi}
            />
            {arbeidssøker.villigTilÅTaImotTilbudOmArbeid?.svarid ===
              ESvar.NEI && (
              <AlertStripe type={'advarsel'} form={'inline'}>
                <LocaleTekst tekst={'arbeidssøker.alert.villig'} />
              </AlertStripe>
            )}
          </KomponentGruppe>
        )}
        {arbeidssøker.villigTilÅTaImotTilbudOmArbeid && (
          <KomponentGruppe>
            <JaNeiSpørsmål
              spørsmål={kanBegynneInnenEnUke(intl)}
              onChange={settJaNeiSpørsmål}
              valgtSvar={arbeidssøker.kanBegynneInnenEnUke?.verdi}
            />
          </KomponentGruppe>
        )}

        {arbeidssøker.kanBegynneInnenEnUke && (
          <KomponentGruppe>
            <MultiSvarSpørsmål
              spørsmål={ønsketArbeidssted(intl)}
              settSpørsmålOgSvar={settMultiSvarSpørsmål}
              valgtSvar={arbeidssøker.hvorØnskerSøkerArbeid?.verdi}
            />
          </KomponentGruppe>
        )}
        {arbeidssøker.hvorØnskerSøkerArbeid && (
          <KomponentGruppe>
            <JaNeiSpørsmål
              spørsmål={ønskerHalvStilling(intl)}
              onChange={settJaNeiSpørsmål}
              valgtSvar={arbeidssøker.ønskerSøker50ProsentStilling?.verdi}
            />
          </KomponentGruppe>
        )}
      </SeksjonGruppe>
      {kommerFraOppsummering ? (
        <Hovedknapp
          className="tilbake-til-oppsummering"
          onClick={() =>
            history.push({
              pathname: hentPath(
                RoutesArbeidssokerskjema,
                ERouteArbeidssøkerskjema.Oppsummering
              ),
            })
          }
        >
          {hentTekst('oppsummering.tilbake', intl)}
        </Hovedknapp>
      ) : null}
    </Side>
  );
};

export default Spørsmål;
