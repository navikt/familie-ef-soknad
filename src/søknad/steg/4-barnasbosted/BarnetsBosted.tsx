import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { ISpørsmål } from '../../../models/spørsmal';
import {
  boddSammenFør,
  borISammeHus,
  hvorMyeSammen
} from './ForeldreConfig';
import { IForelder, IBarn } from '../../../models/person';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { Knapp } from 'nav-frontend-knapper';
import { RadioPanel } from 'nav-frontend-skjema';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import BarnasBostedHeader from './BarnasBostedHeader';
import { Element } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import Datovelger, { DatoBegrensning } from '../../../components/dato/Datovelger';
import OmAndreForelder from './OmAndreForelder';
import BostedOgSamvær from './BostedOgSamvær';
import SkalBarnBoHosDeg from './SkalBarnBoHosDeg';

interface Props {
    barn: IBarn;
}

const BarnetsBosted: React.FC<Props> = ( { barn }) => {
    const intl = useIntl();
    const { søknad, settSøknad } = useSøknadContext();

    const [forelder, settForelder] = useState<IForelder>({});
    const [huketAvAnnenForelder, settHuketAvAnnenForelder] = useState<boolean>(false);
    const [andreForelderRadioVerdi, settAndreForelderRadioVerdi] = useState<string>("");

    const settHarBoddsammenFør = (spørsmål: ISpørsmål, valgtSvar: boolean) => {
      const nyForelder = {...forelder, [boddSammenFør.søknadid]: valgtSvar};

      if (valgtSvar === false) {
        delete nyForelder.flyttetFra;
      }

      settForelder(nyForelder);
    }

    const leggTilForelder = () => {
      const nyBarneListe = søknad.person.barn.map((b) => {
        if (b === barn) {
          let nyttBarn = barn;
          nyttBarn.forelder = forelder;
          return nyttBarn;
        } else {
          return b;
        }
      });

      settSøknad({...søknad, person: {...søknad.person, barn: nyBarneListe}});
    }

    const leggTilSammeForelder = (e: any, detAndreBarnet: IBarn, detteBarnet: IBarn) => {
      settHuketAvAnnenForelder(true);
      const denAndreForelderen = detAndreBarnet.forelder;
      settAndreForelderRadioVerdi(detAndreBarnet.navn);

      settForelder({...forelder, "navn": denAndreForelderen?.navn, "fødselsdato": denAndreForelderen?.fødselsdato, "personnr": denAndreForelderen?.personnr, "borINorge": denAndreForelderen?.borINorge, "hvordanPraktiseresSamværet": denAndreForelderen?.hvordanPraktiseresSamværet, "borISammeHus": denAndreForelderen?.borISammeHus, "boddSammenFør": denAndreForelderen?.boddSammenFør, "flyttetFra": denAndreForelderen?.flyttetFra, "hvorMyeSammen": denAndreForelderen?.hvorMyeSammen});
    }

    const leggTilAnnenForelder = () => {
      settHuketAvAnnenForelder(false);
      settAndreForelderRadioVerdi("annen-forelder");
      settForelder({});
    }

    const andreBarnMedForelder = søknad.person.barn.filter((b) => {
      return b !== barn && b.forelder;
    });

    return (
        <>
          <div className="barnas-bosted">
          <BarnasBostedHeader barn={barn} />
          <div className="barnas-bosted__innhold">
            <SkalBarnBoHosDeg forelder={forelder} settForelder={settForelder} barn={barn} />
            <FeltGruppe>
          <Element>
            {barn.navn}
            {intl.formatMessage({ id: 'barnasbosted.element.andreforelder' })}
          </Element>
          {andreBarnMedForelder.length ? <div className="andre-forelder-valg">
          {andreBarnMedForelder.map((b) => {
            return <RadioPanel
              key={`andre-forelder-${b.navn}`}
              name={`andre-forelder-${barn.navn}`}
              label={`Samme som ${b.navn}`}
              value={`andre-forelder-${b.navn}`}
              checked={andreForelderRadioVerdi === b.navn}
              onChange={(e) => leggTilSammeForelder(e, b, barn)}
            />
          })}
          <RadioPanel
              key={`andre-forelder-annen`}
              name={`andre-forelder-${barn.navn}`}
              label={`Annen forelder`}
              value={`andre-forelder-annen`}
              checked={andreForelderRadioVerdi === "annen-forelder"}
              onChange={() => leggTilAnnenForelder()}
            />
          </div> : null}
        </FeltGruppe>
            {!huketAvAnnenForelder ? <OmAndreForelder barn={barn} settForelder={settForelder} forelder={forelder} /> : null}
            <BostedOgSamvær settForelder={settForelder} forelder={forelder} huketAvAnnenForelder={huketAvAnnenForelder} />
            {!huketAvAnnenForelder ? <><KomponentGruppe>
              <MultiSvarSpørsmål
                key={borISammeHus.søknadid}
                spørsmål={borISammeHus}
                valgtSvar={forelder.borISammeHus}
                settSpørsmålOgSvar={(_, svar) => settForelder({...forelder, [borISammeHus.søknadid]: svar})}
              />
            </KomponentGruppe>
            <KomponentGruppe>
              <JaNeiSpørsmål 
                spørsmål={boddSammenFør} 
                onChange={(spørsmål, svar) => settHarBoddsammenFør(spørsmål, svar)}
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
                key={hvorMyeSammen.søknadid}
                spørsmål={hvorMyeSammen}
                valgtSvar={forelder.hvorMyeSammen}
                settSpørsmålOgSvar={(_, svar) => settForelder({...forelder, [hvorMyeSammen.søknadid]: svar})}
              />
            </KomponentGruppe></> : null}
            <Knapp onClick={leggTilForelder}>Lagre</Knapp>
            </div>
            </div>
        </>
    );
};

export default BarnetsBosted;
