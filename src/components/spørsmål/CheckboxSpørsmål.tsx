import React, { SyntheticEvent } from 'react';
import { ISpørsmål, ISvar } from '../../models/spørsmal';
import { useIntl } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { RadioPanel, CheckboksPanelGruppe } from 'nav-frontend-skjema';
import LocaleTekst from '../../language/LocaleTekst';

interface CheckboxSvar {
  label: string;
  value: string;
  id: string;
}
interface Props {
  spørsmål: ISpørsmål;
  settValgteSvar: (spørsmål: string, svar: string[]) => void;
  valgteSvar: string[];
}
const CheckboxSpørsmål: React.FC<Props> = ({
  spørsmål,
  settValgteSvar,
  valgteSvar,
}) => {
  const intl = useIntl();

  const onClickHandle = (
    e: SyntheticEvent<EventTarget, Event>,
    spørsmål: ISpørsmål,
    svar: ISvar[]
  ): void => {
    const alleSvar: string[] = svar.map((s) =>
      intl.formatMessage({ id: s.svar_tekstid })
    );

    svar !== undefined &&
      settValgteSvar !== undefined &&
      settValgteSvar(intl.formatMessage({ id: spørsmål.tekstid }), alleSvar);
  };

  const checkboxSvar = spørsmål.svaralternativer.map((svar) => {
    return {
      label: svar.svar_tekstid,
      checked: true,
      id: svar.svar_tekstid.split('.')[2],
    };
  });
  console.log(checkboxSvar);

  return (
    <div key={spørsmål.spørsmål_id} className={'spørsmålgruppe'}>
      <Element>
        {' '}
        <LocaleTekst tekst={spørsmål.tekstid} />{' '}
      </Element>
    </div>
  );
};

export default CheckboxSpørsmål;
