import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { RadioPanel } from 'nav-frontend-skjema';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

interface Props {
  settBo: Function;
  boHosDeg: string;
  settDato: Function;
  barnDato: Date;
}

const LeggTilBarnUfødt: React.FC<Props> = ({
  settBo,
  boHosDeg,
  settDato,
  barnDato,
}) => {
  return (
    <>
      <KomponentGruppe>
        <Datovelger
          settDato={(e) => settDato(e)}
          valgtDato={barnDato}
          tekstid={'datovelger.fødselsdato'}
          datobegrensning={DatoBegrensning.TidligereDatoer}
        />
      </KomponentGruppe>

      <KomponentGruppe>
        <Normaltekst>Skal barnet bo hos deg?</Normaltekst>
        <div className="radiogruppe-2-svar">
          <RadioPanel
            key={'ja'}
            name={'radio-bosted'}
            label="Ja"
            value={'ja'}
            checked={boHosDeg === 'ja'}
            onChange={(e) => settBo(e)}
          />
          <RadioPanel
            key={'nei'}
            name={'radio-bosted'}
            label="Nei"
            value={'nei'}
            checked={boHosDeg === 'nei'}
            onChange={(e) => settBo(e)}
          />
        </div>
      </KomponentGruppe>
    </>
  );
};

export default LeggTilBarnUfødt;
