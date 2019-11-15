import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import FeltGruppe from '../../../components/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import { usePersonContext } from '../../../context/PersonContext';
import { injectIntl } from 'react-intl';
import { ISivilstand } from '../../../models/person';
import { hentSivilstatus } from '../../../utils/søknad';

const Sivilstatus: React.FC<any> = ({ intl }) => {
  const { person } = usePersonContext();

  return (
    <section className={'seksjon'}>
      <FeltGruppe>
        <Element>
          <LocaleTekst tekst={'sivilstatus.tittel'} />
        </Element>
        {person.søker.sivilstand === 'GIFT' ? (
          <Normaltekst>
            {intl.formatMessage({ id: 'sivilstatus.giftmed' }) +
              '[insert partner here]'}
          </Normaltekst>
        ) : (
          <Normaltekst>{hentSivilstatus(person.søker.sivilstand)}</Normaltekst>
        )}
      </FeltGruppe>
    </section>
  );
};

export default injectIntl(Sivilstatus);
