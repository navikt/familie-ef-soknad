import React from 'react';
import {
  IJaNeiSpørsmål,
  IJaNeiSpørsmål as ISpørsmål,
} from '../../../../models/spørsmal';
import { SpørsmålOgSvar, registrertSomFlykting } from './MedlemskapConfig';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import { usePersonContext } from '../../../../context/PersonContext';
import useSøknadContext from '../../../../context/SøknadContext';
import PeriodeBoddIUtlandet from './PeriodeBoddIUtlandet';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { IMedlemskap } from '../../../../models/omDeg';
import { injectIntl, IntlShape } from 'react-intl';

const Medlemskap: React.FC<{ intl: IntlShape }> = ({ intl }) => {
  const { person } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();
  const { statsborgerskap } = person.søker;
  const { søkerBosattINorgeSisteTreÅr, søkerErFlyktning } = søknad.medlemskap;
  const medlemskapSpørsmålSvar: ISpørsmål[] = SpørsmålOgSvar;

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
      {medlemskapSpørsmålSvar.map((spørsmål: ISpørsmål) => {
        console.log('medlemskap', spørsmål.spørsmål_id);
        return (
          <KomponentGruppe key={spørsmål.spørsmål_id}>
            <JaNeiSpørsmål
              spørsmål={spørsmål}
              valgtSvar={hentValgtSvar(spørsmål, søknad.medlemskap)}
              onChange={settMedlemskapBooleanFelt}
            />
          </KomponentGruppe>
        );
      })}

      {søkerBosattINorgeSisteTreÅr?.verdi === false ? (
        <PeriodeBoddIUtlandet />
      ) : null}

      {statsborgerskap !== 'NOR' &&
      søkerBosattINorgeSisteTreÅr?.verdi === false ? (
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

export default injectIntl(Medlemskap);
