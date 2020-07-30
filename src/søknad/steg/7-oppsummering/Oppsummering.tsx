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
  const { mellomlagreOvergangsstønad, søknad } = useSøknad();
  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'oppsummering.sidetittel' })}
        skalViseKnapper={true}
        mellomlagreOvergangsstønad={mellomlagreOvergangsstønad}
        erSpørsmålBesvart={true}
      >
        <div className="oppsummering">
          <Normaltekst className="disclaimer">
            {intl.formatMessage({ id: 'oppsummering.normaltekst.lesgjennom' })}
          </Normaltekst>

          <KomponentGruppe>
            <OppsummeringOmDeg
              søker={søknad.person.søker}
              sivilstatus={søknad.sivilstatus}
              medlemskap={søknad.medlemskap}
            />
            <OppsummeringBosituasjonenDin bosituasjon={søknad.bosituasjon} />
            <OppsummeringBarnaDine barn={søknad.person.barn} />
            <OppsummeringBarnasBosituasjon barn={søknad.person.barn} />
            <OppsummeringAktiviteter aktivitet={søknad.aktivitet} />
            <OppsummeringDinSituasjon dinSituasjon={søknad.merOmDinSituasjon} />
          </KomponentGruppe>
        </div>
      </Side>
    </>
  );
};

export default Oppsummering;
