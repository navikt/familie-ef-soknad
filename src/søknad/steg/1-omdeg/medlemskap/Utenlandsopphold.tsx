import React, { FC } from 'react';
import classnames from 'classnames';
import SlettKnapp from '../../../../components/knapper/SlettKnapp';
import { hentTittelMedNr } from '../../../../language/utils';
import PeriodeDatovelgere from '../../../../components/dato/PeriodeDatovelger';
import { hentTekst } from '../../../../utils/søknad';
import {
  ILandMedKode,
  IUtenlandsopphold,
} from '../../../../models/steg/omDeg/medlemskap';
import { erPeriodeDatoerValgt } from '../../../../helpers/steg/omdeg';
import { EPeriode } from '../../../../models/felles/periode';
import styled from 'styled-components';
import TittelOgSlettKnapp from '../../../../components/knapper/TittelOgSlettKnapp';
import { DatoBegrensning } from '../../../../components/dato/Datovelger';
import { erPeriodeGyldigOgInnaforBegrensninger } from '../../../../components/dato/utils';
import { useLokalIntlContext } from '../../../../context/LokalIntlContext';
import { Heading, Textarea } from '@navikt/ds-react';
import SelectSpørsmål from '../../../../components/spørsmål/SelectSpørsmål';
import { ISpørsmål, ISvar } from '../../../../models/felles/spørsmålogsvar';
import { utenlandsoppholdLand } from './MedlemskapConfig';
import { TextFieldMedBredde } from '../../../../components/TextFieldMedBredde';
import EøsIdent from '../../../../components/EøsIdent';
import { ITekstFelt } from '../../../../models/søknad/søknadsfelter';
import { stringHarVerdiOgErIkkeTom } from '../../../../utils/typer';

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
}
const Utenlandsopphold: FC<Props> = ({
  perioderBoddIUtlandet,
  settPeriodeBoddIUtlandet,
  oppholdsnr,
  utenlandsopphold,
  land,
}) => {
  const { periode, begrunnelse, personidentUtland, adresseUtland } =
    utenlandsopphold;
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

  const tekstMedLandVerdi = (tekst: string): string => {
    if (utenlandsopphold.land) {
      return tekst + ' ' + utenlandsopphold.land.verdi;
    }
    return '';
  };

  const fjernUtenlandsperiode = () => {
    if (perioderBoddIUtlandet && perioderBoddIUtlandet.length > 1) {
      const utenlandsopphold = perioderBoddIUtlandet?.filter(
        (periode, index) => index !== oppholdsnr
      );
      settPeriodeBoddIUtlandet(utenlandsopphold);
    }
  };

  const settPeriode = (objektnøkkel: EPeriode, date?: string): void => {
    const oppdatertUtenlandsopphold = {
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

    oppdaterUtenlandsopphold(oppdatertUtenlandsopphold);
  };

  const settLand = (spørsmål: ISpørsmål, svar: ISvar) => {
    const oppdatertUtenlandsopphold = {
      ...utenlandsopphold,
      land: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: intl.formatMessage({ id: spørsmål.tekstid }),
        verdi: svar.svar_tekst,
      },
      erEøsLand: land.find((l) => l.id === svar.id)?.erEøsland || false,
      personidentUtland: { label: '', verdi: '' },
      adresseUtland: { label: '', verdi: '' },
      kanIkkeOppgiPersonident: undefined,
    };

    oppdaterUtenlandsopphold(oppdatertUtenlandsopphold);
  };

  const settFeltNavn = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    feltnavn: string,
    label: string
  ): void => {
    const oppdatertUtenlandsopphold: IUtenlandsopphold = {
      ...utenlandsopphold,
      [feltnavn]: { label: label, verdi: e.target.value },
    };
    oppdaterUtenlandsopphold(oppdatertUtenlandsopphold);
  };

  const oppdaterUtenlandsopphold = (
    oppdatertUtenlandsopphold: IUtenlandsopphold
  ) => {
    const perioderMedUtenlandskPersonId = perioderBoddIUtlandet.map(
      (utenlandsopphold, index) =>
        index === oppholdsnr ? oppdatertUtenlandsopphold : utenlandsopphold
    );
    settPeriodeBoddIUtlandet(perioderMedUtenlandskPersonId);
  };

  const skalVisePersonidentTekstfelt = (
    utenlandsopphold: IUtenlandsopphold
  ) => {
    return (
      utenlandsopphold.land &&
      utenlandsopphold.erEøsLand &&
      stringHarVerdiOgErIkkeTom(utenlandsopphold.begrunnelse.verdi)
    );
  };

  const skalViseAdresseTekstfelt = (utenlandsopphold: IUtenlandsopphold) => {
    return (
      skalVisePersonidentTekstfelt(utenlandsopphold) &&
      (stringHarVerdiOgErIkkeTom(
        utenlandsopphold.personidentUtland?.verdi.trim()
      ) ||
        utenlandsopphold.kanIkkeOppgiPersonident)
    );
  };

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
              settFeltNavn(e, 'begrunnelse', begrunnelseTekst)
            }
          />
        )}

      {utenlandsopphold.land &&
        skalVisePersonidentTekstfelt(utenlandsopphold) && (
          <EøsIdent
            halvåpenTekstid={hentTekst(
              'medlemskap.hjelpetekst-åpne.begrunnelse',
              intl
            )}
            åpneTekstid={hentTekst(
              'medlemskap.hjelpetekst-innhold.begrunnelse',
              intl
            )}
            land={utenlandsopphold.land}
            utenlandsopphold={utenlandsopphold}
            settUtenlandsopphold={(oppdatertUtenlandsopphold) =>
              oppdaterUtenlandsopphold(oppdatertUtenlandsopphold)
            }
            oppholdsnr={oppholdsnr}
          />
        )}
      {skalViseAdresseTekstfelt(utenlandsopphold) && (
        <TextFieldMedBredde
          className={'inputfelt-tekst'}
          key={'navn'}
          label={tekstMedLandVerdi(sisteAdresseTekst)}
          type="text"
          bredde={'L'}
          onChange={(e) =>
            settFeltNavn(
              e,
              'adresseUtland',
              tekstMedLandVerdi(sisteAdresseTekst)
            )
          }
          value={adresseUtland?.verdi}
        />
      )}
    </Container>
  );
};

export default Utenlandsopphold;
