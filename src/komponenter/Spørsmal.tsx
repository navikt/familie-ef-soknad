import React from 'react';
import { ISpørsmål } from '../typer/spørsmal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../språk/LocaleTekst';
import SpråkVelger from './språkvelger/Språkvelger';
import { Panel } from 'nav-frontend-paneler';

interface ISporsmalProps {
  sporsmalListe: ISpørsmål[];
  steg: number;
}

type MergedProps = ISporsmalProps;
const Spørsmål: React.FC<MergedProps> = ({ sporsmalListe, steg }) => {
  const sporsmal = sporsmalListe[steg];
  // eslint-disable-next-line

  return (
    <Panel className="innholdspanel" border>
      <Undertittel>Dynamisk tekst fra Sanity: </Undertittel>
      <Normaltekst>
        <LocaleTekst tekst={sporsmal.tittel} />
      </Normaltekst>
      <Undertittel>Statisk tekst fra appen:</Undertittel>
      <Normaltekst>
        <LocaleTekst tekst={'app.tekst'} />
      </Normaltekst>
      <SpråkVelger />
    </Panel>
  );
};

export default Spørsmål;
