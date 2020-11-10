import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';
import LocaleTekst from '../../../language/LocaleTekst';

const SyktBarn: React.FC = () => {
  return (
    <KomponentGruppe>
      <AlertStripeDokumentasjon>
        <Normaltekst>
          <LocaleTekst tekst={'dinSituasjon.alert.harSyktBarn'} />
        </Normaltekst>
      </AlertStripeDokumentasjon>
    </KomponentGruppe>
  );
};
export default SyktBarn;
