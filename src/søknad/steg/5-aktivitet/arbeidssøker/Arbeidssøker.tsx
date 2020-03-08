import React, { useEffect, useState } from 'react';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { Undertittel } from 'nav-frontend-typografi';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import {
  erSøkerArbeidssøker,
  erVilligTilÅTaImotTilbud,
  kanBegynneInnenEnUke,
  kanSkaffeBarnepassInnenEnUke,
  ønskerHalvStillig,
  ønsketArbeidssted,
} from './ArbeidssøkerConfig';
import { IAktivitet } from '../../../../models/aktivitet/aktivitet';
import { IArbeidssøker } from '../../../../models/aktivitet/arbeidssøker';
import { ISpørsmål } from '../../../../models/spørsmal';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (nyArbeidssituasjon: IAktivitet) => void;
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

      {arbeidssøker.registrertSomArbeidssøkerNav && (
        <KomponentGruppe>
          <JaNeiSpørsmål
            spørsmål={erVilligTilÅTaImotTilbud}
            onChange={settJaNeiSpørsmål}
            valgtSvar={arbeidssøker.villigTilÅTaImotTilbudOmArbeid?.verdi}
          />
        </KomponentGruppe>
      )}
      {arbeidssøker.villigTilÅTaImotTilbudOmArbeid && (
        <KomponentGruppe>
          <JaNeiSpørsmål
            spørsmål={kanBegynneInnenEnUke}
            onChange={settJaNeiSpørsmål}
            valgtSvar={arbeidssøker.kanBegynneInnenEnUke?.verdi}
          />
        </KomponentGruppe>
      )}

      {arbeidssøker.kanBegynneInnenEnUke && (
        <KomponentGruppe>
          <JaNeiSpørsmål
            spørsmål={kanSkaffeBarnepassInnenEnUke}
            onChange={settJaNeiSpørsmål}
            valgtSvar={arbeidssøker.kanSkaffeBarnepassInnenEnUke?.verdi}
          />
        </KomponentGruppe>
      )}

      {arbeidssøker.kanSkaffeBarnepassInnenEnUke && (
        <KomponentGruppe>
          <MultiSvarSpørsmål
            spørsmål={ønsketArbeidssted}
            settSpørsmålOgSvar={settMultiSvarSpørsmål}
            valgtSvar={arbeidssøker.hvorØnskerSøkerArbeid?.verdi}
          />
        </KomponentGruppe>
      )}
      {arbeidssøker.hvorØnskerSøkerArbeid && (
        <KomponentGruppe>
          <JaNeiSpørsmål
            spørsmål={ønskerHalvStillig}
            onChange={settJaNeiSpørsmål}
            valgtSvar={arbeidssøker.ønskerSøker50ProsentStilling?.verdi}
          />
        </KomponentGruppe>
      )}
    </SeksjonGruppe>
  );
};

export default Arbeidssøker;
