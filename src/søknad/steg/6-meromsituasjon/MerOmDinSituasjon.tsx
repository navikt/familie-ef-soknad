import React, { useEffect, useState } from 'react';
import BarnMedSærligeBehov from './BarnMedSærligeBehov';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import FåttJobbTilbud from './FåttJobbTilbud';
import HarSøkerSagtOppEllerRedusertStilling from './HarSøkerSagtOppEllerRedusertStilling';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import NårSøkerDuOvergangsstønadFra from './NårSøkerDuOvergangsstønadFra';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../../components/side/Side';
import SyktBarn from './SyktBarn';
import SøkerErSyk from './SøkerErSyk';
import SøkerSkalTaUtdanning from './SøkerSkalTaUtdanning';
import SøktBarnepassOgVenterPåSvar from './SøktBarnepassOgVenterPåSvar';
import { dagensDato } from '../../../utils/dato';
import { gjelderNoeAvDetteDeg } from './SituasjonConfig';
import { hentTekst } from '../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { returnerAvhukedeSvar } from '../../../utils/spørsmålogsvar';
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import {
  DinSituasjonType,
  IDinSituasjon,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import {
  erSituasjonIAvhukedeSvar,
  harSøkerMindreEnnHalvStilling,
} from './SituasjonUtil';

const MerOmDinSituasjon: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad, settDokumentasjonsbehov } = useSøknad();
  const [dinSituasjon, settDinSituasjon] = useState<IDinSituasjon>({
    gjelderDetteDeg: søknad.merOmDinSituasjon.gjelderDetteDeg,
    søknadsdato: { label: '', verdi: dagensDato },
  });
  const {
    gjelderDetteDeg,
    datoOppstartJobb,
    datoOppstartUtdanning,
  } = dinSituasjon;
  const avhukedeSvarISøknad: string[] = gjelderDetteDeg.verdi;

  useEffect(() => {
    settSøknad({ ...søknad, merOmDinSituasjon: dinSituasjon });
    // eslint-disable-next-line
  }, [dinSituasjon]);

  const erFåttJobbTilbudISvar = erSituasjonIAvhukedeSvar(
    DinSituasjonType.harFåttJobbTilbud,
    avhukedeSvarISøknad,
    intl
  );
  const erSkalTaUtdanningISvar = erSituasjonIAvhukedeSvar(
    DinSituasjonType.skalTaUtdanning,
    avhukedeSvarISøknad,
    intl
  );

  const hentEndretSituasjon = (dinSituasjon: IDinSituasjon): IDinSituasjon => {
    if (datoOppstartJobb || datoOppstartUtdanning) {
      const endretSituasjon = dinSituasjon;
      if (!erFåttJobbTilbudISvar && datoOppstartJobb) {
        delete endretSituasjon.datoOppstartJobb;
      } else if (!erSkalTaUtdanningISvar && datoOppstartUtdanning) {
        delete endretSituasjon.datoOppstartUtdanning;
      }
      return endretSituasjon;
    } else return dinSituasjon;
  };

  const settDinSituasjonFelt = (
    spørsmål: ISpørsmål,
    svarHuketAv: boolean,
    svar: ISvar
  ) => {
    const spørsmålTekst = hentTekst(spørsmål.tekstid, intl);
    const endretSituasjon = hentEndretSituasjon(dinSituasjon);
    const { avhukedeSvar, svarider } = returnerAvhukedeSvar(
      endretSituasjon.gjelderDetteDeg,
      svarHuketAv,
      svar,
      intl
    );

    settDinSituasjon({
      ...endretSituasjon,
      gjelderDetteDeg: {
        spørsmålid: spørsmål.søknadid,
        svarid: svarider,
        label: spørsmålTekst,
        verdi: avhukedeSvar,
      },
    });
    settDokumentasjonsbehov(spørsmål, svar, svarHuketAv);
  };

  const erSituasjonHuketAv = (situasjon: DinSituasjonType): boolean => {
    return (
      gjelderDetteDeg &&
      erSituasjonIAvhukedeSvar(situasjon, gjelderDetteDeg.verdi, intl)
    );
  };

  const erSykHuketav = erSituasjonHuketAv(DinSituasjonType.erSyk);
  const harSyktBarnHuketAv = erSituasjonHuketAv(DinSituasjonType.harSyktBarn);
  const harSøktBarnepassOgVenterPåSvar = erSituasjonHuketAv(
    DinSituasjonType.harSøktBarnepassOgVenterEnnå
  );
  const harBarnMedSærligeBehov = erSituasjonHuketAv(
    DinSituasjonType.harBarnMedSærligeBehov
  );
  const harFåttJobbTilbud = erSituasjonHuketAv(
    DinSituasjonType.harFåttJobbTilbud
  );
  const skalTaUtdanning = erSituasjonHuketAv(DinSituasjonType.skalTaUtdanning);
  const søkerJobberMindreEnnFemtiProsent = harSøkerMindreEnnHalvStilling(
    søknad
  );
  return (
    <Side tittel={intl.formatMessage({ id: 'stegtittel.dinSituasjon' })}>
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
      {søkerJobberMindreEnnFemtiProsent && (
        <SeksjonGruppe>
          <HarSøkerSagtOppEllerRedusertStilling
            dinSituasjon={dinSituasjon}
            settDinSituasjon={settDinSituasjon}
          />
        </SeksjonGruppe>
      )}
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
