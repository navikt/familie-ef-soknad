import React from 'react';
import { IJaNeiSpørsmål as ISpørsmål } from '../../../../models/spørsmal';
import {
  SpørsmålOgSvar,
  registrertSomFlykting,
} from '../../../../config/MedlemskapConfig';
import KomponentGruppe from '../../../../components/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/JaNeiSpørsmål';
import { usePersonContext } from '../../../../context/PersonContext';
import useSøknadContext from '../../../../context/SøknadContext';
import PeriodeBoddIUtlandet from './PeriodeBoddIUtlandet';
import SeksjonGruppe from '../../../../components/SeksjonGruppe';

const Medlemskap: React.FC = () => {
  const { person } = usePersonContext();
  const { søknad } = useSøknadContext();
  const { statsborgerskap } = person.søker;
  const { søkerBosattINorgeSisteTreÅr } = søknad;
  const medlemskapSpørsmålSvar: ISpørsmål[] = SpørsmålOgSvar;

  return (
    <SeksjonGruppe>
      {medlemskapSpørsmålSvar.map((spørsmål: ISpørsmål) => {
        return (
          <KomponentGruppe key={spørsmål.spørsmål_id}>
            <JaNeiSpørsmål spørsmål={spørsmål} />
          </KomponentGruppe>
        );
      })}
      {søkerBosattINorgeSisteTreÅr === false ? <PeriodeBoddIUtlandet /> : null}
      {statsborgerskap !== 'NOR' && søkerBosattINorgeSisteTreÅr === false ? (
        <KomponentGruppe key={registrertSomFlykting.spørsmål_id}>
          <JaNeiSpørsmål spørsmål={registrertSomFlykting} />
        </KomponentGruppe>
      ) : null}
    </SeksjonGruppe>
  );
};

export default Medlemskap;
