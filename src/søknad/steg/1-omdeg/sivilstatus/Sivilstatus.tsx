import React, { useEffect, useState } from 'react';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import Søknadsbegrunnelse from './begrunnelse/SøknadsBegrunnelse';
import SøkerErGift from './SøkerErGift';
import useSøknadContext from '../../../../context/SøknadContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentSivilstatus, hentTekst } from '../../../../utils/søknad';
import { ISpørsmål } from '../../../../models/spørsmålogsvar';
import { usePersonContext } from '../../../../context/PersonContext';
import {
  erUformeltSeparertEllerSkiltSpørsmål,
  erUformeltGiftSpørsmål,
} from './SivilstatusConfig';
import { useIntl } from 'react-intl';
import { ISivilstatus } from '../../../../models/steg/omDeg/sivilstatus';

const Sivilstatus: React.FC = () => {
  const intl = useIntl();
  const { person } = usePersonContext();
  const sivilstand = person.søker.sivilstand;

  const { søknad, settSøknad } = useSøknadContext();
  const [sivilstatus, settSivilstatus] = useState<ISivilstatus>({});
  const {
    harSøktSeparasjon,
    datoSøktSeparasjon,
    datoFlyttetFraHverandre,
    erUformeltSeparertEllerSkilt,
    erUformeltGift,
  } = sivilstatus;

  useEffect(() => {
    settSøknad({ ...søknad, sivilstatus: sivilstatus });
    // eslint-disable-next-line
  }, [sivilstatus]);

  const erSøkerGift = person.søker.sivilstand === 'GIFT';
  const erSøkerUgift = sivilstand === 'UGIF';
  const erSøkerEnke = sivilstand === 'ENKE';
  const erSøkerSeparert = sivilstand === 'SEPA';

  const settSivilstatusFelt = (spørsmål: ISpørsmål, svar: boolean) => {
    const spørsmålLabel = hentTekst(spørsmål.tekstid, intl);
    const nySivilstatus = {
      ...sivilstatus,
      [spørsmål.søknadid]: {
        label: spørsmålLabel,
        verdi: svar,
      },
    };
    if (
      spørsmål.søknadid === 'harSøktSeparasjon' &&
      harSøktSeparasjon?.verdi === false &&
      datoFlyttetFraHverandre &&
      datoSøktSeparasjon
    ) {
      delete nySivilstatus.datoSøktSeparasjon;
      delete nySivilstatus.datoFlyttetFraHverandre;
    }

    settSivilstatus(nySivilstatus);
  };

  const settDato = (
    date: Date | null,
    objektnøkkel: string,
    tekstid: string
  ): void => {
    date !== null &&
      settSivilstatus({
        ...sivilstatus,
        [objektnøkkel]: {
          label: intl.formatMessage({ id: tekstid }),
          verdi: date,
        },
      });
  };

  const hentValgtSvar = (spørsmål: ISpørsmål, sivilstatus: ISivilstatus) => {
    for (const [key, value] of Object.entries(sivilstatus)) {
      if (key === spørsmål.søknadid && value !== undefined) {
        return value.verdi;
      }
    }
  };

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
          sivilstatus={sivilstatus}
        />
      ) : erSøkerUgift ? (
        <>
          <KomponentGruppe>
            <JaNeiSpørsmål
              spørsmål={erUformeltGiftSpørsmål}
              onChange={settSivilstatusFelt}
              valgtSvar={hentValgtSvar(
                erUformeltGiftSpørsmål,
                søknad.sivilstatus
              )}
            />
          </KomponentGruppe>

          {erUformeltGift?.hasOwnProperty('verdi') ? (
            <KomponentGruppe>
              <JaNeiSpørsmål
                spørsmål={erUformeltSeparertEllerSkiltSpørsmål}
                onChange={settSivilstatusFelt}
                valgtSvar={hentValgtSvar(
                  erUformeltSeparertEllerSkiltSpørsmål,
                  søknad.sivilstatus
                )}
              />
            </KomponentGruppe>
          ) : null}
        </>
      ) : null}

      {(erSøkerUgift &&
        erUformeltSeparertEllerSkilt?.hasOwnProperty('verdi')) ||
      erSøkerSeparert ||
      erSøkerEnke ? (
        <Søknadsbegrunnelse
          sivilstatus={sivilstatus}
          settSivilstatus={settSivilstatus}
          settDato={settDato}
        />
      ) : null}
    </SeksjonGruppe>
  );
};

export default Sivilstatus;
