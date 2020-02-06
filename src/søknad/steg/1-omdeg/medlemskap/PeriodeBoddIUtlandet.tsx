import React, { FC, useEffect } from 'react';
import { Element } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../language/LocaleTekst';
import { useIntl } from 'react-intl';
import useSøknadContext from '../../../../context/SøknadContext';
import KnappBase from 'nav-frontend-knapper';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import Utenlandsopphold from './Utenlandsopphold';
import { dagensDato } from '../../../../utils/dato';
import subDays from 'date-fns/subDays';
import { IUtenlandsopphold } from '../../../../models/omDeg';

const PeriodeBoddIUtlandet: FC = () => {
  const { søknad, settSøknad } = useSøknadContext();
  const { perioderBoddIUtlandet } = søknad.medlemskap;
  const intl = useIntl();
  const hentTekst = (id: string) => intl.formatMessage({ id: id });

  const nyPeriode = {
    periode: {
      fra: { label: hentTekst('periode.fra'), verdi: subDays(dagensDato, 1) },
      til: { label: hentTekst('periode.til'), verdi: dagensDato },
    },
    begrunnelse: {
      label: hentTekst('medlemskap.periodeBoddIUtlandet.begrunnelse'),
      verdi: '',
    },
  };

  useEffect(() => {
    settSøknad({
      ...søknad,
      medlemskap: {
        ...søknad.medlemskap,
        perioderBoddIUtlandet: [nyPeriode],
      },
    });
    // eslint-disable-next-line
  }, []);

  const leggTilUtenlandsperiode = () => {
    const nyttUtenlandsopphold: IUtenlandsopphold = nyPeriode;
    const alleUtenlandsopphold = perioderBoddIUtlandet;
    alleUtenlandsopphold && alleUtenlandsopphold.push(nyttUtenlandsopphold);
    alleUtenlandsopphold &&
      settSøknad({
        ...søknad,
        medlemskap: {
          ...søknad.medlemskap,
          perioderBoddIUtlandet: alleUtenlandsopphold,
        },
      });
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
        <FeltGruppe>
          <Element>
            <LocaleTekst
              tekst={'medlemskap.periodeBoddIUtlandet.flereutenlandsopphold'}
            />
          </Element>
        </FeltGruppe>
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
export default PeriodeBoddIUtlandet;
