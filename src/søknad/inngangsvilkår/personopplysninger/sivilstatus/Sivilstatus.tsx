import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import FeltGruppe from '../../../../components/FeltGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import { usePersonContext } from '../../../../context/PersonContext';
import { hentSivilstatus } from '../../../../utils/søknad';
import { ISpørsmål } from '../../../../models/spørsmal';
import { SpørsmålOgSvar } from '../../../../config/SivilstatusConfig';
import Datovelger from '../../../../components/datovelger/Datovelger';
import JaNeiSpørsmål from '../../../../components/JaNeiSpørsmål';

const Sivilstatus: React.FC<any> = () => {
  const { person } = usePersonContext();
  const erSøkerGift = person.søker.sivilstand === 'GIFT';
  const sivilstand = person.søker.sivilstand;
  const spørsmål: ISpørsmål = SpørsmålOgSvar;

  return (
    <>
      <section className={'seksjon'}>
        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'sivilstatus.tittel'} />
          </Element>
          <Normaltekst>{hentSivilstatus(sivilstand)}</Normaltekst>
        </FeltGruppe>
        {erSøkerGift ? (
          <>
            <FeltGruppe>
              <JaNeiSpørsmål spørsmål={spørsmål} tekstid={spørsmål.tekstid} />
            </FeltGruppe>
            <FeltGruppe>
              <Datovelger tekstid={'sivilstatus.søkedato'} />
            </FeltGruppe>
          </>
        ) : null}
      </section>
    </>
  );
};

export default Sivilstatus;
