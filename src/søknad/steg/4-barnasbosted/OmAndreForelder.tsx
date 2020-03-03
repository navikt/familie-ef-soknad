import React, { useState } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { useIntl } from 'react-intl';
import { IForelder, IBarn } from '../../../models/person';
import { Input } from 'nav-frontend-skjema';
import { Checkbox } from 'nav-frontend-skjema';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';

interface Props {
  barn: IBarn;
  settForelder: Function;
  forelder: IForelder;
}
const OmAndreForelder: React.FC<Props> = ( { barn, settForelder, forelder }) => {
    const intl = useIntl();
    const [huketAv, settHuketAv] = useState<boolean>(false);

    const hukAv = (e: any) => {
        settHuketAv(e.target.checked);

        const nyForelder = {...forelder};
    
        if (e.target.checked) {
          delete nyForelder.navn;
          delete nyForelder.fødselsdato;
          delete nyForelder.personnr;
        }

        settForelder(nyForelder);
    }

  return (
    <>
      <KomponentGruppe>
    <FeltGruppe>
        <Input className="foreldre-navn-input" onChange={(e) => settForelder({...forelder, "navn": e.target.value})} value={forelder.navn ? forelder.navn : ""} label="Navn" disabled={huketAv} />
    </FeltGruppe>
    </KomponentGruppe>
    <KomponentGruppe>
    <div className="fødselsnummer">
        <div className="fødselsdato">
    <Datovelger
                settDato={(e: Date | null) => settForelder({...forelder, "fødselsdato": e})}
                valgtDato={forelder.fødselsdato ? forelder.fødselsdato : undefined}
                tekstid={'datovelger.fødselsdato'}
                datobegrensning={DatoBegrensning.TidligereDatoer}
            />
            </div>
        <Input className="personnummer" onChange={(e) => settForelder({...forelder, "personnr": e.target.value})} value={forelder.personnr ? forelder.personnr : ""} label="Personnummer (hvis du vet)" disabled={huketAv} />
        </div>
        <FeltGruppe classname="checkbox-forelder">
        <Checkbox 
            label={'Jeg kan ikke oppgi den andre forelderen'}
            checked={huketAv}
            onChange={hukAv}
        />
        </FeltGruppe>
      </KomponentGruppe>
    </>
  );
};

export default OmAndreForelder;
