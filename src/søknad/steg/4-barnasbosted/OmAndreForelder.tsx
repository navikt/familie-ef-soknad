import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { useIntl } from 'react-intl';
import { IForelder, IBarn } from '../../../models/person';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import { Checkbox } from 'nav-frontend-skjema';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';

interface Props {
  barn: IBarn;
  settForelder: Function;
  forelder: IForelder;
}

const OmAndreForelder: React.FC<Props> = ({ barn, settForelder, forelder }) => {
  const intl = useIntl();

  return (
    <>
      <KomponentGruppe>
        <FeltGruppe>
          <Element>
            {barn.navn}
            {intl.formatMessage({ id: 'barnasbosted.element.andreforelder' })}
          </Element>
        </FeltGruppe>
        <FeltGruppe>
          <Input
            className="foreldre-navn-input"
            onChange={(e) =>
              settForelder({ ...forelder, navn: e.target.value })
            }
            label="Navn"
          />
        </FeltGruppe>
      </KomponentGruppe>
      <KomponentGruppe>
        <div className="fødselsnummer">
          <div className="fødselsdato">
            <Datovelger
              settDato={(e: Date | null) =>
                settForelder({ ...forelder, fødselsdato: e })
              }
              valgtDato={
                forelder.fødselsdato ? forelder.fødselsdato : undefined
              }
              tekstid={'datovelger.fødselsdato'}
              datobegrensning={DatoBegrensning.TidligereDatoer}
            />
          </div>
          <Input
            className="personnummer"
            onChange={(e) =>
              settForelder({ ...forelder, personnr: e.target.value })
            }
            label="Personnummer. Kun hvis barnet har fått."
          />
        </div>
        <FeltGruppe>
          <Checkbox label={'Jeg kan ikke oppgi den andre forelderen'} />
        </FeltGruppe>
      </KomponentGruppe>
    </>
  );
};

export default OmAndreForelder;
