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
import { ISpørsmål, ISvar } from '../../../../models/felles/spørsmålogsvar';
import { useIntl } from 'react-intl';
import { hentSivilstatus } from '../../../../helpers/steg/omdeg';
import { ISøker } from '../../../../models/søknad/person';
import { ISpørsmålBooleanFelt } from '../../../../models/søknad/søknadsfelter';
import { Stønadstype } from '../../../../models/søknad/stønadstyper';

interface Props {
  søker: ISøker;
  settSøker: (søker: ISøker) => void;
  søkerBorPåRegistrertAdresse?: ISpørsmålBooleanFelt;
  settSøkerBorPåRegistrertAdresse: (
    søkerBorPåRegistrertAdresse: ISpørsmålBooleanFelt
  ) => void;
  stønadstype: Stønadstype;
}
const Personopplysninger: React.FC<Props> = ({
  søker,
  settSøker,
  søkerBorPåRegistrertAdresse,
  settSøkerBorPåRegistrertAdresse,
  stønadstype,
}) => {
  const intl = useIntl();

  const { kontakttelefon } = søker;
  const [feilTelefonnr, settFeilTelefonnr] = useState<boolean>(false);
  const [telefonnummer, settTelefonnummer] = useState<string>(
    kontakttelefon ? kontakttelefon : ''
  );

  useEffect(() => {
    settTelefonnummer(kontakttelefon ? kontakttelefon : '');
  }, [kontakttelefon]);

  const settPersonopplysningerFelt = (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar
  ) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);
    settSøkerBorPåRegistrertAdresse({
      spørsmålid: spørsmål.søknadid,
      svarid: valgtSvar.id,
      label: spørsmål.søknadid,
      verdi: svar,
    });
  };

  const oppdaterTelefonnr = (e: React.FormEvent<HTMLInputElement>) => {
    const telefonnr = e.currentTarget.value;
    settTelefonnummer(telefonnr);
    if (telefonnr.length >= 8 && /^[+\d\s]+$/.test(telefonnr)) {
      settSøker({ ...søker, kontakttelefon: telefonnr });
    } else {
      settSøker({ ...søker, kontakttelefon: '' });
    }
  };

  const oppdaterFeilmelding = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value.length >= 8 &&
    /^[+\d\s]+$/.test(e.currentTarget.value)
      ? settFeilTelefonnr(false)
      : settFeilTelefonnr(true);
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
            <LocaleTekst tekst={'person.ident'} />
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
            <LocaleTekst tekst={'sivilstatus.tittel'} />
          </Element>
          <Normaltekst>{hentSivilstatus(søker.sivilstand)}</Normaltekst>
        </FeltGruppe>

        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'person.adresse'} />
          </Element>
          <Normaltekst>{søker.adresse.adresse}</Normaltekst>
          <Normaltekst>
            {søker.adresse.postnummer} {søker.adresse.poststed}
          </Normaltekst>
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
          <SøkerBorIkkePåAdresse stønadstype={stønadstype} />
        )}
      </KomponentGruppe>

      {søkerBorPåRegistrertAdresse?.verdi && (
        <>
          <Input
            key={'tlf'}
            label={intl.formatMessage({ id: 'person.telefonnr' }).trim()}
            type="tel"
            bredde={'M'}
            onChange={(e) => oppdaterTelefonnr(e)}
            onBlur={(e) => oppdaterFeilmelding(e)}
            className="inputfelt-tekst-fetskrift"
            feil={
              feilTelefonnr
                ? intl.formatMessage({
                    id: 'personopplysninger.feilmelding.telefonnr',
                  })
                : undefined
            }
            value={telefonnummer}
          />
        </>
      )}
    </SeksjonGruppe>
  );
};

export default Personopplysninger;
