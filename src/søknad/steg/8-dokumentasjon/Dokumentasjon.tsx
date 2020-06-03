import React from 'react';
import KnappBase from 'nav-frontend-knapper';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import LastOppVedlegg from './LastOppVedlegg';
import Lenke from 'nav-frontend-lenker';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../../components/side/Side';
import { ESvar } from '../../../models/spørsmålogsvar';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import { Normaltekst } from 'nav-frontend-typografi';
import { StyledKnapper } from '../../../arbeidssøkerskjema/komponenter/StyledKnapper';
import { useSøknad } from '../../../context/SøknadContext';

import { useHistory, useLocation } from 'react-router';
import SendSøknadKnapp from './SendSøknad';
import { hentForrigeRoute } from '../../../routing/utils';
import { Routes } from '../../../routing/Routes';

const Dokumentasjon: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const intl = useIntl();
  const { søknad } = useSøknad();
  const { dokumentasjonsbehov, aktivitet } = søknad;

  const forrigeRoute = hentForrigeRoute(Routes, location.pathname);

  const sidetittel: string = hentTekst('dokumentasjon.tittel', intl);

  return (
    <Side tittel={sidetittel} skalViseKnapper={false}>
      <SeksjonGruppe>
        <Normaltekst>
          <FormattedHTMLMessage id={'dokumentasjon.beskrivelse'} />
        </Normaltekst>
      </SeksjonGruppe>
      <SeksjonGruppe>
        {aktivitet.arbeidssøker?.registrertSomArbeidssøkerNav?.svarid ===
          ESvar.NEI && (
          <KomponentGruppe>
            <Lenke href={'https://arbeidssokerregistrering.nav.no/'}>
              Registrer deg som arbeidssøker hos NAV
            </Lenke>
          </KomponentGruppe>
        )}
        {dokumentasjonsbehov !== [] &&
          dokumentasjonsbehov.map((dokumentasjon) => {
            return <LastOppVedlegg dokumentasjon={dokumentasjon} />;
          })}
      </SeksjonGruppe>

      <SeksjonGruppe className={'sentrert'}>
        <StyledKnapper>
          <KnappBase
            className={'tilbake'}
            type={'standard'}
            onClick={() => history.push(forrigeRoute.path)}
          >
            <LocaleTekst tekst={'knapp.tilbake'} />
          </KnappBase>

          <SendSøknadKnapp />

          <KnappBase
            className={'avbryt'}
            type={'flat'}
            onClick={() => history.push(Routes[0].path)}
          >
            <LocaleTekst tekst={'knapp.avbryt'} />
          </KnappBase>
        </StyledKnapper>
      </SeksjonGruppe>
    </Side>
  );
};

export default Dokumentasjon;
