import React, { FC } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import LocaleTekst from '../../../language/LocaleTekst';
import { useIntl } from 'react-intl';

interface Props {
  skalHaBarnepass?: boolean;
  toggleSkalHaBarnepass: Function;
  id: string;
}

const BarnMedISøknad: FC<Props> = ({
  skalHaBarnepass,
  toggleSkalHaBarnepass,
  id,
}) => {
  const intl = useIntl();
  return skalHaBarnepass ? (
    <>
      <div className="med-i-søknaden-badge">
        <Normaltekst>
          <LocaleTekst tekst={'barnadine.label.skalHaBarnepass'} />
        </Normaltekst>
      </div>
      <div
        className="barnekort__endre-barnekort"
        onClick={() => toggleSkalHaBarnepass(id)}
      >
        <Normaltekst>
          <span className="lenke">
            {intl.formatMessage({ id: 'barnadine.knapp.fjern' })}
          </span>
        </Normaltekst>
      </div>
    </>
  ) : (
    <Knapp
      className="legg-til-i-søknad-knapp"
      onClick={() => toggleSkalHaBarnepass(id)}
    >
      <LocaleTekst tekst={'barnadine.knapp.søkBarnetilsyn'} />
    </Knapp>
  );
};

export default BarnMedISøknad;
