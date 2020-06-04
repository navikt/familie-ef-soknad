import React, { FC } from 'react';
import { IAktivitet } from '../../../models/steg/aktivitet/aktivitet';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { Element, Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../language/LocaleTekst';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import KnappBase from 'nav-frontend-knapper';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (arbeidssituasjon: IAktivitet) => void;
}
const EgetAS: FC<Props> = ({ arbeidssituasjon, settArbeidssituasjon }) => {
  const leggTilAksjeselskap = () => {};
  return (
    <>
      <KomponentGruppe className={'sentrert'}>
        <Undertittel>
          <LocaleTekst tekst={'egetAS.tittel'} />
        </Undertittel>
      </KomponentGruppe>

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
    </>
  );
};
export default EgetAS;
