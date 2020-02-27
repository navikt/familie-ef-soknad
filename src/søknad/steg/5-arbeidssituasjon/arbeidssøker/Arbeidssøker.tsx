import React, { useEffect, useState } from 'react';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { Undertittel } from 'nav-frontend-typografi';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import {
  erSøkerArbeidssøker,
  erVilligTilÅTaImotTilbud,
  ønsketArbeidssted,
} from './ArbeidssøkerConfig';
import { IArbeidssituasjon } from '../../../../models/arbeidssituasjon/arbeidssituasjon';
import { IArbeidssøker } from '../../../../models/arbeidssituasjon/arbeidssøker';
import { ISpørsmål } from '../../../../models/spørsmal';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import Hjelpetekst from '../../../../components/Hjelpetekst';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';

interface Props {
  arbeidssituasjon: IArbeidssituasjon;
  settArbeidssituasjon: (nyArbeidssituasjon: IArbeidssituasjon) => void;
}

const Arbeidssøker: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const intl = useIntl();
  const [arbeidssøker, settArbeidssøker] = useState<IArbeidssøker>({});

  useEffect(() => {
    settArbeidssituasjon({ ...arbeidssituasjon, arbeidssøker: arbeidssøker });
    // eslint-disable-next-line
  }, [arbeidssøker]);

  const settJaNeiSpørsmål = (spørsmål: ISpørsmål, svar: boolean) => {
    settArbeidssøker({
      ...arbeidssøker,
      [spørsmål.søknadid]: {
        label: hentTekst(spørsmål.tekstid),
        verdi: svar,
      },
    });
  };

  const settMultiSvarSpørsmål = (spørsmål: ISpørsmål, svar: string) => {
    settArbeidssøker({
      ...arbeidssøker,
      [spørsmål.søknadid]: {
        label: hentTekst(spørsmål.tekstid),
        verdi: svar,
      },
    });
  };

  const hentTekst = (id: string) => {
    return intl.formatMessage({ id: id });
  };

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <Undertittel className={'sentrert'}>
          <LocaleTekst tekst={'arbeidssøker.tittel'} />
        </Undertittel>
      </KomponentGruppe>

      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={erSøkerArbeidssøker}
          onChange={settJaNeiSpørsmål}
          valgtSvar={arbeidssøker.registrertSomArbeidssøkerNav?.verdi}
        />
      </KomponentGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmål
          spørsmål={ønsketArbeidssted}
          onChange={settMultiSvarSpørsmål}
          valgtSvar={arbeidssøker.hvorØnskerSøkerArbeid?.verdi}
        />

        {arbeidssøker.hvorØnskerSøkerArbeid?.verdi &&
          ønsketArbeidssted.lesmer && (
            <Hjelpetekst
              åpneTekstid={ønsketArbeidssted.lesmer.åpneTekstid}
              innholdTekstid={ønsketArbeidssted.lesmer.innholdTekstid}
            />
          )}
      </KomponentGruppe>

      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={erVilligTilÅTaImotTilbud}
          onChange={settJaNeiSpørsmål}
          valgtSvar={arbeidssøker.villigTilÅTaImotTilbudOmArbeid?.verdi}
        />
      </KomponentGruppe>
    </SeksjonGruppe>
  );
};

export default Arbeidssøker;
