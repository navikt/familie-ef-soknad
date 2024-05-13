import { useLokalIntlContext } from '../context/LokalIntlContext';
import React from 'react';
import { hentBeskjedMedNavn } from '../utils/språk';

interface Props {
  id: string;
  replaceArgument0?: string;
  variabel?: string;
}

const FormattedHtmlMessage: React.FC<Props> = ({
  id,
  replaceArgument0,
  variabel,
}) => {
  const intl = useLokalIntlContext();
  let text = intl.formatMessage({ id: id });
  if (replaceArgument0) {
    text = hentBeskjedMedNavn(replaceArgument0, text);
  }
  if (variabel) {
    text += variabel;
  }

  return <span dangerouslySetInnerHTML={{ __html: text }} />;
};

export default React.memo(FormattedHtmlMessage);
