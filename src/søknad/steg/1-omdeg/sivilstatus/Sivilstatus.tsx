import React, { useEffect } from 'react';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import Søknadsbegrunnelse from './begrunnelse/SøknadsBegrunnelse';
import SøkerErGift from './SøkerErGift';
import useSøknadContext from '../../../../context/SøknadContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentSivilstatus } from '../../../../utils/søknad';
import { IJaNeiSpørsmål } from '../../../../models/spørsmal';
import { ISivilstatus } from '../../../../models/omDeg';
import { usePersonContext } from '../../../../context/PersonContext';
import {
  søkerSeparertEllerSKiltIUtlandetSpørsmål,
  søkerGiftIUtlandetSpørsmål,
} from './SivilstatusConfig';
import { useIntl } from 'react-intl';

const Sivilstatus: React.FC = () => {
  const intl = useIntl();
  const { person } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();
  const { sivilstatus } = søknad;
  const {
    søkerHarSøktSeparasjon,
    datoSøktSeparasjon,
    søkerSeparertEllerSkiltIUtlandet,
    søkerGiftIUtlandet,
  } = sivilstatus;
  const sivilstand = person.søker.sivilstand;

  const erSøkerGift = person.søker.sivilstand === 'GIFT';
  const erSøkerUgift = sivilstand === 'UGIF';
  const erSøkerEnke = sivilstand === 'ENKE';
  const erSøkerSeparert = sivilstand === 'SEPA';

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
    tekstid: string
  ): void => {
    date !== null &&
      settSøknad({
        ...søknad,
        sivilstatus: {
          ...sivilstatus,
          [objektnøkkel]: {
            label: intl.formatMessage({ id: tekstid }),
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
        <SøkerErGift
          settJaNeiFelt={settSivilstatusFelt}
          settDato={settDato}
          sivilstatusObjekt={sivilstatus}
        />
      ) : erSøkerUgift ? (
        <>
          <KomponentGruppe>
            <JaNeiSpørsmål
              spørsmål={søkerGiftIUtlandetSpørsmål}
              onChange={settSivilstatusFelt}
              valgtSvar={hentValgtSvar(
                søkerGiftIUtlandetSpørsmål,
                søknad.sivilstatus
              )}
            />
          </KomponentGruppe>

          {søkerGiftIUtlandet?.hasOwnProperty('verdi') ? (
            <KomponentGruppe>
              <JaNeiSpørsmål
                spørsmål={søkerSeparertEllerSKiltIUtlandetSpørsmål}
                onChange={settSivilstatusFelt}
                valgtSvar={hentValgtSvar(
                  søkerSeparertEllerSKiltIUtlandetSpørsmål,
                  søknad.sivilstatus
                )}
              />
            </KomponentGruppe>
          ) : null}
        </>
      ) : null}

      {(erSøkerUgift &&
        søkerSeparertEllerSkiltIUtlandet?.hasOwnProperty('verdi')) ||
      erSøkerSeparert ||
      erSøkerEnke ? (
        <Søknadsbegrunnelse settDato={settDato} />
      ) : null}
    </SeksjonGruppe>
  );
};

export default Sivilstatus;
