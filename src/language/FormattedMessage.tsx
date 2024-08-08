import { useLokalIntlContext } from '../context/LokalIntlContext';
import React from 'react';

interface Props {
  id: string;
}

const FormattedMessage: React.FC<Props> = ({ id }) => {
  const intl = useLokalIntlContext();
  const text = intl.formatMessage({ id: id });
  return <>{text}</>;
};

export default FormattedMessage;
