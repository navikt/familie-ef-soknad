import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';

const SøktBarnepassOgVenterPåSvar: React.FC = () => {
  return (
    <KomponentGruppe>
      <AlertStripeDokumentasjon>
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
      </AlertStripeDokumentasjon>
    </KomponentGruppe>
  );
};
export default SøktBarnepassOgVenterPåSvar;
