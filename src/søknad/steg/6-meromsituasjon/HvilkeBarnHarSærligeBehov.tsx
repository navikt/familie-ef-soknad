import React from 'react';
import { useIntl } from 'react-intl';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import {
  formatterBarnetsNavn,
  hentBarnetsNavnEllerBeskrivelse,
  hentBarnetsNavnEllerBeskrivelseMedGenetiv,
} from '../../../utils/barn';
import { DinSituasjonType } from '../../../models/steg/dinsituasjon/meromsituasjon';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import { useSøknad } from '../../../context/SøknadContext';
import { storeForbokstaver } from '../../../utils/tekst';

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
      const barnetsNavn = hentBarnetsNavnEllerBeskrivelseMedGenetiv(
        barnMedSærligeBehov,
        intl
      );
      const formattertNavn = barnMedSærligeBehov.navn.verdi
        ? storeForbokstaver(barnetsNavn)
        : barnetsNavn;
      const oppdatertBarn = {
        ...barnMedSærligeBehov,
        særligeTilsynsbehov: {
          verdi: '',
          label: intl.formatMessage(
            { id: 'dinSituasjon.label.særligTilsyn' },
            {
              barnetsNavn: formattertNavn,
            }
          ),
        },
      };
      oppdaterBarnISoknaden(oppdatertBarn);
    } else {
      const { særligeTilsynsbehov, ...barn } = barnMedSærligeBehov;
      oppdaterBarnISoknaden(barn);
    }
  };

  const barnSvarsAlternativer: ISvar[] = søknad.person.barn.map((barn) => ({
    id: barn.id,
    svar_tekst: formatterBarnetsNavn(barn)(
      hentBarnetsNavnEllerBeskrivelse(barn, intl)
    ),
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
