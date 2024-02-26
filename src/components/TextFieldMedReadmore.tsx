import React, {Dispatch, SetStateAction, useState} from 'react';
import {Checkbox, Label, ReadMore} from '@navikt/ds-react';
import {TextFieldMedBredde} from "./TextFieldMedBredde";
import {hentTekst} from "../utils/søknad";
import {useLokalIntlContext} from "../context/LokalIntlContext";
import {ISpørsmålFelt} from "../models/søknad/søknadsfelter";
import {IUtenlandsopphold} from "../models/steg/omDeg/medlemskap";

interface Props {
    halvåpenTekstid: string;
    åpneTekstid: string;
    land: ISpørsmålFelt;
    ident: string | undefined;
    perioderBoddIUtlandet: IUtenlandsopphold[];
    settPeriodeBoddIUtlandet: (periodeBoddIUtlandet: IUtenlandsopphold[]) => void;
    oppholdsnr: number; 
}
const TextFieldMedReadme: React.FC<Props> = ({
  halvåpenTekstid,
  åpneTekstid,
  land,
  ident,
  perioderBoddIUtlandet,
  settPeriodeBoddIUtlandet,
  oppholdsnr,
}) => {
  const [harIkkeIdNummer, settHarIkkeIdNummer] = useState<boolean>(false);
  const intl = useLokalIntlContext();
  const idNummerIAnnetLandTekst = (land: ISpørsmålFelt) => {
    return (
      hentTekst('medlemskap.periodeBoddIUtlandet.utenlandskIDNummer', intl) +
      ' ' +
      land.verdi +
      '?'
    );
  };
  const settUtenlandskPersonId = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const perioderMedUtenlandskPersonId = perioderBoddIUtlandet.map(
      (utenlandsopphold, index) => {
        if (index === oppholdsnr) {
          return {
            ...utenlandsopphold,
            personIdentUtland: e.target.value,
          };
        } else {
          return utenlandsopphold;
        }
      }
    );
    perioderBoddIUtlandet &&
      settPeriodeBoddIUtlandet(perioderMedUtenlandskPersonId);
  };
  return (
    <div>
      <Label>{idNummerIAnnetLandTekst(land)}</Label>
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
        value={ident}
        disabled={harIkkeIdNummer}
      />
      <Checkbox
        checked={harIkkeIdNummer}
        onChange={() => settHarIkkeIdNummer(!harIkkeIdNummer)}
      >
        {hentTekst('medlemskap.periodeBoddIUtlandet.harIkkeIdNummer', intl)}
      </Checkbox>
    </div>
  );
};

export default TextFieldMedReadme;
