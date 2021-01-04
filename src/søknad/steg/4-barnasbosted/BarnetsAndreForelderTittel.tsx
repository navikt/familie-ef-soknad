import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { førsteBokstavStor } from '../../../utils/språk';
import { hentBarnNavnEllerBarnet } from '../../../utils/barn';
import { hentTekst } from '../../../utils/søknad';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { IBarn } from '../../../models/steg/barn';
import { FC } from 'react';
import { useIntl } from 'react-intl';

const BarnetsAndreForelderTittel: FC<{ barn: IBarn }> = ({ barn }) => {
  const intl = useIntl();
  return (
    <FeltGruppe>
      <Undertittel tag="h4">
        {førsteBokstavStor(
          hentBarnNavnEllerBarnet(barn, 'barnasbosted.element.barnet', intl)
        )}
        {hentTekst('barnasbosted.element.andreforelder', intl)}
      </Undertittel>
    </FeltGruppe>
  );
};
export default BarnetsAndreForelderTittel;
