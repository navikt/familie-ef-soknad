import React, { useEffect } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import { usePersonContext } from '../../../../context/PersonContext';
import useSøknadContext from '../../../../context/SøknadContext';
import { hentSivilstatus } from '../../../../utils/søknad';
import { IJaNeiSpørsmål } from '../../../../models/spørsmal';

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
import { ISivilstatus } from '../../../../models/omDeg';
import {
  SeparasjonSpørsmål,
  sivilstatusIUtlandetSpørsmål,
} from './SivilstatusConfig';

const Sivilstatus: React.FC<any> = ({ intl }) => {
  const separasjonsSpørsmål: IJaNeiSpørsmål = SeparasjonSpørsmål;

  const { person } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();
  const { sivilstatus } = søknad;
  const { søkerHarSøktSeparasjon, datoSøktSeparasjon } = sivilstatus;
  const sivilstand = person.søker.sivilstand;

  const erSøkerGift = person.søker.sivilstand === 'GIFT';
  const erSøkerUgift = sivilstand === 'UGIF';

  const settSivilstatusFelt = (spørsmål: IJaNeiSpørsmål, svar: boolean) => {
    settSøknad({
      ...søknad,
      sivilstatus: {
        ...sivilstatus,
        [spørsmål.spørsmål_id]: {
          label: intl.formatMessage({ id: spørsmål.tekstid }),
          verdi: svar,
        },
      },
    });
  };

  const settDato = (
    date: Date | null,
    objektnøkkel: string,
    tekst: string
  ): void => {
    date !== null &&
      settSøknad({
        ...søknad,
        sivilstatus: {
          ...sivilstatus,
          [objektnøkkel]: {
            label: intl.formatMessage({ id: tekst }),
            verdi: date,
          },
        },
      });
  };

  const hentValgtSvar = (
    spørsmål: IJaNeiSpørsmål,
    sivilstatus: ISivilstatus
  ) => {
    for (const [key, value] of Object.entries(sivilstatus)) {
      if (key === spørsmål.spørsmål_id && value !== undefined) {
        return value.verdi;
      }
    }
  };

  useEffect(() => {
    const resetDatoSøktSeparasjon = () => {
      const { datoSøktSeparasjon, ...nyttObjekt } = sivilstatus;
      settSøknad({ ...søknad, sivilstatus: nyttObjekt });
    };
    !søkerHarSøktSeparasjon?.verdi &&
      datoSøktSeparasjon !== undefined &&
      resetDatoSøktSeparasjon();
  }, [
    datoSøktSeparasjon,
    settSøknad,
    sivilstatus,
    søkerHarSøktSeparasjon,
    søknad,
  ]);

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
            <JaNeiSpørsmål
              spørsmål={separasjonsSpørsmål}
              onChange={settSivilstatusFelt}
              valgtSvar={
                søkerHarSøktSeparasjon
                  ? søkerHarSøktSeparasjon.verdi
                  : undefined
              }
            />
          </KomponentGruppe>
          {søkerHarSøktSeparasjon?.verdi ? (
            <KomponentGruppe>
              <Datovelger
                settDato={(e) =>
                  settDato(
                    e,
                    'datoSøktSeparasjon',
                    'sivilstatus.separasjon.datosøkt'
                  )
                }
                valgtDato={
                  datoSøktSeparasjon ? datoSøktSeparasjon.verdi : undefined
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
          {sivilstatusIUtlandetSpørsmål.map((spørsmål) => {
            return (
              <KomponentGruppe key={spørsmål.spørsmål_id}>
                <JaNeiSpørsmål
                  spørsmål={spørsmål}
                  onChange={settSivilstatusFelt}
                  valgtSvar={hentValgtSvar(spørsmål, søknad.sivilstatus)}
                />
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
