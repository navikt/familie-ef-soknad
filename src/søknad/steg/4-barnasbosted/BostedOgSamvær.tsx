import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import {
  borINorge,
  avtaleOmDeltBosted,
  harAnnenForelderSamværMedBarn,
  harDereSkriftligSamværsavtale,
} from './ForeldreConfig';
import { Input } from 'nav-frontend-skjema';
import HvordanPraktiseresSamværet from './HvordanPraktiseresSamværet';
import LocaleTekst from '../../../language/LocaleTekst';
import AlertStripe from 'nav-frontend-alertstriper';
import { ESvar, ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { hentSvarAlertFraSpørsmål, hentTekst } from '../../../utils/søknad';
import { IForelder } from '../../../models/forelder';
import { hentBooleanFraValgtSvar } from '../../../utils/spørsmålogsvar';
import { useSøknad } from '../../../context/SøknadContext';
import {
  EHarSamværMedBarn,
  EHarSkriftligSamværsavtale,
} from '../../../models/steg/barnasbosted';

interface Props {
  settForelder: Function;
  forelder: IForelder;
  huketAvAnnenForelder: boolean;
}

const BostedOgSamvær: React.FC<Props> = ({
  settForelder,
  forelder,
  huketAvAnnenForelder,
}) => {
  const intl = useIntl();
  const { settDokumentasjonsbehov } = useSøknad();

  const settBostedOgSamværFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    const nyForelder = {
      ...forelder,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    };

    if (svar.id !== EHarSkriftligSamværsavtale.jaIkkeKonkreteTidspunkter) {
      delete nyForelder.hvordanPraktiseresSamværet;
    }

    if (svar.id === EHarSamværMedBarn.nei) {
      delete nyForelder.hvordanPraktiseresSamværet;
    }

    settForelder(nyForelder);
    settDokumentasjonsbehov(spørsmål, svar);
  };

  const visSkriftligSamværsavtaleSpørsmål = (
    svarAndreForelderenSamvær: string
  ) => {
    return (
      svarAndreForelderenSamvær &&
      svarAndreForelderenSamvær !==
        intl.formatMessage({ id: 'barnasbosted.spm.andreForelderenSamværNei' })
    );
  };

  const settBostedJaNeiFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    const nyForelder = {
      ...forelder,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: hentBooleanFraValgtSvar(svar),
      },
    };

    if (svar.id === ESvar.JA) {
      delete nyForelder.land;
    }

    settForelder(nyForelder);
    settDokumentasjonsbehov(spørsmål, svar);
  };

  const visSamværsavtaleAdvarsel = (valgtSvar: string) => {
    return (
      valgtSvar ===
        intl.formatMessage({
          id: 'barnasbosted.spm.jaKonkreteTidspunkt',
        }) ||
      valgtSvar ===
        intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt' })
    );
  };

  const visHvordanPraktiseresSamværet = (valgtSamværsrett: string) => {
    return (
      valgtSamværsrett === intl.formatMessage({ id: 'barnasbosted.spm.nei' })
    );
  };

  return (
    <>
      {!huketAvAnnenForelder ? (
        <KomponentGruppe>
          <JaNeiSpørsmål
            spørsmål={borINorge}
            onChange={settBostedJaNeiFelt}
            valgtSvar={forelder.borINorge?.verdi}
          />
        </KomponentGruppe>
      ) : null}
      {forelder.borINorge?.verdi === false && (
        <KomponentGruppe>
          <Input
            onChange={(e) =>
              settForelder({
                ...forelder,
                land: {
                  label: hentTekst('barnasbosted.land', intl),
                  verdi: e.target.value,
                },
              })
            }
            value={forelder.land ? forelder.land?.verdi : ''}
            label={hentTekst('barnasbosted.hvilketLand', intl)}
          />
        </KomponentGruppe>
      )}
      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={avtaleOmDeltBosted}
          onChange={settBostedJaNeiFelt}
          valgtSvar={forelder.avtaleOmDeltBosted?.verdi}
        />
        {forelder.avtaleOmDeltBosted?.svarid === ESvar.JA && (
          <>
            <AlertStripe type={'advarsel'} form={'inline'}>
              <LocaleTekst
                tekst={hentSvarAlertFraSpørsmål(ESvar.JA, avtaleOmDeltBosted)}
              />
            </AlertStripe>
            <AlertStripe type={'info'} form={'inline'}>
              <LocaleTekst
                tekst={'barnasbosted.alert-info.avtaleOmDeltBosted'}
              />
            </AlertStripe>
          </>
        )}
      </KomponentGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmål
          key={harAnnenForelderSamværMedBarn.søknadid}
          spørsmål={harAnnenForelderSamværMedBarn}
          valgtSvar={forelder.harAnnenForelderSamværMedBarn?.verdi}
          settSpørsmålOgSvar={settBostedOgSamværFelt}
        />
      </KomponentGruppe>
      {forelder.harAnnenForelderSamværMedBarn &&
      visSkriftligSamværsavtaleSpørsmål(
        forelder.harAnnenForelderSamværMedBarn.verdi
      ) ? (
        <KomponentGruppe>
          <MultiSvarSpørsmål
            key={harDereSkriftligSamværsavtale.søknadid}
            spørsmål={harDereSkriftligSamværsavtale}
            valgtSvar={forelder.harDereSkriftligSamværsavtale?.verdi}
            settSpørsmålOgSvar={settBostedOgSamværFelt}
          />
          {forelder.harDereSkriftligSamværsavtale &&
          visSamværsavtaleAdvarsel(
            forelder.harDereSkriftligSamværsavtale.verdi
          ) ? (
            <FeltGruppe>
              <AlertStripe type={'info'} form="inline">
                <LocaleTekst
                  tekst={'barnasbosted.alert.leggeVedSamværsavtalen'}
                />
              </AlertStripe>
            </FeltGruppe>
          ) : null}
        </KomponentGruppe>
      ) : null}
      {forelder.harDereSkriftligSamværsavtale &&
      visHvordanPraktiseresSamværet(
        forelder.harDereSkriftligSamværsavtale.verdi
      ) ? (
        <HvordanPraktiseresSamværet
          forelder={forelder}
          settForelder={settForelder}
        />
      ) : null}
    </>
  );
};

export default BostedOgSamvær;
