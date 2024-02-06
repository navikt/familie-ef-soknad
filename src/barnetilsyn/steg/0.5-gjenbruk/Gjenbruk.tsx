import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ERouteBarnetilsyn,
  RoutesBarnetilsyn,
} from '../../routing/routesBarnetilsyn';
import { logSidevisningBarnetilsyn } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { BodyShort, GuidePanel } from '@navikt/ds-react';
import { KnappNesteSide } from './KnappNesteSide';
import { hentPath } from '../../../utils/routing';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';

const Gjenbruk: FC = () => {
  useMount(() => logSidevisningBarnetilsyn('OmDeg'));
  const intl = useLokalIntlContext();
  const location = useLocation();
  const { søknad } = useBarnetilsynSøknad();

  const nesteSide = hentPath(RoutesBarnetilsyn, ERouteBarnetilsyn.OmDeg) || '';
  return (
    <>
      <h1>Dette er gjenbruk.....</h1>
      <GuidePanel>
        <BodyShort>Hei {søknad.person.søker.forkortetNavn}</BodyShort>
        <BodyShort>
          Vi ser at du har søkt om stønad til Barnetilsyn tidligere. Om du
          ønsker kan vi fylle ut din nye søknad med de samme opplysningen du
          oppga i søknaden du sendte inn sist den 06.06.2022.
        </BodyShort>
        <BodyShort>
          Før vi kan fylle ut søknaden må du svare på noen generelle spørsmål.
          Når det er gjort fyller vi ut søknaden for deg. Det er viktig at du
          går igjennom opplysningen som står i søknaden vi fyller ut for deg og
          påser at disse fortsatt er korrekte.
        </BodyShort>
      </GuidePanel>
      <KnappNesteSide nesteSide={nesteSide} tekst="Gjenbruk fra forrige" />
      <KnappNesteSide nesteSide={nesteSide} tekst="Start med tom søknad" />
    </>
  );
};

export default Gjenbruk;
