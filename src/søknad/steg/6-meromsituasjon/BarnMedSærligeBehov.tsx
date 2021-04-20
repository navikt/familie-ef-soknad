import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';
import BarnMedSærligeBehovBegrunnelse from './BarnMedSærligeBehovBegrunnelse';
import HvilkeBarnHarSærligeBehov from './HvilkeBarnHarSærligeBehov';
import LocaleTekst from '../../../language/LocaleTekst';
import { Normaltekst } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';

const BarnMedSærligeBehov: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <KomponentGruppe>
        <AlertStripeDokumentasjon>
          <Normaltekst className="blokk-xs" style={{ fontWeight: 600 }}>
            {intl.formatMessage({
              id: 'dinSituasjon.dok.harBarnMedSærligeBehov.tittel',
            })}
          </Normaltekst>
          <LocaleTekst tekst="dinSituasjon.dok.harBarnMedSærligeBehov.beskrivelse" />
        </AlertStripeDokumentasjon>
      </KomponentGruppe>
      <HvilkeBarnHarSærligeBehov />
      <BarnMedSærligeBehovBegrunnelse />
    </>
  );
};

export default BarnMedSærligeBehov;
