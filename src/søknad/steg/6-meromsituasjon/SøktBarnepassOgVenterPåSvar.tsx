import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripe from 'nav-frontend-alertstriper';

const SøktBarnepassOgVenterPåSvar: React.FC = () => {
  return (
    <KomponentGruppe>
      <AlertStripe type={'info'} form={'inline'}>
        <Normaltekst>
          Du må legge ved dokumentasjon på at du mangler barnepass. Det vil si
          avslag på barnehageplass/SFO-plass eller bekreftelse på at barnet står
          på venteliste.
        </Normaltekst>
        <br />
        <Normaltekst>
          Dokumentasjonen må tydelig vise:
          <ul>
            <li>datoen du søkte</li>
            <li>datoen du ønsket plass fra</li>
          </ul>
        </Normaltekst>
      </AlertStripe>
    </KomponentGruppe>
  );
};
export default SøktBarnepassOgVenterPåSvar;
