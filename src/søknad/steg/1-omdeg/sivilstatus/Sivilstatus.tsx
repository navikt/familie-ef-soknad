import React, { useEffect, useState } from 'react';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import Søknadsbegrunnelse from './begrunnelse/SøknadsBegrunnelse';
import SøkerErGift from './SøkerErGift';
import useSøknadContext from '../../../../context/SøknadContext';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentTekst } from '../../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../../models/spørsmalogsvar';
import { usePersonContext } from '../../../../context/PersonContext';
import {
  søkerSeparertEllerSKiltIUtlandetSpørsmål,
  søkerGiftIUtlandetSpørsmål,
} from './SivilstatusConfig';
import { useIntl } from 'react-intl';
import {
  ESivilstand,
  ISivilstatus,
} from '../../../../models/steg/omDeg/sivilstatus';
import { hentSivilstatus } from '../../../../helpers/omdeg';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';

const Sivilstatus: React.FC = () => {
  const intl = useIntl();
  const { person } = usePersonContext();
  const sivilstand = person.søker.sivilstand;

  const { søknad, settSøknad } = useSøknadContext();
  const [sivilstatus, settSivilstatus] = useState<ISivilstatus>({});
  const {
    søkerHarSøktSeparasjon,
    datoSøktSeparasjon,
    datoFlyttetFraHverandre,
    søkerSeparertEllerSkiltIUtlandet,
    søkerGiftIUtlandet,
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
        label: spørsmålLabel,
        verdi: svar,
      },
    };
    if (
      spørsmål.søknadid === 'søkerHarSøktSeparasjon' &&
      søkerHarSøktSeparasjon?.verdi === false &&
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
      erSøkerEnke ||
      erSøkerSkilt ? (
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
