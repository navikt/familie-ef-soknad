import React, {FC} from 'react';
import classnames from 'classnames';
import SlettKnapp from '../../../../components/knapper/SlettKnapp';
import {hentTittelMedNr} from '../../../../language/utils';
import PeriodeDatovelgere from '../../../../components/dato/PeriodeDatovelger';
import {hentTekst} from '../../../../utils/søknad';
import {
    ILandMedKode,
    IUtenlandsopphold,
} from '../../../../models/steg/omDeg/medlemskap';
import {erPeriodeDatoerValgt} from '../../../../helpers/steg/omdeg';
import {EPeriode} from '../../../../models/felles/periode';
import styled from 'styled-components';
import TittelOgSlettKnapp from '../../../../components/knapper/TittelOgSlettKnapp';
import {DatoBegrensning} from '../../../../components/dato/Datovelger';
import {erPeriodeGyldigOgInnaforBegrensninger} from '../../../../components/dato/utils';
import {useLokalIntlContext} from '../../../../context/LokalIntlContext';
import {Heading, Textarea} from '@navikt/ds-react';
import SelectSpørsmål from '../../../../components/spørsmål/SelectSpørsmål';
import {ISpørsmål, ISvar} from '../../../../models/felles/spørsmålogsvar';
import {utenlandsoppholdLand} from './MedlemskapConfig';
import {TextFieldMedBredde} from "../../../../components/TextFieldMedBredde";
import TextFieldMedReadmore from "../../../../components/TextFieldMedReadmore";

const StyledTextarea = styled(Textarea)`
    width: 100%;
`;

const StyledPeriodeDatovelgere = styled(PeriodeDatovelgere)`
    padding-bottom: 0;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

interface Props {
    perioderBoddIUtlandet: IUtenlandsopphold[];
    settPeriodeBoddIUtlandet: (periodeBoddIUtlandet: IUtenlandsopphold[]) => void;
    utenlandsopphold: IUtenlandsopphold;
    oppholdsnr: number;
    land: ILandMedKode[];
    eøsLand: ILandMedKode[];
}

const Utenlandsopphold: FC<Props> = ({
                                         perioderBoddIUtlandet,
                                         settPeriodeBoddIUtlandet,
                                         oppholdsnr,
                                         utenlandsopphold,
                                         land,
                                         eøsLand,
                                     }) => {
    const {periode, begrunnelse, personidentUtland, adresseUtland} = utenlandsopphold;
    const intl = useLokalIntlContext();
    const periodeTittel = hentTittelMedNr(
        perioderBoddIUtlandet!,
        oppholdsnr,
        intl.formatMessage({
            id: 'medlemskap.periodeBoddIUtlandet.utenlandsopphold',
        })
    );
    const begrunnelseTekst = intl.formatMessage({
        id: 'medlemskap.periodeBoddIUtlandet.begrunnelse',
    });
    const sisteAdresseTekst = intl.formatMessage({
        id: 'medlemskap.periodeBoddIUtlandet.sisteAdresse',
    });

    const landConfig = utenlandsoppholdLand(land);


    const fjernUtenlandsperiode = () => {
        if (perioderBoddIUtlandet && perioderBoddIUtlandet.length > 1) {
            const utenlandsopphold = perioderBoddIUtlandet?.filter(
                (periode, index) => index !== oppholdsnr
            );
            settPeriodeBoddIUtlandet(utenlandsopphold);
        }
    };

    const settPeriode = (objektnøkkel: EPeriode, date?: string): void => {
        const endretPeriodeIUtenlandsopphold = perioderBoddIUtlandet.map(
            (utenlandsopphold, index) => {
                if (index === oppholdsnr) {
                    return {
                        ...utenlandsopphold,
                        periode: {
                            ...periode,
                            label: hentTekst('medlemskap.periodeBoddIUtlandet', intl),
                            [objektnøkkel]: {
                                label: hentTekst('periode.' + objektnøkkel, intl),
                                verdi: date ? date : '',
                            },
                        },
                    };
                } else {
                    return utenlandsopphold;
                }
            }
        );
        perioderBoddIUtlandet &&
        endretPeriodeIUtenlandsopphold &&
        settPeriodeBoddIUtlandet(endretPeriodeIUtenlandsopphold);
    };

    const settLand = (spørsmål: ISpørsmål, svar: ISvar) => {
        const periodeMedNyttLand = perioderBoddIUtlandet.map(
            (utenlandsopphold, index) => {
                if (index === oppholdsnr) {
                    const oppdatertUtenlandsopphold = {
                        ...utenlandsopphold,
                        land: {
                            spørsmålid: spørsmål.søknadid,
                            svarid: svar.id,
                            label: intl.formatMessage({id: spørsmål.tekstid}),
                            verdi: svar.svar_tekst,
                        },
                    };

                    if (!erEøsLand(svar.id)) {
                        oppdatertUtenlandsopphold.adresseUtland = {
                            ...oppdatertUtenlandsopphold.adresseUtland,
                            verdi: '',
                            label: oppdatertUtenlandsopphold.adresseUtland?.label || '',
                        };
                    }
                    return oppdatertUtenlandsopphold;
                } else {
                    return utenlandsopphold;
                }
            }
        );
        perioderBoddIUtlandet && settPeriodeBoddIUtlandet(periodeMedNyttLand);
    };

    const tekstMedLandVerdi = (tekst: string): string => {
        for (let i = 0; i < perioderBoddIUtlandet.length; i++) {
            const utenlandsopphold = perioderBoddIUtlandet[i];
            if (i === oppholdsnr && utenlandsopphold.land !== undefined) {
                return tekst + " " + utenlandsopphold.land.verdi;
            }
        }
        return "";
    };

    const settFeltNavn = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, feltnavn: string, label: string,
    ): void => {
        const perioderMedUtenlandskPersonId = perioderBoddIUtlandet.map(
            (utenlandsopphold, index) => {
                if (index === oppholdsnr && utenlandsopphold.land !== undefined) {
                    return {
                        ...utenlandsopphold,
                        [feltnavn]: {label: label, verdi: e.target.value},
                    };
                } else {
                    return utenlandsopphold;
                }
            }
        );
        perioderBoddIUtlandet &&
        settPeriodeBoddIUtlandet(perioderMedUtenlandskPersonId);
    };

    const erEøsLand = (landId: string): boolean => {
        return eøsLand.some(land => land.id === landId);
    }

    return (
        <Container aria-live="polite">
            <TittelOgSlettKnapp>
                <Heading size="small" level="3" className={'tittel'}>
                    {periodeTittel}
                </Heading>
                <SlettKnapp
                    className={classnames('slettknapp', {
                        kunEn: perioderBoddIUtlandet?.length === 1,
                    })}
                    onClick={() => fjernUtenlandsperiode()}
                    tekstid={'medlemskap.periodeBoddIUtlandet.slett'}
                />
            </TittelOgSlettKnapp>

            <StyledPeriodeDatovelgere
                className={'periodegruppe'}
                settDato={settPeriode}
                periode={utenlandsopphold.periode}
                tekst={hentTekst('medlemskap.periodeBoddIUtlandet', intl)}
                datobegrensning={DatoBegrensning.TidligereDatoer}
            />
            <SelectSpørsmål
                spørsmål={landConfig}
                settSpørsmålOgSvar={settLand}
                valgtSvarId={perioderBoddIUtlandet[oppholdsnr].land?.svarid}
                skalLogges={false}
            />
            {erPeriodeDatoerValgt(utenlandsopphold.periode) &&
                erPeriodeGyldigOgInnaforBegrensninger(
                    utenlandsopphold.periode,
                    DatoBegrensning.TidligereDatoer
                ) &&
                utenlandsopphold.land?.hasOwnProperty('verdi') && (
                    <StyledTextarea
                        label={begrunnelseTekst}
                        placeholder={'...'}
                        value={begrunnelse.verdi}
                        maxLength={1000}
                        autoComplete={'off'}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            settFeltNavn(e, "begrunnelse", begrunnelseTekst)
                        }
                    />
                )}

            {begrunnelse.verdi && utenlandsopphold.land && erEøsLand(utenlandsopphold.land.svarid) &&
                <TextFieldMedReadmore
                    halvåpenTekstid={hentTekst('medlemskap.hjelpetekst-åpne.begrunnelse', intl)}
                    åpneTekstid={hentTekst('medlemskap.hjelpetekst-innhold.begrunnelse', intl)}
                    land={utenlandsopphold.land}
                    perioderBoddIUtlandet={perioderBoddIUtlandet}
                    settPeriodeBoddIUtlandet={settPeriodeBoddIUtlandet}
                    oppholdsnr={oppholdsnr}
                />
            }
            {(begrunnelse.verdi && personidentUtland?.verdi || !utenlandsopphold.harPersonidentUtland)
                && utenlandsopphold.land && erEøsLand(utenlandsopphold.land.svarid) &&
                <TextFieldMedBredde
                    className={'inputfelt-tekst'}
                    key={'navn'}
                    label={tekstMedLandVerdi(sisteAdresseTekst)}
                    type="text"
                    bredde={'L'}
                    onChange={(e) => settFeltNavn(e, "adresseUtland", tekstMedLandVerdi(sisteAdresseTekst))}
                    value={adresseUtland?.verdi}
                />
            }
        </Container>
    );
};

export default Utenlandsopphold;
