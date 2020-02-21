import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import barn1 from '../../../assets/barn1.svg';
import { Input } from 'nav-frontend-skjema';
import DatePicker from 'react-datepicker';
import { Checkbox } from 'nav-frontend-skjema';
import {
  borINorge,
  avtaleOmDeltBosted,
  harAnnenForelderSamværMedBarn,
  harDereSkriftligSamværsavtale,
  boddSammenFør,
  borISammeHus,
  hvorMyeSammen
} from './ForeldreConfig';
import { IForelder } from '../../../models/person';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import BarnasBostedHeader from './BarnasBostedHeader';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { useIntl } from 'react-intl';
import LocaleTekst from '../../../language/LocaleTekst';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import HvordanPraktiseresSamværet from './HvordanPraktiseresSamværet';

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknadContext();
  const [forelder, settForelder] = useState<IForelder>({});

  const settHarForelderSamværMedBarn = (spørsmål: string, valgtSvar: string) => {
    const nyForelder = {...forelder, [harAnnenForelderSamværMedBarn.spørsmål_id]: valgtSvar};

    if (valgtSvar === intl.formatMessage({ id: 'barnasbosted.spm.andreForelderenSamværNei'})) {
      delete nyForelder.harDereSkriftligSamværsavtale;
      delete nyForelder.hvordanPraktiseresSamværet;
    }

    settForelder(nyForelder);
  }

  const settHarDereSkriftligSamværsavtale = (spørsmål: string, valgtSvar: string) => {
    const nyForelder = {...forelder, [harDereSkriftligSamværsavtale.spørsmål_id]: valgtSvar};

    if (valgtSvar !== intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt'})) {
      delete nyForelder.hvordanPraktiseresSamværet;
    }

    settForelder(nyForelder);
  }

  console.log("FORELDER");
  console.log(forelder);

  const visSamværsavtaleAdvarsel = (valgtSvar: string) => {
    return valgtSvar === intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt' });
  }

  const visSkriftligSamværsavtaleSpørsmål = (svarAndreForelderenSamvær: string) => {
    return svarAndreForelderenSamvær && svarAndreForelderenSamvær !== intl.formatMessage({ id: 'barnasbosted.spm.andreForelderenSamværNei' });
  }

  const visHvordanPraktiseresSamværet = (valgtSamværsrett: string) => {
    return valgtSamværsrett === intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt' });
  }

  const barn = søknad.person.barn[0];

  const bosted = barn.harSammeAdresse ? intl.formatMessage({ id: 'barnekort.adresse.registrert' }) : intl.formatMessage({ id: 'barnekort.adresse.uregistrert' });

  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'barnasbosted.sidetittel' })}
      >
        <div className="barnas-bosted">
          <div className="barnas-bosted__header">
            <img alt="barn" className="barneikon" src={barn1} />
          </div>
          <div className="barnas-bosted__info">
            <Element className="navn">{barn.navn}</Element>
            <div className="inforad">
              <div className="informasjonselement">
                  <Normaltekst className="informasjonselement__header">{intl.formatMessage({id: 'barnekort.fødselsnummer'})}</Normaltekst>
                  <Normaltekst className="informasjonselement__innhold">{barn.fnr}</Normaltekst>
              </div>
              <div className="informasjonselement">
                  <Normaltekst className="informasjonselement__header">{intl.formatMessage({id: 'barnekort.alder'})}}</Normaltekst>
                  <Normaltekst className="informasjonselement__innhold">{barn.alder} år</Normaltekst>
              </div>
              <div className="informasjonselement">
                  <Normaltekst className="informasjonselement__header">{intl.formatMessage({id: 'barnekort.bosted'})}}</Normaltekst>
                  <Normaltekst className="informasjonselement__innhold">{bosted}</Normaltekst>
              </div>
            </div>
          </div>
          <div className="barnas-bosted__innhold">
          <KomponentGruppe>
            <FeltGruppe>
            <Element>{barn.navn}{intl.formatMessage({ id: 'barnasbosted.element.andreforelder' })}</Element>
            </FeltGruppe>
          <FeltGruppe>
            <Input className="foreldre-navn-input" onChange={(e) => settForelder({...forelder, "navn": e.target.value})} label="Navn" />
          </FeltGruppe>
          </KomponentGruppe>
          <KomponentGruppe>
          <div className="fødselsnummer">
            <div className="fødselsdato">
          <Normaltekst>{intl.formatMessage({ id: 'datovelger.fødselsdato' })}</Normaltekst>
          <div className="barn-datovelger">
          <div className={'datepicker__container'}>
            <DatePicker
                    onChange={(e) => settForelder({...forelder, "fødselsdato": e})}
                    selected={new Date()}
                    dateFormat={'dd.MM.yyyy'}
                    className={'datovelger__input'}
                />
                </div>
            </div>
            </div>
            <Input className="personnummer" onChange={(e) => settForelder({...forelder, "personnr": e.target.value})} label="Personnummer. Kun hvis barnet har fått." />
            </div>
            <FeltGruppe>
            <Checkbox label={'Jeg kan ikke oppgi den andre forelderen'} />
            </FeltGruppe>
            </KomponentGruppe>
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
            <KomponentGruppe>
              <MultiSvarSpørsmål
                key={borISammeHus.spørsmål_id}
                spørsmål={borISammeHus}
                valgtSvar={forelder.borISammeHus}
                onChange={(_, svar) => settForelder({...forelder, [borISammeHus.spørsmål_id]: svar})}
              />
            </KomponentGruppe>
            <KomponentGruppe>
              <JaNeiSpørsmål 
                spørsmål={boddSammenFør} 
                onChange={(_, svar) => settForelder({...forelder, [boddSammenFør.spørsmål_id]: svar})}
                valgtSvar={forelder.boddSammenFør}
              />
            </KomponentGruppe>
            {forelder.boddSammenFør ? <KomponentGruppe>
            <div className="fødselsnummer">
            <div className="fødselsdato">
          <Normaltekst>{intl.formatMessage({ id: 'barnasbosted.normaltekst.nårflyttetfra' })}</Normaltekst>
          <div className="barn-datovelger">
          <div className={'datepicker__container'}>
            <DatePicker
                    onChange={(e) => settForelder({...forelder, "flyttetFra": e})}
                    selected={new Date()}
                    dateFormat={'dd.MM.yyyy'}
                    className={'datovelger__input'}
                />
                </div>
            </div>
            </div>
            </div>
            </KomponentGruppe> : null}
            <KomponentGruppe>
              <MultiSvarSpørsmål
                key={hvorMyeSammen.spørsmål_id}
                spørsmål={hvorMyeSammen}
                valgtSvar={forelder.hvorMyeSammen}
                onChange={(_, svar) => settForelder({...forelder, [hvorMyeSammen.spørsmål_id]: svar})}
              />
            </KomponentGruppe>
            </div>
            </div>
      </Side>
    </>
  );
};

export default BarnasBosted;
