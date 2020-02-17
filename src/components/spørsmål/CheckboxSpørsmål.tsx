import React, { SyntheticEvent } from 'react';
import { ISpørsmål, ISvar } from '../../models/spørsmal';
import { useIntl } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { CheckboksPanel } from 'nav-frontend-skjema';
import LocaleTekst from '../../language/LocaleTekst';

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
    checked: boolean,
    svarTekst: string
  ): void => {
    const spørsmålTekst: string = intl.formatMessage({ id: spørsmål.tekstid });

    if (checked) {
      const avhukedeSvar: string[] = valgteSvar.filter((valgtSvar) => {
        return valgtSvar !== svarTekst;
      });
      settValgteSvar(spørsmålTekst, avhukedeSvar);
    } else {
      const avhukedeSvar = valgteSvar;
      avhukedeSvar.push(svarTekst);
      settValgteSvar(spørsmålTekst, avhukedeSvar);
    }
  };

  return (
    <div key={spørsmål.spørsmål_id} className={'spørsmålgruppe'}>
      <Element>
        <LocaleTekst tekst={spørsmål.tekstid} />
      </Element>
      <div className={'radioknapp__multiSvar'}>
        {spørsmål.svaralternativer.map((svar: ISvar) => {
          const svarTekst = intl.formatMessage({ id: svar.svar_tekstid });
          const huketAvISøknad = valgteSvar.some((valgtSvar) => {
            return valgtSvar === svarTekst;
          });

          return (
            <CheckboksPanel
              label={svarTekst}
              checked={huketAvISøknad}
              onChange={(e) => onClickHandle(e, huketAvISøknad, svarTekst)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxSpørsmål;
