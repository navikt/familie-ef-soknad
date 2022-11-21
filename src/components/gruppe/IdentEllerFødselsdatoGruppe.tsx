import React, { FC } from 'react';
import FeltGruppe from './FeltGruppe';
import Datovelger, { DatoBegrensning } from '../dato/Datovelger';
import { hentTekst } from '../../utils/søknad';
import classNames from 'classnames';
import KomponentGruppe from './KomponentGruppe';
import { useLokalIntlContext } from '../../context/LokalIntlContext';
import { Checkbox, TextField } from '@navikt/ds-react';
import { dnr as dnrValidator, fnr as fnrValidator } from '@navikt/fnrvalidator';

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
  const intl = useLokalIntlContext();

  const feilmelding: string = hentTekst('person.feilmelding.ident', intl);

  const identErGyldig = (ident: string): boolean =>
    fnrValidator(ident).status === 'valid' ||
    dnrValidator(ident).status === 'valid';

  return (
    <>
      <KomponentGruppe>
        <FeltGruppe>
          <TextField
            className={classNames('inputfelt-tekst', {
              fetSkrift: fetSkrift,
            })}
            key={'ident'}
            label={identLabel}
            disabled={checked}
            pattern="[0-9]*"
            value={ident}
            error={erGyldigIdent || !ident ? undefined : feilmelding}
            onChange={(e) => {
              settIdent(e);
              settGyldigIdent(identErGyldig(e.target.value));
            }}
          />
        </FeltGruppe>
        <FeltGruppe>
          <Checkbox
            className={'checkbox'}
            checked={checked}
            onChange={() => settChecked(!checked)}
          >
            {checkboxLabel}
          </Checkbox>
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
