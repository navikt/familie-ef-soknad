import React from 'react';
import {
  ESvar,
  ISpørsmål,
  ISvar,
} from '../../../../models/felles/spørsmålogsvar';
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
import AlertStripe from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../language/LocaleTekst';

interface Props {
  medlemskap: IMedlemskap;
  settMedlemskap: (medlemskap: IMedlemskap) => void;
}
const Medlemskap: React.FC<Props> = ({ medlemskap, settMedlemskap }) => {
  const intl = useIntl();
  const { søkerOppholderSegINorge, søkerBosattINorgeSisteTreÅr } = medlemskap;

  const oppholderSegINorgeConfig = oppholderSegINorge(intl);
  const bosattINorgeDeSisteTreÅrConfig = bosattINorgeDeSisteTreÅr(intl);
  const settMedlemskapBooleanFelt = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);
    const endretMedlemskap = medlemskap;

    if (
      spørsmål.søknadid === EMedlemskap.søkerBosattINorgeSisteTreÅr &&
      valgtSvar.id === ESvar.JA &&
      endretMedlemskap.perioderBoddIUtlandet
    ) {
      delete endretMedlemskap.perioderBoddIUtlandet;
    }

    settMedlemskap({
      ...endretMedlemskap,
      [spørsmål.søknadid]: {
        label: intl.formatMessage({ id: spørsmål.tekstid }),
        verdi: svar,
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

  const valgtSvarOppholderSegINorge = hentValgtSvar(
    oppholderSegINorgeConfig,
    medlemskap
  );

  return (
    <SeksjonGruppe>
      <KomponentGruppe key={oppholderSegINorgeConfig.søknadid}>
        <JaNeiSpørsmål
          spørsmål={oppholderSegINorgeConfig}
          valgtSvar={valgtSvarOppholderSegINorge}
          onChange={settMedlemskapBooleanFelt}
        />
        {valgtSvarOppholderSegINorge === false && (
          <AlertStripe type={'advarsel'} form={'inline'}>
            <LocaleTekst tekst={'medlemskap.alert-advarsel.opphold'} />
          </AlertStripe>
        )}
      </KomponentGruppe>

      {søkerOppholderSegINorge?.hasOwnProperty('verdi') ? (
        <KomponentGruppe key={bosattINorgeDeSisteTreÅrConfig.søknadid}>
          <JaNeiSpørsmål
            spørsmål={bosattINorgeDeSisteTreÅrConfig}
            valgtSvar={hentValgtSvar(
              bosattINorgeDeSisteTreÅrConfig,
              medlemskap
            )}
            onChange={settMedlemskapBooleanFelt}
          />
        </KomponentGruppe>
      ) : null}

      {søkerBosattINorgeSisteTreÅr?.verdi === false ? (
        <PeriodeBoddIUtlandet
          medlemskap={medlemskap}
          settMedlemskap={settMedlemskap}
        />
      ) : null}
    </SeksjonGruppe>
  );
};

export default Medlemskap;
