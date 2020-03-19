import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import { hentBeskjedMedNavn } from '../../../utils/språk';

const OppsummeringOmDeg: React.FC = () => {
  const { søknad } = useSøknadContext();
  const intl = useIntl();

  console.log(søknad);

  const omDeg = søknad.person.søker;
  const sivilstatus = søknad.sivilstatus;

  const sivilstatusSpørsmål = Object.values(sivilstatus).forEach((spørsmål) => {
    return (
      <div className="spørsmål-og-svar">
        <Element>{spørsmål.label}</Element>
        <Normaltekst>{spørsmål.verdi}</Normaltekst>
      </div>
    );
  });

  return (
    <Ekspanderbartpanel tittel="Om deg">
      <div className="spørsmål-og-svar">
        <Element>Fødselsnummer</Element>
        <Normaltekst>{omDeg.fnr}</Normaltekst>
      </div>
      <div className="spørsmål-og-svar">
        <Element>Statsborgerskap</Element>
        <Normaltekst>{omDeg.statsborgerskap}</Normaltekst>
      </div>
      <div className="spørsmål-og-svar">
        <Element>Adresse</Element>
        <Normaltekst>{omDeg.adresse.adresse}</Normaltekst>
      </div>
      <div className="spørsmål-og-svar">
        <Element>Telefonnummer</Element>
        <Normaltekst>{omDeg.mobiltelefon}</Normaltekst>
      </div>
    </Ekspanderbartpanel>
  );
};

export default OppsummeringOmDeg;
