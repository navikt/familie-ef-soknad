import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import LocaleTekst from '../../language/LocaleTekst';
import SeksjonGruppe from '../../components/gruppe/SeksjonGruppe';
import { FortsettSøknadKnappWrapper } from './FortsettSøknadKnapper';
import { logEvent } from '../../utils/amplitude';
import { useNavigate } from 'react-router-dom';
import { LokalIntlShape } from '../../language/typer';

interface FortsettSøknadProps {
  intl: LokalIntlShape;
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
  const navigate = useNavigate();

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
              navigate(gjeldendeSteg);
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
