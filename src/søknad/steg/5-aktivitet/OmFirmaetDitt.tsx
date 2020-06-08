import React, { useEffect, useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';

import { useIntl } from 'react-intl';
import { Input, Textarea } from 'nav-frontend-skjema';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import InputLabelGruppe from '../../../components/gruppe/InputLabelGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import { IAktivitet } from '../../../models/steg/aktivitet/aktivitet';
import { EFirma, IFirma } from '../../../models/steg/aktivitet/firma';
import { datoTilStreng } from '../../../utils/dato';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (arbeidssituasjon: IAktivitet) => void;
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
        etableringsdato: {
          label: 'datovelger tekstid',
          verdi: datoTilStreng(dato),
        },
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
    nøkkel: EFirma
  ) => {
    settFirma({
      ...firma,
      [nøkkel]: { label: '', verdi: e.currentTarget.value },
    });
  };

  const labelArbeidsmengde = intl.formatMessage({
    id: 'firma.label.arbeidsmengde',
  });
  const labelArbeidsuke = intl.formatMessage({ id: 'firma.label.arbeidsuke' });

  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Undertittel className={'sentrert'}>
          <LocaleTekst tekst={'firma.tittel'} />
        </Undertittel>
      </FeltGruppe>
      <FeltGruppe>
        <Input
          label={intl.formatMessage({ id: 'firma.label.navn' })}
          bredde={'L'}
          type={'text'}
          onChange={(e) => settInputTekstFelt(e, EFirma.navn)}
        />
      </FeltGruppe>
      <FeltGruppe>
        <Input
          label={intl.formatMessage({ id: 'firma.label.organisasjonnr' })}
          bredde={'L'}
          type={'text'}
          onChange={(e) => settInputTekstFelt(e, EFirma.organisasjonsnummer)}
        />
      </FeltGruppe>
      <FeltGruppe>
        <Datovelger
          valgtDato={firma?.etableringsdato?.verdi}
          tekstid={'firma.datovelger.etablering'}
          datobegrensning={DatoBegrensning.TidligereDatoer}
          settDato={(e) => settDatoFelt(e)}
        />
      </FeltGruppe>
      <FeltGruppe>
        <InputLabelGruppe
          label={labelArbeidsmengde}
          nøkkel={labelArbeidsmengde}
          type={'number'}
          bredde={'XS'}
          settInputFelt={(e) => settInputTekstFelt(e, EFirma.arbeidsmengde)}
          beskrivendeTekst={'%'}
        />
      </FeltGruppe>
      <FeltGruppe>
        <Textarea
          key={labelArbeidsmengde}
          label={labelArbeidsuke}
          value={firma.arbeidsuke?.verdi ? firma.arbeidsuke?.verdi : ''}
          maxLength={1000}
          onChange={(e) => settArbeidsukeTekst(e)}
        />
      </FeltGruppe>
    </SeksjonGruppe>
  );
};

export default OmFirmaetDitt;
