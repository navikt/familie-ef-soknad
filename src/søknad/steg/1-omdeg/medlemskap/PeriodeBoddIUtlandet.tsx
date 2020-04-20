import React, { FC, useEffect } from 'react';
import { Element } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../language/LocaleTekst';
import { useIntl } from 'react-intl';
import KnappBase from 'nav-frontend-knapper';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import Utenlandsopphold from './Utenlandsopphold';
import { dagensDato } from '../../../../utils/dato';
import subDays from 'date-fns/subDays';
import { hentTekst } from '../../../../utils/søknad';
import { hentUid } from '../../../../utils/uuid';
import { IUtenlandsopphold } from '../../../../models/steg/omDeg/medlemskap';
import { useSøknad } from '../../../../context/SøknadContext';

const PeriodeBoddIUtlandet: FC = () => {
  const { søknad, settSøknad } = useSøknad();
  const { perioderBoddIUtlandet } = søknad.medlemskap;
  const intl = useIntl();

  const nyPeriode = {
    id: hentUid(),
    periode: {
      fra: {
        label: hentTekst('periode.fra', intl),
        verdi: subDays(dagensDato, 1),
      },
      til: { label: hentTekst('periode.til', intl), verdi: dagensDato },
    },
    begrunnelse: {
      label: hentTekst('medlemskap.periodeBoddIUtlandet.begrunnelse', intl),
      verdi: '',
    },
  };

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

  return (
    <>
      {perioderBoddIUtlandet?.map((periode, index) => {
        return (
          <KomponentGruppe key={periode.id}>
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
