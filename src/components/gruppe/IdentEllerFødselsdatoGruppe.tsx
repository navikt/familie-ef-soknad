import React, { FC } from 'react';
import FeltGruppe from './FeltGruppe';
import { Checkbox, FnrInput } from 'nav-frontend-skjema';
import Datovelger, { DatoBegrensning } from '../dato/Datovelger';
import { hentTekst } from '../../utils/søknad';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import KomponentGruppe from './KomponentGruppe';

interface Props {
  identLabel: string;
  datoLabel: string;
  checkboxLabel: string;
  ident: string | undefined;
  fødselsdato: string;
  checked: boolean;
  erGyldigIdent: boolean;
  settGyldigIdent: (erGyldig: boolean) => void;
  settChecked: (checked: boolean) => void;
  settFødselsdato: (date: string) => void;
  settIdent: (ident: React.ChangeEvent<HTMLInputElement>) => void;
  fetSkrift?: boolean;
}

const IdentEllerFødselsdatoGruppe: FC<Props> = ({
  identLabel,
  datoLabel,
  checkboxLabel,
  checked,
  ident,
  fødselsdato,
  erGyldigIdent,
  settGyldigIdent,
  settChecked,
  settIdent,
  settFødselsdato,
  fetSkrift,
}) => {
  const intl = useIntl();

  const feilmelding: string = hentTekst('person.feilmelding.ident', intl);

  return (
    <>
      <KomponentGruppe>
        <FeltGruppe>
          <FnrInput
            className={classNames('inputfelt-tekst', {
              fetSkrift: fetSkrift,
            })}
            key={'ident'}
            label={identLabel}
            disabled={checked}
            bredde={'L'}
            value={ident}
            feil={erGyldigIdent || !ident ? undefined : feilmelding}
            onChange={(e) => settIdent(e)}
            onValidate={(valid) => {
              settGyldigIdent(valid);
            }}
          />
        </FeltGruppe>
        <FeltGruppe>
          <Checkbox
            className={'checkbox'}
            label={checkboxLabel}
            checked={checked}
            onChange={() => settChecked(!checked)}
          />
        </FeltGruppe>
      </KomponentGruppe>
      {checked && (
        <KomponentGruppe>
          <Datovelger
            valgtDato={fødselsdato}
            tekstid={datoLabel}
            datobegrensning={DatoBegrensning.TidligereDatoer}
            settDato={(e) => settFødselsdato(e)}
            fetSkrift={fetSkrift}
          />
        </KomponentGruppe>
      )}
    </>
  );
};

export default IdentEllerFødselsdatoGruppe;
