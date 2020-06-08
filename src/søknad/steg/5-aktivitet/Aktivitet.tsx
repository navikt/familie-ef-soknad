import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Side from '../../../components/side/Side';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import HjemmeMedBarnUnderEttÅr from './HjemmeMedBarnUnderEttÅr';
import EtablererEgenVirksomhet from './EtablererEgenVirksomhet';
import OmArbeidsforholdetDitt from './arbeidsforhold/OmArbeidsforholdetDitt';
import { hvaErDinArbeidssituasjonSpm } from './AktivitetConfig';
import {
  ArbeidssituasjonType,
  IAktivitet,
} from '../../../models/steg/aktivitet/aktivitet';
import UnderUtdanning from './underUtdanning/UnderUtdanning';
import Arbeidssøker from './arbeidssøker/Arbeidssøker';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import OmFirmaetDitt from './OmFirmaetDitt';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { returnerAvhukedeSvar } from '../../../utils/spørsmålogsvar';
import { useSøknad } from '../../../context/SøknadContext';
import { hentAktivitetSpørsmål } from '../../../helpers/aktivitet';
import EgetAS from './aksjeselskap/EgetAS';

const Aktivitet: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad, settDokumentasjonsbehov } = useSøknad();
  const history = useHistory();
  const location = useLocation();
  const [arbeidssituasjon, settArbeidssituasjon] = useState<IAktivitet>({
    ...søknad.aktivitet,
    hvaErDinArbeidssituasjon: søknad.aktivitet.hvaErDinArbeidssituasjon,
  });
  const { hvaErDinArbeidssituasjon } = arbeidssituasjon;
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  useEffect(() => {
    settSøknad({ ...søknad, aktivitet: arbeidssituasjon });
    // eslint-disable-next-line
  }, [arbeidssituasjon]);

  const oppdaterArbeidssituasjon = (nyArbeidssituasjon: IAktivitet) => {
    settArbeidssituasjon({ ...arbeidssituasjon, ...nyArbeidssituasjon });
  };

  const settArbeidssituasjonFelt = (
    spørsmål: ISpørsmål,
    svarHuketAv: boolean,
    svar: ISvar
  ) => {
    const { avhukedeSvar, svarider } = returnerAvhukedeSvar(
      hvaErDinArbeidssituasjon,
      svarHuketAv,
      svar,
      intl
    );

    console.log(avhukedeSvar, svarider);

    oppdaterArbeidssituasjon({
      ...arbeidssituasjon,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svarider,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: avhukedeSvar,
      },
    });
    settDokumentasjonsbehov(spørsmål, svar, svarHuketAv);
  };

  const erAktivitetHuketAv = (aktivitet: ArbeidssituasjonType): boolean => {
    const tekstid: string = 'arbeidssituasjon.svar.' + aktivitet;
    const svarTekst: string = intl.formatMessage({ id: tekstid });
    return hvaErDinArbeidssituasjon.verdi.some((svarHuketAvISøknad: string) => {
      return svarHuketAvISøknad === svarTekst;
    });
  };

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.arbeidssituasjon' })}
      skalViseKnapper={!kommerFraOppsummering}
    >
      <SeksjonGruppe>
        <CheckboxSpørsmål
          spørsmål={hentAktivitetSpørsmål(
            søknad.person,
            hvaErDinArbeidssituasjonSpm
          )}
          settValgteSvar={settArbeidssituasjonFelt}
          valgteSvar={hvaErDinArbeidssituasjon?.verdi}
        />
      </SeksjonGruppe>

      {erAktivitetHuketAv(ArbeidssituasjonType.erHjemmeMedBarnUnderEttÅr) && (
        <HjemmeMedBarnUnderEttÅr />
      )}

      {erAktivitetHuketAv(ArbeidssituasjonType.etablererEgenVirksomhet) && (
        <EtablererEgenVirksomhet
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      )}

      {erAktivitetHuketAv(ArbeidssituasjonType.erAnsattIEgetAS) ||
        (erAktivitetHuketAv(ArbeidssituasjonType.erArbeidstaker) && (
          <OmArbeidsforholdetDitt
            arbeidssituasjon={arbeidssituasjon}
            settArbeidssituasjon={settArbeidssituasjon}
          />
        ))}
      {erAktivitetHuketAv(ArbeidssituasjonType.erArbeidstaker) && (
        <OmArbeidsforholdetDitt
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      )}

      {erAktivitetHuketAv(ArbeidssituasjonType.erAnsattIEgetAS) && (
        <EgetAS
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      )}

      {erAktivitetHuketAv(ArbeidssituasjonType.erArbeidssøker) && (
        <Arbeidssøker
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={oppdaterArbeidssituasjon}
        />
      )}

      {erAktivitetHuketAv(
        ArbeidssituasjonType.erSelvstendigNæringsdriveneEllerFrilanser
      ) && (
        <OmFirmaetDitt
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={oppdaterArbeidssituasjon}
        />
      )}

      {erAktivitetHuketAv(ArbeidssituasjonType.tarUtdanning) && (
        <UnderUtdanning
          arbeidssituasjon={arbeidssituasjon}
          settArbeidssituasjon={settArbeidssituasjon}
        />
      )}
      {kommerFraOppsummering ? (
        <div className={'side'}>
          <Hovedknapp
            className="tilbake-til-oppsummering"
            onClick={() =>
              history.push({
                pathname: '/oppsummering',
              })
            }
          >
            {hentTekst('oppsummering.tilbake', intl)}
          </Hovedknapp>
        </div>
      ) : null}
    </Side>
  );
};

export default Aktivitet;
