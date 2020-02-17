import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../language/LocaleTekst';
import Arbeidsgiver from './Arbeidsgiver';

const OmArbeidsforholdetDitt: React.FC = () => {
  return (
    <>
      <Undertittel>
        <LocaleTekst tekst={'arbeidsforhold.tittel'} />
      </Undertittel>
    </>
  );
};

export default OmArbeidsforholdetDitt;
