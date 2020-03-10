import React from 'react';
import { Element } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import { IDinSituasjon } from '../../../models/steg/dinsituasjon/meromsituasjon';
import LocaleTekst from '../../../language/LocaleTekst';
import Hjelpetekst from '../../../components/Hjelpetekst';
import styled from 'styled-components';

interface Props {
  dinSituasjon: IDinSituasjon;
  settDinSituasjon: (dinSituasjon: IDinSituasjon) => void;
}

const StyledDatovelger = styled.div`
  padding-top: 0.5rem;
`;

const NårSøkerDuOvergangsstønadFra: React.FC<Props> = ({
  dinSituasjon,
  settDinSituasjon,
}) => {
  const intl = useIntl();

  const settSøknadsdato = (dato: Date | null) => {
    dato !== null &&
      settDinSituasjon({
        ...dinSituasjon,
        søknadsdato: {
          label: hentTekst('dinSituasjon.datovelger.overgangsstønad', intl),
          verdi: dato,
        },
      });
  };
  return (
    <KomponentGruppe>
      <Element>
        <LocaleTekst tekst={'dinSituasjon.dato-tittel.overgangsstønad'} />
      </Element>
      <Hjelpetekst
        åpneTekstid={'dinSituasjon.lesmer-åpne.overgangsstønad'}
        innholdTekstid={'dinSituasjon.lesmer-innhold.overgangsstønad'}
      />
      <StyledDatovelger>
        <Datovelger
          valgtDato={dinSituasjon.søknadsdato.verdi}
          tekstid={'dinSituasjon.datovelger.overgangsstønad'}
          datobegrensning={DatoBegrensning.FremtidigeDatoer}
          settDato={settSøknadsdato}
        />
      </StyledDatovelger>
    </KomponentGruppe>
  );
};
export default NårSøkerDuOvergangsstønadFra;
