import React from 'react';
import { Checkbox, Label, ReadMore } from '@navikt/ds-react';
import { TextFieldMedBredde } from './TextFieldMedBredde';
import { hentTekst } from '../utils/søknad';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { IUtenlandsopphold } from '../models/steg/omDeg/medlemskap';
import { hentBeskjedMedNavn } from '../utils/språk';

interface Props {
  halvåpenTekstid: string;
  åpneTekstid: string;
  utenlandsopphold: IUtenlandsopphold;
  settUtenlandsopphold: (utenlandsopphold: IUtenlandsopphold) => void;
}

const EøsIdent: React.FC<Props> = ({
  halvåpenTekstid,
  åpneTekstid,
  utenlandsopphold,
  settUtenlandsopphold,
}) => {
  const intl = useLokalIntlContext();

  const tekstMedLand = hentBeskjedMedNavn(
    utenlandsopphold.land?.verdi || '',
    hentTekst('medlemskap.periodeBoddIUtlandet.utenlandskIDNummer', intl)
  );

  const settUtenlandskPersonId = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const oppdatertUtenlandsopphold = {
      ...utenlandsopphold,
      personidentEøsLand: {
        label: tekstMedLand,
        verdi: e.target.value,
      },
    };
    settUtenlandsopphold(oppdatertUtenlandsopphold);
  };

  const toggleHarUtenlandskPersonId = (
    kanIkkeOppgiPersonident: boolean
  ): void => {
    const oppdatertUtenlandsopphold = {
      ...utenlandsopphold,
      kanIkkeOppgiPersonident: kanIkkeOppgiPersonident,
      personidentEøsLand: kanIkkeOppgiPersonident
        ? { label: '', verdi: '' }
        : utenlandsopphold.personidentEøsLand,
    };
    settUtenlandsopphold(oppdatertUtenlandsopphold);
  };

  return (
    <div>
      <Label>{tekstMedLand}</Label>
      <ReadMore size={'small'} header={halvåpenTekstid}>
        {åpneTekstid}
      </ReadMore>
      <TextFieldMedBredde
        className={'inputfelt-tekst'}
        key={'navn'}
        label={'label'}
        hideLabel={true}
        type="text"
        bredde={'L'}
        onChange={(e) => settUtenlandskPersonId(e)}
        value={utenlandsopphold.personidentEøsLand?.verdi}
        disabled={utenlandsopphold.kanIkkeOppgiPersonident}
        maxLength={32}
      />
      <Checkbox
        checked={utenlandsopphold.kanIkkeOppgiPersonident}
        onChange={() =>
          toggleHarUtenlandskPersonId(!utenlandsopphold.kanIkkeOppgiPersonident)
        }
      >
        {hentBeskjedMedNavn(
          utenlandsopphold.land?.verdi || '',
          hentTekst('medlemskap.periodeBoddIUtlandet.harIkkeIdNummer', intl)
        )}
      </Checkbox>
    </div>
  );
};

export default EøsIdent;
