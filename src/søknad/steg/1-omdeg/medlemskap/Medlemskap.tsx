import React from 'react';
import { ESvar, ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import {
  oppholderSegINorge,
  bosattINorgeDeSisteTreÅr,
} from './MedlemskapConfig';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import PeriodeBoddIUtlandet from './PeriodeBoddIUtlandet';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { useIntl } from 'react-intl';
import {
  EMedlemskap,
  IMedlemskap,
} from '../../../../models/steg/omDeg/medlemskap';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';
import { useSøknad } from '../../../../context/SøknadContext';

const Medlemskap: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknad();
  const {
    søkerOppholderSegINorge,
    søkerBosattINorgeSisteTreÅr,
  } = søknad.medlemskap;

  const settMedlemskapBooleanFelt = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);
    const endretMedlemskap = søknad.medlemskap;

    if (
      spørsmål.søknadid === EMedlemskap.søkerBosattINorgeSisteTreÅr &&
      valgtSvar.id === ESvar.JA &&
      endretMedlemskap.perioderBoddIUtlandet
    ) {
      delete endretMedlemskap.perioderBoddIUtlandet;
    }

    settSøknad({
      ...søknad,
      medlemskap: {
        ...endretMedlemskap,
        [spørsmål.søknadid]: {
          label: intl.formatMessage({ id: spørsmål.tekstid }),
          verdi: svar,
        },
      },
    });
  };

  const hentValgtSvar = (spørsmål: ISpørsmål, medlemskap: IMedlemskap) => {
    for (const [key, value] of Object.entries(medlemskap)) {
      if (key === spørsmål.søknadid && value !== undefined) {
        return value.verdi;
      }
    }
  };

  return (
    <SeksjonGruppe>
      <KomponentGruppe key={oppholderSegINorge.søknadid}>
        <JaNeiSpørsmål
          spørsmål={oppholderSegINorge}
          valgtSvar={hentValgtSvar(oppholderSegINorge, søknad.medlemskap)}
          onChange={settMedlemskapBooleanFelt}
        />
      </KomponentGruppe>

      {søkerOppholderSegINorge?.verdi ? (
        <KomponentGruppe key={bosattINorgeDeSisteTreÅr.søknadid}>
          <JaNeiSpørsmål
            spørsmål={bosattINorgeDeSisteTreÅr}
            valgtSvar={hentValgtSvar(
              bosattINorgeDeSisteTreÅr,
              søknad.medlemskap
            )}
            onChange={settMedlemskapBooleanFelt}
          />
        </KomponentGruppe>
      ) : null}

      {søkerBosattINorgeSisteTreÅr?.verdi === false ? (
        <PeriodeBoddIUtlandet />
      ) : null}
    </SeksjonGruppe>
  );
};

export default Medlemskap;
