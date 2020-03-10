import { EDinSituasjon } from '../../../models/steg/dinsituasjon/meromsituasjon';
import { IntlShape } from 'react-intl';

export const erSituasjonIAvhukedeSvar = (
  situasjon: EDinSituasjon,
  avhukedeSvar: string[],
  intl: IntlShape
): boolean => {
  const tekstid: string = 'dinSituasjon.svar.' + situasjon;
  const svarTekst: string = intl.formatMessage({ id: tekstid });
  return avhukedeSvar.some((svarHuketAvISøknad: string) => {
    return svarHuketAvISøknad === svarTekst;
  });
};
