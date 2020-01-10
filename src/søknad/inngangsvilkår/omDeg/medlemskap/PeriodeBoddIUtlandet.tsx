import React, { FC, useEffect } from 'react';
import { Element } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../language/LocaleTekst';
import { injectIntl, IntlShape } from 'react-intl';
import useSøknadContext from '../../../../context/SøknadContext';
import Utenlandsperiode from './Utenlandsperiode';
import KnappBase from 'nav-frontend-knapper';
import KomponentGruppe from '../../../../components/KomponentGruppe';
import FeltGruppe from '../../../../components/FeltGruppe';
import { IPeriode } from '../../../../models/søknad';

interface Props {
  intl: IntlShape;
}

const PeriodeBoddIUtlandet: FC<Props> = ({ intl }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { perioderBoddIUtlandet } = søknad;
  const nyPeriode = { fra: '', til: '', ugyldig: false, begrunnelse: '' };

  useEffect(() => {
    settSøknad({
      ...søknad,
      perioderBoddIUtlandet: [nyPeriode],
    });
    // eslint-disable-next-line
  }, []);

  const leggTilUtenlandsperiode = () => {
    const nyttUtenlandsopphold: IPeriode = nyPeriode;
    const alleUtenlandsopphold = perioderBoddIUtlandet;
    alleUtenlandsopphold && alleUtenlandsopphold.push(nyttUtenlandsopphold);
    alleUtenlandsopphold &&
      settSøknad({ ...søknad, perioderBoddIUtlandet: alleUtenlandsopphold });
  };

  return (
    <>
      {perioderBoddIUtlandet?.map((periode, index) => {
        return (
          <KomponentGruppe key={index}>
            <Utenlandsperiode nummer={index} periode={periode} />
          </KomponentGruppe>
        );
      })}
      <KomponentGruppe>
        <Element>
          <LocaleTekst
            tekst={'medlemskap.periodeBoddIUtlandet.flereutenlandsopphold'}
          />
        </Element>
        <FeltGruppe>
          <KnappBase
            type={'standard'}
            onClick={() => leggTilUtenlandsperiode()}
          >
            <LocaleTekst tekst={'medlemskap.periodeBoddIUtlandet.knapp'} />
          </KnappBase>
        </FeltGruppe>
      </KomponentGruppe>
    </>
  );
};
export default injectIntl(PeriodeBoddIUtlandet);
