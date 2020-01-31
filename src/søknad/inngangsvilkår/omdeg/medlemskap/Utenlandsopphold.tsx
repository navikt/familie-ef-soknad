import React, { FC, useEffect, useState } from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { Textarea } from 'nav-frontend-skjema';
import LocaleTekst from '../../../../language/LocaleTekst';
import useSøknadContext from '../../../../context/SøknadContext';
import { Element, Undertittel } from 'nav-frontend-typografi';
import classnames from 'classnames';
import FeltGruppe from '../../../../components/FeltGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';
import SlettKnapp from '../../../../components/knapper/SlettKnapp';
import Feilmelding from '../../../../components/feil/Feilmelding';
import classNames from 'classnames';
import { compareAsc } from 'date-fns';
import { hentPeriodeTittelMedTall } from '../../../../language/utils';
import { IUtenlandsopphold } from '../../../../models/omDeg';

interface Props {
  utenlandsopphold: IUtenlandsopphold;
  oppholdsnr: number;
  intl: IntlShape;
}

const Utenlandsopphold: FC<Props> = ({
  oppholdsnr,
  utenlandsopphold,
  intl,
}) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { perioderBoddIUtlandet } = søknad;
  const { periode, begrunnelse } = utenlandsopphold;
  const [feilmelding, settFeilmelding] = useState('');

  const fjernUtenlandsperiode = () => {
    if (perioderBoddIUtlandet && perioderBoddIUtlandet.length > 1) {
      const utenlandsopphold = perioderBoddIUtlandet?.filter(
        (periode, index) => index !== oppholdsnr
      );
      settSøknad({ ...søknad, perioderBoddIUtlandet: utenlandsopphold });
    }
  };
  const settBegrunnelse = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const perioderMedNyBegrunnelse = perioderBoddIUtlandet?.map(
      (utenlandsopphold, index) => {
        if (index === oppholdsnr) {
          return {
            ...utenlandsopphold,
            begrunnelse: e.target.value,
          };
        } else {
          return utenlandsopphold;
        }
      }
    );
    perioderBoddIUtlandet &&
      settSøknad({
        ...søknad,
        perioderBoddIUtlandet: perioderMedNyBegrunnelse,
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
  useEffect(() => {
    sammenlignDatoerOgOppdaterFeilmelding(
      utenlandsopphold.periode.fra,
      utenlandsopphold.periode.til
    );
  });
  const settPeriode = (date: Date | null, objektnøkkel: string): void => {
    const endretPeriodeIUtenlandsopphold = perioderBoddIUtlandet?.map(
      (utenlandsopphold, index) => {
        if (index === oppholdsnr) {
          return {
            ...utenlandsopphold,
            periode: {
              ...periode,
              [objektnøkkel]: date !== null ? date : undefined,
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
        perioderBoddIUtlandet: endretPeriodeIUtenlandsopphold,
      });
  };

  const periodeTittel = hentPeriodeTittelMedTall(
    perioderBoddIUtlandet!,
    oppholdsnr,
    intl.formatMessage({
      id: 'medlemskap.periodeBoddIUtlandet.utenlandsopphold',
    })
  );

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

      <FeltGruppe classname={'utenlandsopphold__spørsmål'}>
        <Element>
          <LocaleTekst tekst={'medlemskap.periodeBoddIUtlandet'} />
        </Element>
      </FeltGruppe>

      <div className={'utenlandsopphold__periodegruppe'}>
        <Datovelger
          settDato={(e) => settPeriode(e, 'fra')}
          valgtDato={utenlandsopphold.periode.fra ? periode.fra : undefined}
          tekstid={'periode.fra'}
          datobegrensning={DatoBegrensning.TidligereDatoer}
        />

        <Datovelger
          settDato={(e) => settPeriode(e, 'til')}
          valgtDato={periode.til ? periode.til : undefined}
          tekstid={'periode.til'}
          datobegrensning={DatoBegrensning.TidligereDatoer}
        />
        {feilmelding !== '' ? (
          <div
            className={classNames('datovelger__feilmelding ', {
              gjemFeilmelding: feilmelding === '',
            })}
          >
            <Feilmelding tekstid={feilmelding} />
          </div>
        ) : null}
      </div>

      <Textarea
        label={intl.formatMessage({
          id: 'medlemskap.periodeBoddIUtlandet.begrunnelse',
        })}
        placeholder={'...'}
        value={begrunnelse}
        maxLength={1000}
        onChange={(e) => settBegrunnelse(e)}
      />
    </div>
  );
};

export default injectIntl(Utenlandsopphold);
