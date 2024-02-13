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
  RoutesOvergangsstonad,
  ERouteOvergangsstønad,
} from './routing/routesOvergangsstonad';
import { KnappLocaleTekstOgNavigate } from '../components/knapper/KnappLocaleTekstOgNavigate';

export const OvergangsstønadInformasjon: React.FC<InformasjonProps> = ({
  person,
  harBekreftet,
  settBekreftelse,
}) => {
  const nesteSide =
    hentPath(RoutesOvergangsstonad, ERouteOvergangsstønad.OmDeg) || '';

  return (
    <>
      <FeltGruppe>
        <Språkvelger />
      </FeltGruppe>

      <Seksjon>
        <Tekst tekst="forside.overgangsstønad.erDuEnsligMorEllerFar" />
        <Tekst tekst="forside.overgangsstønad.sammeSøknad" />
        <LocaleTekst tekst="forside.overgangsstønad.merOmOvergangsstønad" />
      </Seksjon>

      <Seksjon>
        <Overskrift tekst="forside.overgangsstønad.overskrift.riktigeOpplysninger" />
        <Tekst tekst="forside.overgangsstønad.riktigeOpplysninger" />
        <Tekst tekst="forside.overgangsstønad.meldeEndringer" />
      </Seksjon>

      <Seksjon>
        <Overskrift tekst="forside.overgangsstønad.overskrift.sendeDokumentasjon" />
        <Tekst tekst="forside.overgangsstønad.beskjedDokumentere" />
        <Tekst tekst="forside.overgangsstønad.merInformasjon" />
        <LocaleTekst tekst="forside.overgangsstønad.oversiktDokumentasjon" />
      </Seksjon>

      <Seksjon>
        <Overskrift tekst="forside.overgangsstønad.overskrift.henteInformasjon" />
        <Tekst tekst="forside.overgangsstønad.henteInformasjon" />
        <Tekst tekst="forside.overgangsstønad.viHenter" />
        <LocaleTekst tekst="forside.overgangsstønad.henterPunktliste" />
        <Tekst tekst="forside.overgangsstønad.tidligereOpplysninger" />
        <LocaleTekst tekst="forside.overgangsstønad.personopplysningeneDine" />
      </Seksjon>

      <Seksjon>
        <Overskrift tekst="forside.overgangsstønad.overskrift.slikSøkerDu" />
        <Tekst tekst="forside.overgangsstønad.slikSøkerDu" />
        <Tekst tekst="forside.overgangsstønad.viLagrerSøknadenDin" />
        <Tekst tekst="forside.overgangsstønad.manglerDuDokumentasjon" />
      </Seksjon>

      {!isIE && (
        <DisclaimerBoks
          navn={person.søker.forkortetNavn}
          tekst={'forside.overgangsstønad.disclaimerTekst'}
          harBekreftet={harBekreftet}
          settBekreftelse={settBekreftelse}
        />
      )}

      {harBekreftet && <KnappLocaleTekstOgNavigate nesteSide={nesteSide} />}
    </>
  );
};
