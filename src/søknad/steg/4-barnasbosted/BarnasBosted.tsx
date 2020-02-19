import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import barn1 from '../../../assets/barn1.svg';
import { Routes, IRoute } from '../../../routing/Routes';
import { hentNesteRoute } from '../../../routing/utils';
import { hentForrigeRoute } from '../../../routing/utils';
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
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { useLocation } from 'react-router';
import { useIntl } from 'react-intl';
import LocaleTekst from '../../../language/LocaleTekst';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import HvordanPraktiseresSamværet from './HvordanPraktiseresSamværet';

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknadContext();
  const [forelder, settForelder] = useState<IForelder>({
    navn: "",
    fødselsdato: null,
    personnr: "",
    borINorge: undefined,
    avtaleOmDeltBosted: undefined,
    harAnnenForelderSamværMedBarn: "",
    harDereSkriftligSamværsavtale: "",
    hvordanPraktiseresSamværet: "",
    borISammeHus: "",
    boddSammenFør: undefined,
    flyttetFra: null,
    hvorMyeSammen: ""
  });

  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);
  const forrigeRoute: IRoute = hentForrigeRoute(Routes, location.pathname);

  const visSamværsavtaleAdvarsel = (valgtSvar: string) => {
    return valgtSvar == intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt' });
  }

  const visSkriftligSamværsavtaleSpørsmål = (svarAndreForelderenSamvær: string) => {
    return svarAndreForelderenSamvær && svarAndreForelderenSamvær !== intl.formatMessage({ id: 'barnasbosted.spm.andreForelderenSamværNei' });
  }

  const visHvordanPraktiseresSamværet = (valgtSamværsrett: string) => {
    return valgtSamværsrett == intl.formatMessage({ id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt' });
  }

  const barn = søknad.person.barn[0];

  const bosted = barn.harSammeAdresse ? intl.formatMessage({ id: 'barnekort.adresse.registrert' }) : intl.formatMessage({ id: 'barnekort.adresse.uregistrert' });

  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'barnasbosted.sidetittel' })}
        nestePath={nesteRoute.path}
        tilbakePath={forrigeRoute.path}
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
                onChange={(e) => settForelder({...forelder, [borINorge.spørsmål_id]: e})}
                valgtSvar={forelder.borINorge}
              />
            </KomponentGruppe>
            <KomponentGruppe>
              <JaNeiSpørsmål 
                spørsmål={avtaleOmDeltBosted} 
                onChange={(e) => settForelder({...forelder, [avtaleOmDeltBosted.spørsmål_id]: e})} 
                valgtSvar={forelder.avtaleOmDeltBosted}
              />
            </KomponentGruppe>
            <KomponentGruppe>
              <MultiSvarSpørsmål
                key={harAnnenForelderSamværMedBarn.spørsmål_id}
                spørsmål={harAnnenForelderSamværMedBarn}
                valgtSvar={forelder.harAnnenForelderSamværMedBarn}
                onChange={(e) => settForelder({...forelder, [harAnnenForelderSamværMedBarn.spørsmål_id]: e})}
              />
            </KomponentGruppe>
            {visSkriftligSamværsavtaleSpørsmål(forelder.harAnnenForelderSamværMedBarn) ? 
                        <KomponentGruppe>
                        <MultiSvarSpørsmål
                          key={harDereSkriftligSamværsavtale.spørsmål_id}
                          spørsmål={harDereSkriftligSamværsavtale}
                          valgtSvar={forelder.harDereSkriftligSamværsavtale}
                          onChange={(e) => settForelder({...forelder, [harDereSkriftligSamværsavtale.spørsmål_id]: e})}
                        />
                        {visSamværsavtaleAdvarsel(forelder.harDereSkriftligSamværsavtale) ? (
                          <FeltGruppe>
                          <AlertStripeInfo className={'fjernBakgrunn'}>
                            <LocaleTekst tekst={'barnasbosted.alert.leggeVedSamværsavtalen'} />
                          </AlertStripeInfo>
                          </FeltGruppe>
                      ) : null}
                      </KomponentGruppe> : null}
                      {visHvordanPraktiseresSamværet(forelder.harDereSkriftligSamværsavtale) ?
                      <HvordanPraktiseresSamværet forelder={forelder} settForelder={settForelder} /> : null}
            <KomponentGruppe>
              <MultiSvarSpørsmål
                key={borISammeHus.spørsmål_id}
                spørsmål={borISammeHus}
                valgtSvar={forelder.borISammeHus}
                onChange={(e) => settForelder({...forelder, [borISammeHus.spørsmål_id]: e})}
              />
            </KomponentGruppe>
            <KomponentGruppe>
              <JaNeiSpørsmål 
                spørsmål={boddSammenFør} 
                onChange={(e) => settForelder({...forelder, [boddSammenFør.spørsmål_id]: e})}
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
                onChange={(e) => settForelder({...forelder, [hvorMyeSammen.spørsmål_id]: e})}
              />
            </KomponentGruppe>
            </div>
            </div>
      </Side>
    </>
  );
};

export default BarnasBosted;
