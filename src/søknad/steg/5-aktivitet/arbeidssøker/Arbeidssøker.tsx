import React, { useEffect, useState } from 'react';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { Undertittel } from 'nav-frontend-typografi';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import {
  erSøkerArbeidssøker,
  erVilligTilÅTaImotTilbud,
  kanBegynneInnenEnUke,
  ønskerHalvStilling,
  ønsketArbeidssted,
} from './ArbeidssøkerConfig';
import { IArbeidssøker } from '../../../../models/steg/aktivitet/arbeidssøker';
import {
  ESvar,
  ISpørsmål,
  ISvar,
} from '../../../../models/felles/spørsmålogsvar';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';
import { IAktivitet } from '../../../../models/steg/aktivitet/aktivitet';
import { hentSvarAlertFraSpørsmål, hentTekst } from '../../../../utils/søknad';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';
import AlertStripe from 'nav-frontend-alertstriper';
import AlertStripeDokumentasjon from '../../../../components/AlertstripeDokumentasjon';
import { useLokalIntlContext } from '../../../../context/LokalIntlContext';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (nyArbeidssituasjon: IAktivitet) => void;
  settDokumentasjonsbehov: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    erHuketAv?: boolean
  ) => void;
}

const Arbeidssøker: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
  settDokumentasjonsbehov,
}) => {
  const intl = useLokalIntlContext();
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

    settDokumentasjonsbehov(spørsmål, valgtSvar);
  };

  const settMultiSvarSpørsmål = (spørsmål: ISpørsmål, svar: ISvar) => {
    settArbeidssøker({
      ...arbeidssøker,
      [spørsmål.søknadid]: {
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar.svar_tekst,
      },
    });
  };

  const registrertSomArbeidssøkerAlert = hentSvarAlertFraSpørsmål(
    ESvar.NEI,
    erSøkerArbeidssøker(intl)
  );

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <Undertittel className={'sentrert'} tag="h3">
          <LocaleTekst tekst={'arbeidssøker.tittel'} />
        </Undertittel>
      </KomponentGruppe>

      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={erSøkerArbeidssøker(intl)}
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
            spørsmål={erVilligTilÅTaImotTilbud(intl)}
            onChange={settJaNeiSpørsmål}
            valgtSvar={arbeidssøker.villigTilÅTaImotTilbudOmArbeid?.verdi}
          />
          {arbeidssøker.villigTilÅTaImotTilbudOmArbeid?.svarid ===
            ESvar.NEI && (
            <AlertStripeDokumentasjon>
              <LocaleTekst tekst={'arbeidssøker.alert.villig'} />
            </AlertStripeDokumentasjon>
          )}
        </KomponentGruppe>
      )}
      {arbeidssøker.villigTilÅTaImotTilbudOmArbeid && (
        <KomponentGruppe>
          <JaNeiSpørsmål
            spørsmål={kanBegynneInnenEnUke(intl)}
            onChange={settJaNeiSpørsmål}
            valgtSvar={arbeidssøker.kanBegynneInnenEnUke?.verdi}
          />
        </KomponentGruppe>
      )}

      {arbeidssøker.kanBegynneInnenEnUke && (
        <KomponentGruppe>
          <MultiSvarSpørsmål
            spørsmål={ønsketArbeidssted(intl)}
            settSpørsmålOgSvar={settMultiSvarSpørsmål}
            valgtSvar={arbeidssøker.hvorØnskerSøkerArbeid?.verdi}
          />
        </KomponentGruppe>
      )}
      {arbeidssøker.hvorØnskerSøkerArbeid && (
        <KomponentGruppe>
          <JaNeiSpørsmål
            spørsmål={ønskerHalvStilling(intl)}
            onChange={settJaNeiSpørsmål}
            valgtSvar={arbeidssøker.ønskerSøker50ProsentStilling?.verdi}
          />
        </KomponentGruppe>
      )}
    </SeksjonGruppe>
  );
};

export default Arbeidssøker;
