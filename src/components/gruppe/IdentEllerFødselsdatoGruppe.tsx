import React, { FC, useState } from 'react';
import FeltGruppe from './FeltGruppe';
import { Checkbox, FnrInput } from 'nav-frontend-skjema';
import Datovelger, { DatoBegrensning } from '../dato/Datovelger';

interface Props {
  identLabel: string;
  datoLabel: string;
  checkboxLabel: string;
  ident: string | undefined;
  fødselsdato: Date | undefined;
  checked: boolean;
  settCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  settFødselsdato: (date: Date | null) => void;
  settIdent: (ident: React.ChangeEvent<HTMLInputElement>) => void;
}

const IdentEllerFødselsdatoGruppe: FC<Props> = ({
  identLabel,
  datoLabel,
  checkboxLabel,
  checked,
  ident,
  fødselsdato,
  settCheckbox,
  settIdent,
  settFødselsdato,
}) => {
  const [gyldig, settGyldig] = useState<boolean>();

  return (
    <>
      <FeltGruppe>
        <FnrInput
          className={'tjukk-tekst'}
          key={'fødselsnr'}
          label={identLabel}
          disabled={checked}
          type="text"
          bredde={'L'}
          value={ident ? ident : ''}
          feil={
            gyldig || ident ? undefined : 'Ugyldig fødselsnummer eller d-nummer'
          }
          inputMode={'numeric'}
          onChange={(e) => settIdent(e)}
          onValidate={(valid) => settGyldig(valid)}
        />
      </FeltGruppe>
      <FeltGruppe>
        <Checkbox
          className={'checkbox'}
          label={checkboxLabel}
          checked={checked}
          onChange={(e) => settCheckbox(e)}
        />
      </FeltGruppe>

      {checked && (
        <FeltGruppe>
          <Datovelger
            valgtDato={fødselsdato}
            tekstid={datoLabel}
            datobegrensning={DatoBegrensning.TidligereDatoer}
            settDato={(e) => settFødselsdato(e)}
          />
        </FeltGruppe>
      )}
    </>
  );
};

export default IdentEllerFødselsdatoGruppe;
