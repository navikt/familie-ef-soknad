import React from 'react';
import { IArbeidssituasjon } from '../../../../models/arbeidssituasjon';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { Undertittel } from 'nav-frontend-typografi';
import Hjelpetekst from '../../../../components/Hjelpetekst';
import { LesMer } from '../../../../models/spørsmal';
import { utdanningDuKanFåStønadTil } from './UtdanningConfig';

interface Props {
  arbeidssituasjon: IArbeidssituasjon;
  settArbeidssituasjon: (nyArbeidssituasjon: IArbeidssituasjon) => void;
}

const Utdanning: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const {} = arbeidssituasjon;

  const utdanningHjelpetekst: LesMer = utdanningDuKanFåStønadTil;

  return (
    <SeksjonGruppe>
      <Undertittel className={'sentrert'}>Tittel: Utdanning</Undertittel>
      <Hjelpetekst
        className={'sentrert'}
        åpneTekstid={utdanningHjelpetekst.åpneTekstid}
        innholdTekstid={utdanningHjelpetekst.innholdTekstid}
      />
    </SeksjonGruppe>
  );
};

export default Utdanning;
