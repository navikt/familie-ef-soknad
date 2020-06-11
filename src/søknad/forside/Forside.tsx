import React, { useState, useEffect } from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Sidetittel } from 'nav-frontend-typografi';
import { usePersonContext } from '../../context/PersonContext';
import { useSpråkContext } from '../../context/SpråkContext';
import { injectIntl } from 'react-intl';
import { client } from '../../utils/sanity';
import { useSøknad } from '../../context/SøknadContext';
import { useToggles } from '../../context/TogglesContext';
import { ToggleName } from '../../models/toggles';
import Forsideinformasjon from './Forsideinformasjon';
import { hentBeskjedMedNavn } from '../../utils/språk';
import FortsettSøknad from './FortsettSøknad';
import VeilederSnakkeboble from '../../assets/VeilederSnakkeboble';

const Forside: React.FC<any> = ({ intl }) => {
  const { person } = usePersonContext();
  const {
    mellomlagretOvergangsstønad,
    brukMellomlagretOvergangsstønad,
    nullstillMellomlagretOvergangsstønad,
  } = useSøknad();
  const [locale] = useSpråkContext();
  const [forside, settForside] = useState<any>({});
  // eslint-disable-next-line
  const [error, settError] = useState<boolean>(false);
  // eslint-disable-next-line
  const [fetching, settFetching] = useState<boolean>(false);
  const { toggles } = useToggles();

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch('*[_type == $type][0]', { type: 'forside' })
        .then((res: any) => {
          settForside(res);
        })
        .catch((err: any) => {
          settError(true);
        });
      settFetching(false);
    };
    fetchData();
  }, []);

  const disclaimer = forside['disclaimer_' + locale];
  const seksjon = forside['seksjon_' + locale];

  return (
    <div className={'forside'}>
      <main className={'forside__innhold'}>
        <Panel className={'forside__panel'}>
          <div className="veileder">
            <VeilederSnakkeboble
              tekst={hentBeskjedMedNavn(
                person.søker.forkortetNavn,
                intl.formatMessage({ id: 'skjema.hei' })
              )}
            />
          </div>
          <Sidetittel>Søknad om overgangsstønad</Sidetittel>
          {toggles[ToggleName.mellomlagre_søknad] &&
          mellomlagretOvergangsstønad !== undefined ? (
            <FortsettSøknad
              intl={intl}
              mellomlagretOvergangsstønad={mellomlagretOvergangsstønad}
              brukMellomlagretOvergangsstønad={brukMellomlagretOvergangsstønad}
              nullstillMellomlagretOvergangsstønad={
                nullstillMellomlagretOvergangsstønad
              }
            />
          ) : (
            <Forsideinformasjon
              seksjon={seksjon}
              disclaimer={disclaimer}
              person={person}
              intl={intl}
            />
          )}
        </Panel>
      </main>
    </div>
  );
};

export default injectIntl(Forside);
