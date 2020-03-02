import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { ISpørsmål } from '../../../models/spørsmal';
import {
  boddSammenFør,
  borISammeHus,
  hvorMyeSammen,
  skalBarnBoHosDeg
} from './ForeldreConfig';
import { IForelder, IBarn } from '../../../models/person';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { Knapp } from 'nav-frontend-knapper';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import BarnasBostedHeader from './BarnasBostedHeader';
import { Normaltekst } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import Datovelger, { DatoBegrensning } from '../../../components/dato/Datovelger';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import OmAndreForelder from './OmAndreForelder';
import BostedOgSamvær from './BostedOgSamvær';
import LocaleTekst from '../../../language/LocaleTekst';
import SkalBarnBoHosDeg from './SkalBarnBoHosDeg';

interface Props {
    barn: IBarn;
}

const BarnetsBosted: React.FC<Props> = ( { barn }) => {
    const intl = useIntl();
    const { søknad, settSøknad } = useSøknadContext();

    const [forelder, settForelder] = useState<IForelder>({});


    const settHarBoddsammenFør = (spørsmål: ISpørsmål, valgtSvar: boolean) => {
      const nyForelder = {...forelder, [boddSammenFør.søknadid]: valgtSvar};
  
      if (valgtSvar === false) {
        delete nyForelder.flyttetFra;
      }

      settForelder(nyForelder);
    }

    return (
        <>
          <div className="barnas-bosted">
          <BarnasBostedHeader barn={barn} />
          <div className="barnas-bosted__innhold">
            <SkalBarnBoHosDeg forelder={forelder} settForelder={settForelder} barn={barn} />
            <OmAndreForelder barn={barn} settForelder={settForelder} forelder={forelder} />
            <BostedOgSamvær settForelder={settForelder} forelder={forelder} />
            <KomponentGruppe>
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
            </KomponentGruppe>
            <Knapp onClick={() => console.log("jepp")}>Legg til</Knapp>
            </div>
            </div>
        </>
    );
};

export default BarnetsBosted;
