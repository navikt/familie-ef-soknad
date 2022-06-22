import { useLokalIntlContext } from '../context/LokalIntlContext';
import React from 'react';

interface Props {
  id: string;
}

const FormattedHtmlMessage: React.FC<Props> = ({ id }) => {
  const intl = useLokalIntlContext();
  const text = intl.formatMessage({ id: id });
  return <span dangerouslySetInnerHTML={{ __html: text }} />;
};

export default React.memo(FormattedHtmlMessage);
