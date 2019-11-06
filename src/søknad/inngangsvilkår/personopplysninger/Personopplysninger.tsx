import React, { useState } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../language/LocaleTekst';
import { Input } from 'nav-frontend-skjema';
import { usePersonContext } from '../../../context/PersonContext';
import useSøknadContext from '../../../context/SøknadContext';

import { injectIntl } from 'react-intl';

const Personopplysninger: React.FC<any> = ({ intl }) => {
  const { person } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();
  const [feilTelefonnr, settFeilTelefonnr] = useState<string | undefined>(
    undefined
  );

  const settTelefonnummer = (e: React.FormEvent<HTMLInputElement>) => {
    const telefonnr = e.currentTarget.value;
    if (telefonnr.length >= 8) {
      settFeilTelefonnr(undefined);
      settSøknad({ ...søknad, telefonnr: telefonnr });
    } else {
      settFeilTelefonnr('Feil format');
    }
  };
  return (
    <section className={'personopplysninger'}>
      <Systemtittel>
        <LocaleTekst tekst={'personopplysninger.tittel'} />
      </Systemtittel>
      <Normaltekst>
        <LocaleTekst tekst={'personopplysninger.infohentet'} />
      </Normaltekst>
      <Element>
        <LocaleTekst tekst={'personopplysninger.fnr'} />
      </Element>
      <Normaltekst>{person.fnr}</Normaltekst>
      <Element>
        <LocaleTekst tekst={'personopplysninger.adresse'} />
      </Element>
      <Normaltekst>{person.adresse}</Normaltekst>

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
    </section>
  );
};

export default injectIntl(Personopplysninger);
