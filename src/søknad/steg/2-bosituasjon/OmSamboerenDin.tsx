import React, { FC } from 'react';
import KomponentGruppe from '../../../components/KomponentGruppe';
import { Element } from 'nav-frontend-typografi';
import FeltGruppe from '../../../components/FeltGruppe';
import { Input } from 'nav-frontend-skjema';
import { injectIntl, IntlShape } from 'react-intl';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';

interface Props {
  intl: IntlShape;
}

const OmSamboerenDin: FC<Props> = ({ intl }) => {
  const settSamboerInfo = () => {
    console.log('setter samboer info');
  };

  const datofornå = new Date();
  const settFødselsdato = () => {
    console.log('setter dato');
  };

  return (
    <KomponentGruppe>
      <FeltGruppe>
        <Element>Om samboeren din</Element>
      </FeltGruppe>
      <FeltGruppe>
        <Input
          key={'tlf'}
          label={intl.formatMessage({ id: 'person.navn' }).trim()}
          type="text"
          bredde={'L'}
          onChange={(e) => settSamboerInfo()}
        />
      </FeltGruppe>
      <FeltGruppe classname={'datoOgPersonnummer'}>
        <Datovelger
          valgtDato={datofornå}
          tekstid={'datovelger.fødselsdato'}
          datobegrensning={DatoBegrensning.TidligereDatoer}
          settDato={(e) => settFødselsdato()}
        />
        <Input
          key={'tlf'}
          label={intl.formatMessage({ id: 'person.nr' }).trim()}
          type="text"
          bredde={'S'}
          onChange={(e) => settSamboerInfo()}
        />
      </FeltGruppe>
      <FeltGruppe>
        <Datovelger
          valgtDato={datofornå}
          tekstid={'bosituasjon.datovelger.nårFlyttetDereSammen'}
          datobegrensning={DatoBegrensning.TidligereDatoer}
          settDato={(e) => settFødselsdato()}
        />
      </FeltGruppe>
    </KomponentGruppe>
  );
};

export default injectIntl(OmSamboerenDin);
