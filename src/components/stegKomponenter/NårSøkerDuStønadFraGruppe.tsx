import React from 'react';
import KomponentGruppe from '../gruppe/KomponentGruppe';
import LesMerTekst from '../LesMerTekst';
import { ISpørsmål, ISvar } from '../../models/felles/spørsmålogsvar';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import styled from 'styled-components';
import {
  IDatoFelt,
  ISpørsmålBooleanFelt,
} from '../../models/søknad/søknadsfelter';
import LocaleTekst from '../../language/LocaleTekst';
import AlertStripeDokumentasjon from '../AlertstripeDokumentasjon';
import ÅrMånedVelger from '../dato/ÅrMånedvelger';
import { strengTilDato } from '../../utils/dato';
import { useLokalIntlContext } from '../../context/LokalIntlContext';
import { Label } from '@navikt/ds-react';
import { DatoBegrensning } from '../dato/Datovelger';

const StyledMultisvarSpørsmål = styled.div`
  .radioknapp {
    &__multiSvar {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: min-content;
      grid-gap: 1rem;
      padding-top: 1rem;

      .inputPanel__label {
        font-size: 18px;
      }
    }
  }

  .toKorteSvar {
    grid-template-columns: 1fr 1fr;

    @media all and (max-width: 420px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledDatovelger = styled.div`
  padding-top: 0.5rem;
`;

interface Props {
  spørsmål: ISpørsmål;
  settSøkerFraBestemtMåned: (spørsmål: ISpørsmål, svar: ISvar) => void;
  søkerFraBestemtMåned: ISpørsmålBooleanFelt | undefined;
  settDato: (dato: Date | null) => void;
  valgtDato: IDatoFelt | undefined;
  datovelgerLabel: string;
  hjelpetekstInnholdTekst: string | React.ReactNode;
  alertTekst?: string;
}

const NårSøkerDuStønadFra: React.FC<Props> = ({
  spørsmål,
  settSøkerFraBestemtMåned,
  settDato,
  søkerFraBestemtMåned,
  valgtDato,
  datovelgerLabel,
  hjelpetekstInnholdTekst,
  alertTekst,
}) => {
  const intl = useLokalIntlContext();

  return (
    <>
      <KomponentGruppe>
        <StyledMultisvarSpørsmål>
          <SkjemaGruppe legend={intl.formatMessage({ id: spørsmål.tekstid })}>
            <LesMerTekst
              åpneTekstid={'søkerFraBestemtMåned.hjelpetekst-åpne'}
              innholdTekst={hjelpetekstInnholdTekst}
            />
            <div className="radioknapp__multiSvar">
              {spørsmål.svaralternativer.map((svar: ISvar) => {
                const svarISøknad = svar.id === søkerFraBestemtMåned?.svarid;
                return (
                  <RadioPanel
                    key={svar.svar_tekst}
                    name={spørsmål.søknadid}
                    label={svar.svar_tekst}
                    value={svar.svar_tekst}
                    checked={svarISøknad ? svarISøknad : false}
                    onChange={() => settSøkerFraBestemtMåned(spørsmål, svar)}
                  />
                );
              })}
            </div>
          </SkjemaGruppe>
        </StyledMultisvarSpørsmål>
      </KomponentGruppe>

      {søkerFraBestemtMåned?.verdi === true && (
        <KomponentGruppe>
          <Label as="p">
            <LocaleTekst tekst={'søkerFraBestemtMåned.datovelger'} />
          </Label>
          <StyledDatovelger>
            <ÅrMånedVelger
              valgtDato={
                valgtDato?.verdi ? strengTilDato(valgtDato?.verdi) : undefined
              }
              tekstid={datovelgerLabel}
              datobegrensning={DatoBegrensning.TidligereDatoerOgSeksMånederFrem}
              settDato={settDato}
              fetSkrift={false}
            />
          </StyledDatovelger>
          {alertTekst && (
            <AlertStripeDokumentasjon>
              <LocaleTekst tekst={alertTekst} />
            </AlertStripeDokumentasjon>
          )}
        </KomponentGruppe>
      )}
    </>
  );
};
export default NårSøkerDuStønadFra;
