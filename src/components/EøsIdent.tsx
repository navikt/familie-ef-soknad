import React from 'react';
import { Checkbox, Label, ReadMore } from '@navikt/ds-react';
import { TextFieldMedBredde } from './TextFieldMedBredde';
import { hentTekst } from '../utils/søknad';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { IUtenlandsopphold } from '../models/steg/omDeg/medlemskap';

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

  const hentTekstMedLandverdi = (tekst: string) => {
    return hentTekst(tekst, intl) + ' ' + utenlandsopphold.land?.verdi;
  };

  const tekstMedLandVerdi =
    hentTekstMedLandverdi(
      'medlemskap.periodeBoddIUtlandet.utenlandskIDNummer'
    ) + '?';
  const harIkkeUtenlandsPersonIdTekst = hentTekstMedLandverdi(
    'medlemskap.periodeBoddIUtlandet.harIkkeIdNummer'
  );

  const settUtenlandskPersonId = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const oppdatertUtenlandsopphold = {
      ...utenlandsopphold,
      personidentEøsLand: {
        label: tekstMedLandVerdi,
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
      <Label>{tekstMedLandVerdi}</Label>
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
        {harIkkeUtenlandsPersonIdTekst}
      </Checkbox>
    </div>
  );
};

export default EøsIdent;
