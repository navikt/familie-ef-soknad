import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';

const Oppsummering: React.FC = () => {
  const { søknad } = useSøknadContext();
  const intl = useIntl();

  return (
    <>
      <Side tittel={intl.formatMessage({ id: 'oppsummering.sidetittel' })}>
        <Normaltekst>Les gjennom</Normaltekst>
      </Side>
    </>
  );
};

export default Oppsummering;
