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
import { injectIntl } from 'react-intl';
import { ISivilstatus } from '../../../../models/omDeg';
import { usePersonContext } from '../../../../context/PersonContext';
import { sivilstatusIUtlandetSpørsmål } from './SivilstatusConfig';

const Sivilstatus: React.FC<any> = ({ intl }) => {
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

      {!erSøkerGift ? <Søknadsbegrunnelse settDato={settDato} /> : null}
    </SeksjonGruppe>
  );
};

export default injectIntl(Sivilstatus);
