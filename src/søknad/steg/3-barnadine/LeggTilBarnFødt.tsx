import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { RadioPanel } from 'nav-frontend-skjema';
import { Input } from 'nav-frontend-skjema';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

interface Props {
  navn?: string;
  personnummer?: string;
  settNavn: Function;
  settPersonnummer: Function;
  settBo: Function;
  boHosDeg: string;
  settDato: Function;
  barnDato: Date;
}

const LeggTilBarnFødt: React.FC<Props> = ({
  navn,
  personnummer,
  settNavn,
  settPersonnummer,
  settBo,
  boHosDeg,
  settDato,
  barnDato,
}) => {
  return (
    <>
      <KomponentGruppe>
        <Input
          onChange={(e) => settNavn(e.target.value)}
          value={navn}
          label="Barnets fulle navn, om dette er bestemt"
        />
      </KomponentGruppe>

      <KomponentGruppe>
        <div className="fødselsnummer">
          <div className="fødselsdato">
            <Datovelger
              settDato={(e) => settDato(e)}
              valgtDato={barnDato}
              tekstid={'datovelger.fødselsdato'}
              datobegrensning={DatoBegrensning.TidligereDatoer}
            />
          </div>
          <Input
            className="personnummer"
            value={personnummer}
            onChange={(e) => settPersonnummer(e.target.value)}
            label="Personnummer. Kun hvis barnet har fått."
          />
        </div>
      </KomponentGruppe>

      <KomponentGruppe>
        <Normaltekst>Bor barnet hos deg?</Normaltekst>
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

export default LeggTilBarnFødt;
