import React from 'react';
import { IDinSituasjon } from '../../../models/steg/dinsituasjon/meromsituasjon';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { SagtOppEllerRedusertStillingSpm } from './SituasjonConfig';
import { ISpørsmål } from '../../../models/spørsmal';
import { hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';

interface Props {
  dinSituasjon: IDinSituasjon;
  settDinSituasjon: (dinSituasjon: IDinSituasjon) => void;
}

const HarSøkerSagtOppEllerRedusertStilling: React.FC<Props> = ({
  dinSituasjon,
  settDinSituasjon,
}) => {
  const intl = useIntl();

  const settSagtOppEllerRedusertStilling = (
    spørsmål: ISpørsmål,
    svar: string
  ) => {
    settDinSituasjon({
      ...dinSituasjon,
      sagtOppEllerRedusertStilling: {
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar,
      },
    });
  };
  return (
    <>
      <MultiSvarSpørsmål
        spørsmål={SagtOppEllerRedusertStillingSpm}
        settSpørsmålOgSvar={settSagtOppEllerRedusertStilling}
        valgtSvar={dinSituasjon.sagtOppEllerRedusertStilling?.verdi}
      />
    </>
  );
};

export default HarSøkerSagtOppEllerRedusertStilling;
