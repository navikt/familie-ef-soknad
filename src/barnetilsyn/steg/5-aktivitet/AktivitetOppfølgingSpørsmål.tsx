import React, { FC } from 'react';
import {
  EAktivitet,
  IAktivitet,
} from '../../../models/steg/aktivitet/aktivitet';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import OmArbeidsforholdetDitt from '../../../søknad/steg/5-aktivitet/arbeidsforhold/OmArbeidsforholdetDitt';
import OmFirmaetDitt from '../../../søknad/steg/5-aktivitet/OmFirmaetDitt';
import EgetAS from '../../../søknad/steg/5-aktivitet/aksjeselskap/EgetAS';
import EtablererEgenVirksomhet from '../../../søknad/steg/5-aktivitet/EtablererEgenVirksomhet';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (arbeidssituasjon: IAktivitet) => void;
  svarid: string;
  settDokumentasjonsbehov: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    erHuketAv?: boolean
  ) => void;
}
const AktivitetOppfølgingSpørsmål: FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
  svarid,
  settDokumentasjonsbehov,
}) => {
  switch (svarid) {
    case EAktivitet.erArbeidstaker:
      return (
        <OmArbeidsforholdetDitt
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
          settDokumentasjonsbehov={settDokumentasjonsbehov}
          inkludertArbeidsmengde={false}
        />
      );

    case EAktivitet.erSelvstendigNæringsdriveneEllerFrilanser:
      return (
        <OmFirmaetDitt
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
          inkludertArbeidsmengde={false}
        />
      );

    case EAktivitet.erAnsattIEgetAS:
      return (
        <EgetAS
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
          inkludertArbeidsmengde={false}
        />
      );

    case EAktivitet.etablererEgenVirksomhet:
      return (
        <EtablererEgenVirksomhet
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      );

    default:
      return <></>;
  }
};

export default AktivitetOppfølgingSpørsmål;
