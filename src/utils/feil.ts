import { IntlShape } from 'react-intl';

const REGEX_FEIL = /^CODE=(.*)$/;

const createId = (prefixId: string, id: string) => `${prefixId}.${id}`;

export const getFeilmelding = (
  intl: IntlShape,
  prefixId: string,
  defaultSuffixId: string,
  melding?: string
): string => {
  const matches = REGEX_FEIL.exec(melding || '');
  if (matches?.length && matches?.length > 0) {
    const id = createId(prefixId, matches[1]);
    if (intl.messages[id]) {
      return intl.formatMessage({ id: id });
    }
  }
  return intl.formatMessage({ id: createId(prefixId, defaultSuffixId) });
};
