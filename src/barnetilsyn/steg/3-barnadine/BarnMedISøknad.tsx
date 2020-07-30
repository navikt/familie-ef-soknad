import React, { FC } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import LocaleTekst from '../../../language/LocaleTekst';
import { useIntl } from 'react-intl';

interface Props {
  medISøknad?: boolean;
  toggleMedISøknadBarn: Function;
  id: string;
}

const BarnMedISøknad: FC<Props> = ({
  medISøknad,
  toggleMedISøknadBarn,
  id,
}) => {
  const intl = useIntl();
  return medISøknad ? (
    <>
      <div className="med-i-søknaden-badge">
        <Normaltekst>
          <LocaleTekst tekst={'barnadine.label.medISøknad'} />
        </Normaltekst>
      </div>
      <div
        className="barnekort__endre-barnekort"
        onClick={() => toggleMedISøknadBarn(id)}
      >
        <Normaltekst>
          <span className="lenke">
            {intl.formatMessage({ id: 'barnadine.knapp.fjern' })}
          </span>
          ws
        </Normaltekst>
      </div>
    </>
  ) : (
    <Knapp
      className="legg-til-i-søknad-knapp"
      onClick={() => toggleMedISøknadBarn(id)}
    >
      <LocaleTekst tekst={'barnadine.knapp.søkBarnetilsyn'} />
    </Knapp>
  );
};

export default BarnMedISøknad;
