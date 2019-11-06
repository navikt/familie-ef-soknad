import React from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../language/LocaleTekst';
import { Input } from 'nav-frontend-skjema';
import { usePersonContext } from '../../context/PersonContext';
import { injectIntl } from 'react-intl';

const Personopplysninger: React.FC<any> = ({ intl }) => {
  const { person } = usePersonContext();

  return (
    <section>
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
      <Element>
        <LocaleTekst tekst={'personopplysninger.telefonnr'} />
      </Element>
      <Input
        key={'tlf'}
        label={intl
          .formatMessage({ id: 'personopplysninger.manglerinfo' })
          .trim()}
        type="tel"
      />
    </section>
  );
};

export default injectIntl(Personopplysninger);
