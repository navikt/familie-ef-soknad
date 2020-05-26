import React, { useState } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { Input } from 'nav-frontend-skjema';
import { Checkbox } from 'nav-frontend-skjema';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { hvorforIkkeOppgi } from './ForeldreConfig';
import { EHvorforIkkeOppgi } from '../../../models/steg/barnasbosted';
import { IBarn } from '../../../models/barn';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { IForelder } from '../../../models/forelder';
import { hentTekst } from '../../../utils/søknad';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { Textarea } from 'nav-frontend-skjema';
import { useIntl } from 'react-intl';

interface Props {
  barn: IBarn;
  settForelder: Function;
  forelder: IForelder;
}
const OmAndreForelder: React.FC<Props> = ({ settForelder, forelder }) => {
  const intl = useIntl();
  const [begyntÅSkrive, settBegyntÅSkrive] = useState<boolean>(false);

  const hukAvKanIkkeOppgiAnnenForelder = (e: any) => {
    const nyForelder = { ...forelder };

    if (e.target.checked) {
      delete nyForelder.navn;
      delete nyForelder.fødselsdato;
      delete nyForelder.personnr;
    }

    if (!e.target.checked) {
      settBegyntÅSkrive(false);
      delete nyForelder.ikkeOppgittAnnenForelderBegrunnelse;
      delete nyForelder.hvorforIkkeOppgi;
      delete nyForelder.kanIkkeOppgiAnnenForelderFar;
    }

    settForelder({
      ...nyForelder,
      kanIkkeOppgiAnnenForelderFar: {
        label: hentTekst('barnasbosted.spm.hvorforikkeoppgi', intl),
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
                  label: 'halla',
                  verdi: e.target.value,
                },
              })
            }
            value={forelder.navn ? forelder.navn?.verdi : ''}
            label="Navn"
            disabled={forelder.kanIkkeOppgiAnnenForelderFar?.verdi}
          />
        </FeltGruppe>
      </KomponentGruppe>
      <KomponentGruppe>
        <div className="fødselsnummer">
          <Datovelger
            settDato={(e: Date | null) => {
              e !== null &&
                settForelder({
                  ...forelder,
                  flyttetFra: {
                    label: 'Fødselsnummer datotest',
                    verdi: e,
                  },
                });
            }}
            valgtDato={
              forelder.fødselsdato && forelder.fødselsdato.verdi
                ? forelder.fødselsdato.verdi
                : undefined
            }
            tekstid={'datovelger.fødselsdato'}
            datobegrensning={DatoBegrensning.TidligereDatoer}
          />
          <Input
            className="personnummer"
            onChange={(e) =>
              settForelder({
                ...forelder,
                personnr: {
                  label: 'Personnr',
                  verdi: e.target.value,
                },
              })
            }
            value={forelder.personnr ? forelder.personnr?.verdi : ''}
            label="Personnummer (hvis barnet har fått)"
            disabled={forelder.kanIkkeOppgiAnnenForelderFar?.verdi}
          />
        </div>
        <FeltGruppe classname="checkbox-forelder">
          <Checkbox
            label={hentTekst('barnasbosted.kanikkeoppgiforelder', intl)}
            checked={
              forelder.kanIkkeOppgiAnnenForelderFar?.verdi
                ? forelder.kanIkkeOppgiAnnenForelderFar?.verdi
                : false
            }
            onChange={hukAvKanIkkeOppgiAnnenForelder}
          />
        </FeltGruppe>
        {forelder.kanIkkeOppgiAnnenForelderFar?.verdi ? (
          <KomponentGruppe>
            <MultiSvarSpørsmål
              spørsmål={hvorforIkkeOppgi}
              settSpørsmålOgSvar={settHvorforIkkeOppgi}
              valgtSvar={forelder.hvorforIkkeOppgi?.verdi}
            />
          </KomponentGruppe>
        ) : null}
        {forelder.hvorforIkkeOppgi?.verdi ===
        hentTekst('barnasbosted.spm.annet', intl) ? (
          <>
            <FeltGruppe>
              <Textarea
                value={
                  forelder.ikkeOppgittAnnenForelderBegrunnelse &&
                  forelder.ikkeOppgittAnnenForelderBegrunnelse.verdi &&
                  begyntÅSkrive
                    ? forelder.ikkeOppgittAnnenForelderBegrunnelse.verdi
                    : ''
                }
                onChange={settIkkeOppgittAnnenForelderBegrunnelse}
                label={intl.formatMessage({
                  id: 'barnasbosted.spm.hvorforikkeoppgi',
                })}
              />
            </FeltGruppe>
          </>
        ) : null}
      </KomponentGruppe>
    </>
  );
};

export default OmAndreForelder;
