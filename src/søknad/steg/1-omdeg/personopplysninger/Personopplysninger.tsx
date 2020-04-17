import React, { useState } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import SøkerBorIkkePåAdresse from './SøkerBorIkkePåAdresse';
import { borDuPåDenneAdressen } from './PersonopplysningerConfig';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';
import { Input } from 'nav-frontend-skjema';
import { ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import { useIntl } from 'react-intl';
import { usePersonContext } from '../../../../context/PersonContext';
import { useSøknad } from '../../../../context/SøknadContext';

const Personopplysninger: React.FC = () => {
  const intl = useIntl();
  const { person } = usePersonContext();
  const { søker } = person;
  const { søknad, settSøknad } = useSøknad();
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
          <SøkerBorIkkePåAdresse />
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
