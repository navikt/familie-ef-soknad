import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { Textarea } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import classnames from 'classnames';
import SlettKnapp from '../../../../components/knapper/SlettKnapp';
import { hentTittelMedNr } from '../../../../language/utils';
import PeriodeDatovelgere from '../../../../components/dato/PeriodeDatovelger';
import { hentTekst } from '../../../../utils/søknad';
import { IUtenlandsopphold } from '../../../../models/steg/omDeg/medlemskap';
import { datoTilStreng } from '../../../../utils/dato';
import { erPeriodeDatoerValgt } from '../../../../helpers/steg/omdeg';
import { EPeriode } from '../../../../models/felles/periode';

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
  const intl = useIntl();
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

  const settPeriode = (date: Date | null, objektnøkkel: EPeriode): void => {
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
                verdi: date !== null ? datoTilStreng(date) : undefined,
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
    <div className="utenlandsopphold utenlandsopphold__container">
      <Undertittel className={'utenlandsopphold__tittel'}>
        {periodeTittel}
      </Undertittel>
      <SlettKnapp
        className={classnames('utenlandsopphold__slettknapp', {
          kunEn: perioderBoddIUtlandet?.length === 1,
        })}
        onClick={() => fjernUtenlandsperiode()}
        tekstid={'medlemskap.periodeBoddIUtlandet.slett'}
      />

      <PeriodeDatovelgere
        settDato={settPeriode}
        periode={utenlandsopphold.periode}
        tekst={hentTekst('medlemskap.periodeBoddIUtlandet', intl)}
      />
      {erPeriodeDatoerValgt(utenlandsopphold.periode) && (
        <Textarea
          label={begrunnelseTekst}
          placeholder={'...'}
          value={begrunnelse.verdi}
          maxLength={1000}
          onChange={(e) => settBegrunnelse(e)}
        />
      )}
    </div>
  );
};

export default Utenlandsopphold;
