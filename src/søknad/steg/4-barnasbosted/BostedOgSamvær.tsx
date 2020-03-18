import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import { IForelder } from '../../../models/person';
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
import { ISpørsmål } from '../../../models/spørsmålogsvar';

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

  const settHarForelderSamværMedBarn = (
    spørsmål: ISpørsmål,
    valgtSvar: string
  ) => {
    const nyForelder = {
      ...forelder,
      [spørsmål.søknadid]: valgtSvar,
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
    valgtSvar: string
  ) => {
    const nyForelder = {
      ...forelder,
      [spørsmål.søknadid]: valgtSvar,
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
              settForelder({ ...forelder, [borINorge.søknadid]: svar })
            }
            valgtSvar={forelder.borINorge}
          />
        </KomponentGruppe>
      ) : null}
      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={avtaleOmDeltBosted}
          onChange={(_, svar) =>
            settForelder({
              ...forelder,
              [avtaleOmDeltBosted.søknadid]: svar,
            })
          }
          valgtSvar={forelder.avtaleOmDeltBosted}
        />
      </KomponentGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmål
          key={harAnnenForelderSamværMedBarn.søknadid}
          spørsmål={harAnnenForelderSamværMedBarn}
          valgtSvar={forelder.harAnnenForelderSamværMedBarn}
          settSpørsmålOgSvar={(spørsmål, svar) =>
            settHarForelderSamværMedBarn(spørsmål, svar)
          }
        />
      </KomponentGruppe>
      {forelder.harAnnenForelderSamværMedBarn &&
      visSkriftligSamværsavtaleSpørsmål(
        forelder.harAnnenForelderSamværMedBarn
      ) ? (
        <KomponentGruppe>
          <MultiSvarSpørsmål
            key={harDereSkriftligSamværsavtale.søknadid}
            spørsmål={harDereSkriftligSamværsavtale}
            valgtSvar={forelder.harDereSkriftligSamværsavtale}
            settSpørsmålOgSvar={(spørsmål, svar) =>
              settHarDereSkriftligSamværsavtale(spørsmål, svar)
            }
          />
          {forelder.harDereSkriftligSamværsavtale &&
          visSamværsavtaleAdvarsel(forelder.harDereSkriftligSamværsavtale) ? (
            <FeltGruppe>
              <AlertStripe type={'info'} form={'inline'}>
                <LocaleTekst
                  tekst={'barnasbosted.alert.leggeVedSamværsavtalen'}
                />
              </AlertStripe>
            </FeltGruppe>
          ) : null}
        </KomponentGruppe>
      ) : null}
      {forelder.harDereSkriftligSamværsavtale &&
      visHvordanPraktiseresSamværet(forelder.harDereSkriftligSamværsavtale) ? (
        <HvordanPraktiseresSamværet
          forelder={forelder}
          settForelder={settForelder}
        />
      ) : null}
    </>
  );
};

export default BostedOgSamvær;
