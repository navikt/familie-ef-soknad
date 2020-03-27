import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
  VisLabelOgSvar: Function;
}

const OppsummeringBosituasjon: React.FC<Props> = ({ VisLabelOgSvar }) => {
  const { søknad } = useSøknadContext();

  const { samboerDetaljer, ...bosituasjon } = søknad.bosituasjon;
  const bosituasjonSpørsmål = VisLabelOgSvar(bosituasjon);

  const samboerInformasjonVisning = samboerDetaljer
    ? Object.keys(samboerDetaljer).map((key: string) => {
        if (key === 'navn') {
          return (
            <div className="spørsmål-og-svar">
              <Element>Hvem skal du gifte deg eller flytte sammen med?</Element>
              <Normaltekst>{samboerDetaljer[key]}</Normaltekst>
            </div>
          );
        } else if (key === 'fødselsdato') {
          return (
            <div className="spørsmål-og-svar">
              <Element>Fødselsdato</Element>
              <Normaltekst>{samboerDetaljer[key]}</Normaltekst>
            </div>
          );
        } else if (key === 'fødselsnummer') {
          return (
            <div className="spørsmål-og-svar">
              <Element>Fødselsnummer</Element>
              <Normaltekst>{samboerDetaljer[key]}</Normaltekst>
            </div>
          );
        }

        return null;
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
