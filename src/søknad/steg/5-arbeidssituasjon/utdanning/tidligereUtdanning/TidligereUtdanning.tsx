import React from 'react';
import SeksjonGruppe from '../../../../../components/gruppe/SeksjonGruppe';
import { Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../../language/LocaleTekst';
import Hjelpetekst from '../../../../../components/Hjelpetekst';
import { utdanningDuKanFåStønadTil } from '../UtdanningConfig';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';

const TidligereUtdanning: React.FC = () => {
  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <Undertittel className={'sentrert'}>
          <LocaleTekst tekst={'utdanning.tittel'} />
        </Undertittel>
        <Hjelpetekst
          className={'sentrert'}
          åpneTekstid={utdanningDuKanFåStønadTil.åpneTekstid}
          innholdTekstid={utdanningDuKanFåStønadTil.innholdTekstid}
        />
      </KomponentGruppe>
    </SeksjonGruppe>
  );
};

export default TidligereUtdanning;
