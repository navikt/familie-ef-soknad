import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import { IDinSituasjon } from '../../../models/steg/dinsituasjon/meromsituasjon';

interface Props {
  dinSituasjon: IDinSituasjon;
  settDinSituasjon: (dinSituasjon: IDinSituasjon) => void;
}
const FåttJobbTilbud: React.FC<Props> = ({
  dinSituasjon,
  settDinSituasjon,
}) => {
  const intl = useIntl();

  const settNyJobbStartsdato = (dato: Date | null) => {
    dato !== null &&
      settDinSituasjon({
        ...dinSituasjon,
        nyJobbStartsdato: {
          label: hentTekst('dinSituasjon.datovelger.jobb', intl),
          verdi: dato,
        },
      });
  };
  return (
    <KomponentGruppe>
      <AlertStripeInfo className={'fjernBakgrunn'}>
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
      </AlertStripeInfo>
      <Datovelger
        valgtDato={dinSituasjon.utdanningStartsdato?.verdi}
        tekstid={'dinSituasjon.datovelger.utdanning'}
        datobegrensning={DatoBegrensning.FremtidigeDatoer}
        settDato={settNyJobbStartsdato}
      />
    </KomponentGruppe>
  );
};
export default FåttJobbTilbud;
