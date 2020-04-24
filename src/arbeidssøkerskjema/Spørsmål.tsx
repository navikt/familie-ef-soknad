import React, { FC } from 'react';
import Side from './side/Side';
import { IntlShape, injectIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { hentSvarAlertFraSpørsmål, hentTekst } from '../utils/søknad';
import SeksjonGruppe from '../components/gruppe/SeksjonGruppe';
import JaNeiSpørsmål from '../components/spørsmål/JaNeiSpørsmål';
import { erSøkerArbeidssøker } from '../søknad/steg/5-aktivitet/arbeidssøker/ArbeidssøkerConfig';
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../language/LocaleTekst';
import KomponentGruppe from '../components/gruppe/KomponentGruppe';
import { ESvar, ISpørsmål, ISvar } from '../models/spørsmålogsvar';
import { hentBooleanFraValgtSvar } from '../utils/spørsmålogsvar';

const Spørsmål: FC<{ intl: IntlShape }> = ({ intl }) => {
  const location = useLocation();
  const history = useHistory();
  const { skjema, settSkjema } = useSkjema();

  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const registrertSomArbeidssøkerAlert = hentSvarAlertFraSpørsmål(
    ESvar.NEI,
    erSøkerArbeidssøker
  );

  const settJaNeiSpørsmål = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);

    settSkjema({
      ...skjema,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: valgtSvar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar,
      },
    });
  };

  return (
    <Side
      tittel={intl.formatMessage({ id: 'skjema.tittel.omarbeidssøker' })}
      kommerFraOppsummering={kommerFraOppsummering}
    >
      <SeksjonGruppe>
        <KomponentGruppe>
          <JaNeiSpørsmål
            spørsmål={erSøkerArbeidssøker}
            onChange={settJaNeiSpørsmål}
            valgtSvar={arbeidssøker.registrertSomArbeidssøkerNav?.verdi}
          />
          {arbeidssøker.registrertSomArbeidssøkerNav && (
            <AlertStripe type={'info'} form={'inline'}>
              <LocaleTekst tekst={registrertSomArbeidssøkerAlert} />
            </AlertStripe>
          )}
        </KomponentGruppe>
      </SeksjonGruppe>
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

export default injectIntl(Spørsmål);
