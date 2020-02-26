import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { IArbeidssituasjon } from '../../../models/arbeidssituasjon';
import { useIntl } from 'react-intl';
import { Input } from 'nav-frontend-skjema';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';

interface Props {
  arbeidssituasjon: IArbeidssituasjon;
  settArbeidssituasjon: (arbeidssituasjon: IArbeidssituasjon) => void;
}

const OmFirmaetDitt: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const intl = useIntl();
  const { firma } = arbeidssituasjon;

  return (
    <>
      <Undertittel className={'sentrert'}>Tittel</Undertittel>
      <Input label={'Navn på firma'} bredde={'L'} type={'text'} />
      <Input label={'Organisasjonsnummer'} bredde={'L'} type={'text'} />
      <Datovelger
        valgtDato={firma?.etableringsdato?.verdi}
        tekstid={'datovelger tekstid'}
        datobegrensning={DatoBegrensning.TidligereDatoer}
        settDato={}
      />
    </>
  );
};

export default OmFirmaetDitt;
