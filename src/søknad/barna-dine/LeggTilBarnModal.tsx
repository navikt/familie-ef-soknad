import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import useSøknadContext from '../../context/SøknadContext';
import DatePicker from 'react-datepicker';
import { differenceInYears } from 'date-fns';
import { RadioPanel } from 'nav-frontend-skjema';

interface Props {
    navn: string;
}

const LeggTilBarnModal: React.FC<Props> = ( { navn }) => {
  return (
        <div className="legg-til-barn-modal">

        </div>
  );
};

export default LeggTilBarnModal;
