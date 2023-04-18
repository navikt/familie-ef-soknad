import React, { useEffect } from 'react';
import {
  ESvar,
  ISpørsmål,
  ISvar,
} from '../../../../models/felles/spørsmålogsvar';
import {
  oppholderSegINorge,
  bosattINorgeDeSisteTreÅr,
  søkersOppholdsland,
} from './MedlemskapConfig';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import PeriodeBoddIUtlandet from './PeriodeBoddIUtlandet';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import {
  EMedlemskap,
  IMedlemskap,
} from '../../../../models/steg/omDeg/medlemskap';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';
import LocaleTekst from '../../../../language/LocaleTekst';
import { useLokalIntlContext } from '../../../../context/LokalIntlContext';
import { Alert } from '@navikt/ds-react';
import SelectSpørsmål from '../../../../components/spørsmål/SelectSpørsmål';

interface Props {
  medlemskap: IMedlemskap;
  settMedlemskap: (medlemskap: IMedlemskap) => void;
}
const Medlemskap: React.FC<Props> = ({ medlemskap, settMedlemskap }) => {
  const intl = useLokalIntlContext();
  const {
    søkerOppholderSegINorge,
    oppholdsland: oppholdsland,
    søkerBosattINorgeSisteTreÅr,
  } = medlemskap;

  const oppholderSegINorgeConfig = oppholderSegINorge(intl);
  const oppholdslandConfig = søkersOppholdsland([
    'Norge',
    'Sverige',
    'Danmark',
    'Tyskland',
    'Spania',
    'USA',
  ]);
  const bosattINorgeDeSisteTreÅrConfig = bosattINorgeDeSisteTreÅr(intl);

  const settMedlemskapBooleanFelt = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);
    const endretMedlemskap = medlemskap;

    if (
      spørsmål.søknadid === EMedlemskap.søkerOppholderSegINorge &&
      valgtSvar.id === ESvar.JA &&
      endretMedlemskap.oppholdsland
    ) {
      delete endretMedlemskap.oppholdsland;
    }

    if (
      spørsmål.søknadid === EMedlemskap.søkerBosattINorgeSisteTreÅr &&
      valgtSvar.id === ESvar.JA &&
      endretMedlemskap.perioderBoddIUtlandet
    ) {
      delete endretMedlemskap.perioderBoddIUtlandet;
    }

    settMedlemskap({
      ...endretMedlemskap,
      [spørsmål.søknadid]: {
        label: intl.formatMessage({ id: spørsmål.tekstid }),
        verdi: svar,
      },
    });
  };

  const settOppholdsland = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    console.log('Valgt oppholdsland: ', valgtSvar);

    const svar = valgtSvar.id;
    const endretMedlemskap = medlemskap;

    settMedlemskap({
      ...endretMedlemskap,
      [spørsmål.søknadid]: {
        label: intl.formatMessage({ id: spørsmål.tekstid }),
        verdi: svar,
      },
    });
  };

  const hentValgtSvar = (spørsmål: ISpørsmål, medlemskap: IMedlemskap) => {
    for (const [key, value] of Object.entries(medlemskap)) {
      if (key === spørsmål.søknadid && value !== undefined) {
        return value.verdi;
      }
    }
  };

  const valgtSvarOppholderSegINorge = hentValgtSvar(
    oppholderSegINorgeConfig,
    medlemskap
  );

  const valgtSvarOppholdsland = hentValgtSvar(oppholdslandConfig, medlemskap);

  useEffect(() => {
    console.log('Oppholdsland: ', oppholdsland);
  }, [oppholdsland]);

  useEffect(() => {
    console.log('Medlemskap: ', medlemskap);
  }, [medlemskap]);

  return (
    <SeksjonGruppe aria-live="polite">
      <KomponentGruppe key={oppholderSegINorgeConfig.søknadid}>
        <JaNeiSpørsmål
          spørsmål={oppholderSegINorgeConfig}
          valgtSvar={valgtSvarOppholderSegINorge}
          onChange={settMedlemskapBooleanFelt}
        />
      </KomponentGruppe>

      {søkerOppholderSegINorge?.verdi === false && (
        <KomponentGruppe>
          <SelectSpørsmål
            spørsmål={oppholdslandConfig}
            valgtSvar={valgtSvarOppholdsland}
            settSpørsmålOgSvar={settOppholdsland}
          />
        </KomponentGruppe>
      )}

      {(søkerOppholderSegINorge?.verdi === true ||
        oppholdsland?.hasOwnProperty('verdi')) && (
        <KomponentGruppe key={bosattINorgeDeSisteTreÅrConfig.søknadid}>
          <JaNeiSpørsmål
            spørsmål={bosattINorgeDeSisteTreÅrConfig}
            valgtSvar={hentValgtSvar(
              bosattINorgeDeSisteTreÅrConfig,
              medlemskap
            )}
            onChange={settMedlemskapBooleanFelt}
          />
        </KomponentGruppe>
      )}

      {søkerBosattINorgeSisteTreÅr?.verdi === false && (
        <PeriodeBoddIUtlandet
          medlemskap={medlemskap}
          settMedlemskap={settMedlemskap}
        />
      )}
    </SeksjonGruppe>
  );
};

export default Medlemskap;
