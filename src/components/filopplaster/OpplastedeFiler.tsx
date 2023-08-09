import React from 'react';
import vedlegg from '../../assets/vedlegg.svg';
import { formaterFilstørrelse } from './utils';
import { IVedlegg } from '../../models/steg/vedlegg';
import { BodyShort, Button } from '@navikt/ds-react';
import styled from 'styled-components';
import { TrashFillIcon } from '@navikt/aksel-icons';

interface Props {
  filliste: IVedlegg[];
  slettVedlegg: (vedlegg: IVedlegg) => void;
}

const Container = styled.div`
  margin-bottom: 5rem;
`;

const Filrad = styled.div`
  display: grid;
  grid-template-columns: 1.5rem 1fr auto;
  gap: 1rem;
  align-items: center;
`;

const OpplastedeFiler: React.FC<Props> = ({ filliste, slettVedlegg }) => {
  return (
    <Container>
      {filliste.map((fil: IVedlegg, index: number) => {
        return (
          <div key={fil.dokumentId}>
            <Filrad>
              <img src={vedlegg} alt="Vedleggsikon" />
              <BodyShort>
                {fil.navn} ({formaterFilstørrelse(fil.størrelse)})
              </BodyShort>
              <Button
                size="small"
                variant="tertiary"
                icon={<TrashFillIcon />}
                iconPosition="right"
              >
                slett
              </Button>
            </Filrad>
            {index === filliste.length - 1 ? '' : <hr />}
          </div>
        );
      })}
    </Container>
  );
};

export default OpplastedeFiler;
