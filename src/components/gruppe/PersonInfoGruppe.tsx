import React, { FC, useState } from 'react';
import KomponentGruppe from './KomponentGruppe';
import FeltGruppe from './FeltGruppe';
import { Element } from 'nav-frontend-typografi';
import { Checkbox, Input } from 'nav-frontend-skjema';
import Datovelger, { DatoBegrensning } from '../dato/Datovelger';
import { injectIntl, IntlShape } from 'react-intl';
import LocaleTekst from '../../language/LocaleTekst';
import { IPersonDetaljer } from '../../models/person';
import { hentTekst } from '../../utils/søknad';

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
  const { fødselsdato, navn } = valgtPersonInfo;
  const [harFødselsnummer, settHarFødselsnummer] = useState<boolean>(false);

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
          value={valgtPersonInfo.navn?.verdi}
        />
      </FeltGruppe>
      {navn && (
        <>
          <FeltGruppe>
            {!harFødselsnummer ? (
              <Input
                key={'tlf'}
                label={intl.formatMessage({ id: 'person.fnr' }).trim()}
                type="text"
                bredde={'L'}
                value={valgtPersonInfo.fødselsnummer?.verdi}
                onChange={(e) => settPersonInfo(e, 'fødselsnummer')}
              />
            ) : (
              <Datovelger
                valgtDato={fødselsdato?.verdi}
                tekstid={'datovelger.fødselsdato'}
                datobegrensning={DatoBegrensning.TidligereDatoer}
                settDato={(e) => settFødselsdato(e)}
              />
            )}
          </FeltGruppe>
          <FeltGruppe>
            <Checkbox
              className={'checkbox'}
              label={hentTekst('person.checkbox.fnr', intl)}
              checked={harFødselsnummer}
              onChange={() => settHarFødselsnummer(!harFødselsnummer)}
            />
          </FeltGruppe>
        </>
      )}
    </KomponentGruppe>
  );
};

export default injectIntl(PersonInfoGruppe);
