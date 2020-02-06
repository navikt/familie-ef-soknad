import React, { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Textarea } from 'nav-frontend-skjema';
import useSøknadContext from '../../../../context/SøknadContext';
import { Undertittel } from 'nav-frontend-typografi';
import classnames from 'classnames';
import SlettKnapp from '../../../../components/knapper/SlettKnapp';
import { compareAsc } from 'date-fns';
import { hentPeriodeTittelMedTall } from '../../../../language/utils';
import { IUtenlandsopphold } from '../../../../models/omDeg';
import PeriodeDatovelgere from '../../../../components/dato/PeriodeDatovelger';

interface Props {
  utenlandsopphold: IUtenlandsopphold;
  oppholdsnr: number;
}

const Utenlandsopphold: FC<Props> = ({ oppholdsnr, utenlandsopphold }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { perioderBoddIUtlandet } = søknad.medlemskap;
  const { periode, begrunnelse } = utenlandsopphold;
  const intl = useIntl();
  const [feilmelding, settFeilmelding] = useState('');
  const hentTekst = (id: string) => intl.formatMessage({ id: id });
  const begrunnelseTekst = intl.formatMessage({
    id: 'medlemskap.periodeBoddIUtlandet.begrunnelse',
  });

  const periodeTittel = hentPeriodeTittelMedTall(
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

  const sammenlignDatoerOgOppdaterFeilmelding = (fom: Date, tom: Date) => {
    const val = compareAsc(fom, tom);
    val === 1
      ? settFeilmelding('datovelger.periode.feilFormat')
      : val === 0
      ? settFeilmelding('datovelger.periode.likeDatoer')
      : settFeilmelding('');
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
                label: hentTekst('periode.' + objektnøkkel),
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

  useEffect(() => {
    sammenlignDatoerOgOppdaterFeilmelding(
      utenlandsopphold.periode.fra.verdi,
      utenlandsopphold.periode.til.verdi
    );
  });

  return (
    <div className="utenlandsopphold utenlandsopphold__container">
      <Undertittel className={'utenlandsopphold__tittel'}>
        {periodeTittel}
      </Undertittel>
      <SlettKnapp
        className={classnames('utenlandsopphold__slettknapp', {
          kunEttUtenlandsopphold: perioderBoddIUtlandet?.length === 1,
        })}
        onClick={() => fjernUtenlandsperiode()}
        tekstid={'medlemskap.periodeBoddIUtlandet.slett'}
      />

      <PeriodeDatovelgere
        settDato={settPeriode}
        periode={utenlandsopphold.periode}
        tekstid={'medlemskap.periodeBoddIUtlandet'}
        feilmelding={feilmelding}
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
