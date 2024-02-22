import React, {Dispatch, SetStateAction, useState} from 'react';
import {Checkbox, Label, ReadMore} from '@navikt/ds-react';
import {TextFieldMedBredde} from "./TextFieldMedBredde";
import {hentTekst} from "../utils/søknad";
import {useLokalIntlContext} from "../context/LokalIntlContext";
import {ISpørsmålFelt} from "../models/søknad/søknadsfelter";

interface Props {
    halvåpenTekstid: string;
    åpneTekstid: string;
    land: ISpørsmålFelt;
    ident: string;
    settIdent: Dispatch<SetStateAction<string>>;
}
const TextFieldMedReadme: React.FC<Props> = ({
                                                 halvåpenTekstid,
                                                 åpneTekstid,
                                                 land,
                                                 ident,
                                                 settIdent,
                                             }) => {
    const [harIkkeIdNummer, settHarIkkeIdNummer] = useState<boolean>(false);
    const intl = useLokalIntlContext();
    const idNummerIAnnetLandTekst = (land: ISpørsmålFelt) => {
        return hentTekst('medlemskap.periodeBoddIUtlandet.utenlandskIDNummer', intl) + ' ' + land.verdi + '?';
    }
    return (
        <div>
            <Label>{idNummerIAnnetLandTekst(land)}</Label>
            <ReadMore size={"small"} header={halvåpenTekstid}>{åpneTekstid}</ReadMore>
            <TextFieldMedBredde
                className={'inputfelt-tekst'}
                key={'navn'}
                label={"label"}
                hideLabel={true}
                type="text"
                bredde={'L'}
                onChange={(e) => settIdent(e.target.value)}
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
