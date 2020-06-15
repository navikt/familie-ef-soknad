import React, { FC, useEffect, useState } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { useIntl } from 'react-intl';
import { IBosituasjon } from '../../../models/steg/bosituasjon';
import { datoTilStreng } from '../../../utils/dato';
import { hentTekst } from '../../../utils/søknad';
import { Element } from 'nav-frontend-typografi';
import IdentEllerFødselsdatoGruppe from '../../../components/gruppe/IdentEllerFødselsdatoGruppe';
import { Input } from 'nav-frontend-skjema';
import { EPersonDetaljer, IPersonDetaljer } from '../../../models/person';

interface Props {
  tittel: string;
  ekteskapsLiknendeForhold: boolean;
  settBosituasjon: (bositasjon: IBosituasjon) => void;
  bosituasjon: IBosituasjon;
}

const OmSamboerenDin: FC<Props> = ({
  tittel,
  ekteskapsLiknendeForhold,
  settBosituasjon,
  bosituasjon,
}) => {
  const intl = useIntl();
  const { samboerDetaljer } = bosituasjon;
  const [samboerInfo, settSamboerInfo] = useState<IPersonDetaljer>(
    samboerDetaljer ? samboerDetaljer : {}
  );
  const [erUkjentIdent, settUkjentIdent] = useState<boolean>(false);
  const [erGyldigIdent, settGyldigIdent] = useState<boolean>(true);

  useEffect(() => {
    settBosituasjon({ ...bosituasjon, samboerDetaljer: samboerInfo });
    // eslint-disable-next-line
  }, [samboerInfo]);

  const settChecked = (checked: boolean) => {
    const endretSamboerInfo = samboerInfo;
    if (checked && endretSamboerInfo.ident) delete samboerInfo.ident;

    settSamboerInfo(endretSamboerInfo);
    settUkjentIdent(checked);
  };

  const settFødselsdato = (date: Date | null) => {
    date !== null &&
      settSamboerInfo({
        ...samboerInfo,
        fødselsdato: {
          label: hentTekst('datovelger.fødselsdato', intl),
          verdi: datoTilStreng(date),
        },
      });
  };

  const settIdent = (e: React.FormEvent<HTMLInputElement>) => {
    const endretPersonInfo = samboerDetaljer;
    if (endretPersonInfo?.fødselsdato && !erUkjentIdent)
      delete endretPersonInfo.fødselsdato;
    let endretIdent = e.currentTarget.value;

    settSamboerInfo({
      ...samboerDetaljer,
      [EPersonDetaljer.ident]: {
        label: hentTekst('person.ident', intl),
        verdi: endretIdent,
      },
    });
  };
  const settNavn = (e: React.FormEvent<HTMLInputElement>) => {
    settBosituasjon({
      ...bosituasjon,
      samboerDetaljer: {
        ...samboerDetaljer,
        [EPersonDetaljer.navn]: {
          label: hentTekst('person.navn', intl),
          verdi: e.currentTarget.value,
        },
      },
    });
  };

  const settDatoFlyttetSammen = (dato: Date | null) => {
    dato !== null &&
      settBosituasjon({
        ...bosituasjon,
        datoFlyttetSammenMedSamboer: {
          label: datovelgerTekst,
          verdi: datoTilStreng(dato),
        },
      });
  };

  const datovelgerTekst = intl.formatMessage({
    id: 'bosituasjon.datovelger.nårFlyttetDereSammen',
  });
  return (
    <KomponentGruppe>
      <FeltGruppe>
        <Element>{hentTekst(tittel, intl)}</Element>
      </FeltGruppe>

      <FeltGruppe>
        <Input
          key={'navn'}
          label={hentTekst('person.navn', intl)}
          type="text"
          bredde={'L'}
          onChange={(e) => settNavn(e)}
          value={samboerDetaljer?.navn?.verdi}
        />
      </FeltGruppe>
      {samboerDetaljer?.navn && (
        <IdentEllerFødselsdatoGruppe
          identLabel={hentTekst('person.ident', intl)}
          datoLabel={
            ekteskapsLiknendeForhold
              ? hentTekst('person.fødselsdato', intl)
              : hentTekst('datovelger.fødselsdato', intl)
          }
          checkboxLabel={hentTekst('person.checkbox.ident', intl)}
          ident={samboerInfo.ident?.verdi}
          fødselsdato={samboerInfo.fødselsdato?.verdi}
          checked={erUkjentIdent}
          erGyldigIdent={erGyldigIdent}
          settGyldigIdent={settGyldigIdent}
          settFødselsdato={settFødselsdato}
          settChecked={settChecked}
          settIdent={settIdent}
        />
      )}

      {ekteskapsLiknendeForhold &&
        (samboerInfo?.ident || samboerInfo?.fødselsdato) && (
          <FeltGruppe>
            <Datovelger
              valgtDato={
                bosituasjon.datoFlyttetSammenMedSamboer
                  ? bosituasjon.datoFlyttetSammenMedSamboer.verdi
                  : undefined
              }
              tekstid={'bosituasjon.datovelger.nårFlyttetDereSammen'}
              datobegrensning={DatoBegrensning.TidligereDatoer}
              settDato={(e) => settDatoFlyttetSammen(e)}
            />
          </FeltGruppe>
        )}
    </KomponentGruppe>
  );
};

export default OmSamboerenDin;
