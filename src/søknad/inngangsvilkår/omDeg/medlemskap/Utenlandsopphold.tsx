import React, { FC } from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { Textarea } from 'nav-frontend-skjema';
import LocaleTekst from '../../../../language/LocaleTekst';
import useSøknadContext from '../../../../context/SøknadContext';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { IUtenlandsopphold } from '../../../../models/søknad';
import { Flatknapp } from 'nav-frontend-knapper';
import { ReactComponent as Slett } from '../../../../assets/Slett.svg';
import classnames from 'classnames';
import FeltGruppe from '../../../../components/FeltGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';

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

  console.log(utenlandsopphold);

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

  const periodeTittel =
    intl.formatMessage({
      id: 'medlemskap.periodeBoddIUtlandet.utenlandsopphold',
    }) +
    ' ' +
    (oppholdsnr + 1);

  return (
    <div className="utenlandsopphold utenlandsopphold__container">
      <Undertittel className={'utenlandsopphold__tittel'}>
        {periodeTittel}
      </Undertittel>
      <Flatknapp
        className={classnames('utenlandsopphold__slettknapp', {
          kunEttUtenlandsopphold: perioderBoddIUtlandet?.length === 1,
        })}
        onClick={() => fjernUtenlandsperiode()}
      >
        <span>
          {intl.formatMessage({ id: 'medlemskap.periodeBoddIUtlandet.slett' })}
        </span>
        <Slett />
      </Flatknapp>

      <div className={'utenlandsopphold__periodegruppe'}>
        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'medlemskap.periodeBoddIUtlandet'} />
          </Element>
        </FeltGruppe>
        <FeltGruppe>
          <Datovelger
            settDato={(e) => settPeriode(e, 'fra')}
            valgtDato={utenlandsopphold.periode.fra ? periode.fra : undefined}
            tekstid={'periode.fra'}
            datobegrensning={DatoBegrensning.AlleDatoer}
          />
        </FeltGruppe>
        <FeltGruppe>
          <Datovelger
            settDato={(e) => settPeriode(e, 'til')}
            valgtDato={periode.til ? periode.til : undefined}
            tekstid={'periode.til'}
            datobegrensning={DatoBegrensning.AlleDatoer}
          />
        </FeltGruppe>
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
