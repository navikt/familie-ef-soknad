import React, { FC } from 'react';
import KomponentGruppe from './KomponentGruppe';
import FeltGruppe from './FeltGruppe';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import Datovelger, { DatoBegrensning } from '../dato/Datovelger';
import { injectIntl, IntlShape } from 'react-intl';
import LocaleTekst from '../../language/LocaleTekst';
import { IPersonDetaljer } from '../../models/person';

interface Props {
  intl: IntlShape;
  tekstid: string;
  valgtPersonInfo: IPersonDetaljer;
  settFødselsdato: (date: Date | null) => void;
  settPersonInfo: (
    e: React.FormEvent<HTMLInputElement>,
    navnEllerFødselsnummer: 'navn' | 'fødselsnummer'
  ) => void;
}

const PersonInfoGruppe: FC<Props> = ({
  intl,
  tekstid,
  settPersonInfo,
  settFødselsdato,
  valgtPersonInfo,
}) => {
  const { fødselsdato } = valgtPersonInfo;

  return (
    <KomponentGruppe>
      <FeltGruppe>
        <Element>
          <LocaleTekst tekst={tekstid} />
        </Element>
      </FeltGruppe>
      <FeltGruppe>
        <Input
          key={'tlf'}
          label={intl.formatMessage({ id: 'person.navn' }).trim()}
          type="text"
          bredde={'L'}
          onChange={(e) => settPersonInfo(e, 'navn')}
        />
      </FeltGruppe>
      <FeltGruppe classname={'datoOgPersonnummer'}>
        <Datovelger
          valgtDato={fødselsdato}
          tekstid={'datovelger.fødselsdato'}
          datobegrensning={DatoBegrensning.TidligereDatoer}
          settDato={(e) => settFødselsdato(e)}
        />
        <Input
          key={'tlf'}
          label={intl.formatMessage({ id: 'person.nr' }).trim()}
          type="text"
          bredde={'S'}
          onChange={(e) => settPersonInfo(e, 'fødselsnummer')}
        />
      </FeltGruppe>
    </KomponentGruppe>
  );
};

export default injectIntl(PersonInfoGruppe);
