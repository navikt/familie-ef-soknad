import React from 'react';
import { useIntl } from 'react-intl';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { hentBarnetsNavnEllerBeskrivelse } from '../../../utils/barn';
import { DinSituasjonType } from '../../../models/steg/dinsituasjon/meromsituasjon';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import { useSøknad } from '../../../context/SøknadContext';

const HvilkeBarnHarSærligeBehov: React.FC = () => {
  const { søknad, oppdaterBarnISoknaden } = useSøknad();
  const intl = useIntl();

  const barnMedSærligeBehov = søknad.person.barn.filter(
    (barn) => barn.særligeTilsynsbehov
  );

  const settBarnTrengerSærligBehov = (
    spørsmålet: ISpørsmål,
    erBarnetHuketAv: boolean,
    svar: ISvar
  ) => {
    const indeksBarnSomErHuket = søknad.person.barn.findIndex(
      (barn) => barn.id === svar.id
    );
    const barnMedSærligeBehov = søknad.person.barn[indeksBarnSomErHuket];
    if (!erBarnetHuketAv) {
      const oppdatertBarn = {
        ...barnMedSærligeBehov,
        særligeTilsynsbehov: {
          verdi: '',
          label: 'Om barnets tilsynsbehov',
        },
      };
      oppdaterBarnISoknaden(oppdatertBarn, indeksBarnSomErHuket);
    } else {
      const { særligeTilsynsbehov, ...barn } = barnMedSærligeBehov;
      oppdaterBarnISoknaden(barn, indeksBarnSomErHuket);
    }
  };

  const barnSvarsAlternativer: ISvar[] = barnMedSærligeBehov.map((barn) => ({
    id: barn.id,
    svar_tekst: hentBarnetsNavnEllerBeskrivelse(barn, intl),
  }));

  const spørsmål: ISpørsmål = {
    flersvar: true,
    svaralternativer: barnSvarsAlternativer,
    søknadid: DinSituasjonType.harBarnMedSærligeBehov,
    tekstid: 'dinSituasjon.legend.særligTilsyn',
  };

  const valgteSvar = barnMedSærligeBehov.map((barn) => barn.id);

  return (
    <div className="blokk-m">
      <CheckboxSpørsmål
        spørsmål={spørsmål}
        valgteSvar={valgteSvar}
        settValgteSvar={settBarnTrengerSærligBehov}
      />
    </div>
  );
};

export default HvilkeBarnHarSærligeBehov;
