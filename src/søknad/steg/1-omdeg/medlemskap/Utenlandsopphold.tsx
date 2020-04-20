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
import { useSøknad } from '../../../../context/SøknadContext';

interface Props {
  utenlandsopphold: IUtenlandsopphold;
  oppholdsnr: number;
}

const Utenlandsopphold: FC<Props> = ({ oppholdsnr, utenlandsopphold }) => {
  const { søknad, settSøknad } = useSøknad();
  const { perioderBoddIUtlandet } = søknad.medlemskap;
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
      settSøknad({
        ...søknad,
        medlemskap: {
          ...søknad.medlemskap,
          perioderBoddIUtlandet: utenlandsopphold,
        },
      });
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
    perioderBoddIUtlandet &&
      settSøknad({
        ...søknad,
        medlemskap: {
          ...søknad.medlemskap,
          perioderBoddIUtlandet: perioderMedNyBegrunnelse,
        },
      });
  };

  const settPeriode = (date: Date | null, objektnøkkel: string): void => {
    const endretPeriodeIUtenlandsopphold = perioderBoddIUtlandet?.map(
      (utenlandsopphold, index) => {
        if (index === oppholdsnr) {
          return {
            ...utenlandsopphold,
            periode: {
              ...periode,
              [objektnøkkel]: {
                label: hentTekst('periode.' + objektnøkkel, intl),
                verdi: date !== null ? date : undefined,
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
      settSøknad({
        ...søknad,
        medlemskap: {
          ...søknad.medlemskap,
          perioderBoddIUtlandet: endretPeriodeIUtenlandsopphold,
        },
      });
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
        tekstid={'medlemskap.periodeBoddIUtlandet'}
      />

      <Textarea
        label={begrunnelseTekst}
        placeholder={'...'}
        value={begrunnelse.verdi}
        maxLength={1000}
        onChange={(e) => settBegrunnelse(e)}
      />
    </div>
  );
};

export default Utenlandsopphold;
