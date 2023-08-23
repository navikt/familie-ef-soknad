import React, { useState } from 'react';
import styled from 'styled-components';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { Link } from '@navikt/ds-react';
import { IBarn } from '../../../models/steg/barn';
import { SettDokumentasjonsbehovBarn } from '../../../models/søknad/søknad';
import LeggTilBarnModal from './LeggTilBarnModal';

interface Props {
  fjernBarnFraSøknad: (id: string) => void;
  id: string;
  settDokumentasjonsbehovForBarn: SettDokumentasjonsbehovBarn;
  barneListe: IBarn[];
  oppdaterBarnISøknaden: (oppdatertBarn: IBarn) => void;
}

const LenkeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const LinkMedPointer = styled(Link)`
  cursor: pointer;
`;

export const EndreEllerSlettBarn: React.FC<Props> = ({
  fjernBarnFraSøknad,
  id,
  settDokumentasjonsbehovForBarn,
  barneListe,
  oppdaterBarnISøknaden,
}) => {
  const intl = useLokalIntlContext();

  const [åpenEndreModal, settÅpenEndreModal] = useState(false);

  return (
    <>
      <LenkeContainer>
        <LinkMedPointer onClick={() => settÅpenEndreModal(true)}>
          {intl.formatMessage({ id: 'barnekort.lenke.endre' })}
        </LinkMedPointer>
        <LinkMedPointer onClick={() => fjernBarnFraSøknad(id)}>
          {intl.formatMessage({ id: 'barnekort.fjern' })}
        </LinkMedPointer>
      </LenkeContainer>

      {åpenEndreModal && (
        <LeggTilBarnModal
          tittel={intl.formatMessage({ id: 'barnadine.endre' })}
          lukkModal={() => settÅpenEndreModal(false)}
          id={id}
          barneListe={barneListe}
          settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
          oppdaterBarnISøknaden={oppdaterBarnISøknaden}
        />
      )}
    </>
  );
};
