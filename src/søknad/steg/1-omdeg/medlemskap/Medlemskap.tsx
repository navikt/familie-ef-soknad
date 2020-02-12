import React from 'react';
import { IJaNeiSpørsmål } from '../../../../models/spørsmal';
import {
  oppholderSegINorge,
  bosattINorgeDeSisteTreÅr,
} from './MedlemskapConfig';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import useSøknadContext from '../../../../context/SøknadContext';
import PeriodeBoddIUtlandet from './PeriodeBoddIUtlandet';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { IMedlemskap } from '../../../../models/omDeg';
import { useIntl } from 'react-intl';

const Medlemskap: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknadContext();
  const {
    søkerOppholderSegINorge,
    søkerBosattINorgeSisteTreÅr,
  } = søknad.medlemskap;

  const settMedlemskapBooleanFelt = (
    spørsmål: IJaNeiSpørsmål,
    svar: boolean
  ) => {
    settSøknad({
      ...søknad,
      medlemskap: {
        ...søknad.medlemskap,
        [spørsmål.spørsmål_id]: {
          label: intl.formatMessage({ id: spørsmål.tekstid }),
          verdi: svar,
        },
      },
    });
  };

  const hentValgtSvar = (spørsmål: IJaNeiSpørsmål, medlemskap: IMedlemskap) => {
    for (const [key, value] of Object.entries(medlemskap)) {
      if (key === spørsmål.spørsmål_id && value !== undefined) {
        return value.verdi;
      }
    }
  };

  return (
    <SeksjonGruppe>
      <KomponentGruppe key={oppholderSegINorge.spørsmål_id}>
        <JaNeiSpørsmål
          spørsmål={oppholderSegINorge}
          valgtSvar={hentValgtSvar(oppholderSegINorge, søknad.medlemskap)}
          onChange={settMedlemskapBooleanFelt}
        />
      </KomponentGruppe>

      {søkerOppholderSegINorge?.hasOwnProperty('verdi') ? (
        <KomponentGruppe key={bosattINorgeDeSisteTreÅr.spørsmål_id}>
          <JaNeiSpørsmål
            spørsmål={bosattINorgeDeSisteTreÅr}
            valgtSvar={hentValgtSvar(
              bosattINorgeDeSisteTreÅr,
              søknad.medlemskap
            )}
            onChange={settMedlemskapBooleanFelt}
          />
        </KomponentGruppe>
      ) : null}

      {søkerBosattINorgeSisteTreÅr?.verdi === false ? (
        <PeriodeBoddIUtlandet />
      ) : null}
    </SeksjonGruppe>
  );
};

export default Medlemskap;
