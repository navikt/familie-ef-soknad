import React, { FC } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import classnames from 'classnames';
import SlettKnapp from '../../../../components/knapper/SlettKnapp';
import { hentTittelMedNr } from '../../../../language/utils';
import PeriodeDatovelgere from '../../../../components/dato/PeriodeDatovelger';
import { hentTekst } from '../../../../utils/søknad';
import { IUtenlandsopphold } from '../../../../models/steg/omDeg/medlemskap';
import { erPeriodeDatoerValgt } from '../../../../helpers/steg/omdeg';
import { EPeriode } from '../../../../models/felles/periode';
import styled from 'styled-components/macro';
import TittelOgSlettKnapp from '../../../../components/knapper/TittelOgSlettKnapp';
import { DatoBegrensning } from '../../../../components/dato/Datovelger';
import { erPeriodeGyldigOgInnaforBegrensninger } from '../../../../components/dato/utils';
import { useLokalIntlContext } from '../../../../context/LokalIntlContext';
import { Heading } from '@navikt/ds-react';

const StyledTextarea = styled(Textarea)`
  width: 100%;
`;

interface Props {
  perioderBoddIUtlandet: IUtenlandsopphold[];
  settPeriodeBoddIUtlandet: (periodeBoddIUtlandet: IUtenlandsopphold[]) => void;
  utenlandsopphold: IUtenlandsopphold;
  oppholdsnr: number;
}

const Utenlandsopphold: FC<Props> = ({
  perioderBoddIUtlandet,
  settPeriodeBoddIUtlandet,
  oppholdsnr,
  utenlandsopphold,
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

  const fjernUtenlandsperiode = () => {
    if (perioderBoddIUtlandet && perioderBoddIUtlandet.length > 1) {
      const utenlandsopphold = perioderBoddIUtlandet?.filter(
        (periode, index) => index !== oppholdsnr
      );
      settPeriodeBoddIUtlandet(utenlandsopphold);
    }
  };
  const settBegrunnelse = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const perioderMedNyBegrunnelse = perioderBoddIUtlandet?.map(
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
    const endretPeriodeIUtenlandsopphold = perioderBoddIUtlandet?.map(
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

  return (
    <div aria-live="polite">
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

      <PeriodeDatovelgere
        className={'periodegruppe'}
        settDato={settPeriode}
        periode={utenlandsopphold.periode}
        tekst={hentTekst('medlemskap.periodeBoddIUtlandet', intl)}
        datobegrensning={DatoBegrensning.TidligereDatoer}
      />
      {erPeriodeDatoerValgt(utenlandsopphold.periode) &&
        erPeriodeGyldigOgInnaforBegrensninger(
          utenlandsopphold.periode,
          DatoBegrensning.TidligereDatoer
        ) && (
          <StyledTextarea
            label={begrunnelseTekst}
            placeholder={'...'}
            value={begrunnelse.verdi}
            maxLength={1000}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              settBegrunnelse(e)
            }
          />
        )}
    </div>
  );
};

export default Utenlandsopphold;
