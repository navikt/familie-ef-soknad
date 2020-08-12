import React, { FC, useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../language/LocaleTekst';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import Utenlandsopphold from './Utenlandsopphold';

import { hentTekst } from '../../../../utils/søknad';
import { hentUid } from '../../../../utils/autentiseringogvalidering/uuid';
import {
  IMedlemskap,
  IUtenlandsopphold,
} from '../../../../models/steg/omDeg/medlemskap';
import { tomPeriode } from '../../../../helpers/tommeSøknadsfelter';
import LeggTilKnapp from '../../../../components/knapper/LeggTilKnapp';

const PeriodeBoddIUtlandet: FC<{
  medlemskap: IMedlemskap;
  settMedlemskap: (medlemskap: IMedlemskap) => void;
}> = ({ medlemskap, settMedlemskap }) => {
  const intl = useIntl();
  const tomtUtenlandsopphold: IUtenlandsopphold = {
    id: hentUid(),
    periode: tomPeriode,
    begrunnelse: {
      label: hentTekst('medlemskap.periodeBoddIUtlandet.begrunnelse', intl),
      verdi: '',
    },
  };
  const [perioderBoddIUtlandet, settPerioderBoddIUtlandet] = useState<
    IUtenlandsopphold[]
  >(
    medlemskap?.perioderBoddIUtlandet
      ? medlemskap.perioderBoddIUtlandet
      : [tomtUtenlandsopphold]
  );

  const erForrigePeriodeFyltUt: boolean = perioderBoddIUtlandet.every(
    (utenlandsopphold) => utenlandsopphold.begrunnelse.verdi !== ''
  );

  useEffect(() => {
    settMedlemskap({
      ...medlemskap,
      perioderBoddIUtlandet: perioderBoddIUtlandet,
    });
    // eslint-disable-next-line
  }, [perioderBoddIUtlandet]);

  const leggTilUtenlandsperiode = () => {
    const alleUtenlandsopphold = perioderBoddIUtlandet;
    alleUtenlandsopphold && alleUtenlandsopphold.push(tomtUtenlandsopphold);
    alleUtenlandsopphold &&
      settMedlemskap({
        ...medlemskap,
        perioderBoddIUtlandet: alleUtenlandsopphold,
      });
  };

  return (
    <>
      {perioderBoddIUtlandet?.map((periode, index) => {
        return (
          <KomponentGruppe key={periode.id}>
            <Utenlandsopphold
              settPeriodeBoddIUtlandet={settPerioderBoddIUtlandet}
              perioderBoddIUtlandet={perioderBoddIUtlandet}
              utenlandsopphold={periode}
              oppholdsnr={index}
            />
          </KomponentGruppe>
        );
      })}

      {erForrigePeriodeFyltUt && (
        <KomponentGruppe>
          <FeltGruppe>
            <Element>
              <LocaleTekst
                tekst={'medlemskap.periodeBoddIUtlandet.flereutenlandsopphold'}
              />
            </Element>
          </FeltGruppe>
          <FeltGruppe>
            <LeggTilKnapp onClick={() => leggTilUtenlandsperiode()}>
              <LocaleTekst tekst={'medlemskap.periodeBoddIUtlandet.knapp'} />
            </LeggTilKnapp>
          </FeltGruppe>
        </KomponentGruppe>
      )}
    </>
  );
};
export default PeriodeBoddIUtlandet;
