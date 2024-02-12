import FeltGruppe from '../components/gruppe/FeltGruppe';
import Språkvelger from '../components/språkvelger/Språkvelger';
import LocaleTekst from '../language/LocaleTekst';
import { isIE } from 'react-device-detect';
import { DisclaimerBoks } from '../components/forside/DisclaimerBoks';
import { Tekst } from '../components/forside/Tekst';
import { Seksjon } from '../components/forside/Seksjon';
import { Overskrift } from '../components/forside/Overskrift';
import { InformasjonProps } from '../components/forside/typer';
import { hentPath } from '../utils/routing';
import {
  RoutesBarnetilsyn,
  ERouteBarnetilsyn,
} from './routing/routesBarnetilsyn';
import { hentDataFraForrigeBarnetilsynSøknad } from '../utils/søknad';
import { useContext, useEffect, useState } from 'react';
import { GjenbrukContext } from '../context/GjenbrukContext';
import { useSpråkContext } from '../context/SpråkContext';
import { ForrigeSøknad } from './models/søknad';
import { KnappLocaleTekstOgNavigate } from '../components/knapper/KnappLocaleTekstOgNavigate';

export const BarnetilsynInformasjon: React.FC<InformasjonProps> = ({
  person,
  harBekreftet,
  settBekreftelse,
}) => {
  const [kanGjenbrukeForrigeSøknad, settKanGjenbrukeForrigeSøknad] =
    useState(false);
  const { skalGjenbrukeSøknad, settSkalGjenbrukeSøknad } =
    useContext(GjenbrukContext);
  const [locale] = useSpråkContext();

  const erForrigeSøknadBesvartPåSammeSpråkSomErValgt = (
    forrigeSøknad: ForrigeSøknad
  ) => {
    return (
      (forrigeSøknad.sivilstatus.årsakEnslig?.label ===
        'Hvorfor er du alene med barn?' &&
        locale === 'nb') ||
      (forrigeSøknad.sivilstatus.årsakEnslig?.label ===
        'Why are you a sole caregiver?' &&
        locale === 'en')
    );
  };

  const hentOgSjekkForrigeSøknad = async () => {
    const forrigeSøknad = await hentDataFraForrigeBarnetilsynSøknad();

    if (erForrigeSøknadBesvartPåSammeSpråkSomErValgt(forrigeSøknad)) {
      settKanGjenbrukeForrigeSøknad(true);
    } else {
      settKanGjenbrukeForrigeSøknad(false);
      settSkalGjenbrukeSøknad(false);
    }
  };

  useEffect(() => {
    const fetchHentOgSjekkForrigeSøknad = async () => {
      await hentOgSjekkForrigeSøknad();
    };

    fetchHentOgSjekkForrigeSøknad();
  }, [locale, skalGjenbrukeSøknad, kanGjenbrukeForrigeSøknad]);

  const nesteSide = hentPath(RoutesBarnetilsyn, ERouteBarnetilsyn.OmDeg) || '';
  const gjenbrukSide =
    hentPath(RoutesBarnetilsyn, ERouteBarnetilsyn.Gjenbruk) || '';

  return (
    <>
      <FeltGruppe>
        <Språkvelger />
      </FeltGruppe>

      <Seksjon>
        <Tekst tekst="forside.barnetilsyn.info" />
        <Tekst tekst="forside.barnetilsyn.fåStønadSkoleår" />
        <LocaleTekst tekst="forside.barnetilsyn.merOmStønad" />
      </Seksjon>

      <Seksjon>
        <LocaleTekst tekst="forside.barnetilsyn.arbeidssøkerUtdanning" />
      </Seksjon>

      <Seksjon>
        <Overskrift tekst="forside.barnetilsyn.overskrift.riktigeOpplysninger" />
        <Tekst tekst="forside.barnetilsyn.riktigeOpplysninger" />
        <Tekst tekst="forside.barnetilsyn.meldeEndringer" />
      </Seksjon>

      <Seksjon>
        <Overskrift tekst="forside.barnetilsyn.overskrift.sendeDokumentasjon" />
        <Tekst tekst="forside.barnetilsyn.beskjedDokumentere" />
        <Tekst tekst="forside.barnetilsyn.merInformasjon" />
        <LocaleTekst tekst="forside.barnetilsyn.oversiktDokumentasjon" />
      </Seksjon>

      <Seksjon>
        <Overskrift tekst="forside.barnetilsyn.overskrift.henteInformasjon" />
        <Tekst tekst="forside.barnetilsyn.henteInformasjon" />
        <Tekst tekst="forside.barnetilsyn.viHenter" />
        <LocaleTekst tekst="forside.barnetilsyn.henterPunktliste" />
        <Tekst tekst="forside.barnetilsyn.tidligereOpplysninger" />
        <LocaleTekst tekst="forside.barnetilsyn.personopplysningeneDine" />
      </Seksjon>

      <Seksjon>
        <Overskrift tekst="forside.barnetilsyn.overskrift.slikSøkerDu" />
        <Tekst tekst="forside.barnetilsyn.slikSøkerDu" />
        <Tekst tekst="forside.barnetilsyn.slikSøkerDu2" />
        <Tekst tekst="forside.barnetilsyn.slikSøkerDu3" />
        <Tekst tekst="forside.barnetilsyn.slikSøkerDu4" />
      </Seksjon>

      {!isIE && (
        <DisclaimerBoks
          navn={person.søker.forkortetNavn}
          tekst={'forside.barnetilsyn.disclaimerTekst'}
          harBekreftet={harBekreftet}
          settBekreftelse={settBekreftelse}
        />
      )}
      {harBekreftet && (
        <KnappLocaleTekstOgNavigate
          nesteSide={kanGjenbrukeForrigeSøknad ? gjenbrukSide : nesteSide}
        />
      )}
    </>
  );
};
