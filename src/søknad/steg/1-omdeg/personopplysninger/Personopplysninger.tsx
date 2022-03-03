import React from 'react';
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
  søkerBorPåRegistrertAdresse,
  settSøkerBorPåRegistrertAdresse,
  stønadstype,
}) => {
  const intl = useIntl();

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

  return (
    <SeksjonGruppe aria-live={'polite'}>
      <KomponentGruppe>
        <FeltGruppe>
          <AlertStripe type={'info'} form={'inline'}>
            <LocaleTekst tekst={'personopplysninger.alert.infohentet'} />
          </AlertStripe>
        </FeltGruppe>

        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'person.ident.visning'} />
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
          <Normaltekst>
            <LocaleTekst tekst={hentSivilstatus(søker.sivilstand)} />
          </Normaltekst>
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

      <KomponentGruppe aria-live="polite">
        <JaNeiSpørsmål
          spørsmål={borDuPåDenneAdressen(intl)}
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
    </SeksjonGruppe>
  );
};

export default Personopplysninger;
