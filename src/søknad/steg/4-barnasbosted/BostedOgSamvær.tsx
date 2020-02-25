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
    harDereSkriftligSamværsavtale
  } from './ForeldreConfig';
  import HvordanPraktiseresSamværet from './HvordanPraktiseresSamværet';
  import LocaleTekst from '../../../language/LocaleTekst';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

interface Props {
    settForelder: Function;
    forelder: IForelder;
}

const BostedOgSamvær: React.FC<Props> = ( { settForelder, forelder }) => {
    const intl = useIntl();

    const settHarForelderSamværMedBarn = (spørsmål: string, valgtSvar: string) => {
        const nyForelder = {...forelder, [harAnnenForelderSamværMedBarn.spørsmål_id]: valgtSvar};
    
        if (valgtSvar === intl.formatMessage({ id: 'barnasbosted.spm.andreForelderenSamværNei'})) {
          delete nyForelder.harDereSkriftligSamværsavtale;
          delete nyForelder.hvordanPraktiseresSamværet;
        }
    
        settForelder(nyForelder);
      }

      const visSkriftligSamværsavtaleSpørsmål = (svarAndreForelderenSamvær: string) => {
        return svarAndreForelderenSamvær && svarAndreForelderenSamvær !== intl.formatMessage({ id: 'barnasbosted.spm.andreForelderenSamværNei' });
      }

      const settHarDereSkriftligSamværsavtale = (spørsmål: string, valgtSvar: string) => {
        const nyForelder = {...forelder, [harDereSkriftligSamværsavtale.spørsmål_id]: valgtSvar};
    
        if (valgtSvar !== intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt'})) {
          delete nyForelder.hvordanPraktiseresSamværet;
        }
    
        settForelder(nyForelder);
      }

      const visSamværsavtaleAdvarsel = (valgtSvar: string) => {
        return valgtSvar === intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt' });
      }

      const visHvordanPraktiseresSamværet = (valgtSamværsrett: string) => {
        return valgtSamværsrett === intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt' });
      }

    return (
        <>
            <KomponentGruppe>
              <JaNeiSpørsmål 
                spørsmål={borINorge} 
                onChange={(_, svar) => settForelder({...forelder, [borINorge.spørsmål_id]: svar})}
                valgtSvar={forelder.borINorge}
              />
            </KomponentGruppe>
            <KomponentGruppe>
              <JaNeiSpørsmål 
                spørsmål={avtaleOmDeltBosted} 
                onChange={(_, svar) => settForelder({...forelder, [avtaleOmDeltBosted.spørsmål_id]: svar})} 
                valgtSvar={forelder.avtaleOmDeltBosted}
              />
            </KomponentGruppe>
            <KomponentGruppe>
              <MultiSvarSpørsmål
                key={harAnnenForelderSamværMedBarn.spørsmål_id}
                spørsmål={harAnnenForelderSamværMedBarn}
                valgtSvar={forelder.harAnnenForelderSamværMedBarn}
                onChange={(spørsmål, svar) => settHarForelderSamværMedBarn(spørsmål, svar)}
              />
            </KomponentGruppe>
            {forelder.harAnnenForelderSamværMedBarn && visSkriftligSamværsavtaleSpørsmål(forelder.harAnnenForelderSamværMedBarn) ? 
                        <KomponentGruppe>
                        <MultiSvarSpørsmål
                          key={harDereSkriftligSamværsavtale.spørsmål_id}
                          spørsmål={harDereSkriftligSamværsavtale}
                          valgtSvar={forelder.harDereSkriftligSamværsavtale}
                          onChange={(spørsmål, svar) => settHarDereSkriftligSamværsavtale(spørsmål, svar)}
                        />
                        {forelder.harDereSkriftligSamværsavtale && visSamværsavtaleAdvarsel(forelder.harDereSkriftligSamværsavtale) ? (
                          <FeltGruppe>
                          <AlertStripeInfo className={'fjernBakgrunn'}>
                            <LocaleTekst tekst={'barnasbosted.alert.leggeVedSamværsavtalen'} />
                          </AlertStripeInfo>
                          </FeltGruppe>
                      ) : null}
                      </KomponentGruppe> : null}
                      {forelder.harDereSkriftligSamværsavtale && visHvordanPraktiseresSamværet(forelder.harDereSkriftligSamværsavtale) ?
                      <HvordanPraktiseresSamværet forelder={forelder} settForelder={settForelder} /> : null}
        </>
    );
};

export default BostedOgSamvær;
