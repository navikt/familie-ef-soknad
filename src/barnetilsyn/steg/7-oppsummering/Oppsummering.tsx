import React from 'react';
import Side from '../../../components/side/Side';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import OppsummeringOmDeg from '../../../søknad/steg/7-oppsummering/OppsummeringOmDeg';
import OppsummeringBarnaDine from '../../../søknad/steg/7-oppsummering/OppsummeringBarnaDine';
import OppsummeringBarnasBosituasjon from '../../../søknad/steg/7-oppsummering/OppsummeringBarnasBosituasjon';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import OppsummeringAktiviteter from '../../../søknad/steg/7-oppsummering/OppsummeringAktiviteter';

const Oppsummering: React.FC = () => {
  const intl = useIntl();
  const { mellomlagreOvergangsstønad, søknad } = useBarnetilsynSøknad();
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
            <OppsummeringBarnaDine barn={søknad.person.barn} />
            <OppsummeringBarnasBosituasjon barn={søknad.person.barn} />
            <OppsummeringAktiviteter aktivitet={søknad.aktivitet} />
          </KomponentGruppe>
        </div>
      </Side>
    </>
  );
};

export default Oppsummering;
