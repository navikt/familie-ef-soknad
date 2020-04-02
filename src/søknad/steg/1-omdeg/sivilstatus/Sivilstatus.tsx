import React, { useEffect, useState } from 'react';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import SøkerErGift from './SøkerErGift';
import Søknadsbegrunnelse from './begrunnelse/SøknadsBegrunnelse';
import useSøknadContext from '../../../../context/SøknadContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';
import { hentSivilstatus } from '../../../../helpers/omdeg';
import { hentTekst } from '../../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import { useIntl } from 'react-intl';
import { usePersonContext } from '../../../../context/PersonContext';
import {
  erUformeltSeparertEllerSkiltSpørsmål,
  erUformeltGiftSpørsmål,
} from './SivilstatusConfig';
import {
  ESivilstand,
  ISivilstatus,
} from '../../../../models/steg/omDeg/sivilstatus';

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

  const erSøkerGift = sivilstand === ESivilstand.GIFT;
  const erSøkerUgift = sivilstand === ESivilstand.UGIF;
  const erSøkerEnke = sivilstand === ESivilstand.ENKE;
  const erSøkerSeparert = sivilstand === ESivilstand.SEPA;
  const erSøkerSkilt = sivilstand === ESivilstand.SKIL;

  const settSivilstatusFelt = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const spørsmålLabel = hentTekst(spørsmål.tekstid, intl);
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);

    const nySivilstatus = {
      ...sivilstatus,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: valgtSvar.id,
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
      erSøkerSkilt ||
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
