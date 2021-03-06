import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';
import { hentFeltObjekt, hentTekst } from '../../../utils/søknad';
import { useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import Hjelpetekst from '../../../components/Hjelpetekst';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import BarnMedISøknad from './BarnMedISøknad';
import Barnekort from '../../../søknad/steg/3-barnadine/Barnekort';
import { IBarn } from '../../../models/steg/barn';
import { RoutesBarnetilsyn } from '../../routing/routesBarnetilsyn';
import { hentPathBarnetilsynOppsummering } from '../../utils';
import Side, { ESide } from '../../../components/side/Side';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { LocationStateSøknad } from '../../../models/søknad/søknad';
import LocaleTekst from '../../../language/LocaleTekst';
import { logSidevisningBarnetilsyn } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { ISøknad } from '../../models/søknad';

const BarnaDine: React.FC = () => {
  useMount(() => logSidevisningBarnetilsyn('BarnaDine'));

  const intl = useIntl();
  const {
    søknad,
    settSøknad,
    mellomlagreBarnetilsyn,
    settDokumentasjonsbehovForBarn,
  } = useBarnetilsynSøknad();
  const history = useHistory();
  const location = useLocation<LocationStateSøknad>();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering && false;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;

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

  const settBarneliste = (nyBarneListe: IBarn[]) => {
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
    <>
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
        <div className="barna-dine">
          <div className="barnetilsyn__hvilke-barn">
            <Element>
              <LocaleTekst tekst="barnetilsyn.tekst.hvilke" />
            </Element>
            <FeltGruppe>
              <Hjelpetekst
                åpneTekstid={'barnetilsyn.hjelpetekst-åpne.hvilke'}
                innholdTekstid={'barnetilsyn.hjelpetekst-innhold.hvilke'}
              />
            </FeltGruppe>
          </div>
          <AlertStripeInfo className="informasjonstekst">
            {hentTekst('barnadine.infohentet', intl)}
          </AlertStripeInfo>
          <div className="barnekort-wrapper">
            {søknad.person.barn
              ?.sort((a: IBarn, b: IBarn) => parseInt(a.id) - parseInt(b.id))
              .map((barn: IBarn) => (
                <Barnekort
                  key={barn.id}
                  gjeldendeBarn={barn}
                  barneListe={søknad.person.barn}
                  settBarneListe={settBarneliste}
                  settDokumentasjonsbehovForBarn={
                    settDokumentasjonsbehovForBarn
                  }
                  velgBarnForDenneSøknaden={
                    <BarnMedISøknad
                      id={barn.id ? barn.id : ''}
                      toggleSkalHaBarnepass={toggleSkalHaBarnepass}
                      skalHaBarnepass={!!barn.skalHaBarnepass?.verdi}
                    />
                  }
                  slettBarn={slettBarn}
                />
              ))}
          </div>
        </div>
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
    </>
  );
};

export default BarnaDine;
