import React from 'react';
import styled from 'styled-components';

const StegListe = styled.ol`
  list-style-type: none;
  display: flex;
  justify-content: center;

  margin: 1rem 0;
  padding: 0;

  grid-area: stegindikator;
`;

const Steg = styled.li`
  position: relative;
  margin-right: 1.25rem;

  &::after {
    height: 1px;
    content: '';
    display: block;
    background-color: var(--a-border-strong);
    position: absolute;
    top: 1rem;
    width: 1.25rem;
    left: 2rem;
    right: auto;

    @media (max-width: 650px) {
      top: 0.375rem;
      left: 0.75rem;
    }
  }

  &:last-child {
    margin-right: 0;

    &::after {
      display: none;
    }
  }
`;

const StegNummer = styled.div<{ ferdig: boolean; aktiv: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: var(--a-text-on-info);
  z-index: 1;

  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 0 1px var(--a-border-strong) inset;

  @media (max-width: 650px) {
    width: 0.75rem;
    height: 0.75rem;
    font-size: 0;
  }

  ${(props) =>
    props.ferdig &&
    `
    background: var(--a-bg-subtle);`}

  ${(props) =>
    props.aktiv &&
    `
    background: var(--a-surface-action-active);
    color: var(--a-bg-default);
    box-shadow: var(--a-text-on-neutral);
    transform: scale(1.2);`}
`;

export interface ISteg {
  label: string;
  index: number;
}

interface IStegIndikatorProps {
  stegListe: ISteg[];
  aktivtSteg: number;
}

export const Stegindikator: React.FC<IStegIndikatorProps> = ({
  stegListe,
  aktivtSteg,
}) => {
  return (
    <StegListe aria-hidden={true}>
      {stegListe.map((steg) => {
        const aktivt = steg.index === aktivtSteg;
        const ferdig = steg.index < aktivtSteg;

        return (
          <Steg key={steg.label} aria-label={steg.label} title={steg.label}>
            <StegNummer aktiv={aktivt} ferdig={ferdig}>
              {steg.index + 1}
            </StegNummer>
          </Steg>
        );
      })}
    </StegListe>
  );
};
