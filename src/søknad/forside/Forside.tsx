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
import FortsettSøknad from './FortsettSøknad';
import Environment from '../../Environment';

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

  const kanBrukeMellomlagretSøknad =
    mellomlagretOvergangsstønad !== undefined &&
    mellomlagretOvergangsstønad.søknad.person.hash === person.hash &&
    mellomlagretOvergangsstønad.modellVersjon === Environment().modellVersjon;

  // TODO: Må si ifra at den mellomlagrede versjonen ikke kan brukes pga endring i personopplysninger?

  return (
    <div className={'forside'}>
      <main className={'forside__innhold'}>
        <Panel className={'forside__panel'}>
          <Sidetittel>Søknad om overgangsstønad</Sidetittel>
          {toggles[ToggleName.mellomlagre_søknad] &&
          kanBrukeMellomlagretSøknad &&
          mellomlagretOvergangsstønad ? (
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
