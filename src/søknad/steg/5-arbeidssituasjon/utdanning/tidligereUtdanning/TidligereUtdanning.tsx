import React, { useState } from 'react';
import SeksjonGruppe from '../../../../../components/gruppe/SeksjonGruppe';
import { Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../../language/LocaleTekst';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import { ITidligereUtdanning } from '../../../../../models/arbeidssituasjon/utdanning';
import JaNeiSpørsmål from '../../../../../components/spørsmål/JaNeiSpørsmål';
import { utdanningEtterGrunnskolenSpm } from './TidligereUtdanningConfig';
import { ISpørsmål } from '../../../../../models/spørsmal';
import { hentTekst } from '../../../../../utils/søknad';
import { useIntl } from 'react-intl';

const TidligereUtdanning: React.FC = () => {
  const [tidligereUtdanning, settTidligereUtdanning] = useState<
    ITidligereUtdanning
  >({});
  const intl = useIntl();

  const settJaNeiSpørsmål = (spørsmål: ISpørsmål, svar: boolean) => {
    tidligereUtdanning &&
      settTidligereUtdanning({
        ...tidligereUtdanning,
        [spørsmål.søknadid]: {
          label: hentTekst(spørsmål.tekstid, intl),
          verdi: svar,
        },
      });
  };

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <Undertittel className={'sentrert'}>
          <LocaleTekst tekst={'utdanning.tittel.tidligere'} />
        </Undertittel>
      </KomponentGruppe>

      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={utdanningEtterGrunnskolenSpm}
          onChange={settJaNeiSpørsmål}
          valgtSvar={tidligereUtdanning?.tattUtdanningEtterGrunnskole?.verdi}
        />
      </KomponentGruppe>
    </SeksjonGruppe>
  );
};

export default TidligereUtdanning;
