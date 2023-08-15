import React from 'react';
import { hentFeltObjekt, hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import LesMerTekst from '../../../components/LesMerTekst';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import BarnMedISøknad from './BarnMedISøknad';
import Barnekort from '../../../søknad/steg/3-barnadine/Barnekort';
import { IBarn } from '../../../models/steg/barn';
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';
import { hentPathBarnetilsynOppsummering } from '../../utils';
import Side, { ESide } from '../../../components/side/Side';
import { Stønadstype } from '../../../models/søknad/stønadstyper';

import LocaleTekst from '../../../language/LocaleTekst';
import { logSidevisningBarnetilsyn } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { ISøknad } from '../../models/søknad';
import { Alert, Label } from '@navikt/ds-react';
import {
  BarnaDineContainer,
  BarneKortWrapper,
} from '../../../søknad/steg/3-barnadine/BarnaDineFellesStyles';

const BarnaDine: React.FC = () => {
  useMount(() => logSidevisningBarnetilsyn('BarnaDine'));

  const intl = useLokalIntlContext();
  const {
    søknad,
    settSøknad,
    mellomlagreBarnetilsyn,
    settDokumentasjonsbehovForBarn,
    oppdaterBarnISoknaden,
  } = useBarnetilsynSøknad();
  const skalViseKnapper = ESide.visTilbakeNesteAvbrytKnapp;

  const toggleSkalHaBarnepass = (id: string) => {
    const detteBarnet = søknad.person.barn.find((b: IBarn) => b.id === id);

    if (!detteBarnet) return null;

    const skalHaBarnepassVerdi = !detteBarnet.skalHaBarnepass?.verdi;
    const nyttBarn: IBarn = {
      ...detteBarnet,
      skalHaBarnepass: hentFeltObjekt(
        'barnekort.skalHaBarnepass',
        skalHaBarnepassVerdi,
        intl
      ),
    };

    if (!skalHaBarnepassVerdi) {
      delete nyttBarn.barnepass;
    }

    const nyBarneListe = søknad.person.barn.map((barn: IBarn) => {
      return barn.id === id ? nyttBarn : barn;
    });
    settSøknad({
      ...søknad,
      person: { ...søknad.person, barn: nyBarneListe },
    });
  };

  const slettBarn = (id: string) => {
    const nyBarneListe = søknad.person.barn.filter(
      (barn: IBarn) => barn.id !== id
    );

    settSøknad((prevSoknad: ISøknad) => {
      return {
        ...prevSoknad,
        person: { ...søknad.person, barn: nyBarneListe },
      };
    });
  };

  const harValgtMinstEttBarn = søknad.person.barn.some(
    (b: IBarn) => b.skalHaBarnepass?.verdi
  );

  return (
    <Side
      stønadstype={Stønadstype.barnetilsyn}
      stegtittel={hentTekst('barnadine.sidetittel', intl)}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={harValgtMinstEttBarn}
      routesStønad={RoutesBarnetilsyn}
      mellomlagreStønad={mellomlagreBarnetilsyn}
      tilbakeTilOppsummeringPath={hentPathBarnetilsynOppsummering}
      informasjonstekstId={'barnadine.barnetilsyn.info.brukpdf'}
    >
      <BarnaDineContainer>
        <FeltGruppe>
          <Label as="p">
            <LocaleTekst tekst="barnetilsyn.tekst.hvilke" />
          </Label>
          <LesMerTekst
            åpneTekstid={'barnetilsyn.hjelpetekst-åpne.hvilke'}
            innholdTekstid={'barnetilsyn.hjelpetekst-innhold.hvilke'}
          />
        </FeltGruppe>
        <Alert size="small" variant="info" inline>
          {hentTekst('barnadine.infohentet', intl)}
        </Alert>
        <BarneKortWrapper>
          {søknad.person.barn
            ?.sort((a: IBarn, b: IBarn) => parseInt(a.id) - parseInt(b.id))
            .map((barn: IBarn) => (
              <Barnekort
                key={barn.id}
                gjeldendeBarn={barn}
                barneListe={søknad.person.barn}
                settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
                velgBarnForDenneSøknaden={
                  <BarnMedISøknad
                    id={barn.id ? barn.id : ''}
                    toggleSkalHaBarnepass={toggleSkalHaBarnepass}
                    skalHaBarnepass={!!barn.skalHaBarnepass?.verdi}
                  />
                }
                slettBarn={slettBarn}
                oppdaterBarnISoknaden={oppdaterBarnISoknaden}
              />
            ))}
        </BarneKortWrapper>
      </BarnaDineContainer>
    </Side>
  );
};

export default BarnaDine;
