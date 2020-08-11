import React from 'react';
import { Element } from 'nav-frontend-typografi';
import KomponentGruppe from '../gruppe/KomponentGruppe';
import Datovelger, { DatoBegrensning } from '../dato/Datovelger';
import { useIntl } from 'react-intl';
import Hjelpetekst from '../Hjelpetekst';
import { hentSvarFraSpørsmål, hentTekst } from '../../utils/søknad';
import { dagensDato } from '../../utils/dato';
import { ISpørsmål, ISvar } from '../../models/felles/spørsmålogsvar';
import { hentBeskjedMedFireParametre } from '../../utils/språk';
import { RadioPanel } from 'nav-frontend-skjema';
import styled from 'styled-components/macro';
import { formatNårSøkerDuStønadFraMåned } from '../../utils/dato';
import {
  IDatoFelt,
  ISpørsmålBooleanFelt,
} from '../../models/søknad/søknadsfelter';
import LocaleTekst from '../../language/LocaleTekst';
import { ESøkerFraBestemtMåned } from '../../models/steg/dinsituasjon/meromsituasjon';
import AlertStripeDokumentasjon from '../AlertstripeDokumentasjon';

const StyledMultisvarSpørsmål = styled.div`
  .radioknapp {
    &__multiSvar {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: min-content;
      grid-gap: 1rem;
      padding-top: 1rem;
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
  hjelpetekstInnholdTekstid: string;
}
const NårSøkerDuStønadFra: React.FC<Props> = ({
  spørsmål,
  settSøkerFraBestemtMåned,
  settDato,
  søkerFraBestemtMåned,
  valgtDato,
  datovelgerLabel,
  hjelpetekstInnholdTekstid,
}) => {
  const intl = useIntl();

  const hjelpetekst = hentBeskjedMedFireParametre(
    hentTekst(hjelpetekstInnholdTekstid, intl),
    '3',
    formatNårSøkerDuStønadFraMåned(dagensDato, 3),
    '5',
    formatNårSøkerDuStønadFraMåned(dagensDato, 5)
  );

  const alertTekst: string | undefined = hentSvarFraSpørsmål(
    ESøkerFraBestemtMåned.ja,
    spørsmål
  )?.alert_tekstid;
  return (
    <>
      <KomponentGruppe>
        <StyledMultisvarSpørsmål>
          <Element>{intl.formatMessage({ id: spørsmål.tekstid })}</Element>
          <Hjelpetekst
            åpneTekstid={'søkerFraBestemtMåned.hjelpetekst-åpne'}
            innholdTekst={hjelpetekst}
          />
          <div className="radioknapp__multiSvar">
            {spørsmål.svaralternativer.map((svar: ISvar) => {
              const svarISøknad = svar.id === søkerFraBestemtMåned?.svarid;
              return (
                <RadioPanel
                  key={svar.svar_tekstid}
                  name={spørsmål.søknadid}
                  label={intl.formatMessage({
                    id: svar.svar_tekstid,
                  })}
                  value={svar.svar_tekstid}
                  checked={svarISøknad ? svarISøknad : false}
                  onChange={() => settSøkerFraBestemtMåned(spørsmål, svar)}
                />
              );
            })}
          </div>
        </StyledMultisvarSpørsmål>
      </KomponentGruppe>
      {søkerFraBestemtMåned?.verdi === true && (
        <KomponentGruppe>
          <StyledDatovelger>
            <Datovelger
              valgtDato={valgtDato?.verdi}
              tekstid={datovelgerLabel}
              datobegrensning={DatoBegrensning.AlleDatoer}
              settDato={settDato}
              showMonthYearPicker
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
