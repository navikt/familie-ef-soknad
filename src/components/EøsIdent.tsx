import React, { useEffect, useState } from 'react';
import { Checkbox, Label, ReadMore } from '@navikt/ds-react';
import { TextFieldMedBredde } from './TextFieldMedBredde';
import { hentTekst } from '../utils/søknad';
import { useLokalIntlContext } from '../context/LokalIntlContext';
import { ISpørsmålFelt } from '../models/søknad/søknadsfelter';
import { IUtenlandsopphold } from '../models/steg/omDeg/medlemskap';

interface Props {
  halvåpenTekstid: string;
  åpneTekstid: string;
  land: ISpørsmålFelt;
  utenlandsopphold: IUtenlandsopphold;
  settUtenlandsopphold: (utenlandsopphold: IUtenlandsopphold) => void;
  oppholdsnr: number;
}

const EøsIdent: React.FC<Props> = ({
  halvåpenTekstid,
  åpneTekstid,
  land,
  utenlandsopphold,
  settUtenlandsopphold,
  oppholdsnr,
}) => {
  const intl = useLokalIntlContext();

  const hentTekstMedLandverdi = (tekst: string) => {
    return hentTekst(tekst, intl) + ' ' + land.verdi;
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
      personidentUtland: {
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
      personidentUtland: kanIkkeOppgiPersonident
        ? { label: '', verdi: '' }
        : utenlandsopphold.personidentUtland,
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
        value={utenlandsopphold.personidentUtland?.verdi}
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
