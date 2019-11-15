import React, { useState } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../language/LocaleTekst';
import { Input } from 'nav-frontend-skjema';
import { usePersonContext } from '../../../context/PersonContext';
import useSøknadContext from '../../../context/SøknadContext';

import { injectIntl } from 'react-intl';
import FeltGruppe from '../../../components/FeltGruppe';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';

const Personopplysninger: React.FC<any> = ({ intl }) => {
  const { person } = usePersonContext();
  const { søker } = person;
  const { søknad, settSøknad } = useSøknadContext();
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
  return (
    <section className={'seksjon'}>
      <Systemtittel>
        <LocaleTekst tekst={'personopplysninger.tittel'} />
      </Systemtittel>
      <FeltGruppe>
        <AlertStripeInfo>
          <LocaleTekst tekst={'personopplysninger.infohentet'} />
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
          <LocaleTekst tekst={'personopplysninger.adresse'} />
        </Element>
        <Normaltekst>{søker.adresse.adresse}</Normaltekst>
      </FeltGruppe>

      {person.søker.mobiltelefon === '' ? (
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
          <Normaltekst>{person.søker.mobiltelefon}</Normaltekst>
        </FeltGruppe>
      )}
    </section>
  );
};

export default injectIntl(Personopplysninger);
