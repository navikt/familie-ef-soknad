import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import { datoTilStreng } from '../../../utils/dato';
import { IAktivitet } from '../../../models/steg/aktivitet/aktivitet';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (arbeidssituasjon: IAktivitet) => void;
}
const FåttJobbTilbud: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const intl = useIntl();

  const settDato = (dato: Date | null) => {
    dato !== null &&
      settArbeidssituasjon({
        ...arbeidssituasjon,
        datoOppstartJobb: {
          label: hentTekst('dinSituasjon.datovelger.jobb', intl),
          verdi: datoTilStreng(dato),
        },
      });
  };
  return (
    <KomponentGruppe>
      <AlertStripe type={'info'} form={'inline'}>
        <Element>
          Du må legge ved arbeidskontrakt som viser at du har fått tilbud om
          arbeid.
        </Element>
        <br />
        <Normaltekst>
          Dokumentasjonen må tydelig vise:
          <ul>
            <li>navn på arbeidsgiver</li>
            <li>stillingsprosent</li>
            <li>dato for oppstart</li>
            <li>dato du fikk tilbudet</li>
          </ul>
        </Normaltekst>
      </AlertStripe>
      <Datovelger
        valgtDato={arbeidssituasjon.datoOppstartJobb?.verdi}
        tekstid={'dinSituasjon.datovelger.jobb'}
        datobegrensning={DatoBegrensning.FremtidigeDatoer}
        settDato={settDato}
      />
    </KomponentGruppe>
  );
};
export default FåttJobbTilbud;
