import React, { FC, useEffect, useState } from 'react';
import {
  IAksjeselskap,
  IAktivitet,
} from '../../../../models/steg/aktivitet/aktivitet';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { Element, Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../language/LocaleTekst';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import KnappBase from 'nav-frontend-knapper';
import { hentUid } from '../../../../utils/uuid';
import { nyttTekstFelt } from '../../../../helpers/tommeSøknadsfelter';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import Aksjeselskap from './Aksjeselskap';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (arbeidssituasjon: IAktivitet) => void;
}

const tomtAksjeselskap: IAksjeselskap = {
  id: hentUid(),
  navn: nyttTekstFelt,
};
const EgetAS: FC<Props> = ({ arbeidssituasjon, settArbeidssituasjon }) => {
  const [egetAS, settEgetAS] = useState<IAksjeselskap[]>(
    arbeidssituasjon.egetAS ? arbeidssituasjon.egetAS : [tomtAksjeselskap]
  );

  useEffect(() => {
    settArbeidssituasjon({ ...arbeidssituasjon, egetAS: egetAS });
    // eslint-disable-next-line
  }, [egetAS]);

  const leggTilAksjeselskap = () => {
    const nyttAksjeselskap: IAksjeselskap = tomtAksjeselskap;
    const arbeidsforhold: IAksjeselskap[] = egetAS;
    arbeidsforhold.push(nyttAksjeselskap);
    settArbeidssituasjon({ ...arbeidssituasjon, egetAS: arbeidsforhold });
  };

  const erAksjeselskapFerdigUtfylt = arbeidssituasjon.egetAS?.some(
    (aksjeselskap, index) =>
      index === egetAS?.length - 1 && aksjeselskap.arbeidsmengde?.verdi
  );

  return (
    <>
      <KomponentGruppe className={'sentrert'}>
        <Undertittel>
          <LocaleTekst tekst={'egetAS.tittel'} />
        </Undertittel>
      </KomponentGruppe>

      {arbeidssituasjon.egetAS?.map((aksjeselskap, index) => {
        return (
          <SeksjonGruppe>
            <Aksjeselskap
              egetAS={egetAS}
              settEgetAS={settEgetAS}
              aksjeselskapnummer={index}
            />
          </SeksjonGruppe>
        );
      })}
      {erAksjeselskapFerdigUtfylt && (
        <KomponentGruppe>
          <FeltGruppe>
            <Element>
              <LocaleTekst tekst={'egetAS.label.flere'} />
            </Element>
          </FeltGruppe>
          <FeltGruppe>
            <KnappBase type={'standard'} onClick={() => leggTilAksjeselskap()}>
              <LocaleTekst tekst={'egetAS.knapp.leggtil'} />
            </KnappBase>
          </FeltGruppe>
        </KomponentGruppe>
      )}
    </>
  );
};
export default EgetAS;
