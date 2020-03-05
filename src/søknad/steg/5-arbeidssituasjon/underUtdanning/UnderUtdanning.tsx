import React, { useEffect, useState } from 'react';
import { IArbeidssituasjon } from '../../../../models/arbeidssituasjon/arbeidssituasjon';
import {
  EUtdanning,
  IUnderUtdanning,
} from '../../../../models/arbeidssituasjon/utdanning';
import { nyttTekstFelt, tomPeriode } from '../../../../utils/søknadsfelter';
import TidligereUtdanning from './tidligereUtdanning/TidligereUtdanning';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../language/LocaleTekst';
import Hjelpetekst from '../../../../components/Hjelpetekst';
import { utdanningDuKanFåStønadTil } from './UtdanningConfig';
import SkoleOgLinje from './SkoleOgLinjeInputFelter';
import ErUtdanningenOffentligEllerPrivat from './ErUtdanningenOffentligEllerPrivat';
import NårSkalDuVæreElevEllerStudent from './NårSkalDuElevEllerStudent';
import ErUtdanningenPåHeltidEllerDeltid from './ErUtdanningenPåHeltidEllerDeltid';
import SøkerSkalJobbeDeltid from './SøkerSkalJobbeDeltid';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { erValgtSvarLiktSomSvar } from '../../../../utils/søknad';
import { useIntl } from 'react-intl';

interface Props {
  arbeidssituasjon: IArbeidssituasjon;
  settArbeidssituasjon: (nyArbeidssituasjon: IArbeidssituasjon) => void;
}

const UnderUtdanning: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const intl = useIntl();
  const { underUtdanning } = arbeidssituasjon;
  const [utdanning, settUtdanning] = useState<IUnderUtdanning>({
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
  console.log(underUtdanning?.harTattUtdanningEtterGrunnskole);

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

      <TidligereUtdanning
        utdanning={underUtdanning ? underUtdanning : utdanning}
        settUtdanning={settUtdanning}
      />
    </>
  );
};

export default UnderUtdanning;
