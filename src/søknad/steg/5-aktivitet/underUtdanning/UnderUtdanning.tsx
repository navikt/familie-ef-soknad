import React, { useEffect, useState } from 'react';
import { IAktivitet } from '../../../../models/steg/aktivitet/aktivitet';
import {
  EUtdanning,
  IUnderUtdanning,
} from '../../../../models/steg/aktivitet/utdanning';
import ErUtdanningenOffentligEllerPrivat from './ErUtdanningenOffentligEllerPrivat';
import ErUtdanningenPåHeltidEllerDeltid from './ErUtdanningenPåHeltidEllerDeltid';
import Hjelpetekst from '../../../../components/Hjelpetekst';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import NårSkalDuVæreElevEllerStudent from './NårSkalDuElevEllerStudent';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import SkoleOgLinje from './SkoleOgLinjeInputFelter';
import SøkerSkalJobbeDeltid from './SøkerSkalJobbeDeltid';
import TidligereUtdanning from './TidligereUtdanning';
import { erValgtSvarLiktSomSvar } from '../../../../utils/søknad';
import { nyttTekstFelt } from '../../../../helpers/tommeSøknadsfelter';
import { Undertittel } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { utdanningDuKanFåStønadTil } from './UtdanningConfig';
import { hentUid } from '../../../../utils/uuid';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (nyArbeidssituasjon: IAktivitet) => void;
}

const UnderUtdanning: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const intl = useIntl();
  const { underUtdanning } = arbeidssituasjon;
  const [utdanning, settUtdanning] = useState<IUnderUtdanning>({
    id: hentUid(),
    skoleUtdanningssted: nyttTekstFelt,
    linjeKursGrad: nyttTekstFelt,
  });

  useEffect(() => {
    settArbeidssituasjon({
      ...arbeidssituasjon,
      underUtdanning: utdanning,
    });
    // eslint-disable-next-line
  }, [utdanning]);

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
    <>
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

      {underUtdanning && underUtdanning.heltidEllerDeltid && (
        <>
          <TidligereUtdanning
            underUtdanning={underUtdanning}
            settUnderUtdanning={settUtdanning}
          />
        </>
      )}
    </>
  );
};

export default UnderUtdanning;
