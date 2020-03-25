import React from 'react';
import { ISpørsmål } from '../../../../models/spørsmalogsvar';
import {
  oppholderSegINorge,
  bosattINorgeDeSisteTreÅr,
} from './MedlemskapConfig';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import useSøknadContext from '../../../../context/SøknadContext';
import PeriodeBoddIUtlandet from './PeriodeBoddIUtlandet';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { useIntl } from 'react-intl';
import { IMedlemskap } from '../../../../models/steg/omDeg/medlemskap';

const Medlemskap: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknadContext();
  const {
    søkerOppholderSegINorge,
    søkerBosattINorgeSisteTreÅr,
  } = søknad.medlemskap;

  const settMedlemskapBooleanFelt = (spørsmål: ISpørsmål, svar: boolean) => {
    settSøknad({
      ...søknad,
      medlemskap: {
        ...søknad.medlemskap,
        [spørsmål.søknadid]: {
          label: intl.formatMessage({ id: spørsmål.tekstid }),
          verdi: svar,
        },
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

  return (
    <SeksjonGruppe>
      <KomponentGruppe key={oppholderSegINorge.søknadid}>
        <JaNeiSpørsmål
          spørsmål={oppholderSegINorge}
          valgtSvar={hentValgtSvar(oppholderSegINorge, søknad.medlemskap)}
          onChange={settMedlemskapBooleanFelt}
        />
      </KomponentGruppe>

      {søkerOppholderSegINorge?.hasOwnProperty('verdi') ? (
        <KomponentGruppe key={bosattINorgeDeSisteTreÅr.søknadid}>
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
