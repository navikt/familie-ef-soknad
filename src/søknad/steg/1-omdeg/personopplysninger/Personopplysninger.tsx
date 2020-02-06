import React, { useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../language/LocaleTekst';
import { Input } from 'nav-frontend-skjema';
import { usePersonContext } from '../../../../context/PersonContext';
import useSøknadContext from '../../../../context/SøknadContext';

import { injectIntl } from 'react-intl';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import { borDuPåDenneAdressen } from './PersonopplysningerConfig';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

const Personopplysninger: React.FC<any> = ({ intl }) => {
  const { person } = usePersonContext();
  const { søker } = person;
  const { søknad, settSøknad } = useSøknadContext();
  const { mobiltelefon, jobbtelefon, privattelefon } = søker;
  const [feilTelefonnr, settFeilTelefonnr] = useState<string | undefined>(
    undefined
  );

  const settTelefonnummer = (e: React.FormEvent<HTMLInputElement>) => {
    const telefonnr = e.currentTarget.value;
    if (telefonnr.length >= 8) {
      settFeilTelefonnr(undefined);

      settSøknad({
        ...søknad,
        person: {
          ...søknad.person,
          søker: { ...søker, mobiltelefon: telefonnr },
        },
      });
    } else {
      settFeilTelefonnr('Feil format');
    }
  };

  const telefonnr =
    mobiltelefon !== ''
      ? mobiltelefon
      : privattelefon !== ''
      ? privattelefon
      : jobbtelefon !== ''
      ? jobbtelefon
      : '';

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <FeltGruppe>
          <AlertStripeInfo className={'fjernBakgrunn'}>
            <LocaleTekst tekst={'personopplysninger.alert.infohentet'} />
          </AlertStripeInfo>
        </FeltGruppe>
        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'personopplysninger.fnr'} />
          </Element>
          <Normaltekst>{søker.fnr}</Normaltekst>
        </FeltGruppe>
        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'personopplysninger.statsborgerskap'} />
          </Element>
          <Normaltekst>{søker.statsborgerskap}</Normaltekst>
        </FeltGruppe>
        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'personopplysninger.adresse'} />
          </Element>
          <Normaltekst>{søker.adresse.adresse}</Normaltekst>
        </FeltGruppe>
      </KomponentGruppe>

      <KomponentGruppe>
        <JaNeiSpørsmål spørsmål={borDuPåDenneAdressen} />
        {søknad.søkerBorPåRegistrertAdresse === false ? (
          <AlertStripeAdvarsel className={'fjernBakgrunn'}>
            <LocaleTekst tekst={'personopplysninger.alert.riktigAdresse'} />
          </AlertStripeAdvarsel>
        ) : null}
      </KomponentGruppe>

      {telefonnr === '' ? (
        <Input
          key={'tlf'}
          label={intl
            .formatMessage({ id: 'personopplysninger.telefonnr' })
            .trim()}
          type="tel"
          bredde={'M'}
          onChange={(e) => settTelefonnummer(e)}
          feil={
            feilTelefonnr !== undefined
              ? { feilmelding: feilTelefonnr }
              : undefined
          }
        />
      ) : (
        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'personopplysninger.telefonnr'} />
          </Element>
          <Normaltekst>{telefonnr}</Normaltekst>
        </FeltGruppe>
      )}
    </SeksjonGruppe>
  );
};

export default injectIntl(Personopplysninger);
