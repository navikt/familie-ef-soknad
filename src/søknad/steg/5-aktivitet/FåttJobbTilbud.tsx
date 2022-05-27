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
import LocaleTekst from '../../../language/LocaleTekst';

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
          <LocaleTekst tekst={'dokumentasjon.arbeidskontrakt.tittel'} />
        </Element>
        <br />
        <Normaltekst>
          <LocaleTekst tekst={'dokumentasjon.arbeidskontrakt.beskrivelse'} />
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
