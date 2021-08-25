import React, { FC } from 'react';
import { ISøknad } from '../../../models/søknad/søknad';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { Innsending } from './SendSøknad';

interface Props {
  søknadForOvergangsstønad: ISøknad;
  innsendingState: Innsending;
}

const erNødvendigeDatofelterUtfylt = (søknad: ISøknad): boolean => {
  // Sjekk ut ifra sivilstatus og steg om deg

  // Sjekk bosituasjon
  // Sjekk steg 5 aktivitet
  // steg 6 mer situasjon
  // SJEKK OM OS, Barnetilsyn ell skolepenger

  return false;
};

const InnsendingFeilet: FC<Props> = ({
  søknadForOvergangsstønad,
  innsendingState,
}) => {
  // Hvis datofeltene er feil, gi feiloppsummering og hva som må fikses opp i.
  return !erNødvendigeDatofelterUtfylt(søknadForOvergangsstønad) ? (
    <KomponentGruppe>
      <AlertStripe type={'advarsel'} form={'inline'}>
        <Normaltekst>BEDRE FEILMELDING</Normaltekst>
      </AlertStripe>
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
