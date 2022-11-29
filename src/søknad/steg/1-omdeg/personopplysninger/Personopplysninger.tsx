import React from 'react';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import SøkerBorIkkePåAdresse from './SøkerBorIkkePåAdresse';
import {
  borDuPåDenneAdressen,
  harMeldtFlytteendringSpørsmål,
} from './PersonopplysningerConfig';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';
import { ISpørsmål, ISvar } from '../../../../models/felles/spørsmålogsvar';
import { hentSivilstatus } from '../../../../helpers/steg/omdeg';
import { ISøker } from '../../../../models/søknad/person';
import { ISpørsmålBooleanFelt } from '../../../../models/søknad/søknadsfelter';
import { Stønadstype } from '../../../../models/søknad/stønadstyper';
import { useLokalIntlContext } from '../../../../context/LokalIntlContext';
import { Alert, BodyShort, Label } from '@navikt/ds-react';
import AlertStripeDokumentasjon from '../../../../components/AlertstripeDokumentasjon';
import { hentTekst } from '../../../../utils/søknad';

interface Props {
  søker: ISøker;
  settSøker: (søker: ISøker) => void;
  settDokumentasjonsbehov: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    erHuketAv?: boolean
  ) => void;
  søkerBorPåRegistrertAdresse?: ISpørsmålBooleanFelt;
  settSøkerBorPåRegistrertAdresse: (
    søkerBorPåRegistrertAdresse: ISpørsmålBooleanFelt
  ) => void;
  harMeldtFlytteendring?: ISpørsmålBooleanFelt;
  settHarMeldtFlytteendring: (
    harMeldtFlytteendring: ISpørsmålBooleanFelt
  ) => void;
  stønadstype: Stønadstype;
}

const Personopplysninger: React.FC<Props> = ({
  søker,
  settDokumentasjonsbehov,
  søkerBorPåRegistrertAdresse,
  settSøkerBorPåRegistrertAdresse,
  harMeldtFlytteendring,
  settHarMeldtFlytteendring,
  stønadstype,
}) => {
  const intl = useLokalIntlContext();

  const settPersonopplysningerFelt = (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar
  ) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);
    settSøkerBorPåRegistrertAdresse({
      spørsmålid: spørsmål.søknadid,
      svarid: valgtSvar.id,
      label: hentTekst(spørsmål.tekstid, intl),
      verdi: svar,
    });
  };

  const settMeldtFlytteendring = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);
    settHarMeldtFlytteendring({
      spørsmålid: spørsmål.søknadid,
      svarid: valgtSvar.id,
      label: hentTekst(spørsmål.tekstid, intl),
      verdi: svar,
    });
    settDokumentasjonsbehov(spørsmål, valgtSvar);
  };

  return (
    <SeksjonGruppe aria-live={'polite'}>
      <KomponentGruppe>
        <FeltGruppe>
          <Alert size="small" variant="info" inline>
            <LocaleTekst tekst={'personopplysninger.alert.infohentet'} />
          </Alert>
        </FeltGruppe>

        <FeltGruppe>
          <Label as="p">
            <LocaleTekst tekst={'person.ident.visning'} />
          </Label>
          <BodyShort>{søker.fnr}</BodyShort>
        </FeltGruppe>

        <FeltGruppe>
          <Label as="p">
            <LocaleTekst tekst={'person.statsborgerskap'} />
          </Label>
          <BodyShort>{søker.statsborgerskap}</BodyShort>
        </FeltGruppe>

        <FeltGruppe>
          <Label as="p">
            <LocaleTekst tekst={'sivilstatus.tittel'} />
          </Label>
          <BodyShort>
            <LocaleTekst tekst={hentSivilstatus(søker.sivilstand)} />
          </BodyShort>
        </FeltGruppe>

        <FeltGruppe>
          <Label as="p">
            <LocaleTekst tekst={'person.adresse'} />
          </Label>
          <BodyShort>{søker.adresse.adresse}</BodyShort>
          <BodyShort>
            {søker.adresse.postnummer} {søker.adresse.poststed}
          </BodyShort>
        </FeltGruppe>
      </KomponentGruppe>

      {!søker.erStrengtFortrolig && (
        <>
          <KomponentGruppe aria-live="polite">
            <JaNeiSpørsmål
              spørsmål={borDuPåDenneAdressen(intl)}
              valgtSvar={søkerBorPåRegistrertAdresse?.verdi}
              onChange={settPersonopplysningerFelt}
            />
          </KomponentGruppe>

          {søkerBorPåRegistrertAdresse?.verdi === false && (
            <KomponentGruppe>
              <JaNeiSpørsmål
                spørsmål={harMeldtFlytteendringSpørsmål(intl)}
                valgtSvar={harMeldtFlytteendring?.verdi}
                onChange={settMeldtFlytteendring}
              />
              {harMeldtFlytteendring?.verdi === true && (
                <AlertStripeDokumentasjon>
                  <LocaleTekst
                    tekst={'personopplysninger.alert.meldtFlytteendring'}
                  />
                </AlertStripeDokumentasjon>
              )}
              {harMeldtFlytteendring?.verdi === false && (
                <SøkerBorIkkePåAdresse stønadstype={stønadstype} />
              )}
            </KomponentGruppe>
          )}
        </>
      )}
    </SeksjonGruppe>
  );
};

export default Personopplysninger;
