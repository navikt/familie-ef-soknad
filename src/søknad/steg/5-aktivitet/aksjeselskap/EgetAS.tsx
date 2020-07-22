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
import { erAksjeselskapFerdigUtfylt } from '../../../../helpers/steg/aktivitetvalidering';
import LeggTilKnapp from '../../../../components/knapper/LeggTilKnapp';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (arbeidssituasjon: IAktivitet) => void;
}

const tomtAksjeselskap: IAksjeselskap = {
  id: hentUid(),
  navn: nyttTekstFelt,
  arbeidsmengde: nyttTekstFelt,
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
      {erAksjeselskapFerdigUtfylt(egetAS) && (
        <KomponentGruppe>
          <FeltGruppe>
            <Element>
              <LocaleTekst tekst={'egetAS.label.flere'} />
            </Element>
          </FeltGruppe>
          <FeltGruppe>
            <LeggTilKnapp onClick={() => leggTilAksjeselskap()}>
              <LocaleTekst tekst={'egetAS.knapp.leggtil'} />
            </LeggTilKnapp>
          </FeltGruppe>
        </KomponentGruppe>
      )}
    </>
  );
};
export default EgetAS;
