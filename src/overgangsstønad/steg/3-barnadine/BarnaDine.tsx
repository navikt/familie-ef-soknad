import React from 'react';
import { hentTekst } from '../../../utils/søknad';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useSøknad } from '../../../context/SøknadContext';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesOvergangsstonad } from '../../routing/routesOvergangsstonad';
import { hentPathOvergangsstønadOppsummering } from '../../utils';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { logSidevisningOvergangsstonad } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { BarnaDineInnhold } from '../../../søknad/steg/3-barnadine/BarnaDineInnhold';

const BarnaDine: React.FC = () => {
  const intl = useLokalIntlContext();
  const {
    søknad,
    mellomlagreOvergangsstønad,
    settDokumentasjonsbehovForBarn,
    oppdaterBarnISøknaden,
    fjernBarnFraSøknad,
  } = useSøknad();

  const skalViseKnapper = ESide.visTilbakeNesteAvbrytKnapp;

  useMount(() => logSidevisningOvergangsstonad('BarnaDine'));

  const harMinstEttBarn = søknad.person.barn.length > 0;

  return (
    <Side
      stønadstype={Stønadstype.overgangsstønad}
      stegtittel={hentTekst('barnadine.sidetittel', intl)}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={harMinstEttBarn}
      routesStønad={RoutesOvergangsstonad}
      mellomlagreStønad={mellomlagreOvergangsstønad}
      tilbakeTilOppsummeringPath={hentPathOvergangsstønadOppsummering}
      informasjonstekstId="barnadine.info.brukpdf"
    >
      <BarnaDineInnhold
        barneliste={søknad.person.barn}
        oppdaterBarnISøknaden={oppdaterBarnISøknaden}
        fjernBarnFraSøknad={fjernBarnFraSøknad}
        settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
      />
    </Side>
  );
};

export default BarnaDine;
