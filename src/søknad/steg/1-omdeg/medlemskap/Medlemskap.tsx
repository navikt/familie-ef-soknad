import React from 'react';
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

const Medlemskap: React.FC = () => {
  const { person } = usePersonContext();
  const { søknad } = useSøknadContext();
  const { statsborgerskap } = person.søker;
  const { søkerBosattINorgeSisteTreÅr, søkerOppholderSegINorge } = søknad;

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <JaNeiSpørsmål spørsmål={oppholderSegINorge} />
      </KomponentGruppe>

      {typeof søkerOppholderSegINorge === 'boolean' ? (
        <KomponentGruppe>
          <JaNeiSpørsmål spørsmål={bosattINorgeDeSisteTreÅr} />
        </KomponentGruppe>
      ) : null}

      {søkerBosattINorgeSisteTreÅr === false ? <PeriodeBoddIUtlandet /> : null}

      {statsborgerskap !== 'NOR' &&
      søkerBosattINorgeSisteTreÅr === false &&
      typeof søkerBosattINorgeSisteTreÅr === 'boolean' ? (

        <KomponentGruppe key={registrertSomFlykting.spørsmål_id}>
          <JaNeiSpørsmål spørsmål={registrertSomFlykting} />
        </KomponentGruppe>
      ) : null}
    </SeksjonGruppe>
  );
};

export default Medlemskap;
