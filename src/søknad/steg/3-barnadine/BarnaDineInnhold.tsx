import React, { useState } from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import Barnekort from '../../../søknad/steg/3-barnadine/Barnekort';
import { IBarn } from '../../../models/steg/barn';
import { Alert } from '@navikt/ds-react';
import { LeggTilBarnKort } from '../../../søknad/steg/3-barnadine/LeggTilBarnKort';
import LeggTilBarnModal from '../../../søknad/steg/3-barnadine/LeggTilBarnModal';
import { SettDokumentasjonsbehovBarn } from '../../../models/søknad/søknad';
import { EndreEllerSlettBarn } from './EndreEllerSlettBarn';
import styled from 'styled-components';

interface Props {
  barneliste: IBarn[];
  oppdaterBarnISøknaden: (oppdatertBarn: IBarn) => void;
  fjernBarnFraSøknad: (id: string) => void;
  settDokumentasjonsbehovForBarn: SettDokumentasjonsbehovBarn;
}

export const BarneKortWrapper = styled.div`
  display: inline-flex;
  gap: 1rem;
  flex-wrap: wrap;
  max-width: 568px;
  margin: auto;

  @media (max-width: 767px) {
    justify-content: center;
  }
`;

export const BarnaDineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BarnaDineInnhold: React.FC<Props> = ({
  barneliste,
  oppdaterBarnISøknaden,
  fjernBarnFraSøknad,
  settDokumentasjonsbehovForBarn,
}) => {
  const intl = useLokalIntlContext();

  const [åpenModal, settÅpenModal] = useState(false);

  return (
    <BarnaDineContainer>
      <Alert size="small" variant="info" inline>
        {hentTekst('barnadine.infohentet', intl)}
      </Alert>
      <BarneKortWrapper>
        {barneliste.map((barn: IBarn) => (
          <Barnekort
            key={barn.id}
            gjeldendeBarn={barn}
            footer={
              barn.lagtTil && (
                <EndreEllerSlettBarn
                  fjernBarnFraSøknad={fjernBarnFraSøknad}
                  id={barn.id}
                  settDokumentasjonsbehovForBarn={
                    settDokumentasjonsbehovForBarn
                  }
                  barneListe={barneliste}
                  oppdaterBarnISøknaden={oppdaterBarnISøknaden}
                />
              )
            }
          />
        ))}
        <LeggTilBarnKort settÅpenModal={settÅpenModal} />
      </BarneKortWrapper>
      {åpenModal && (
        <LeggTilBarnModal
          tittel={intl.formatMessage({ id: 'barnadine.leggtil' })}
          lukkModal={() => settÅpenModal(false)}
          barneListe={barneliste}
          settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
          oppdaterBarnISoknaden={oppdaterBarnISøknaden}
        />
      )}
    </BarnaDineContainer>
  );
};
