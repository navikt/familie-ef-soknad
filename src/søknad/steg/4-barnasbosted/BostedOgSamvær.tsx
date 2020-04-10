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
import HvordanPraktiseresSamværet from './HvordanPraktiseresSamværet';
import LocaleTekst from '../../../language/LocaleTekst';
import AlertStripe from 'nav-frontend-alertstriper';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import { IForelder } from '../../../models/forelder';
import { hentBooleanFraValgtSvar } from '../../../utils/spørsmålogsvar';

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

  const settHarForelderSamværMedBarn = (spørsmål: ISpørsmål, svar: ISvar) => {
    const valgtSvar: string = hentTekst(svar.svar_tekstid, intl);
    const nyForelder = {
      ...forelder,
      [spørsmål.søknadid]: {
        label: intl.formatMessage({
          id: 'barnasbosted.spm.harAnnenForelderSamværMedBarn',
        }),
        verdi: valgtSvar,
      },
    };

    if (
      valgtSvar ===
      intl.formatMessage({ id: 'barnasbosted.spm.andreForelderenSamværNei' })
    ) {
      delete nyForelder.harDereSkriftligSamværsavtale;
      delete nyForelder.hvordanPraktiseresSamværet;
    }

    settForelder(nyForelder);
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

  const settHarDereSkriftligSamværsavtale = (
    spørsmål: ISpørsmål,
    svar: ISvar
  ) => {
    const valgtSvar: string = hentTekst(svar.svar_tekstid, intl);
    const nyForelder = {
      ...forelder,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: intl.formatMessage({
          id: 'barnasbosted.spm.harDereSkriftligSamværsavtale',
        }),
        verdi: valgtSvar,
      },
    };

    if (
      valgtSvar !==
      intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt' })
    ) {
      delete nyForelder.hvordanPraktiseresSamværet;
    }

    settForelder(nyForelder);
  };

  const visSamværsavtaleAdvarsel = (valgtSvar: string) => {
    return (
      valgtSvar ===
      intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt' })
    );
  };

  const visHvordanPraktiseresSamværet = (valgtSamværsrett: string) => {
    return (
      valgtSamværsrett ===
      intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt' })
    );
  };

  return (
    <>
      {!huketAvAnnenForelder ? (
        <KomponentGruppe>
          <JaNeiSpørsmål
            spørsmål={borINorge}
            onChange={(_, svar) =>
              settForelder({
                ...forelder,
                [borINorge.søknadid]: {
                  label: intl.formatMessage({ id: 'barnasbosted.borinorge' }),
                  verdi: hentBooleanFraValgtSvar(svar),
                },
              })
            }
            valgtSvar={forelder.borINorge?.verdi}
          />
        </KomponentGruppe>
      ) : null}
      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={avtaleOmDeltBosted}
          onChange={(_, svar) =>
            settForelder({
              ...forelder,
              [avtaleOmDeltBosted.søknadid]: {
                label: intl.formatMessage({ id: 'barnasbosted.avtale' }),
                verdi: hentBooleanFraValgtSvar(svar),
              },
            })
          }
          valgtSvar={forelder.avtaleOmDeltBosted?.verdi}
        />
      </KomponentGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmål
          key={harAnnenForelderSamværMedBarn.søknadid}
          spørsmål={harAnnenForelderSamværMedBarn}
          valgtSvar={forelder.harAnnenForelderSamværMedBarn?.verdi}
          settSpørsmålOgSvar={(spørsmål, svar) =>
            settHarForelderSamværMedBarn(spørsmål, svar)
          }
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
            settSpørsmålOgSvar={(spørsmål, svar) =>
              settHarDereSkriftligSamværsavtale(spørsmål, svar)
            }
          />
          {forelder.harDereSkriftligSamværsavtale &&
          visSamværsavtaleAdvarsel(
            forelder.harDereSkriftligSamværsavtale.verdi
          ) ? (
            <FeltGruppe>
              <AlertStripe type={'info'}>
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
