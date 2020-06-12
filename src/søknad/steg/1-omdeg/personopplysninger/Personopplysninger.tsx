import React, { useEffect, useState } from 'react';
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
import { harSøkerTlfnr, hentSøkersTlfnr } from '../../../../helpers/omdeg';

const Personopplysninger: React.FC = () => {
  const intl = useIntl();
  const { person } = usePersonContext();
  const { søker } = person;
  const { søknad, settSøknad } = useSøknad();
  const { søkerBorPåRegistrertAdresse } = søknad;
  const [feilTelefonnr, settFeilTelefonnr] = useState<boolean>(false);
  const [harTlfnrIFolkeregisteret, settHarTlfnrIFolkeregisteret] = useState<
    boolean
  >(false);

  useEffect(() => {
    harSøkerTlfnr(søknad.person) && settHarTlfnrIFolkeregisteret(true);
    // eslint-disable-next-line
  }, []);

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

  const oppdaterTelefonnr = (e: React.FormEvent<HTMLInputElement>) => {
    const telefonnr = e.currentTarget.value;
    if (telefonnr.length >= 8) {
      settSøknad({
        ...søknad,
        person: {
          ...søknad.person,
          søker: { ...søker, mobiltelefon: telefonnr },
        },
      });
    }
  };

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

      {søkerBorPåRegistrertAdresse?.verdi &&
        (!harTlfnrIFolkeregisteret ? (
          <>
            <Input
              key={'tlf'}
              label={intl.formatMessage({ id: 'person.telefonnr' }).trim()}
              type="tel"
              bredde={'M'}
              onChange={(e) => oppdaterTelefonnr(e)}
              onBlur={(e) => {
                e.currentTarget.value.length >= 8
                  ? settFeilTelefonnr(false)
                  : settFeilTelefonnr(true);
              }}
              feil={
                feilTelefonnr
                  ? intl.formatMessage({
                      id: 'personopplysninger.feilmelding.telefonnr',
                    })
                  : undefined
              }
            />
          </>
        ) : (
          <FeltGruppe>
            <Element>
              <LocaleTekst tekst={'person.telefonnr'} />
            </Element>
            <Normaltekst>{hentSøkersTlfnr(søknad.person)}</Normaltekst>
          </FeltGruppe>
        ))}
    </SeksjonGruppe>
  );
};

export default Personopplysninger;
