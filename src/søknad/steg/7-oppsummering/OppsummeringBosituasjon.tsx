import React, { useState, useCallback } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import { hentBeskjedMedNavn } from '../../../utils/språk';
import { formatDate } from '../../../utils/dato';
import { verdiTilTekstsvar } from '../../../utils/søknad';

interface Props {
  visLabelOgSvar: Function;
}

const OppsummeringBosituasjon: React.FC<Props> = ({ visLabelOgSvar }) => {
  const { søknad } = useSøknadContext();
  const intl = useIntl();

  const { samboerDetaljer, ...bosituasjon } = søknad.bosituasjon;
  const bosituasjonSpørsmål = visLabelOgSvar(bosituasjon);

  const samboerInformasjonVisning = samboerDetaljer
    ? Object.keys(samboerDetaljer).map((key: string) => {
        if (key == 'navn') {
          return (
            <div className="spørsmål-og-svar">
              <Element>Hvem skal du gifte deg eller flytte sammen med?</Element>
              <Normaltekst>{samboerDetaljer[key]}</Normaltekst>
            </div>
          );
        } else if (key == 'fødselsdato') {
          return (
            <div className="spørsmål-og-svar">
              <Element>Fødselsdato</Element>
              <Normaltekst>{samboerDetaljer[key]}</Normaltekst>
            </div>
          );
        } else if (key == 'fødselsnummer') {
          return (
            <div className="spørsmål-og-svar">
              <Element>Fødselsnummer</Element>
              <Normaltekst>{samboerDetaljer[key]}</Normaltekst>
            </div>
          );
        }
      })
    : null;

  return (
    <Ekspanderbartpanel tittel="Bosituasjon">
      {bosituasjonSpørsmål}
      {samboerInformasjonVisning}
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBosituasjon;
