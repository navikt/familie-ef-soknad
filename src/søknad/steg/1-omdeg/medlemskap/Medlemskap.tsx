import React from 'react';
import { IJaNeiSpørsmål } from '../../../../models/spørsmal';
import {
  registrertSomFlykting,
  oppholderSegINorge,
  bosattINorgeDeSisteTreÅr,
} from './MedlemskapConfig';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import { usePersonContext } from '../../../../context/PersonContext';
import useSøknadContext from '../../../../context/SøknadContext';
import PeriodeBoddIUtlandet from './PeriodeBoddIUtlandet';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { IMedlemskap } from '../../../../models/omDeg';
import { useIntl } from 'react-intl';

const Medlemskap: React.FC = () => {
  const intl = useIntl();
  const { person } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();
  const { statsborgerskap } = person.søker;
  const {
    søkerOppholderSegINorge,
    søkerBosattINorgeSisteTreÅr,
    søkerErFlyktning,
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

      {typeof søkerOppholderSegINorge?.verdi === 'boolean' ? (
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

      {statsborgerskap !== 'NOR' &&
      søkerBosattINorgeSisteTreÅr?.verdi === false &&
      typeof søkerBosattINorgeSisteTreÅr.verdi === 'boolean' ? (
        <KomponentGruppe key={registrertSomFlykting.spørsmål_id}>
          <JaNeiSpørsmål
            spørsmål={registrertSomFlykting}
            valgtSvar={søkerErFlyktning ? søkerErFlyktning.verdi : undefined}
            onChange={settMedlemskapBooleanFelt}
          />
        </KomponentGruppe>
      ) : null}
    </SeksjonGruppe>
  );
};

export default Medlemskap;
