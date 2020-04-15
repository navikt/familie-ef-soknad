import React, { useState } from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { Input } from 'nav-frontend-skjema';
import { Checkbox } from 'nav-frontend-skjema';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { IBarn } from '../../../models/barn';
import { IForelder } from '../../../models/forelder';

interface Props {
  barn: IBarn;
  settForelder: Function;
  forelder: IForelder;
}
const OmAndreForelder: React.FC<Props> = ({ settForelder, forelder }) => {
  const [huketAv, settHuketAv] = useState<boolean>(false);

  const hukAv = (e: any) => {
    settHuketAv(e.target.checked);

    const nyForelder = { ...forelder };

    if (e.target.checked) {
      delete nyForelder.navn;
      delete nyForelder.fødselsdato;
      delete nyForelder.personnr;
    }

    settForelder(nyForelder);
  };

  return (
    <>
      <KomponentGruppe>
        <FeltGruppe>
          <Input
            className="foreldre-navn-input"
            onChange={(e) =>
              settForelder({
                ...forelder,
                navn: {
                  label: 'halla',
                  verdi: e.target.value,
                },
              })
            }
            value={forelder.navn ? forelder.navn?.verdi : ''}
            label="Navn"
            disabled={huketAv}
          />
        </FeltGruppe>
      </KomponentGruppe>
      <KomponentGruppe>
        <div className="fødselsnummer">
          <Datovelger
            settDato={(e: Date | null) => {
              e !== null &&
                settForelder({
                  ...forelder,
                  flyttetFra: {
                    label: 'Fødselsnummer datotest',
                    verdi: e,
                  },
                });
            }}
            valgtDato={
              forelder.fødselsdato && forelder.fødselsdato.verdi
                ? forelder.fødselsdato.verdi
                : undefined
            }
            tekstid={'datovelger.fødselsdato'}
            datobegrensning={DatoBegrensning.TidligereDatoer}
          />
          <Input
            className="personnummer"
            onChange={(e) =>
              settForelder({
                ...forelder,
                personnr: {
                  label: 'Personnr',
                  verdi: e.target.value,
                },
              })
            }
            value={forelder.personnr ? forelder.personnr?.verdi : ''}
            label="Personnummer (hvis du vet)"
            disabled={huketAv}
          />
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
