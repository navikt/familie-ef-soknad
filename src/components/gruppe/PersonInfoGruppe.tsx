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
  tittel: string;
  navnLabel: string;
  identLabel: string;
  checkboxLabel: string;
  valgtPersonInfo: IPersonDetaljer;
  settFødselsdato: (date: Date | null) => void;
  settPersonInfo: (
    e: React.FormEvent<HTMLInputElement>,
    navnEllerFødselsnummer: 'navn' | 'fødselsnummer'
  ) => void;
  fødselsdatoLabel: string;
}

const PersonInfoGruppe: FC<Props> = ({
  intl,
  tittel,
  navnLabel,
  identLabel,
  checkboxLabel,
  settPersonInfo,
  settFødselsdato,
  valgtPersonInfo,
  fødselsdatoLabel,
}) => {
  const { fødselsdato, navn } = valgtPersonInfo;
  const [harFødselsnummer, settHarFødselsnummer] = useState<boolean>(false);

  return (
    <KomponentGruppe>
      {tittel && (
        <FeltGruppe>
          <Element>{tittel}</Element>
        </FeltGruppe>
      )}
      <FeltGruppe>
        <Input
          key={'navn'}
          label={navnLabel}
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
                className={'tjukk-tekst'}
                key={'fødselsnr'}
                label={identLabel}
                type="text"
                bredde={'L'}
                value={valgtPersonInfo.fødselsnummer?.verdi}
                onChange={(e) => settPersonInfo(e, 'fødselsnummer')}
              />
            ) : (
              <Datovelger
                valgtDato={fødselsdato?.verdi}
                tekstid={fødselsdatoLabel}
                datobegrensning={DatoBegrensning.TidligereDatoer}
                settDato={(e) => settFødselsdato(e)}
              />
            )}
          </FeltGruppe>
          <FeltGruppe>
            <Checkbox
              className={'checkbox'}
              label={checkboxLabel}
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
