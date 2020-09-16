import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';
import LocaleTekst from '../../../language/LocaleTekst';
import BarnMedSærligeBehovBegrunnelse from './BarnMedSærligeBehovBegrunnelse';
import HvilkeBarnHarSærligeBehov from './HvilkeBarnHarSærligeBehov';

const BarnMedSærligeBehov: React.FC = () => {
  return (
    <KomponentGruppe>
      <AlertStripeDokumentasjon>
        <LocaleTekst tekst="harBarnMedSærligeBehov.alert-dok.tittel" />
        <LocaleTekst tekst="harBarnMedSærligeBehov.alert-dok.beskrivelse" />
      </AlertStripeDokumentasjon>
      <HvilkeBarnHarSærligeBehov />
      <BarnMedSærligeBehovBegrunnelse />
    </KomponentGruppe>
  );
};

export default BarnMedSærligeBehov;
