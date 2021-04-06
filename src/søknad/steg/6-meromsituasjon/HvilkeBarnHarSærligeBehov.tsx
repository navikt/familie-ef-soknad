import React from 'react';
import { useIntl } from 'react-intl';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import {
  formatterBarnetsNavn,
  hentBarnetsNavnEllerBeskrivelse,
} from '../../../utils/barn';
import { DinSituasjonType } from '../../../models/steg/dinsituasjon/meromsituasjon';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import { useSøknad } from '../../../context/SøknadContext';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { leggTilSærligeBehov } from './SituasjonUtil';
import { IBarn } from '../../../models/steg/barn';

const HvilkeBarnHarSærligeBehov: React.FC = () => {
  const { søknad, oppdaterBarnISoknaden } = useSøknad();
  const intl = useIntl();

  //Hvis det kun er ett barn i søknaden, ska vi ikke å spørre hvilket barn det gjelder
  if (søknad.person.barn.length === 1) {
    return null;
  }
  const barnMedSærligeBehov = søknad.person.barn.filter(
    (barn: IBarn) => barn.særligeTilsynsbehov
  );

  const settBarnTrengerSærligBehov = (
    spørsmålet: ISpørsmål,
    erBarnetHuketAv: boolean,
    svar: ISvar
  ) => {
    const indeksBarnSomErHuket = søknad.person.barn.findIndex(
      (barn: IBarn) => barn.id === svar.id
    );
    const barnMedSærligeBehov = søknad.person.barn[indeksBarnSomErHuket];
    if (!erBarnetHuketAv) {
      const oppdatertBarn = leggTilSærligeBehov(barnMedSærligeBehov, intl);
      oppdaterBarnISoknaden(oppdatertBarn);
    } else {
      const { særligeTilsynsbehov, ...barn } = barnMedSærligeBehov;
      oppdaterBarnISoknaden(barn);
    }
  };

  const barnSvarsAlternativer: ISvar[] = søknad.person.barn.map(
    (barn: IBarn) => ({
      id: barn.id,
      svar_tekst: formatterBarnetsNavn(barn)(
        hentBarnetsNavnEllerBeskrivelse(barn, intl)
      ),
    })
  );

  const spørsmål: ISpørsmål = {
    flersvar: true,
    svaralternativer: barnSvarsAlternativer,
    søknadid: DinSituasjonType.harBarnMedSærligeBehov,
    tekstid: 'dinSituasjon.legend.særligTilsyn',
  };

  const valgteSvar = barnMedSærligeBehov.map((barn: IBarn) => barn.id);

  return (
    <KomponentGruppe>
      <CheckboxSpørsmål
        spørsmål={spørsmål}
        valgteSvar={valgteSvar}
        settValgteSvar={settBarnTrengerSærligBehov}
      />
    </KomponentGruppe>
  );
};

export default HvilkeBarnHarSærligeBehov;
