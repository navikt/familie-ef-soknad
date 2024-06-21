import React from 'react';
import { useState } from 'react';
import { FormProgress } from '@navikt/ds-react';

export interface ISteg {
  label: string;
  index: number;
}

interface IStegIndikatorProps {
  stegListe: ISteg[];
  aktivtSteg: number;
}

const Stegindikator: React.FC<IStegIndikatorProps> = ({
  stegListe,
  aktivtSteg,
}) => {
  const [activeStep, setActiveStep] = useState(aktivtSteg + 1);

  return (
    <FormProgress
      className="stegindikator"
      totalSteps={stegListe.length}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      interactiveSteps={false}
    >
      {stegListe.map((steg) => (
        <FormProgress.Step key={steg.label}>{steg.label}</FormProgress.Step>
      ))}
    </FormProgress>
  );
};

export default Stegindikator;
