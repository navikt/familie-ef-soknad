import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSøknad } from '../context/SøknadContext';

interface Props {
  children: React.ReactElement;
}
const RedirectTilStart: React.FC<Props> = ({ children }) => {
  const { søknad } = useSøknad();
  return !søknad.harBekreftet ? <Navigate to={'/'} /> : children;
};

export default RedirectTilStart;
