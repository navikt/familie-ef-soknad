import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import FeltGruppe from '../../../../components/FeltGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import { usePersonContext } from '../../../../context/PersonContext';
import { hentSivilstatus } from '../../../../utils/søknad';
import { ISpørsmål } from '../../../../models/spørsmal';
import {
  SeparasjonSpørsmål,
  SkiltEllerEnkeSpørsmål,
} from '../../../../config/SivilstatusConfig';
import Datovelger from '../../../../components/datovelger/Datovelger';
import JaNeiSpørsmål from '../../../../components/JaNeiSpørsmål';

const Sivilstatus: React.FC<any> = () => {
  const { person } = usePersonContext();
  const sivilstand = person.søker.sivilstand;
  const separasjonsSpørsmål: ISpørsmål = SeparasjonSpørsmål;
  const skiltEllerSeparertSpørsmål: ISpørsmål[] = SkiltEllerEnkeSpørsmål;
  const erSøkerSeparertEllerSkilt =
    person.søker.sivilstand === 'SKIL' || person.søker.sivilstand === 'SEPA';

  return (
    <>
      <section className={'seksjon'}>
        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'sivilstatus.tittel'} />
          </Element>
          <Normaltekst>{hentSivilstatus(sivilstand)}</Normaltekst>
        </FeltGruppe>
        {person.søker.sivilstand === 'GIFT' ? (
          <>
            <FeltGruppe>
              <JaNeiSpørsmål
                spørsmål={separasjonsSpørsmål}
                tekstid={separasjonsSpørsmål.tekstid}
              />
            </FeltGruppe>
            <FeltGruppe>
              <Datovelger tekstid={'sivilstatus.separasjon.datosøkt'} />
            </FeltGruppe>
          </>
        ) : null}
        {erSøkerSeparertEllerSkilt ? (
          <>
            {skiltEllerSeparertSpørsmål.map((spørsmål) => {
              return (
                <FeltGruppe>
                  <JaNeiSpørsmål
                    spørsmål={spørsmål}
                    tekstid={spørsmål.tekstid}
                  />
                </FeltGruppe>
              );
            })}
          </>
        ) : null}
      </section>
    </>
  );
};

export default Sivilstatus;
