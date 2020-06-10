import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { IntlShape } from 'react-intl';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import { useHistory } from 'react-router-dom';
import SeksjonGruppe from '../../components/gruppe/SeksjonGruppe';
import { FortsettSøknadKnappWrapper } from './FortsettSøknadKnapper';
import { IMellomlagretOvergangsstønad } from '../../models/mellomlagretSøknad';

interface FortsettSøknadProps {
  intl: IntlShape;
  mellomlagretOvergangsstønad: IMellomlagretOvergangsstønad;
  brukMellomlagretOvergangsstønad: () => void;
  nullstillMellomlagretOvergangsstønad: () => Promise<any>;
}

const FortsettSøknad: React.FC<FortsettSøknadProps> = ({
  intl,
  mellomlagretOvergangsstønad,
  brukMellomlagretOvergangsstønad,
  nullstillMellomlagretOvergangsstønad,
}) => {
  const history = useHistory();

  return (
    <>
      <div className="seksjon">
        <Normaltekst>
          {intl.formatMessage({ id: 'side.fortsettSøknad.påbegyntSøknad' })}
        </Normaltekst>
      </div>
      <SeksjonGruppe className={'sentrert'}>
        <FortsettSøknadKnappWrapper>
          <KnappBase
            onClick={() => {
              brukMellomlagretOvergangsstønad();
              history.push(mellomlagretOvergangsstønad.gjeldendeSteg);
            }}
            type={'hoved'}
            className={'fortsett'}
          >
            <LocaleTekst tekst={'side.fortsettSøknad.knapp.fortsett'} />
          </KnappBase>
          <KnappBase
            onClick={() => {
              nullstillMellomlagretOvergangsstønad().then(() => {
                window.location.reload();
              });
            }}
            type={'standard'}
            className={'start-ny'}
          >
            <LocaleTekst tekst={'side.fortsettSøknad.knapp.startPåNytt'} />
          </KnappBase>
        </FortsettSøknadKnappWrapper>
      </SeksjonGruppe>
    </>
  );
};

export default FortsettSøknad;
