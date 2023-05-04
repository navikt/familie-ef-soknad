import React, { FC, useEffect } from 'react';
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
import styled from 'styled-components/macro';
import TittelOgSlettKnapp from '../../../../components/knapper/TittelOgSlettKnapp';
import { DatoBegrensning } from '../../../../components/dato/Datovelger';
import { erPeriodeGyldigOgInnaforBegrensninger } from '../../../../components/dato/utils';
import { useLokalIntlContext } from '../../../../context/LokalIntlContext';
import { Heading, Select, Textarea } from '@navikt/ds-react';
import SelectSpørsmål from '../../../../components/spørsmål/SelectSpørsmål';
import { ISpørsmål, ISvar } from '../../../../models/felles/spørsmålogsvar';
import { utenlandsoppholdLand } from './MedlemskapConfig';

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
  const { periode, begrunnelse } = utenlandsopphold;
  const intl = useLokalIntlContext();
  const begrunnelseTekst = intl.formatMessage({
    id: 'medlemskap.periodeBoddIUtlandet.begrunnelse',
  });

  const periodeTittel = hentTittelMedNr(
    perioderBoddIUtlandet!,
    oppholdsnr,
    intl.formatMessage({
      id: 'medlemskap.periodeBoddIUtlandet.utenlandsopphold',
    })
  );

  const landConfig = utenlandsoppholdLand(land);

  const fjernUtenlandsperiode = () => {
    if (perioderBoddIUtlandet && perioderBoddIUtlandet.length > 1) {
      const utenlandsopphold = perioderBoddIUtlandet?.filter(
        (periode, index) => index !== oppholdsnr
      );
      settPeriodeBoddIUtlandet(utenlandsopphold);
    }
  };

  const settBegrunnelse = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const perioderMedNyBegrunnelse = perioderBoddIUtlandet.map(
      (utenlandsopphold, index) => {
        if (index === oppholdsnr) {
          return {
            ...utenlandsopphold,
            begrunnelse: { label: begrunnelseTekst, verdi: e.target.value },
          };
        } else {
          return utenlandsopphold;
        }
      }
    );
    perioderBoddIUtlandet && settPeriodeBoddIUtlandet(perioderMedNyBegrunnelse);
  };

  const settPeriode = (date: string, objektnøkkel: EPeriode): void => {
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
                verdi: date,
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
          return {
            ...utenlandsopphold,
            land: {
              spørsmålid: spørsmål.søknadid,
              svarid: svar.id,
              label: intl.formatMessage({ id: spørsmål.tekstid }),
              verdi: svar.svar_tekst,
            },
          };
        } else {
          return utenlandsopphold;
        }
      }
    );
    perioderBoddIUtlandet && settPeriodeBoddIUtlandet(periodeMedNyttLand);
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
              settBegrunnelse(e)
            }
          />
        )}
    </Container>
  );
};

export default Utenlandsopphold;
