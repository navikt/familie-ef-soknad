import React, { useEffect, useState } from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { Checkbox, Input, Textarea } from 'nav-frontend-skjema';

import { EHvorforIkkeOppgi } from '../../../models/steg/barnasbosted';
import { hentTekst } from '../../../utils/søknad';
import { hvorforIkkeOppgi } from './ForeldreConfig';
import { IForelder } from '../../../models/steg/forelder';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { hentUid } from '../../../utils/autentiseringogvalidering/uuid';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import IdentEllerFødselsdatoGruppe from '../../../components/gruppe/IdentEllerFødselsdatoGruppe';
import { Feilmelding } from 'nav-frontend-typografi';
import { useToggles } from '../../../context/TogglesContext';
import { ToggleName } from '../../../models/søknad/toggles';

interface Props {
  settForelder: (verdi: IForelder) => void;
  forelder: IForelder;
  kjennerIkkeIdent: boolean;
  settKjennerIkkeIdent: (kjennerIkkeIdent: boolean) => void;
  settSisteBarnUtfylt: (sisteBarnUtfylt: boolean) => void;
}

const OmAndreForelder: React.FC<Props> = ({
  settForelder,
  forelder,
  kjennerIkkeIdent,
  settKjennerIkkeIdent,
  settSisteBarnUtfylt,
}) => {
  const intl = useLokalIntlContext();
  const { fødselsdato, ident } = forelder;
  const [begyntÅSkrive, settBegyntÅSkrive] = useState<boolean>(false);
  const [feilmeldingNavn, settFeilmeldingNavn] = useState<boolean>(false);
  const hvorforIkkeOppgiLabel = hentTekst(hvorforIkkeOppgi(intl).tekstid, intl);
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
  const { toggles } = useToggles();

  useEffect(() => {
    erGyldigIdent &&
      settForelder({
        ...forelder,
        ident: { label: hentTekst('person.ident', intl), verdi: identFelt },
      });

    if (!erGyldigIdent) {
      const nyForelder = { ...forelder };

      delete nyForelder.ident;

      settForelder(nyForelder);
    }

    // eslint-disable-next-line
  }, [erGyldigIdent, identFelt]);

  const hvisGyldigIdentSettIdent = (erGyldig: boolean) => {
    settGyldigIdent(erGyldig);
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

    settForelder(endretForelder);
    settKjennerIkkeIdent(checked);
  };

  const settDato = (dato: string) => {
    dato !== null &&
      settForelder({
        ...forelder,
        fødselsdato: {
          label: hentTekst('datovelger.fødselsdato', intl),
          verdi: dato,
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
      settFeilmeldingNavn(false);
    }

    if (!e.target.checked) {
      settBegyntÅSkrive(false);
      delete nyForelder.ikkeOppgittAnnenForelderBegrunnelse;
      delete nyForelder.hvorforIkkeOppgi;
      delete nyForelder.kanIkkeOppgiAnnenForelderFar;
      nyForelder.id = hentUid();
      settFeilmeldingNavn(true);
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
        verdi: svar.svar_tekst,
      },
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar.svar_tekst,
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
            onChange={(e) => {
              settForelder({
                ...forelder,
                navn: {
                  label: hentTekst('person.navn', intl),
                  verdi: e.target.value,
                },
              });
              e.target.value === '' && settSisteBarnUtfylt(false);
            }}
            onBlur={(e) =>
              e.target.value === ''
                ? settFeilmeldingNavn(true)
                : settFeilmeldingNavn(false)
            }
            value={forelder.navn ? forelder.navn?.verdi : ''}
            label={hentTekst('person.navn', intl)}
            disabled={forelder.kanIkkeOppgiAnnenForelderFar?.verdi}
          />
          {feilmeldingNavn && (
            <Feilmelding className={'skjemaelement__feilmelding'}>
              {intl.formatMessage({ id: 'person.feilmelding.navn' })}
            </Feilmelding>
          )}
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
            datoLabel={hentTekst('person.fødselsdato', intl)}
            checkboxLabel={hentTekst('person.checkbox.ident', intl)}
            ident={identFelt && !kjennerIkkeIdent ? identFelt : ''}
            fødselsdato={forelder?.fødselsdato?.verdi || ''}
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
            spørsmål={hvorforIkkeOppgi(intl)}
            settSpørsmålOgSvar={settHvorforIkkeOppgi}
            valgtSvar={forelder.hvorforIkkeOppgi?.verdi}
          />
        </KomponentGruppe>
      )}
      {forelder.hvorforIkkeOppgi?.svarid === EHvorforIkkeOppgi.annet && (
        <>
          <FeltGruppe aria-live="polite">
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
