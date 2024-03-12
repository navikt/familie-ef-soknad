import React, {useEffect, useState} from 'react';
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
    perioderBoddIUtlandet: IUtenlandsopphold[];
    settPeriodeBoddIUtlandet: (periodeBoddIUtlandet: IUtenlandsopphold[]) => void;
    oppholdsnr: number;
}

const TextFieldMedReadme: React.FC<Props> = ({
                                                 halvåpenTekstid,
                                                 åpneTekstid,
                                                 land,
                                                 perioderBoddIUtlandet,
                                                 settPeriodeBoddIUtlandet,
                                                 oppholdsnr,
                                             }) => {
    const [harIkkeIdNummer, settHarIkkeIdNummer] = useState<boolean>(false);
    const [ident, settIdent] = useState<string | undefined>('');

    const intl = useLokalIntlContext();
    useEffect(() => {
        if (harIkkeIdNummer) {
            settIdent('');
        }
    }, [harIkkeIdNummer]);

    const hentTekstMedLandVerdi = (tekst: string) => {
        return (
            hentTekst(tekst, intl) +
        ' ' +
        land.verdi
        );
    };
    const tekstMedLandVerdi = hentTekstMedLandVerdi('medlemskap.periodeBoddIUtlandet.utenlandskIDNummer') + '?';
    const harIkkeUtenlandsPersonIdTekst = hentTekstMedLandVerdi('medlemskap.periodeBoddIUtlandet.harIkkeIdNummer');
    const settUtenlandskPersonId = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const perioderMedUtenlandskPersonId = perioderBoddIUtlandet.map(
            (utenlandsopphold, index) => {
                if (index === oppholdsnr) {
                    settIdent(e.target.value);
                    return {
                        ...utenlandsopphold,
                        personidentUtland: {label: tekstMedLandVerdi, verdi: e.target.value},
                        adresseUtland: e.target.value === '' ? {label: '', verdi: ''} : utenlandsopphold.adresseUtland,
                    };
                } else {
                    return utenlandsopphold;
                }
            }
        );
        perioderBoddIUtlandet &&
        settPeriodeBoddIUtlandet(perioderMedUtenlandskPersonId);
    };
    const settHarPersonidUtland = (): void => {
        settHarIkkeIdNummer(prevState => !prevState);
        const perioderMedUtenlandskPersonId = perioderBoddIUtlandet.map(
            (utenlandsopphold, index) => {
                if (index === oppholdsnr) {
                    return {
                        ...utenlandsopphold,
                        harPersonidentUtland: harIkkeIdNummer,
                        personidentUtland: harIkkeIdNummer ? { label: '', verdi: '' } : utenlandsopphold.personidentUtland,
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
                value={ident}
                disabled={harIkkeIdNummer}
                maxLength={32}
            />
            <Checkbox
                checked={harIkkeIdNummer}
                onChange={() => settHarPersonidUtland()}
            >
                {harIkkeUtenlandsPersonIdTekst}
            </Checkbox>
        </div>
    );
};

export default TextFieldMedReadme;
