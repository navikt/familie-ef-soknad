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
import { IArbeidssøker } from '../../../../models/steg/aktivitet/arbeidssøker';
import { ESvar, ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';
import { IAktivitet } from '../../../../models/steg/aktivitet/aktivitet';
import { hentSvarAlertFraSpørsmål, hentTekst } from '../../../../utils/søknad';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';
import AlertStripe from 'nav-frontend-alertstriper';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (nyArbeidssituasjon: IAktivitet) => void;
}

const Arbeidssøker: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const intl = useIntl();
  const [arbeidssøker, settArbeidssøker] = useState<IArbeidssøker>(
    arbeidssituasjon.arbeidssøker ? arbeidssituasjon.arbeidssøker : {}
  );

  useEffect(() => {
    settArbeidssituasjon({ ...arbeidssituasjon, arbeidssøker: arbeidssøker });
    // eslint-disable-next-line
  }, [arbeidssøker]);

  const settJaNeiSpørsmål = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);

    settArbeidssøker({
      ...arbeidssøker,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: valgtSvar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar,
      },
    });
  };

  const settMultiSvarSpørsmål = (spørsmål: ISpørsmål, svar: ISvar) => {
    settArbeidssøker({
      ...arbeidssøker,
      [spørsmål.søknadid]: {
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    });
  };

  const registrertSomArbeidssøkerAlert = hentSvarAlertFraSpørsmål(
    ESvar.NEI,
    erSøkerArbeidssøker
  );

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
        {arbeidssøker.registrertSomArbeidssøkerNav?.svarid === ESvar.NEI && (
          <AlertStripe type={'info'} form={'inline'}>
            <LocaleTekst tekst={registrertSomArbeidssøkerAlert} />
          </AlertStripe>
        )}
      </KomponentGruppe>

      {arbeidssøker.registrertSomArbeidssøkerNav && (
        <KomponentGruppe>
          <JaNeiSpørsmål
            spørsmål={erVilligTilÅTaImotTilbud}
            onChange={settJaNeiSpørsmål}
            valgtSvar={arbeidssøker.villigTilÅTaImotTilbudOmArbeid?.verdi}
          />
          {arbeidssøker.villigTilÅTaImotTilbudOmArbeid?.svarid ===
            ESvar.NEI && (
            <AlertStripe type={'advarsel'} form={'inline'}>
              <LocaleTekst tekst={'arbeidssøker.alert.villig'} />
            </AlertStripe>
          )}
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
