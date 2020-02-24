import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { Element } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
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
import Datovelger, { DatoBegrensning } from '../../../components/dato/Datovelger';
import LocaleTekst from '../../../language/LocaleTekst';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import HvordanPraktiseresSamværet from './HvordanPraktiseresSamværet';
import { 
  settHarForelderSamværMedBarn,
  settHarDereSkriftligSamværsavtale,
  settHarBoddsammenFør,
  visSamværsavtaleAdvarsel,
  visSkriftligSamværsavtaleSpørsmål,
  visHvordanPraktiseresSamværet
} from './utils';

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknadContext();
  const [forelder, settForelder] = useState<IForelder>({});

  const barn = søknad.person.barn[0];

  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'barnasbosted.sidetittel' })}
      >
        <div className="barnas-bosted">
          <BarnasBostedHeader barn={barn} />
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
          <Datovelger
                    settDato={(e: Date | null) => settForelder({...forelder, "fødselsdato": e})}
                    valgtDato={forelder.fødselsdato ? forelder.fødselsdato : undefined}
                    tekstid={'datovelger.fødselsdato'}
                    datobegrensning={DatoBegrensning.TidligereDatoer}
                  />
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
                onChange={(spørsmål, svar) => settHarForelderSamværMedBarn(spørsmål, svar, settForelder, forelder, intl)}
              />
            </KomponentGruppe>
            {forelder.harAnnenForelderSamværMedBarn && visSkriftligSamværsavtaleSpørsmål(forelder.harAnnenForelderSamværMedBarn, intl) ? 
                        <KomponentGruppe>
                        <MultiSvarSpørsmål
                          key={harDereSkriftligSamværsavtale.spørsmål_id}
                          spørsmål={harDereSkriftligSamværsavtale}
                          valgtSvar={forelder.harDereSkriftligSamværsavtale}
                          onChange={(spørsmål, svar) => settHarDereSkriftligSamværsavtale(spørsmål, svar, settForelder, forelder, intl)}
                        />
                        {forelder.harDereSkriftligSamværsavtale && visSamværsavtaleAdvarsel(forelder.harDereSkriftligSamværsavtale, intl) ? (
                          <FeltGruppe>
                          <AlertStripeInfo className={'fjernBakgrunn'}>
                            <LocaleTekst tekst={'barnasbosted.alert.leggeVedSamværsavtalen'} />
                          </AlertStripeInfo>
                          </FeltGruppe>
                      ) : null}
                      </KomponentGruppe> : null}
                      {forelder.harDereSkriftligSamværsavtale && visHvordanPraktiseresSamværet(forelder.harDereSkriftligSamværsavtale, intl) ?
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
                onChange={(spørsmål, svar) => settHarBoddsammenFør(spørsmål, svar, settForelder, forelder, intl)}
                valgtSvar={forelder.boddSammenFør}
              />
            </KomponentGruppe>
            {forelder.boddSammenFør ? <KomponentGruppe>
            <div className="fødselsnummer">
            <div className="fødselsdato">
          <div className={'datepicker__container'}>
                          <Datovelger
                    settDato={(e: Date | null) => settForelder({...forelder, "flyttetFra": e})}
                    valgtDato={forelder.flyttetFra ? forelder.flyttetFra : undefined}
                    tekstid={'barnasbosted.normaltekst.nårflyttetfra'}
                    datobegrensning={DatoBegrensning.TidligereDatoer}
                  />
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
