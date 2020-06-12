import React, { FC } from 'react';
import {
  DinSituasjonType,
  IDinSituasjon,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import SøkerErSyk from './SøkerErSyk';
import SyktBarn from './SyktBarn';
import SøktBarnepassOgVenterPåSvar from './SøktBarnepassOgVenterPåSvar';
import BarnMedSærligeBehov from './BarnMedSærligeBehov';
import FåttJobbTilbud from './FåttJobbTilbud';
import SøkerSkalTaUtdanning from './SøkerSkalTaUtdanning';

interface Props {
  dinSituasjon: IDinSituasjon;
  settDinSituasjon: (dinSituasjon: IDinSituasjon) => void;
  svarid: string;
}

const SituasjonOppfølgingSpørsmål: FC<Props> = ({
  dinSituasjon,
  settDinSituasjon,
  svarid,
}) => {
  switch (svarid) {
    case DinSituasjonType.erSyk:
      return <SøkerErSyk />;

    case DinSituasjonType.harSyktBarn:
      return <SyktBarn />;

    case DinSituasjonType.harSøktBarnepassOgVenterEnnå:
      return <SøktBarnepassOgVenterPåSvar />;

    case DinSituasjonType.harBarnMedSærligeBehov:
      return <BarnMedSærligeBehov />;

    case DinSituasjonType.harFåttJobbTilbud:
      return (
        <FåttJobbTilbud
          dinSituasjon={dinSituasjon}
          settDinSituasjon={settDinSituasjon}
        />
      );
    case DinSituasjonType.skalTaUtdanning:
      return (
        <SøkerSkalTaUtdanning
          dinSituasjon={dinSituasjon}
          settDinSituasjon={settDinSituasjon}
        />
      );

    default:
      return <></>;
  }
};

export default SituasjonOppfølgingSpørsmål;
