import React, { useEffect, useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { IArbeidssituasjon, IFirma } from '../../../models/arbeidssituasjon';
import { useIntl } from 'react-intl';
import { Input, Textarea } from 'nav-frontend-skjema';
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
  const [firma, settFirma] = useState<IFirma>({});

  useEffect(() => {
    settArbeidssituasjon({ ...arbeidssituasjon, firma: firma });
    // eslint-disable-next-line
  }, [firma]);

  const settDatoFelt = (dato: Date | null): void => {
    dato !== null &&
      settFirma({
        ...firma,
        etableringsdato: { label: 'datovelger tekstid', verdi: dato },
      });
  };

  const settArbeidsukeTekst = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    settFirma({
      ...firma,
      arbeidsuke: { label: 'tekstid', verdi: e.target.value },
    });
  };

  const settInputTekstFelt = (
    e: React.FormEvent<HTMLInputElement>,
    nøkkel: 'navn' | 'organisasjonsnummer'
  ) => {
    settFirma({
      ...firma,
      [nøkkel]: { label: '', verdi: e.currentTarget.value },
    });
  };

  return (
    <>
      <Undertittel className={'sentrert'}>Tittel</Undertittel>
      <Input
        label={'Navn på firma'}
        bredde={'L'}
        type={'text'}
        onChange={(e) => settInputTekstFelt(e, 'navn')}
      />
      <Input
        label={'Organisasjonsnummer'}
        bredde={'L'}
        type={'text'}
        onChange={(e) => settInputTekstFelt(e, 'organisasjonsnummer')}
      />
      <Datovelger
        valgtDato={firma?.etableringsdato?.verdi}
        tekstid={'datovelger tekstid'}
        datobegrensning={DatoBegrensning.TidligereDatoer}
        settDato={(e) => settDatoFelt(e)}
      />
      Sett inn InputOgLabelGruppe her
      <Textarea
        label={'arbeidsuke tekstid'}
        value={firma.arbeidsuke?.verdi ? firma.arbeidsuke?.verdi : ''}
        maxLength={1000}
        onChange={(e) => settArbeidsukeTekst(e)}
      />
    </>
  );
};

export default OmFirmaetDitt;
