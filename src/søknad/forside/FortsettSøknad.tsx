import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { IntlShape } from 'react-intl';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import { useHistory } from 'react-router-dom';
import SeksjonGruppe from '../../components/gruppe/SeksjonGruppe';
import { FortsettSøknadKnappWrapper } from './FortsettSøknadKnapper';
import { logEvent } from '../../utils/amplitude';

interface FortsettSøknadProps {
  intl: IntlShape;
  gjeldendeSteg: string;
  brukMellomlagretSøknad: () => void;
  nullstillMellomlagretSøknad: () => Promise<any>;
  skjemanavn?: string;
}

const FortsettSøknad: React.FC<FortsettSøknadProps> = ({
  intl,
  gjeldendeSteg,
  brukMellomlagretSøknad,
  nullstillMellomlagretSøknad,
  skjemanavn,
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
              logEvent('klikk_mellomlagret', {
                type: 'fortsett',
                skjemanavn,
                gjeldendeSteg,
              });
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
              logEvent('klikk_mellomlagret', {
                type: 'nullstill',
                skjemanavn,
                gjeldendeSteg,
              });
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
