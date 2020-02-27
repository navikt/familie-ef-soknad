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
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import BarnasBostedHeader from './BarnasBostedHeader';
import { Normaltekst } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import Datovelger, { DatoBegrensning } from '../../../components/dato/Datovelger';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import OmAndreForelder from './OmAndreForelder';
import BostedOgSamvær from './BostedOgSamvær';
import LocaleTekst from '../../../language/LocaleTekst';

interface Props {
    barn: IBarn;
}

const BarnetsBosted: React.FC<Props> = ( { barn }) => {
    const intl = useIntl();

    const [forelder, settForelder] = useState<IForelder>({});

    const settHarBoddsammenFør = (spørsmål: ISpørsmål, valgtSvar: boolean) => {
      const nyForelder = {...forelder, [boddSammenFør.spørsmål_id]: valgtSvar};
  
      if (valgtSvar === false) {
        delete nyForelder.flyttetFra;
      }
  
      settForelder(nyForelder);
    }

    console.log("BARN");
    console.log(barn);

    return (
        <>
<div className="barnas-bosted">
          <BarnasBostedHeader barn={barn} />
          <div className="barnas-bosted__innhold">
            {!barn.harSammeAdresse ? <KomponentGruppe>
            <AlertStripeAdvarsel className={'fjernBakgrunn'}>
              <LocaleTekst tekst={'barnasbosted.alert.måBoHosDeg'} />
            </AlertStripeAdvarsel>
            <MultiSvarSpørsmål
                  key={skalBarnBoHosDeg.spørsmål_id}
                  spørsmål={skalBarnBoHosDeg}
                  valgtSvar={forelder.skalBarnBoHosDeg}
                  onChange={(_, svar) => settForelder({...forelder, [skalBarnBoHosDeg.spørsmål_id]: svar})}
                />
              </KomponentGruppe>              
              : null}
            {forelder.skalBarnBoHosDeg === intl.formatMessage({ id: 'barnasbosted.spm.jaMenSamarbeiderIkke' }) ? 
            <FeltGruppe>
            <AlertStripeInfo className={'fjernBakgrunn'}>
              <LocaleTekst tekst={'barnasbosted.alert.hvisFaktiskBor'} />
            </AlertStripeInfo>
            <FeltGruppe>
            <Normaltekst className="innskutt">Familievernkontoret kan også hjelpe deg</Normaltekst>
            </FeltGruppe>
            <Normaltekst className="innskutt">Når det kommer til denne søknaden kan du dokumentere at Lise bor hos deg ved å sende inn for eksempel:</Normaltekst>
            <ul className="dokumentere-bosted">
              <li><Normaltekst>redegjørelse for årsaken til manglende adresseendring for barnet</Normaltekst></li>
              <li><Normaltekst>kopi av flyttemelding/tips til Folkeregisteret</Normaltekst></li>
              <li><Normaltekst>bekreftelse fra for eksempel barnehage/skole, barnevern eller helsestasjon</Normaltekst></li>
            </ul>
            </FeltGruppe>
             : 
            null}
            <OmAndreForelder barn={barn} settForelder={settForelder} forelder={forelder} />
            <BostedOgSamvær settForelder={settForelder} forelder={forelder} />
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
                key={hvorMyeSammen.spørsmål_id}
                spørsmål={hvorMyeSammen}
                valgtSvar={forelder.hvorMyeSammen}
                onChange={(_, svar) => settForelder({...forelder, [hvorMyeSammen.spørsmål_id]: svar})}
              />
            </KomponentGruppe>
            </div>
            </div>
        </>
    );
};

export default BarnetsBosted;
