import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import { usePersonContext } from '../../../../context/PersonContext';
import useSøknadContext from '../../../../context/SøknadContext';
import { hentSivilstatus } from '../../../../utils/søknad';
import { IJaNeiSpørsmål as ISpørsmål } from '../../../../models/spørsmal';
import {
  SeparasjonSpørsmål,
  søkerGiftIUtlandet,
  søkerSeparertEllerSKiltIUtlandet,
} from './SivilstatusConfig';

import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import {
  AlertStripeAdvarsel,
  AlertStripeInfo,
} from 'nav-frontend-alertstriper';

import { injectIntl } from 'react-intl';
import Søknadsbegrunnelse from './SøknadsBegrunnelse';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';

const Sivilstatus: React.FC<any> = ({ intl }) => {
  const separasjonsSpørsmål: ISpørsmål = SeparasjonSpørsmål;
  const { person } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();
  const { søkerHarSøktSeparasjon, datoSøktSeparasjon } = søknad;
  const sivilstand = person.søker.sivilstand;

  const erSøkerGift = person.søker.sivilstand === 'GIFT';
  const erSøkerUgift = sivilstand === 'UGIF';
  const erSøkerEnke = sivilstand === 'ENKE';
  const erSøkerSeparert = sivilstand === 'SEPA';


  const resetDatoSøktSeparasjon = (dato: Date | undefined) => {
    const objektnavn = 'datoSøktSeparasjon';
    const { [objektnavn]: _, ...nyttSøknadObjekt } = søknad;
    dato !== undefined && settSøknad({ ...nyttSøknadObjekt });
  };

  const settDato = (date: Date | null, objektnøkkel: string): void => {
    date !== null && settSøknad({ ...søknad, [objektnøkkel]: date });
  };

  !søkerHarSøktSeparasjon && resetDatoSøktSeparasjon(datoSøktSeparasjon);

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <Element>
          <LocaleTekst tekst={'sivilstatus.tittel'} />
        </Element>
        <Normaltekst>{hentSivilstatus(person.søker.sivilstand)}</Normaltekst>
      </KomponentGruppe>
      {erSøkerGift ? (
        <>
          <KomponentGruppe>
            <JaNeiSpørsmål spørsmål={separasjonsSpørsmål} />
          </KomponentGruppe>
          {søkerHarSøktSeparasjon !== undefined ? (

            <KomponentGruppe>
              <Datovelger
                settDato={(e) => settDato(e, 'datoSøktSeparasjon')}
                valgtDato={
                  søknad.datoSøktSeparasjon ? datoSøktSeparasjon : undefined
                }
                tekstid={'sivilstatus.separasjon.datosøkt'}
                datobegrensning={DatoBegrensning.TidligereDatoer}
              />
              <FeltGruppe>
                <AlertStripeInfo className={'fjernBakgrunn'}>
                  <LocaleTekst tekst={'sivilstatus.somgift'} />
                </AlertStripeInfo>
              </FeltGruppe>
            </KomponentGruppe>
          ) : !søkerHarSøktSeparasjon &&
            søkerHarSøktSeparasjon !== undefined ? (
            <KomponentGruppe>
              <AlertStripeAdvarsel className={'fjernBakgrunn'}>
                <LocaleTekst tekst={'sivilstatus.separasjon.advarsel'} />
              </AlertStripeAdvarsel>
            </KomponentGruppe>
          ) : null}
        </>
      ) : erSøkerUgift ? (
        <>
          <KomponentGruppe>
            <JaNeiSpørsmål spørsmål={søkerGiftIUtlandet} />
          </KomponentGruppe>

          {typeof søknad.søkerGiftIUtlandet === 'boolean' ? (
            <KomponentGruppe>
              <JaNeiSpørsmål spørsmål={søkerSeparertEllerSKiltIUtlandet} />
            </KomponentGruppe>
          ) : null}
        </>
      ) : null}

      {(erSøkerUgift &&
        søknad.søkerSeparertEllerSkiltIUtlandet !== undefined) ||
      erSøkerSeparert ||
      erSøkerEnke ? (
        <Søknadsbegrunnelse />
      ) : null}

    </SeksjonGruppe>
  );
};

export default injectIntl(Sivilstatus);
