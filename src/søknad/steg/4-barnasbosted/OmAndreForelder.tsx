import React from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';

import { Input } from 'nav-frontend-skjema';
import { Checkbox } from 'nav-frontend-skjema';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { hvorforIkkeOppgi } from './ForeldreConfig';
import { IBarn } from '../../../models/barn';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { IForelder } from '../../../models/forelder';
import { hentTekst } from '../../../utils/søknad';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { Textarea } from 'nav-frontend-skjema';
import { useIntl } from 'react-intl';
import styled from 'styled-components/macro';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { EHvorforIkkeOppgi } from '../../../models/steg/barnasbosted';

interface Props {
  barn: IBarn;
  settForelder: Function;
  forelder: IForelder;
}

const StyledAndreForelderGruppe = styled.div`
  display: grid;
  min-width: 500px;
  grid-template-columns: repeat(2, min-content);
  grid-template-rows: repeat(3, min-content);
  grid-gap: 1rem;
  grid-template-areas: 'navn navn' 'fødselsdato personnr' 'checkbox checkbox';

  .foreldre-navn-input {
    grid-area: navn;
  }

  .datovelger {
    grid-area: fødselsdato;
  }
  .personnummer {
    grid-area: personnr;
    min-width: 300px;
    .skjemaelement__label {
      margin-bottom: 1rem;
    }
  }
  .checkbox {
    grid-area: checkbox;
  }
`;
const OmAndreForelder: React.FC<Props> = ({ settForelder, forelder }) => {
  const intl = useIntl();

  const hukAvKanIkkeOppgiAnnenForelder = (e: any) => {
    const nyForelder = { ...forelder };

    if (e.target.checked) {
      delete nyForelder.navn;
      delete nyForelder.fødselsdato;
      delete nyForelder.personnr;
    }

    if (!e.target.checked) {
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
    const nyForelder = {
      ...forelder,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    };

    if (svar.id === EHvorforIkkeOppgi.donorbarn) {
      delete nyForelder.ikkeOppgittAnnenForelderBegrunnelse;
    }

    settForelder(nyForelder);
  };

  return (
    <>
      <KomponentGruppe>
        <StyledAndreForelderGruppe>
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

          {forelder.navn && (
            <>
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
            </>
          )}

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
        </StyledAndreForelderGruppe>
      </KomponentGruppe>

      {forelder.kanIkkeOppgiAnnenForelderFar?.verdi && (
        <KomponentGruppe>
          <MultiSvarSpørsmål
            spørsmål={hvorforIkkeOppgi}
            settSpørsmålOgSvar={settHvorforIkkeOppgi}
            valgtSvar={forelder.hvorforIkkeOppgi?.verdi}
          />
        </KomponentGruppe>
      )}
      {forelder.hvorforIkkeOppgi?.verdi ===
        hentTekst('barnasbosted.spm.annet', intl) && (
        <>
          <FeltGruppe>
            <Textarea
              value={
                forelder.ikkeOppgittAnnenForelderBegrunnelse &&
                forelder.ikkeOppgittAnnenForelderBegrunnelse.verdi
                  ? forelder.ikkeOppgittAnnenForelderBegrunnelse.verdi
                  : ''
              }
              onChange={(e: any) =>
                settForelder({
                  ...forelder,
                  ikkeOppgittAnnenForelderBegrunnelse: {
                    label: hentTekst('barnasbosted.spm.hvorforikkeoppgi', intl),
                    verdi: e.target.value,
                  },
                })
              }
              label={intl.formatMessage({
                id: 'barnasbosted.spm.hvorforikkeoppgi',
              })}
            />
          </FeltGruppe>
        </>
      )}
    </>
  );
};

export default OmAndreForelder;
