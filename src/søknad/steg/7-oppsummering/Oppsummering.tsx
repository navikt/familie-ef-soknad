import React from 'react';
import Side from '../../../components/side/Side';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import OppsummeringOmDeg from './OppsummeringOmDeg';
import OppsummeringBosituasjon from './OppsummeringBosituasjon';
import OppsummeringBarnaDine from './OppsummeringBarnaDine';
import { VisLabelOgSvar } from '../../../utils/visning';

const Oppsummering: React.FC = () => {
  //const { søknad } = useSøknadContext();
  const intl = useIntl();

  return (
    <>
      <Side tittel={intl.formatMessage({ id: 'oppsummering.sidetittel' })}>
        <div className="oppsummering">
          <Normaltekst className="disclaimer">
            {intl.formatMessage({ id: 'oppsummering.normaltekst.lesgjennom' })}
          </Normaltekst>

          <KomponentGruppe>
            <OppsummeringOmDeg VisLabelOgSvar={VisLabelOgSvar} />
            <OppsummeringBosituasjon VisLabelOgSvar={VisLabelOgSvar} />
            <OppsummeringBarnaDine VisLabelOgSvar={VisLabelOgSvar} />
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
