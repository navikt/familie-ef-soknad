import React, { FC } from 'react';
import { ISøknad } from '../../../models/søknad/søknad';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { Innsending } from './SendSøknad';
import {
  ESivilstand,
  ISivilstatus,
} from '../../../models/steg/omDeg/sivilstatus';
import { erDatoGyldigOgInnaforBegrensninger } from '../../../components/dato/utils';
import { DatoBegrensning } from '../../../components/dato/Datovelger';
import { erSøknadsBegrunnelseBesvart } from '../../../helpers/steg/omdeg';
import { erBosituasjonUtfylt } from '../../../helpers/steg/bosituasjon';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { useIntl } from 'react-intl';
import LocaleTekst from '../../../language/LocaleTekst';

const datoFelt = {};

interface Props {
  søknadForOvergangsstønad: ISøknad;
  innsendingState: Innsending;
}

const validerSivilstatusDatoer = (
  sivilstand: string,
  sivilstatus: ISivilstatus
): boolean => {
  const {
    harSøktSeparasjon,
    datoSøktSeparasjon,
    datoFlyttetFraHverandre,
  } = sivilstatus;

  if (sivilstand === ESivilstand.GIFT) {
    const harSøktSeparasjonOgValgtObligatoriskeDatofelt =
      harSøktSeparasjon?.verdi &&
      datoSøktSeparasjon?.verdi &&
      erDatoGyldigOgInnaforBegrensninger(
        datoSøktSeparasjon?.verdi,
        DatoBegrensning.TidligereDatoer
      ) &&
      datoFlyttetFraHverandre?.verdi &&
      erDatoGyldigOgInnaforBegrensninger(
        datoFlyttetFraHverandre?.verdi,
        DatoBegrensning.TidligereDatoer
      );
    return (
      harSøktSeparasjonOgValgtObligatoriskeDatofelt ||
      harSøktSeparasjon?.verdi === false
    );
  } else {
    return !!erSøknadsBegrunnelseBesvart(sivilstatus);
  }
};

const erNødvendigeDatofelterUtfylt = (søknad: ISøknad) => {
  const { sivilstatus, person, bosituasjon } = søknad;
  // Sjekk ut ifra sivilstatus og steg om deg

  const erSivilstatusDatoerRiktigUtfylt =
    person?.søker?.sivilstand &&
    validerSivilstatusDatoer(person?.søker?.sivilstand, sivilstatus);

  // Sjekk bosituasjon
  const erBosituasjonDatoerRiktigUtfylt = erBosituasjonUtfylt(bosituasjon);

  // Sjekk steg 5 aktivitet

  // steg 6 mer situasjon
  const erDinSituasjonDatoerRiktigUtfylt =
    søknad.merOmDinSituasjon.søknadsdato?.verdi &&
    erDatoGyldigOgInnaforBegrensninger(
      søknad.merOmDinSituasjon.søknadsdato?.verdi,
      DatoBegrensning.AlleDatoer
    );

  return (
    erSivilstatusDatoerRiktigUtfylt &&
    erBosituasjonDatoerRiktigUtfylt &&
    erDinSituasjonDatoerRiktigUtfylt
  );
};

// LAG EN FUNKSJON SOM RETURNERER EN ARRAY MED DATOFELTENE SOM MÅ FIKSES OPP I
// OG HVOR MAN FINNER DE FOR P SENDE DE INN I <FEILOPPSUMMERING/>

const InnsendingFeilet: FC<Props> = ({
  søknadForOvergangsstønad,
  innsendingState,
}) => {
  const intl = useIntl();

  // Hvis datofeltene er feil, gi feiloppsummering med detaljer om datofeltene som må fikses opp i og hvor man kan finne de.
  return !erNødvendigeDatofelterUtfylt(søknadForOvergangsstønad) ? (
    <KomponentGruppe>
      <AlertStripe type={'advarsel'} form={'inline'}>
        <Normaltekst>
          <LocaleTekst tekst={'feil.alert'} />
        </Normaltekst>
      </AlertStripe>
      <Feiloppsummering
        tittel={intl.formatMessage({ id: 'feil.alert.oppsummering' })}
        feil={[]}
      />
    </KomponentGruppe>
  ) : (
    <KomponentGruppe>
      <AlertStripe type={'advarsel'} form={'inline'}>
        <Normaltekst>{innsendingState.melding}</Normaltekst>
      </AlertStripe>
    </KomponentGruppe>
  );
};

export default InnsendingFeilet;
