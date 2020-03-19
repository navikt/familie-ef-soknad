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
import OppsummeringOmDeg from './OppsummeringOmDeg';
import OppsummeringBosituasjon from './OppsummeringBosituasjon';
import { verdiTilTekstsvar } from '../../../utils/søknad';

const Oppsummering: React.FC = () => {
  const { søknad } = useSøknadContext();
  const intl = useIntl();

  console.log(søknad);

  const visLabelOgSvar = (objekt: Object) =>
    Object.values(objekt).map((spørsmål) => {
      return (
        <div className="spørsmål-og-svar">
          <Element>{spørsmål.label}</Element>
          <Normaltekst>{verdiTilTekstsvar(spørsmål.verdi)}</Normaltekst>
        </div>
      );
    });

  return (
    <>
      <Side tittel={intl.formatMessage({ id: 'oppsummering.sidetittel' })}>
        <div className="oppsummering">
          <Normaltekst className="disclaimer">
            {intl.formatMessage({ id: 'oppsummering.normaltekst.lesgjennom' })}
          </Normaltekst>

          <KomponentGruppe>
            <OppsummeringOmDeg visLabelOgSvar={visLabelOgSvar} />
            <OppsummeringBosituasjon visLabelOgSvar={visLabelOgSvar} />
            <Ekspanderbartpanel tittel="Barna dine">
              <h1>Yes</h1>
              <div>Test</div>
            </Ekspanderbartpanel>
            <Ekspanderbartpanel tittel="Barnas bosted og samværsordning">
              <h1>Yes</h1>
              <div>Test</div>
            </Ekspanderbartpanel>
            <Ekspanderbartpanel tittel="Arbeid, utdanning og mindre aktiviteter">
              <h1>Yes</h1>
              <div>Test</div>
            </Ekspanderbartpanel>
            <Ekspanderbartpanel tittel="Mer om din situasjonen">
              <h1>Yes</h1>
              <div>Test</div>
            </Ekspanderbartpanel>
          </KomponentGruppe>
        </div>
      </Side>
    </>
  );
};

export default Oppsummering;
