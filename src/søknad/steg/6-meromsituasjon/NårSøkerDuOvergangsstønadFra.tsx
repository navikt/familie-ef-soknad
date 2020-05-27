import React from 'react';
import { Element } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { SøkerFraBestemtMånedSpm } from './SituasjonConfig';
import { IDinSituasjon } from '../../../models/steg/dinsituasjon/meromsituasjon';
import LocaleTekst from '../../../language/LocaleTekst';
import styled from 'styled-components/macro';
import { formatNårSøkerDuStønadFraMåned } from '../../../utils/dato';

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

  console.log(formatNårSøkerDuStønadFraMåned(new Date(), 3));

  const settSøkerFraBestemtMåned = (spørsmål: any, svar: any) => {
    settDinSituasjon({
      ...dinSituasjon,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    });
  };

  return (
    <>
      <KomponentGruppe>
        <MultiSvarSpørsmål
          spørsmål={SøkerFraBestemtMånedSpm}
          settSpørsmålOgSvar={settSøkerFraBestemtMåned}
          valgtSvar={dinSituasjon.søkerFraBestemtMåned?.verdi}
        />
      </KomponentGruppe>
      {dinSituasjon.søkerFraBestemtMåned?.verdi ===
        hentTekst('svar.ja', intl) && (
        <KomponentGruppe>
          <Element>
            <LocaleTekst tekst={'dinSituasjon.dato-tittel.overgangsstønad'} />
          </Element>
          <StyledDatovelger>
            <Datovelger
              valgtDato={dinSituasjon.søknadsdato.verdi}
              tekstid={'dinSituasjon.datovelger.overgangsstønad'}
              datobegrensning={DatoBegrensning.FremtidigeDatoer}
              settDato={settSøknadsdato}
            />
          </StyledDatovelger>
        </KomponentGruppe>
      )}
    </>
  );
};
export default NårSøkerDuOvergangsstønadFra;
