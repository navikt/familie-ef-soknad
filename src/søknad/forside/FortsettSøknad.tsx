import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { IntlShape } from 'react-intl';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import { useHistory } from 'react-router-dom';
import SeksjonGruppe from '../../components/gruppe/SeksjonGruppe';
import { FortsettSøknadKnappWrapper } from './FortsettSøknadKnapper';

interface FortsettSøknadProps {
  intl: IntlShape;
  gjeldendeSteg: string;
  brukMellomlagretSøknad: () => void;
  nullstillMellomlagretSøknad: () => Promise<any>;
}

const FortsettSøknad: React.FC<FortsettSøknadProps> = ({
  intl,
  gjeldendeSteg,
  brukMellomlagretSøknad,
  nullstillMellomlagretSøknad,
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
              brukMellomlagretSøknad();
              history.push(gjeldendeSteg);
            }}
            type={'hoved'}
            className={'fortsett'}
          >
            <LocaleTekst tekst={'side.fortsettSøknad.knapp.fortsett'} />
          </KnappBase>
          <KnappBase
            onClick={() => {
              nullstillMellomlagretSøknad().then(() => {
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
