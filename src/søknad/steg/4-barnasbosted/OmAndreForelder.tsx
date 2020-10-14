import React, { useState, useEffect } from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { Input } from 'nav-frontend-skjema';
import { Checkbox } from 'nav-frontend-skjema';

import { EHvorforIkkeOppgi } from '../../../models/steg/barnasbosted';
import { hentTekst } from '../../../utils/søknad';
import { hvorforIkkeOppgi } from './ForeldreConfig';
import { IForelder } from '../../../models/steg/forelder';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { Textarea } from 'nav-frontend-skjema';
import { hentUid } from '../../../utils/autentiseringogvalidering/uuid';
import { useIntl } from 'react-intl';
import { datoTilStreng, strengTilDato } from '../../../utils/dato';
import IdentEllerFødselsdatoGruppe from '../../../components/gruppe/IdentEllerFødselsdatoGruppe';

interface Props {
  settForelder: (verdi: IForelder) => void;
  forelder: IForelder;
  kjennerIkkeIdent: boolean;
  settKjennerIkkeIdent: (kjennerIkkeIdent: boolean) => void;
}

const OmAndreForelder: React.FC<Props> = ({
  settForelder,
  forelder,
  kjennerIkkeIdent,
  settKjennerIkkeIdent,
}) => {
  const intl = useIntl();
  const { fødselsdato, ident } = forelder;
  const [begyntÅSkrive, settBegyntÅSkrive] = useState<boolean>(false);
  const hvorforIkkeOppgiLabel = hentTekst(hvorforIkkeOppgi.tekstid, intl);
  const jegKanIkkeOppgiLabel = hentTekst(
    'barnasbosted.kanikkeoppgiforelder',
    intl
  );
  const [erGyldigIdent, settGyldigIdent] = useState<boolean>(
    !!forelder?.ident?.verdi
  );
  const [identFelt, settIdentFelt] = useState<string>(
    ident?.verdi ? ident.verdi : ''
  );

  useEffect(() => {
    erGyldigIdent &&
      settForelder({
        ...forelder,
        ident: { label: hentTekst('person.ident', intl), verdi: identFelt },
      });
    // eslint-disable-next-line
  }, [erGyldigIdent, identFelt]);

  const hvisGyldigIdentSettIdent = (erGyldig: boolean) => {
    settGyldigIdent(erGyldig);
    erGyldig &&
      settForelder({
        ...forelder,
        ident: { label: hentTekst('person.ident', intl), verdi: identFelt },
      });
  };

  const oppdaterIdent = (e: React.FormEvent<HTMLInputElement>) => {
    settIdentFelt(e.currentTarget.value);
  };

  const settChecked = (checked: boolean) => {
    const endretForelder = forelder;
    if (checked) {
      delete endretForelder.ident;
      settIdentFelt('');
    }
    if (!checked && fødselsdato) {
      delete endretForelder.fødselsdato;
    }

    settKjennerIkkeIdent(checked);
  };

  const settDato = (dato: Date | null) => {
    dato !== null &&
      settForelder({
        ...forelder,
        fødselsdato: {
          label: hentTekst('datovelger.fødselsdato', intl),
          verdi: datoTilStreng(dato),
        },
      });
  };

  const hukAvKanIkkeOppgiAnnenForelder = (e: any) => {
    const nyForelder = { ...forelder };

    if (e.target.checked) {
      delete nyForelder.navn;
      delete nyForelder.fødselsdato;
      delete nyForelder.ident;
      delete nyForelder.id;
    }

    if (!e.target.checked) {
      settBegyntÅSkrive(false);
      delete nyForelder.ikkeOppgittAnnenForelderBegrunnelse;
      delete nyForelder.hvorforIkkeOppgi;
      delete nyForelder.kanIkkeOppgiAnnenForelderFar;
      nyForelder.id = hentUid();
    }

    settForelder({
      ...nyForelder,
      kanIkkeOppgiAnnenForelderFar: {
        label: jegKanIkkeOppgiLabel,
        verdi: !forelder.kanIkkeOppgiAnnenForelderFar?.verdi,
      },
    });
  };

  const settHvorforIkkeOppgi = (spørsmål: ISpørsmål, svar: ISvar) => {
    settBegyntÅSkrive(false);

    const nyForelder = {
      ...forelder,
      ikkeOppgittAnnenForelderBegrunnelse: {
        label: hentTekst('barnasbosted.spm.hvorforikkeoppgi', intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    };

    if (svar.id === EHvorforIkkeOppgi.donorbarn) {
      delete forelder.ikkeOppgittAnnenForelderBegrunnelse;
    }

    settForelder(nyForelder);
  };

  const settIkkeOppgittAnnenForelderBegrunnelse = (e: any) => {
    settBegyntÅSkrive(true);

    settForelder({
      ...forelder,
      ikkeOppgittAnnenForelderBegrunnelse: {
        label: hentTekst('barnasbosted.spm.hvorforikkeoppgi', intl),
        verdi: e.target.value,
      },
    });
  };

  return (
    <>
      <KomponentGruppe>
        <FeltGruppe>
          <Input
            className="foreldre-navn-input"
            onChange={(e) =>
              settForelder({
                ...forelder,
                navn: {
                  label: hentTekst('person.navn', intl),
                  verdi: e.target.value,
                },
              })
            }
            value={forelder.navn ? forelder.navn?.verdi : ''}
            label="Navn"
            disabled={forelder.kanIkkeOppgiAnnenForelderFar?.verdi}
          />
        </FeltGruppe>
        <FeltGruppe>
          <Checkbox
            className={'checkbox'}
            label={hentTekst('barnasbosted.kanikkeoppgiforelder', intl)}
            checked={
              forelder.kanIkkeOppgiAnnenForelderFar?.verdi
                ? forelder.kanIkkeOppgiAnnenForelderFar?.verdi
                : false
            }
            onChange={hukAvKanIkkeOppgiAnnenForelder}
          />
        </FeltGruppe>
      </KomponentGruppe>
      {forelder.navn && !forelder.kanIkkeOppgiAnnenForelderFar?.verdi && (
        <>
          <IdentEllerFødselsdatoGruppe
            identLabel={hentTekst('person.ident', intl)}
            datoLabel={hentTekst('datovelger.fødselsdato', intl)}
            checkboxLabel={hentTekst('person.checkbox.ident', intl)}
            ident={identFelt && !kjennerIkkeIdent ? identFelt : ''}
            fødselsdato={
              forelder?.fødselsdato?.verdi
                ? strengTilDato(forelder?.fødselsdato?.verdi)
                : undefined
            }
            checked={kjennerIkkeIdent}
            erGyldigIdent={erGyldigIdent}
            settGyldigIdent={hvisGyldigIdentSettIdent}
            settFødselsdato={settDato}
            settChecked={settChecked}
            settIdent={oppdaterIdent}
          />
        </>
      )}
      {forelder.kanIkkeOppgiAnnenForelderFar?.verdi && (
        <KomponentGruppe>
          <MultiSvarSpørsmål
            spørsmål={hvorforIkkeOppgi}
            settSpørsmålOgSvar={settHvorforIkkeOppgi}
            valgtSvar={forelder.hvorforIkkeOppgi?.verdi}
          />
        </KomponentGruppe>
      )}
      {forelder.hvorforIkkeOppgi?.svarid === EHvorforIkkeOppgi.annet && (
        <>
          <FeltGruppe>
            <Textarea
              value={
                forelder.ikkeOppgittAnnenForelderBegrunnelse?.verdi &&
                begyntÅSkrive
                  ? forelder.ikkeOppgittAnnenForelderBegrunnelse.verdi
                  : ''
              }
              onChange={settIkkeOppgittAnnenForelderBegrunnelse}
              label={hvorforIkkeOppgiLabel}
            />
          </FeltGruppe>
        </>
      )}
    </>
  );
};

export default OmAndreForelder;
