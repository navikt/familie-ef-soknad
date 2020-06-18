import React from 'react';
import { Element } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { useIntl } from 'react-intl';
import Hjelpetekst from '../../../components/Hjelpetekst';
import { hentTekst } from '../../../utils/søknad';
import { SøkerFraBestemtMånedSpm } from './SituasjonConfig';
import {
  ESøkerFraBestemtMåned,
  IDinSituasjon,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import LocaleTekst from '../../../language/LocaleTekst';
import { dagensDato } from '../../../utils/dato';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { hentBeskjedMedFireParametre } from '../../../utils/språk';
import { RadioPanel } from 'nav-frontend-skjema';
import styled from 'styled-components/macro';
import {
  datoTilStreng,
  formatNårSøkerDuStønadFraMåned,
} from '../../../utils/dato';

interface Props {
  dinSituasjon: IDinSituasjon;
  settDinSituasjon: (dinSituasjon: IDinSituasjon) => void;
}

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

const NårSøkerDuOvergangsstønadFra: React.FC<Props> = ({
  dinSituasjon,
  settDinSituasjon,
}) => {
  const intl = useIntl();

  const settSøknadsdato = (dato: Date | null) => {
    dato !== null &&
      settDinSituasjon({
        ...dinSituasjon,
        søknadsdato: {
          label: hentTekst('dinSituasjon.datovelger.overgangsstønad', intl),
          verdi: datoTilStreng(dato),
        },
      });
  };

  const settSøkerFraBestemtMåned = (spørsmål: ISpørsmål, svar: ISvar) => {
    settDinSituasjon({
      ...dinSituasjon,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
      søknadsdato:
        svar.id === ESøkerFraBestemtMåned.neiNavKanVurdere
          ? undefined
          : dinSituasjon.søknadsdato,
    });
  };

  const valgtSvar = dinSituasjon.søkerFraBestemtMåned?.verdi;

  const hjelpetekst = hentBeskjedMedFireParametre(
    hentTekst('dinSituasjon.lesmer-innhold.overgangsstønad', intl),
    '3',
    formatNårSøkerDuStønadFraMåned(dagensDato, 3),
    '2',
    formatNårSøkerDuStønadFraMåned(dagensDato, 2)
  );

  return (
    <>
      <KomponentGruppe>
        <StyledMultisvarSpørsmål>
          <Element>
            {intl.formatMessage({ id: SøkerFraBestemtMånedSpm.tekstid })}
          </Element>
          <Hjelpetekst
            åpneTekstid={'dinSituasjon.lesmer-åpne.overgangsstønad'}
            innholdTekst={hjelpetekst}
          />
          <div className="radioknapp__multiSvar">
            {SøkerFraBestemtMånedSpm.svaralternativer.map((svar: ISvar) => {
              const svarISøknad =
                intl.formatMessage({ id: svar.svar_tekstid }) === valgtSvar;
              return (
                <RadioPanel
                  key={svar.svar_tekstid}
                  name={SøkerFraBestemtMånedSpm.søknadid}
                  label={intl.formatMessage({
                    id: svar.svar_tekstid,
                  })}
                  value={svar.svar_tekstid}
                  checked={svarISøknad ? svarISøknad : false}
                  onChange={() =>
                    settSøkerFraBestemtMåned(SøkerFraBestemtMånedSpm, svar)
                  }
                />
              );
            })}
          </div>
        </StyledMultisvarSpørsmål>
      </KomponentGruppe>
      {dinSituasjon.søkerFraBestemtMåned?.verdi ===
        hentTekst('svar.ja', intl) && (
        <KomponentGruppe>
          <Element>
            <LocaleTekst tekst={'dinSituasjon.dato-tittel.overgangsstønad'} />
          </Element>
          <StyledDatovelger>
            <Datovelger
              valgtDato={dinSituasjon.søknadsdato?.verdi}
              tekstid={'dinSituasjon.datovelger.overgangsstønad'}
              datobegrensning={DatoBegrensning.AlleDatoer}
              settDato={settSøknadsdato}
              showMonthYearPicker
            />
          </StyledDatovelger>
        </KomponentGruppe>
      )}
    </>
  );
};
export default NårSøkerDuOvergangsstønadFra;
