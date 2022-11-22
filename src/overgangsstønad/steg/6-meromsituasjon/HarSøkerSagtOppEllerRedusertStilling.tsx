import React from 'react';
import {
  ESagtOppEllerRedusertStilling,
  IDinSituasjon,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import LocaleTekst from '../../../language/LocaleTekst';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { hentTekst } from '../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { SagtOppEllerRedusertStillingSpm } from '../../../søknad/steg/6-meromsituasjon/SituasjonConfig';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

import subMonths from 'date-fns/subMonths';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import { dagensDato, strengTilDato } from '../../../utils/dato';
import { useSøknad } from '../../../context/SøknadContext';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import { Alert, Textarea } from '@navikt/ds-react';

interface Props {
  dinSituasjon: IDinSituasjon;
  settDinSituasjon: (dinSituasjon: IDinSituasjon) => void;
}

const HarSøkerSagtOppEllerRedusertStilling: React.FC<Props> = ({
  dinSituasjon,
  settDinSituasjon,
}) => {
  const intl = useLokalIntlContext();
  const { settDokumentasjonsbehov } = useSøknad();
  const {
    datoSagtOppEllerRedusertStilling,
    begrunnelseSagtOppEllerRedusertStilling,
    sagtOppEllerRedusertStilling,
  } = dinSituasjon;

  const settSagtOppEllerRedusertStilling = (
    spørsmål: ISpørsmål,
    svar: ISvar
  ) => {
    const valgtSvar = {
      spørsmålid: spørsmål.søknadid,
      svarid: svar.id,
      label: hentTekst(spørsmål.tekstid, intl),
      verdi: svar.svar_tekst,
    };
    if (
      valgtSvarNei &&
      (datoSagtOppEllerRedusertStilling ||
        begrunnelseSagtOppEllerRedusertStilling)
    ) {
      const endretSituasjon = dinSituasjon;
      delete endretSituasjon.datoSagtOppEllerRedusertStilling;
      delete endretSituasjon.begrunnelseSagtOppEllerRedusertStilling;
      settDinSituasjon({
        ...endretSituasjon,
        sagtOppEllerRedusertStilling: valgtSvar,
      });
    } else {
      settDinSituasjon({
        ...dinSituasjon,
        sagtOppEllerRedusertStilling: valgtSvar,
      });
    }
    settDokumentasjonsbehov(spørsmål, svar);
  };

  const settBegrunnelse = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    settDinSituasjon({
      ...dinSituasjon,
      begrunnelseSagtOppEllerRedusertStilling: {
        label: begrunnelseLabel,
        verdi: e.currentTarget.value,
      },
    });
  };

  const settDato = (dato: string): void => {
    settDinSituasjon({
      ...dinSituasjon,
      datoSagtOppEllerRedusertStilling: {
        label: datovelgerLabel,
        verdi: dato,
      },
    });
  };

  const valgtDatoMindreEnn6mndSiden = (valgtDato: Date) => {
    const seksMndSidenDato = subMonths(dagensDato, 6);
    return (
      isAfter(valgtDato, seksMndSidenDato) && isBefore(valgtDato, dagensDato)
    );
  };

  const erSagtOppEllerRedusertStillingValgt = (
    valgtSvar: ESagtOppEllerRedusertStilling
  ) => {
    const tekstid: string = 'dinSituasjon.svar.' + valgtSvar;
    const svarTekst: string = intl.formatMessage({ id: tekstid });
    return sagtOppEllerRedusertStilling?.verdi === svarTekst;
  };

  const hentLabelForSagtOppEllerRedusertStilling = (
    sagtOppLabel: string,
    redusertStillingLabel: string
  ) => {
    if (harSagtOpp) return hentTekst(sagtOppLabel, intl);
    else if (harRedusertStilling) return hentTekst(redusertStillingLabel, intl);
    else return '';
  };

  const harSagtOpp = erSagtOppEllerRedusertStillingValgt(
    ESagtOppEllerRedusertStilling.sagtOpp
  );
  const harRedusertStilling = erSagtOppEllerRedusertStillingValgt(
    ESagtOppEllerRedusertStilling.redusertStilling
  );
  const valgtSvarNei = hentTekst('svar.nei', intl);

  const erValgtDatoMindreEnn6mndSiden =
    datoSagtOppEllerRedusertStilling &&
    valgtDatoMindreEnn6mndSiden(
      strengTilDato(datoSagtOppEllerRedusertStilling.verdi)
    );

  const alertLabel = hentLabelForSagtOppEllerRedusertStilling(
    'dinSituasjon.alert.sagtOpp',
    'dinSituasjon.alert.redusertStilling'
  );
  const begrunnelseLabel = hentLabelForSagtOppEllerRedusertStilling(
    'dinSituasjon.fritekst.sagtOpp',
    'dinSituasjon.fritekst.redusertStilling'
  );
  const datovelgerLabel = hentLabelForSagtOppEllerRedusertStilling(
    'sagtOppEllerRedusertStilling.datovelger.sagtOpp',
    'sagtOppEllerRedusertStilling.datovelger.redusertStilling'
  );

  const valgtDatoMindreEnn6mndSidenAlert =
    hentLabelForSagtOppEllerRedusertStilling(
      'sagtOppEllerRedusertStilling.datovelger-alert.sagtOpp',
      'dinSituasjon.datovelger-alert.redusertStilling'
    );

  return (
    <>
      <MultiSvarSpørsmål
        spørsmål={SagtOppEllerRedusertStillingSpm(intl)}
        settSpørsmålOgSvar={settSagtOppEllerRedusertStilling}
        valgtSvar={sagtOppEllerRedusertStilling?.verdi}
      />
      {(harSagtOpp || harRedusertStilling) && (
        <>
          <KomponentGruppe>
            <AlertStripeDokumentasjon>
              <LocaleTekst tekst={alertLabel} />
            </AlertStripeDokumentasjon>
          </KomponentGruppe>
          <KomponentGruppe>
            <Textarea
              autoComplete={'off'}
              label={begrunnelseLabel}
              value={
                begrunnelseSagtOppEllerRedusertStilling
                  ? begrunnelseSagtOppEllerRedusertStilling.verdi
                  : ''
              }
              maxLength={1000}
              onChange={(e) => settBegrunnelse(e)}
            />
          </KomponentGruppe>
          {begrunnelseSagtOppEllerRedusertStilling && (
            <KomponentGruppe>
              <Datovelger
                valgtDato={datoSagtOppEllerRedusertStilling?.verdi}
                tekstid={datovelgerLabel}
                datobegrensning={DatoBegrensning.TidligereDatoer}
                settDato={settDato}
                fetSkrift={true}
              />
              {erValgtDatoMindreEnn6mndSiden && (
                <Alert size="small" variant="info" inline>
                  <LocaleTekst tekst={valgtDatoMindreEnn6mndSidenAlert} />
                </Alert>
              )}
            </KomponentGruppe>
          )}
        </>
      )}
    </>
  );
};

export default HarSøkerSagtOppEllerRedusertStilling;
