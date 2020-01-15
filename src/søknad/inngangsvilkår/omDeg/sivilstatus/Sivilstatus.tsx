import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import FeltGruppe from '../../../../components/FeltGruppe';
import KomponentGruppe from '../../../../components/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import { usePersonContext } from '../../../../context/PersonContext';
import useSøknadContext from '../../../../context/SøknadContext';
import { hentSivilstatus } from '../../../../utils/søknad';
import { IJaNeiSpørsmål as ISpørsmål } from '../../../../models/spørsmal';
import {
  SeparasjonSpørsmål,
  SkiltEllerEnkeSpørsmål,
} from '../../../../config/SivilstatusConfig';
import JaNeiSpørsmål from '../../../../components/JaNeiSpørsmål';
import {
  AlertStripeAdvarsel,
  AlertStripeInfo,
} from 'nav-frontend-alertstriper';

import { injectIntl } from 'react-intl';
import Søknadsbegrunnelse from './SøknadsBegrunnelse';
import SeksjonGruppe from '../../../../components/SeksjonGruppe';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';

const Sivilstatus: React.FC<any> = ({ intl }) => {
  const separasjonsSpørsmål: ISpørsmål = SeparasjonSpørsmål;
  const enkeUgiftEllerSkiltSpørsmål: ISpørsmål[] = SkiltEllerEnkeSpørsmål;

  const { person } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();
  const { søkerHarSøktSeparasjon, datoSøktSeparasjon } = søknad;
  const sivilstand = person.søker.sivilstand;

  const erSøkerGift = person.søker.sivilstand === 'GIFT';
  const erSøkerEnkeUgiftEllerSkilt =
    sivilstand === 'SKIL' || sivilstand === 'ENKE' || sivilstand === 'UGIF';

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
      <FeltGruppe>
        <Element>
          <LocaleTekst tekst={'sivilstatus.tittel'} />
        </Element>
        <Normaltekst>{hentSivilstatus(person.søker.sivilstand)}</Normaltekst>
      </FeltGruppe>
      {erSøkerGift ? (
        <>
          <KomponentGruppe>
            <JaNeiSpørsmål spørsmål={separasjonsSpørsmål} />
          </KomponentGruppe>
          {søkerHarSøktSeparasjon ? (
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
      ) : erSøkerEnkeUgiftEllerSkilt ? (
        <>
          {enkeUgiftEllerSkiltSpørsmål.map((spørsmål) => {
            return (
              <KomponentGruppe key={spørsmål.spørsmål_id}>
                <JaNeiSpørsmål spørsmål={spørsmål} />
              </KomponentGruppe>
            );
          })}
        </>
      ) : null}

      {!erSøkerGift ? <Søknadsbegrunnelse /> : null}
    </SeksjonGruppe>
  );
};

export default injectIntl(Sivilstatus);
