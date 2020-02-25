import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { ISpørsmål } from '../../../models/spørsmal';
import {
  boddSammenFør,
  borISammeHus,
  hvorMyeSammen
} from './ForeldreConfig';
import { IForelder } from '../../../models/person';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import BarnasBostedHeader from './BarnasBostedHeader';
import { useIntl } from 'react-intl';
import Datovelger, { DatoBegrensning } from '../../../components/dato/Datovelger';
import OmAndreForelder from './OmAndreForelder';
import BostedOgSamvær from './BostedOgSamvær';
import BarnetsBosted from './BarnetsBosted';

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknadContext();

  const barna = søknad.person.barn;

  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'barnasbosted.sidetittel' })}
      >
       {barna.map((barn) => {
        return (<BarnetsBosted barn={barn} />)
       })}
      </Side>
    </>
  );
};

export default BarnasBosted;
