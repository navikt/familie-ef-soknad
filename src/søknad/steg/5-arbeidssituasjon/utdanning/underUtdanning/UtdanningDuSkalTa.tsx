import React from 'react';
import SeksjonGruppe from '../../../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import { Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../../language/LocaleTekst';
import Hjelpetekst from '../../../../../components/Hjelpetekst';
import { utdanningDuKanFåStønadTil } from './UtdanningConfig';
import SkoleOgLinje from './SkoleOgLinjeInputFelter';
import NårSkalDuVæreElevEllerStudent from './NårSkalDuElevEllerStudent';
import SøkerSkalJobbeDeltid from './SøkerSkalJobbeDeltid';
import { erValgtSvarLiktSomSvar } from '../../../../../utils/søknad';
import {
  EUtdanning,
  IUnderUtdanning,
} from '../../../../../models/arbeidssituasjon/utdanning';
import { useIntl } from 'react-intl';
import { IArbeidssituasjon } from '../../../../../models/arbeidssituasjon/arbeidssituasjon';
import ErUtdanningenOffentligEllerPrivat from './ErUtdanningenOffentligEllerPrivat';
import ErUtdanningenPåHeltidEllerDeltid from './ErUtdanningenPåHeltidEllerDeltid';
interface Props {
  arbeidssituasjon: IArbeidssituasjon;
  utdanning: IUnderUtdanning;
  settUtdanning: (utdanning: IUnderUtdanning) => void;
}
const UtdanningDuSkalTa: React.FC<Props> = ({
  arbeidssituasjon,
  utdanning,
  settUtdanning,
}) => {
  const intl = useIntl();
  const { underUtdanning } = arbeidssituasjon;

  const oppdaterUtdanning = (
    nøkkel: EUtdanning,
    label: string,
    verdi: string
  ) => {
    underUtdanning &&
      settUtdanning({
        ...underUtdanning,
        [nøkkel]: { label: label, verdi: verdi },
      });
  };

  const søkerSkalJobbeDeltid = erValgtSvarLiktSomSvar(
    utdanning.heltidEllerDeltid?.verdi,
    'utdanning.svar.deltid',
    intl
  );
  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <Undertittel className={'sentrert'}>
          <LocaleTekst tekst={'utdanning.tittel'} />
        </Undertittel>
        <Hjelpetekst
          className={'sentrert'}
          åpneTekstid={utdanningDuKanFåStønadTil.åpneTekstid}
          innholdTekstid={utdanningDuKanFåStønadTil.innholdTekstid}
        />
      </KomponentGruppe>

      <SkoleOgLinje
        utdanning={utdanning}
        oppdaterUtdanning={oppdaterUtdanning}
      />

      <ErUtdanningenOffentligEllerPrivat
        utdanning={utdanning}
        settUtdanning={settUtdanning}
      />
      {utdanning.offentligEllerPrivat?.verdi && (
        <NårSkalDuVæreElevEllerStudent
          utdanning={utdanning}
          settUtdanning={settUtdanning}
        />
      )}
      {utdanning.offentligEllerPrivat?.verdi && (
        <ErUtdanningenPåHeltidEllerDeltid
          utdanning={utdanning}
          settUtdanning={settUtdanning}
        />
      )}
      {søkerSkalJobbeDeltid && (
        <SøkerSkalJobbeDeltid
          utdanning={utdanning}
          oppdaterUtdanning={oppdaterUtdanning}
        />
      )}
    </SeksjonGruppe>
  );
};

export default UtdanningDuSkalTa;
