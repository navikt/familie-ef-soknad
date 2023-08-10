import React from 'react';
import vedlegg from '../../assets/vedlegg.svg';
import { formaterFilstørrelse } from './utils';
import { IVedlegg } from '../../models/steg/vedlegg';
import { BodyShort, Button } from '@navikt/ds-react';
import styled from 'styled-components';
import { TrashFillIcon } from '@navikt/aksel-icons';
import LocaleTekst from '../../language/LocaleTekst';

interface Props {
  filliste: IVedlegg[];
  slettVedlegg: (vedlegg: IVedlegg) => void;
}

const Filrad = styled.div`
  display: grid;
  grid-template-columns: 1.5rem 1fr auto;
  gap: 1rem;
  align-items: center;
`;

const OpplastedeFiler: React.FC<Props> = ({ filliste, slettVedlegg }) => {
  return (
    <>
      {filliste.map((fil: IVedlegg, index: number) => (
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
              onClick={() => {
                slettVedlegg(fil);
              }}
            >
              <LocaleTekst tekst="dokumentasjon.knapp.slett" />
            </Button>
          </Filrad>
          {index === filliste.length - 1 ? <br /> : <hr />}
        </div>
      ))}
    </>
  );
};

export default OpplastedeFiler;
