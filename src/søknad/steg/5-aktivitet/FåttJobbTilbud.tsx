import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { hentTekst } from '../../../utils/søknad';
import { IAktivitet } from '../../../models/steg/aktivitet/aktivitet';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (arbeidssituasjon: IAktivitet) => void;
}
const FåttJobbTilbud: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const intl = useLokalIntlContext();

  const settDato = (dato: string) => {
    settArbeidssituasjon({
      ...arbeidssituasjon,
      datoOppstartJobb: {
        label: hentTekst('dinSituasjon.datovelger.jobb', intl),
        verdi: dato,
      },
    });
  };
  return (
    <KomponentGruppe>
      <AlertStripeDokumentasjon>
        <Element>
          Du må legge ved arbeidskontrakt som viser at du har fått tilbud om
          jobb.
        </Element>
        <br />
        <Normaltekst>
          Dokumentasjonen må vise:
          <ul>
            <li>navn på arbeidsgiver</li>
            <li>stillingsprosent</li>
            <li>datoen du begynner i jobben</li>
            <li>datoen du fikk tilbudet</li>
          </ul>
        </Normaltekst>
      </AlertStripeDokumentasjon>
      <Datovelger
        valgtDato={arbeidssituasjon.datoOppstartJobb?.verdi}
        tekstid={'dinSituasjon.datovelger.jobb'}
        datobegrensning={DatoBegrensning.FremtidigeDatoer}
        settDato={settDato}
        fetSkrift={true}
      />
    </KomponentGruppe>
  );
};
export default FåttJobbTilbud;
