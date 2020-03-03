import React from 'react';
import SeksjonGruppe from '../../../../../components/gruppe/SeksjonGruppe';
import { Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../../language/LocaleTekst';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';

const TidligereUtdanning: React.FC = () => {
  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <Undertittel className={'sentrert'}>
          <LocaleTekst tekst={'utdanning.tittel.tidligere'} />
        </Undertittel>
      </KomponentGruppe>
    </SeksjonGruppe>
  );
};

export default TidligereUtdanning;
