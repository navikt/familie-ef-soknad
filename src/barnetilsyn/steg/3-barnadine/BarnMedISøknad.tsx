import React, { FC } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';

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
  return medISøknad ? (
    <>
      <div className="med-i-søknaden-badge">
        <Normaltekst>Med i søknaden</Normaltekst>
      </div>
      <div
        className="barnekort__endre-barnekort"
        onClick={() => toggleMedISøknadBarn(id)}
      >
        <Normaltekst>
          <span className="lenke">Fjern fra søknad</span>
        </Normaltekst>
      </div>
    </>
  ) : (
    <Knapp
      className="legg-til-i-søknad-knapp"
      onClick={() => toggleMedISøknadBarn(id)}
    >
      Søk om stønad til barnetilsyn
    </Knapp>
  );
};

export default BarnMedISøknad;
