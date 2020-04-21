import React from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import AlertStripe from 'nav-frontend-alertstriper';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';

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
        {boHosDeg === 'nei' && (
          <AlertStripe type={'advarsel'} form={'inline'}>
            Når barnet ikke skal bo hos deg, har du ikke rett til stønad til
            enslig mor eller far
          </AlertStripe>
        )}
      </KomponentGruppe>
    </>
  );
};

export default LeggTilBarnUfødt;
