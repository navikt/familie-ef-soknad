import React from 'react';
import { ISpørsmål } from '../../../models/spørsmal';
import { SpørsmålOgSvar } from '../../../config/MedlemskapConfig';
import FeltGruppe from '../../../components/FeltGruppe';
import JaNeiSpørsmål from '../../../components/JaNeiSpørsmål';

const Medlemskap: React.FC = () => {
  const medlemskapSpørsmålSvar: ISpørsmål[] = SpørsmålOgSvar;

  return (
    <section className={'seksjon'}>
      {medlemskapSpørsmålSvar.map((spørsmål: ISpørsmål) => {
        return (
          <FeltGruppe key={spørsmål.spørsmål_id}>
            <JaNeiSpørsmål spørsmål={spørsmål} tekstid={spørsmål.tekstid} />
          </FeltGruppe>
        );
      })}
    </section>
  );
};

export default Medlemskap;
