import React, { FC } from 'react';
import FeltGruppe from './FeltGruppe';
import { hentTekst } from '../../utils/søknad';
import KomponentGruppe from './KomponentGruppe';
import { useLokalIntlContext } from '../../context/LokalIntlContext';
import { Checkbox } from '@navikt/ds-react';
import { dnr as dnrValidator, fnr as fnrValidator } from '@navikt/fnrvalidator';
import { TextFieldMedBredde } from '../TextFieldMedBredde';
import { DatoBegrensning, Datovelger } from '../dato/Datovelger';

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
          <TextFieldMedBredde
            key={'ident'}
            label={identLabel}
            disabled={checked}
            bredde={'L'}
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
          />
        </KomponentGruppe>
      )}
    </>
  );
};

export default IdentEllerFødselsdatoGruppe;
