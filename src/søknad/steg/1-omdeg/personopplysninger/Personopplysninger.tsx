import React, { useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../language/LocaleTekst';
import { Input } from 'nav-frontend-skjema';
import { usePersonContext } from '../../../../context/PersonContext';
import useSøknadContext from '../../../../context/SøknadContext';
import { useIntl } from 'react-intl';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import { borDuPåDenneAdressen } from './PersonopplysningerConfig';
import AlertStripe from 'nav-frontend-alertstriper';
import { ISpørsmål, ISvar } from '../../../../models/spørsmalogsvar';
import Lenke from 'nav-frontend-lenker';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';

const Personopplysninger: React.FC = () => {
  const intl = useIntl();
  const { person } = usePersonContext();
  const { søker } = person;
  const { søknad, settSøknad } = useSøknadContext();
  const { søkerBorPåRegistrertAdresse } = søknad;
  const { mobiltelefon, jobbtelefon, privattelefon } = søker;
  const [feilTelefonnr, settFeilTelefonnr] = useState<string | undefined>(
    undefined
  );

  const settPersonopplysningerFelt = (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar
  ) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);

    settSøknad({
      ...søknad,
      søkerBorPåRegistrertAdresse: {
        spørsmålid: spørsmål.søknadid,
        svarid: valgtSvar.id,
        label: spørsmål.søknadid,
        verdi: svar,
      },
    });
  };

  const settTelefonnummer = (e: React.FormEvent<HTMLInputElement>) => {
    const telefonnr = e.currentTarget.value;
    if (telefonnr.length >= 8) {
      settFeilTelefonnr(undefined);

      settSøknad({
        ...søknad,
        person: {
          ...søknad.person,
          søker: { ...søker, mobiltelefon: telefonnr },
        },
      });
    } else {
      settFeilTelefonnr('Feil format');
    }
  };

  const telefonnr =
    mobiltelefon?.trim() !== ''
      ? mobiltelefon
      : privattelefon?.trim() !== ''
      ? privattelefon
      : jobbtelefon?.trim() !== ''
      ? jobbtelefon
      : '';

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <FeltGruppe>
          <AlertStripe type={'info'} form={'inline'}>
            <LocaleTekst tekst={'personopplysninger.alert.infohentet'} />
          </AlertStripe>
        </FeltGruppe>

        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'person.fnr'} />
          </Element>
          <Normaltekst>{søker.fnr}</Normaltekst>
        </FeltGruppe>

        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'person.statsborgerskap'} />
          </Element>
          <Normaltekst>{søker.statsborgerskap}</Normaltekst>
        </FeltGruppe>

        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'person.adresse'} />
          </Element>
          <Normaltekst>{søker.adresse.adresse}</Normaltekst>
        </FeltGruppe>
      </KomponentGruppe>

      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={borDuPåDenneAdressen}
          valgtSvar={
            søkerBorPåRegistrertAdresse
              ? søkerBorPåRegistrertAdresse.verdi
              : undefined
          }
          onChange={settPersonopplysningerFelt}
        />

        {søkerBorPåRegistrertAdresse?.verdi === false && (
          <>
            <KomponentGruppe>
              <AlertStripe type={'advarsel'} form={'inline'}>
                <LocaleTekst tekst={'personopplysninger.alert.riktigAdresse'} />
              </AlertStripe>
            </KomponentGruppe>
            <KomponentGruppe>
              <FeltGruppe>
                <Element>
                  <LocaleTekst tekst={'personopplysninger.info.endreAdresse'} />
                </Element>
              </FeltGruppe>
              <FeltGruppe>
                <Normaltekst>
                  <Lenke
                    href={
                      'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.01/dokumentinnsending'
                    }
                  >
                    <LocaleTekst tekst={'personopplysninger.lenke.pdfskjema'} />
                  </Lenke>
                </Normaltekst>
              </FeltGruppe>
              <Normaltekst>
                <LocaleTekst tekst={'personopplysninger.info.pdfskjema'} />
              </Normaltekst>
            </KomponentGruppe>
          </>
        )}
      </KomponentGruppe>

      {telefonnr === '' ? (
        <Input
          key={'tlf'}
          label={intl.formatMessage({ id: 'person.telefonnr' }).trim()}
          type="tel"
          bredde={'M'}
          onChange={(e) => settTelefonnummer(e)}
          feil={
            feilTelefonnr !== undefined
              ? { feilmelding: feilTelefonnr }
              : undefined
          }
        />
      ) : (
        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'person.telefonnr'} />
          </Element>
          <Normaltekst>{telefonnr}</Normaltekst>
        </FeltGruppe>
      )}
    </SeksjonGruppe>
  );
};

export default Personopplysninger;
