import React from 'react';
import Side from '../side/Side';
import { useIntl } from 'react-intl';
import endre from '../../assets/endre.svg';
import {
  hentForrigeRoute,
  hentNesteRoute,
  hentPath,
  RouteEnum,
  Routes,
} from '../routes/Routes';
import { mapDataTilLabelOgVerdiTyper } from '../utils/innsending';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useHistory, useLocation } from 'react-router-dom';
import { hentTekst } from '../../utils/søknad';
import { useSkjema } from '../SkjemaContext';
import { VisLabelOgSvar } from '../../utils/visning';
import { IArbeidssøker } from '../../models/steg/aktivitet/arbeidssøker';
import LenkeMedIkon from '../../components/knapper/LenkeMedIkon';
import { sendInnSkjema } from '../innsending/api';
import { IStatus } from '../innsending/typer';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../language/LocaleTekst';
import KnappBase from 'nav-frontend-knapper';
import SeksjonGruppe from '../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../components/gruppe/KomponentGruppe';
import { StyledKnapper } from '../komponenter/StyledKnapper';

interface Innsending {
  status: IStatus;
  melding: string;
  venter: boolean;
}

const Oppsummering: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const intl = useIntl();
  const { skjema, settSkjema } = useSkjema();
  const [innsendingState, settinnsendingState] = React.useState<Innsending>({
    status: IStatus.KLAR_TIL_INNSENDING,
    melding: `Søknad kan sendes`,
    venter: false,
  });
  const forrigeRoute = hentForrigeRoute(Routes, location.pathname);
  const nesteRoute = hentNesteRoute(Routes, location.pathname);
  const spørsmålOgSvar = VisLabelOgSvar(skjema.arbeidssøker);

  const sendSkjema = (arbeidssøker: IArbeidssøker) => {
    const mappetSkjema = mapDataTilLabelOgVerdiTyper(arbeidssøker);

    settinnsendingState({ ...innsendingState, venter: true });
    sendInnSkjema(mappetSkjema)
      .then((kvittering) => {
        settinnsendingState({
          ...innsendingState,
          status: IStatus.SUKSESS,
          melding: `Vi har kontakt: ${kvittering.text}`,
          venter: false,
        });
        settSkjema({ ...skjema, innsendingsdato: kvittering.motattDato });
        history.push(nesteRoute.path);
      })
      .catch((e) =>
        settinnsendingState({
          ...innsendingState,
          status: IStatus.FEILET,
          melding: `Noe gikk galt: ${e}`,
          venter: false,
        })
      );
  };

  return (
    <Side tittel={'Oppsummering'} skalViseKnapper={false}>
      <SeksjonGruppe>
        <div className="oppsummering-arbeidssøker">
          <p className="typo-normal disclaimer">
            {hentTekst('skjema.oppsummering.disclaimer', intl)}
          </p>
          <Undertittel>
            {hentTekst('skjema.oppsummering.omdeg', intl)}
          </Undertittel>
          {spørsmålOgSvar}
        </div>
        <LenkeMedIkon
          onClick={() =>
            history.push({
              pathname: hentPath(Routes, RouteEnum.Spørsmål),
              state: { kommerFraOppsummering: true },
            })
          }
          tekst_id="barnasbosted.knapp.endre"
          ikon={endre}
        />
      </SeksjonGruppe>

      {innsendingState.status === IStatus.FEILET && (
        <KomponentGruppe>
          <AlertStripe type={'advarsel'} form={'inline'}>
            <Normaltekst>{innsendingState.melding}</Normaltekst>
          </AlertStripe>
        </KomponentGruppe>
      )}

      <StyledKnapper>
        <KnappBase
          className={'tilbake'}
          type={'standard'}
          onClick={() => history.push(forrigeRoute.path)}
        >
          <LocaleTekst tekst={'knapp.tilbake'} />
        </KnappBase>

        <KnappBase
          type={'hoved'}
          onClick={() => sendSkjema(skjema.arbeidssøker)}
          className={'neste'}
          spinner={innsendingState.venter}
        >
          <LocaleTekst tekst={'skjema.send'} />
        </KnappBase>

        <KnappBase
          className={'avbryt'}
          type={'flat'}
          onClick={() => history.push(Routes[0].path)}
        >
          <LocaleTekst tekst={'knapp.avbryt'} />
        </KnappBase>
      </StyledKnapper>
    </Side>
  );
};

export default Oppsummering;
