import React, { useEffect, useState } from 'react';
import { IArbeidssituasjon } from '../../../../models/arbeidssituasjon';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { Undertittel } from 'nav-frontend-typografi';
import Hjelpetekst from '../../../../components/Hjelpetekst';
import {
  linjeKursGrad,
  skoleUtdanningssted,
  utdanningDuKanFåStønadTil,
} from './UtdanningConfig';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import { Input } from 'nav-frontend-skjema';
import { hentTekst } from '../../../../utils/søknad';
import {
  EUtdanning,
  IUnderUtdanning,
  IUtdanning,
} from '../../../../models/utdanning';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import subDays from 'date-fns';
import { dagensDato } from '../../../../utils/dato';
import { IPeriode } from '../../../../models/søknad';

interface Props {
  arbeidssituasjon: IArbeidssituasjon;
  settArbeidssituasjon: (nyArbeidssituasjon: IArbeidssituasjon) => void;
}

const tomPeriode: IPeriode = {
  fra: {
    label: '',
    verdi: subDays(dagensDato, 1),
  },
  til: { label: '', verdi: dagensDato },
};

const Utdanning: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const intl = useIntl();
  const { underUtdanning } = arbeidssituasjon;
  const [utdanning, settUtdanning] = useState<IUnderUtdanning>();
  const [tidligereUtdanning, settTidligereUtdanning] = useState<IUtdanning>({
    linjeKursGrad: tomtTekstfelt,
    periode: tomPeriode,
  });

  useEffect(() => {
    settArbeidssituasjon({
      ...arbeidssituasjon,
      utdanning: { ...underUtdanning, tidligereUtdanning: tidligereUtdanning },
    });
    // eslint-disable-next-line
  }, [underUtdanning, tidligereUtdanning]);

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

  const settTekstInputFelt = (
    nøkkel: EUtdanning,
    label: string,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    oppdaterUtdanning(nøkkel, label, e.currentTarget.value);
  };

  const skoleUtdanningstedLabel = hentTekst(
    skoleUtdanningssted.label_tekstid,
    intl
  );
  const linjeKursGradLabel = hentTekst(linjeKursGrad.label_tekstid, intl);

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
      <FeltGruppe>
        <Input
          key={skoleUtdanningssted.nøkkel}
          label={skoleUtdanningstedLabel}
          type="text"
          bredde={'L'}
          onChange={(e) =>
            settTekstInputFelt(
              EUtdanning.skoleUtdanningssted,
              skoleUtdanningstedLabel,
              e
            )
          }
        />
      </FeltGruppe>
      <FeltGruppe>
        <Input
          key={linjeKursGrad.nøkkel}
          label={linjeKursGradLabel}
          type="text"
          bredde={'L'}
          onChange={(e) =>
            settTekstInputFelt(EUtdanning.linjeKursGrad, linjeKursGradLabel, e)
          }
        />
      </FeltGruppe>
    </SeksjonGruppe>
  );
};

export default Utdanning;
