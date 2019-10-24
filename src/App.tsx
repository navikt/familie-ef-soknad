import React, { useEffect, useState } from 'react';
import Feilside from './components/feilside/Feilside';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Spørsmål from './components/spørsmål/Spørsmål';
import Søknad from './components/søknad/Søknad';
import { client } from './utils/sanity';
import { Panel } from 'nav-frontend-paneler';
import hentToggles from './toggles/api';
import { ToggleName, Toggles } from './models/toggles';
import Språkvelger from './components/språkvelger/Språkvelger';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from './language/LocaleTekst';

const App = () => {
  const [spørsmal, settSpørsmal] = useState<any>([]);
  const [toggles, settToggles] = useState<Toggles>({});
  const [fetching, settFetching] = useState<boolean>(true);
  const [error, settError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch('*[_type == $type]', { type: 'sporsmal' })
        .then((res: any) => {
          settSpørsmal(res);
        })
        .catch((err: any) => {
          settError(true);
        });
      hentToggles(settToggles);
      settFetching(false);
    };
    fetchData();
  }, []);

  const erSpørsmålDataHentet = spørsmal && spørsmal.length;

  if (!fetching) {
    if (!error && erSpørsmålDataHentet) {
      return (
        <div className="app">
          <section>
            <Språkvelger />

            <Undertittel>Statisk tekst fra appen:</Undertittel>
            <Normaltekst>
              <LocaleTekst tekst={'app.tekst'} />
            </Normaltekst>
            <Panel className="innholdspanel">
              <div>
                {toggles[ToggleName.vis_innsending] && <Søknad />}
                <Spørsmål sporsmalListe={spørsmal} steg={1} />
              </div>
            </Panel>
          </section>
          <Søknad />

          <section>
            <Panel>
              <Spørsmål sporsmalListe={spørsmal} steg={1} />
            </Panel>
          </section>
        </div>
      );
    } else if (error) {
      return <Feilside />;
    } else {
      return <NavFrontendSpinner className="spinner" />;
    }
  } else {
    return <NavFrontendSpinner className="spinner" />;
  }
};

export default App;
