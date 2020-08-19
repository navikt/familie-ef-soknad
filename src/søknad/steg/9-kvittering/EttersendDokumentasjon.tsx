import React, { FC } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { IDokumentasjon } from '../../../models/steg/dokumentasjon';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import LocaleTekst from '../../../language/LocaleTekst';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';

interface Props {
  stønadstype: Stønadstype;
  dokumentasjonsbehov: IDokumentasjon[];
}

const EttersendDokumentasjon: FC<Props> = ({
  stønadstype,
  dokumentasjonsbehov,
}) => {
  return dokumentasjonsbehov.length > 0 ? (
    <KomponentGruppe>
      <FeltGruppe>
        <Undertittel>
          <LocaleTekst tekst={'dokumentasjon.ettersend.tittel'} />
        </Undertittel>
      </FeltGruppe>
      <FeltGruppe>
        <Normaltekst>
          <LocaleTekst tekst={`dokumentasjon.ettersend.tekst.${stønadstype}`} />
        </Normaltekst>
      </FeltGruppe>
    </KomponentGruppe>
  ) : null;
};
export default EttersendDokumentasjon;
