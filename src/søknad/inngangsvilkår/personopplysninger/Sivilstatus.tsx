import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import FeltGruppe from '../../../components/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import { usePersonContext } from '../../../context/PersonContext';
import { hentSivilstatus } from '../../../utils/søknad';
import { ISpørsmål } from '../../../models/spørsmal';
import {
  SeparasjonSpørsmål,
  SkiltEllerEnkeSpørsmål,
} from '../../../config/SivilstatusConfig';
import JaNeiSpørsmål from '../../../components/JaNeiSpørsmål';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import useSøknadContext from '../../../context/SøknadContext';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/datovelger/Datovelger';

const Sivilstatus: React.FC<any> = () => {
  const separasjonsSpørsmål: ISpørsmål = SeparasjonSpørsmål;
  const skiltEllerSeparertSpørsmål: ISpørsmål[] = SkiltEllerEnkeSpørsmål;
  const { person } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();
  const { søkerHarSøktSeparasjon, datoSøktSeparasjon } = søknad;
  const erSøkerGift = person.søker.sivilstand === 'GIFT';
  const erSøkerSeparertEllerSkilt =
    person.søker.sivilstand === 'SKIL' || person.søker.sivilstand === 'SEPA';

  const resetDatoSøktSeparasjon = (dato: Date | undefined) => {
    const key = 'datoSøktSeparasjon';
    const { [key]: _, ...nyttSøknadObjekt } = søknad;
    dato !== undefined && settSøknad({ ...nyttSøknadObjekt });
  };

  !søkerHarSøktSeparasjon && resetDatoSøktSeparasjon(datoSøktSeparasjon);

  return (
    <>
      <section className={'seksjon'}>
        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'sivilstatus.tittel'} />
          </Element>
          <Normaltekst>{hentSivilstatus(person.søker.sivilstand)}</Normaltekst>
        </FeltGruppe>
        {erSøkerGift ? (
          <>
            <FeltGruppe>
              <AlertStripeAdvarsel className={'fjernBakgrunn'}>
                <LocaleTekst tekst={'sivilstatus.somgift'} />
              </AlertStripeAdvarsel>
            </FeltGruppe>
            <FeltGruppe>
              <JaNeiSpørsmål
                spørsmål={separasjonsSpørsmål}
                tekstid={separasjonsSpørsmål.tekstid}
              />
            </FeltGruppe>
            {søkerHarSøktSeparasjon ? (
              <FeltGruppe>
                <Datovelger
                  tekstid={'sivilstatus.separasjon.datosøkt'}
                  datobegrensning={DatoBegrensning.TidligereDatoer}
                />
              </FeltGruppe>
            ) : !søkerHarSøktSeparasjon &&
              søkerHarSøktSeparasjon !== undefined ? (
              <FeltGruppe>
                <AlertStripeAdvarsel className={'fjernBakgrunn'}>
                  <LocaleTekst tekst={'sivilstatus.separasjon.advarsel'} />
                </AlertStripeAdvarsel>
              </FeltGruppe>
            ) : null}
          </>
        ) : null}
        {erSøkerSeparertEllerSkilt ? (
          <>
            {skiltEllerSeparertSpørsmål.map((spørsmål) => {
              return (
                <FeltGruppe>
                  <JaNeiSpørsmål
                    spørsmål={spørsmål}
                    tekstid={spørsmål.tekstid}
                  />
                </FeltGruppe>
              );
            })}
          </>
        ) : null}
      </section>
    </>
  );
};

export default Sivilstatus;
