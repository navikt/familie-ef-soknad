import React from 'react';
import Side from '../../../components/side/Side';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import OppsummeringOmDeg from './OppsummeringOmDeg';
import OppsummeringBarnasBosituasjon from './OppsummeringBarnasBosituasjon';
import OppsummeringBarnaDine from './OppsummeringBarnaDine';
import OppsummeringAktiviteter from './OppsummeringAktiviteter';
import OppsummeringDinSituasjon from './OppsummeringDinSituasjon';
import OppsummeringBosituasjonenDin from './OppsummeringBosituasjon';
import { useSøknad } from '../../../context/SøknadContext';

const Oppsummering: React.FC = () => {
  const intl = useIntl();
  const { mellomlagreOvergangsstønad } = useSøknad();
  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'oppsummering.sidetittel' })}
        skalViseKnapper={true}
        mellomlagreOvergangsstønad={mellomlagreOvergangsstønad}
      >
        <div className="oppsummering">
          <Normaltekst className="disclaimer">
            {intl.formatMessage({ id: 'oppsummering.normaltekst.lesgjennom' })}
          </Normaltekst>

          <KomponentGruppe>
            <OppsummeringOmDeg />
            <OppsummeringBosituasjonenDin />
            <OppsummeringBarnaDine />
            <OppsummeringBarnasBosituasjon />
            <OppsummeringAktiviteter />
            <OppsummeringDinSituasjon />
          </KomponentGruppe>
        </div>
      </Side>
    </>
  );
};

export default Oppsummering;
