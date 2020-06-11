import React, { FC } from 'react';
import {
  EAktivitet,
  IAktivitet,
} from '../../../models/steg/aktivitet/aktivitet';
import HjemmeMedBarnUnderEttÅr from './HjemmeMedBarnUnderEttÅr';
import OmArbeidsforholdetDitt from './arbeidsforhold/OmArbeidsforholdetDitt';
import EtablererEgenVirksomhet from './EtablererEgenVirksomhet';
import Arbeidssøker from './arbeidssøker/Arbeidssøker';
import UnderUtdanning from './underUtdanning/UnderUtdanning';
import OmFirmaetDitt from './OmFirmaetDitt';
import EgetAS from './aksjeselskap/EgetAS';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (arbeidssituasjon: IAktivitet) => void;
  svarid: string;
}
const AktivitetOppfølgingSpørsmål: FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
  svarid,
}) => {
  switch (svarid) {
    case EAktivitet.erHjemmeMedBarnUnderEttÅr:
      return <HjemmeMedBarnUnderEttÅr />;

    case EAktivitet.erArbeidstaker:
      return (
        <OmArbeidsforholdetDitt
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      );

    case EAktivitet.erSelvstendigNæringsdriveneEllerFrilanser:
      return (
        <OmFirmaetDitt
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      );

    case EAktivitet.erAnsattIEgetAS:
      return (
        <EgetAS
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      );

    case EAktivitet.etablererEgenVirksomhet:
      return (
        <EtablererEgenVirksomhet
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      );

    case EAktivitet.erArbeidssøker:
      return (
        <Arbeidssøker
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      );

    case EAktivitet.tarUtdanning:
      return (
        <UnderUtdanning
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      );

    default:
      return <></>;
  }
};

export default AktivitetOppfølgingSpørsmål;
