import React, { FC, useEffect } from 'react';
import { Element } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../language/LocaleTekst';
import { injectIntl, IntlShape } from 'react-intl';
import useSøknadContext from '../../../../context/SøknadContext';
import KnappBase from 'nav-frontend-knapper';
import KomponentGruppe from '../../../../components/KomponentGruppe';
import FeltGruppe from '../../../../components/FeltGruppe';
import { IUtenlandsopphold } from '../../../../models/søknad';
import Utenlandsopphold from './Utenlandsopphold';
import { dagensDato } from '../../../../utils/dato';

interface Props {
  intl: IntlShape;
}

const PeriodeBoddIUtlandet: FC<Props> = ({ intl }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { perioderBoddIUtlandet } = søknad;
  const nyPeriode = {
    periode: { fra: dagensDato, til: dagensDato },
    ugyldig: false,
    begrunnelse: '',
  };

  useEffect(() => {
    settSøknad({
      ...søknad,
      perioderBoddIUtlandet: [nyPeriode],
    });
    // eslint-disable-next-line
  }, []);

  const leggTilUtenlandsperiode = () => {
    const nyttUtenlandsopphold: IUtenlandsopphold = nyPeriode;
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
            <Utenlandsopphold utenlandsopphold={periode} oppholdsnr={index} />
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
