import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import LocaleTekst from '../language/LocaleTekst';
import FeltGruppe from './FeltGruppe';
import useSøknadContext from '../context/SøknadContext';
import moment from 'moment';

const StyledDatovelger = styled.div`
  .datovelger {
    margin-top: 1rem;
    background-color: #fff;
    border: 1px solid #78706a;
    border-radius: 0.25rem;
    display: block;
    padding: 0.5rem;
    position: relative;
  }
`;

interface Props {
  tekstid: string;
}

const Datovelger: React.FC<Props> = ({ tekstid }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const valgtDato = søknad.datoSøktSeparasjon;
  const dagensDato = new Date();

  const settDato = (date: Date | null): void => {
    date !== null && settSøknad({ ...søknad, datoSøktSeparasjon: date });
  };

  return (
    <StyledDatovelger>
      <FeltGruppe>
        <Normaltekst>
          <LocaleTekst tekst={tekstid} />
        </Normaltekst>
        <DatePicker
          onChange={(e) => settDato(e)}
          selected={valgtDato !== undefined ? valgtDato : dagensDato}
          dateFormat={'dd/MM/yyyy'}
          className={'datovelger'}
        />
      </FeltGruppe>
    </StyledDatovelger>
  );
};

export default Datovelger;
