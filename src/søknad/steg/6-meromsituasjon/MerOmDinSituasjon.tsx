import React, { useEffect, useState } from 'react';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../../components/side/Side';
import useSøknadContext from '../../../context/SøknadContext';
import { gjelderNoeAvDetteDeg } from './SituasjonConfig';
import {
  EDinSituasjon,
  IDinSituasjon,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import { ISpørsmål } from '../../../models/spørsmal';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import { nyttTekstListeFelt } from '../../../utils/søknadsfelter';
import SøkerErSyk from './SøkerErSyk';
import SyktBarn from './SyktBarn';
import SøktBarnepassOgVenterPåSvar from './SøktBarnepassOgVenterPåSvar';
import BarnMedSærligeBehov from './BarnMedSærligeBehov';
import FåttJobbTilbud from './FåttJobbTilbud';
import SøkerSkalTaUtdanning from './SøkerSkalTaUtdanning';
import { dagensDato } from '../../../utils/dato';
import NårSøkerDuOvergangsstønadFra from './NårSøkerDuOvergangsstønadFra';
import HarSøkerSagtOppEllerRedusertStilling from './HarSøkerSagtOppEllerRedusertStilling';

const MerOmDinSituasjon: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknadContext();
  const [dinSituasjon, settDinSituasjon] = useState<IDinSituasjon>({
    gjelderDetteDeg: nyttTekstListeFelt,
    søknadsdato: { label: '', verdi: dagensDato },
  });

  useEffect(() => {
    settSøknad({ ...søknad, merOmDinSituasjon: dinSituasjon });
    // eslint-disable-next-line
  }, [dinSituasjon]);

  const settDinSituasjonFelt = (spørsmål: ISpørsmål, svar: string[]) => {
    settDinSituasjon({
      ...dinSituasjon,
      [spørsmål.søknadid]: {
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar,
      },
    });
  };

  const erSituasjonHuketAv = (situasjon: EDinSituasjon): boolean => {
    const tekstid: string = 'dinSituasjon.svar.' + situasjon;
    const svarTekst: string = intl.formatMessage({ id: tekstid });
    return dinSituasjon.gjelderDetteDeg.verdi.some(
      (svarHuketAvISøknad: string) => {
        return svarHuketAvISøknad === svarTekst;
      }
    );
  };

  const erSykHuketav = erSituasjonHuketAv(EDinSituasjon.erSyk);
  const harSyktBarnHuketAv = erSituasjonHuketAv(EDinSituasjon.harSyktBarn);
  const harSøktBarnepassOgVenterPåSvar = erSituasjonHuketAv(
    EDinSituasjon.harSøktBarnepassOgVenterEnnå
  );
  const harBarnMedSærligeBehov = erSituasjonHuketAv(
    EDinSituasjon.harBarnMedSærligeBehov
  );
  const harFåttJobbTilbud = erSituasjonHuketAv(EDinSituasjon.harFåttJobbTilbud);
  const skalTaUtdanning = erSituasjonHuketAv(EDinSituasjon.skalTaUtdanning);

  return (
    <Side tittel={intl.formatMessage({ id: 'dinSituasjon.tittel' })}>
      <SeksjonGruppe>
        <KomponentGruppe>
          <CheckboxSpørsmål
            spørsmål={gjelderNoeAvDetteDeg}
            settValgteSvar={settDinSituasjonFelt}
            valgteSvar={søknad.merOmDinSituasjon.gjelderDetteDeg.verdi}
          />
        </KomponentGruppe>
        {erSykHuketav && <SøkerErSyk />}
        {harSyktBarnHuketAv && <SyktBarn />}
        {harSøktBarnepassOgVenterPåSvar && <SøktBarnepassOgVenterPåSvar />}
        {harBarnMedSærligeBehov && <BarnMedSærligeBehov />}
        {harFåttJobbTilbud && (
          <FåttJobbTilbud
            dinSituasjon={dinSituasjon}
            settDinSituasjon={settDinSituasjon}
          />
        )}
        {skalTaUtdanning && (
          <SøkerSkalTaUtdanning
            dinSituasjon={dinSituasjon}
            settDinSituasjon={settDinSituasjon}
          />
        )}
      </SeksjonGruppe>
      <SeksjonGruppe>
        <HarSøkerSagtOppEllerRedusertStilling
          dinSituasjon={dinSituasjon}
          settDinSituasjon={settDinSituasjon}
        />
      </SeksjonGruppe>
      <SeksjonGruppe>
        <NårSøkerDuOvergangsstønadFra
          dinSituasjon={dinSituasjon}
          settDinSituasjon={settDinSituasjon}
        />
      </SeksjonGruppe>
    </Side>
  );
};

export default MerOmDinSituasjon;
