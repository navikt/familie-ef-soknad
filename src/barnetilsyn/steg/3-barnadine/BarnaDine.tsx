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
import { Alert, Label } from '@navikt/ds-react';
import {
  BarnaDineContainer,
  BarneKortWrapper,
} from '../../../søknad/steg/3-barnadine/BarnaDineInnhold';
import styled from 'styled-components';

const AlertContainer = styled.div`
  & > *:not(:first-child) {
    margin-top: 3rem;
  }
`;

const BarnaDine: React.FC = () => {
  useMount(() => logSidevisningBarnetilsyn('BarnaDine'));

  const intl = useLokalIntlContext();
  const { søknad, mellomlagreBarnetilsyn, oppdaterBarnISøknaden } =
    useBarnetilsynSøknad();
  const skalViseKnapper = ESide.visTilbakeNesteAvbrytKnapp;

  const toggleSkalHaBarnepass = (id: string) => {
    const detteBarnet = søknad.person.barn.find((b: IBarn) => b.id === id);

    if (!detteBarnet) return;

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

    oppdaterBarnISøknaden(nyttBarn);
  };

  const harValgtMinstEttBarn = søknad.person.barn.some(
    (b: IBarn) => b.skalHaBarnepass?.verdi
  );

  const harBarnRegistrertIFolkeregisteret = søknad.person.barn.length > 0;

  return (
    <Side
      stønadstype={Stønadstype.barnetilsyn}
      stegtittel={hentTekst('barnadine.sidetittel', intl)}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={harValgtMinstEttBarn}
      routesStønad={RoutesBarnetilsyn}
      mellomlagreStønad={mellomlagreBarnetilsyn}
      tilbakeTilOppsummeringPath={hentPathBarnetilsynOppsummering}
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

        <AlertContainer>
          <Alert size="small" variant="info" inline>
            {hentTekst('barnadine.infohentet', intl)}
          </Alert>

          {!harBarnRegistrertIFolkeregisteret && (
            <Alert variant="info" size="small">
              {hentTekst('barnadine.ingenBarn', intl)}
            </Alert>
          )}

          <Alert size="small" variant="info" inline>
            <LocaleTekst tekst={'barnadine.barnetilsyn.info.brukpdf'} />
          </Alert>
        </AlertContainer>

        <BarneKortWrapper>
          {søknad.person.barn
            ?.sort((a: IBarn, b: IBarn) => {
              if (a.medforelder?.verdi && !b.medforelder?.verdi) {
                return -1;
              }
              if (!a.medforelder?.verdi && b.medforelder?.verdi) {
                return 1;
              }
              return 0;
            })
            .map((barn: IBarn) => (
              <Barnekort
                key={barn.id}
                gjeldendeBarn={barn}
                footer={
                  <BarnMedISøknad
                    id={barn.id ? barn.id : ''}
                    toggleSkalHaBarnepass={toggleSkalHaBarnepass}
                    skalHaBarnepass={!!barn.skalHaBarnepass?.verdi}
                  />
                }
              />
            ))}
        </BarneKortWrapper>
      </BarnaDineContainer>
    </Side>
  );
};

export default BarnaDine;
