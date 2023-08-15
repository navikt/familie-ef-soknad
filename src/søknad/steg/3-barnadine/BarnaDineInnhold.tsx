import React, { useState } from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import Barnekort from '../../../søknad/steg/3-barnadine/Barnekort';
import { IBarn } from '../../../models/steg/barn';
import { Alert } from '@navikt/ds-react';
import {
  BarnaDineContainer,
  BarneKortWrapper,
} from '../../../søknad/steg/3-barnadine/BarnaDineFellesStyles';
import { LeggTilBarnKort } from '../../../søknad/steg/3-barnadine/LeggTilBarnKort';
import LeggTilBarnModal from '../../../søknad/steg/3-barnadine/LeggTilBarnModal';
import { SettDokumentasjonsbehovBarn } from '../../../models/søknad/søknad';
import { EndreEllerSlettBarn } from './EndreEllerSlettBarn';

interface Props {
  barneliste: IBarn[];
  oppdaterBarnISoknaden: (oppdatertBarn: IBarn) => void;
  fjernBarnFraSøknad: (id: string) => void;
  settDokumentasjonsbehovForBarn: SettDokumentasjonsbehovBarn;
}

export const BarnaDineInnhold: React.FC<Props> = ({
  barneliste,
  oppdaterBarnISoknaden,
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
            aksjonFooter={
              barn.lagtTil && (
                <EndreEllerSlettBarn
                  slettBarn={fjernBarnFraSøknad}
                  id={barn.id}
                  settDokumentasjonsbehovForBarn={
                    settDokumentasjonsbehovForBarn
                  }
                  barneListe={barneliste}
                  oppdaterBarnISoknaden={oppdaterBarnISoknaden}
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
          oppdaterBarnISoknaden={oppdaterBarnISoknaden}
        />
      )}
    </BarnaDineContainer>
  );
};
