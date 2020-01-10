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
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/datovelger/Datovelger';
import { injectIntl } from 'react-intl';
import Søknadsbegrunnelse from './SøknadsBegrunnelse';
import SeksjonGruppe from '../../../../components/SeksjonGruppe';

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
                objektnøkkel={'datoSøktSeparasjon'}
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
