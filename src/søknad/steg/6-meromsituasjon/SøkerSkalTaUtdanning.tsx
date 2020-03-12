import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { IDinSituasjon } from '../../../models/steg/dinsituasjon/meromsituasjon';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';

interface Props {
  dinSituasjon: IDinSituasjon;
  settDinSituasjon: (dinSituasjon: IDinSituasjon) => void;
}
const SøkerSkalTaUtdanning: React.FC<Props> = ({
  dinSituasjon,
  settDinSituasjon,
}) => {
  const intl = useIntl();
  const settUtdanningStartsdato = (dato: Date | null) => {
    dato !== null &&
      settDinSituasjon({
        ...dinSituasjon,
        datoOppstartUtdanning: {
          label: hentTekst('dinSituasjon.datovelger.utdanning', intl),
          verdi: dato,
        },
      });
  };

  return (
    <KomponentGruppe>
      <AlertStripeInfo className={'fjernBakgrunn'}>
        <Element>Du må legge ved dokumentasjon på ??</Element>
        <br />
        <Normaltekst>
          Dokumentasjonen må tydelig vise:
          <ul>
            <li>navn på studiested</li>
            <li>navn på studie</li>
            <li>hvor mye du skal studere</li>
            <li>dato for oppstart</li>
            <li>dato du fikk tilbudet</li>
          </ul>
        </Normaltekst>
      </AlertStripeInfo>
      <Datovelger
        valgtDato={dinSituasjon.datoOppstartUtdanning?.verdi}
        tekstid={'dinSituasjon.datovelger.utdanning'}
        datobegrensning={DatoBegrensning.FremtidigeDatoer}
        settDato={settUtdanningStartsdato}
      />
    </KomponentGruppe>
  );
};
export default SøkerSkalTaUtdanning;
