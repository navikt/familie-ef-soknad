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
import { ISpørsmål, ISvar } from '../../../models/spørsmalogsvar';
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
import {
  erSituasjonIAvhukedeSvar,
  harSøkerMindreEnnHalvStilling,
} from './SituasjonUtil';

const MerOmDinSituasjon: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknadContext();
  const [dinSituasjon, settDinSituasjon] = useState<IDinSituasjon>({
    gjelderDetteDeg: nyttTekstListeFelt,
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
    EDinSituasjon.harFåttJobbTilbud,
    avhukedeSvarISøknad,
    intl
  );
  const erSkalTaUtdanningISvar = erSituasjonIAvhukedeSvar(
    EDinSituasjon.skalTaUtdanning,
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
    const svarTekst: string = hentTekst(svar.svar_tekstid, intl);
    const endretSituasjon = hentEndretSituasjon(dinSituasjon);
    const avhukendeSvarIEndretSituasjon = endretSituasjon.gjelderDetteDeg.verdi;
    const dinSituasjonFelt = (svarSomSkalSettesISøknad: string[]) => ({
      label: spørsmålTekst,
      verdi: svarSomSkalSettesISøknad,
    });

    if (svarHuketAv) {
      const avhukedeSvarUtenValgtSvar: string[] = avhukendeSvarIEndretSituasjon.filter(
        (valgtSvar) => {
          return valgtSvar !== svarTekst;
        }
      );
      settDinSituasjon({
        ...endretSituasjon,
        [spørsmål.søknadid]: dinSituasjonFelt(avhukedeSvarUtenValgtSvar),
      });
    } else {
      const avhukedeSvar = avhukendeSvarIEndretSituasjon;
      avhukedeSvar.push(svarTekst);
      settDinSituasjon({
        ...endretSituasjon,
        [spørsmål.søknadid]: dinSituasjonFelt(avhukedeSvar),
      });
    }
  };

  const erSituasjonHuketAv = (situasjon: EDinSituasjon): boolean => {
    return (
      gjelderDetteDeg &&
      erSituasjonIAvhukedeSvar(situasjon, gjelderDetteDeg.verdi, intl)
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
  const søkerJobberMindreEnnFemtiProsent = harSøkerMindreEnnHalvStilling(
    søknad
  );
  return (
    <Side tittel={intl.formatMessage({ id: 'dinSituasjon.tittel' })}>
      <SeksjonGruppe>
        <KomponentGruppe>
          <CheckboxSpørsmål
            spørsmål={gjelderNoeAvDetteDeg}
            settValgteSvar={(
              spørsmål: ISpørsmål,
              svarHuketAv: boolean,
              svar: ISvar
            ) => settDinSituasjonFelt(spørsmål, svarHuketAv, svar)}
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
