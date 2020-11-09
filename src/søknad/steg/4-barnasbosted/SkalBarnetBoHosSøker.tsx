import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { hentTekst } from '../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { skalBarnetBoHosSøker } from './ForeldreConfig';
import { useIntl } from 'react-intl';
import { IForelder } from '../../../models/steg/forelder';
import { IBarn } from '../../../models/steg/barn';
import MultiSvarSpørsmålMedNavn from '../../../components/spørsmål/MultiSvarSpørsmålMedNavn';
import {
  hentBarnNavnEllerBarnet,
  hentSpørsmålTekstMedNavnEllerBarn,
} from '../../../utils/barn';
import { FormattedHTMLMessage } from 'react-intl';
import { ESkalBarnetBoHosSøker } from '../../../models/steg/barnasbosted';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';

interface Props {
  barn: IBarn;
  forelder: IForelder;
  settForelder: (forelder: IForelder) => void;
  settDokumentasjonsbehovForBarn: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    barneid: string,
    barnepassid?: string
  ) => void;
}

const SkalBarnetBoHosSøker: React.FC<Props> = ({
  barn,
  forelder,
  settForelder,
  settDokumentasjonsbehovForBarn,
}) => {
  const intl = useIntl();

  const skalBarnetBoHosSøkerConfig = skalBarnetBoHosSøker(intl);
  const settSkalBarnetBoHosSøkerFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    settForelder({
      ...forelder,
      [skalBarnetBoHosSøkerConfig.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst('barnasbosted.spm.skalBarnetBoHosSøker', intl),
        verdi: svar.svar_tekst,
      },
    });
    settDokumentasjonsbehovForBarn(spørsmål, svar, barn.id);
  };

  const hentSpørsmålTekst = (tekstid: string) => {
    const navnEllerBarn = barn.født?.verdi
      ? barn.navn.verdi
      : hentTekst('barnet.storForBokstav', intl);
    return hentSpørsmålTekstMedNavnEllerBarn(tekstid, navnEllerBarn, intl);
  };

  return (
    <>
      <FeltGruppe>
        <AlertStripe type={'advarsel'} form={'inline'}>
          {hentSpørsmålTekst('barnasbosted.alert.måBoHosDeg')}
        </AlertStripe>
      </FeltGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmålMedNavn
          key={skalBarnetBoHosSøkerConfig.søknadid}
          spørsmål={skalBarnetBoHosSøkerConfig}
          spørsmålTekst={hentBarnNavnEllerBarnet(
            barn,
            skalBarnetBoHosSøkerConfig.tekstid,
            intl
          )}
          valgtSvar={forelder.skalBarnetBoHosSøker?.verdi}
          settSpørsmålOgSvar={settSkalBarnetBoHosSøkerFelt}
        />
      </KomponentGruppe>
      {forelder.skalBarnetBoHosSøker?.svarid ===
        ESkalBarnetBoHosSøker.jaMenSamarbeiderIkke && (
        <FeltGruppe>
          <AlertStripeDokumentasjon>
            <FormattedHTMLMessage
              id={hentBarnNavnEllerBarnet(
                barn,
                'barnasbosted.alert.hvisFaktiskBor',
                intl
              )}
            />
          </AlertStripeDokumentasjon>
        </FeltGruppe>
      )}
      {forelder.skalBarnetBoHosSøker?.svarid === ESkalBarnetBoHosSøker.ja && (
        <FeltGruppe>
          <AlertStripe type={'info'} form={'inline'}>
            {hentTekst('barnasbosted.alert.skalBarnetBoHosSøker.ja', intl)}
          </AlertStripe>
        </FeltGruppe>
      )}
      {forelder.skalBarnetBoHosSøker?.svarid === ESkalBarnetBoHosSøker.nei && (
        <FeltGruppe>
          <AlertStripe type={'advarsel'} form={'inline'}>
            {hentTekst('barnasbosted.alert.skalBarnetBoHosSøker.nei', intl)}
          </AlertStripe>
        </FeltGruppe>
      )}
    </>
  );
};

export default SkalBarnetBoHosSøker;
