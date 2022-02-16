import React, { FC, useEffect, useState } from 'react';

import DatoForSamlivsbrudd from './DatoForSamlivsbrudd';
import EndringISamvær from './EndringISamvær';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../../../components/spørsmål/MultiSvarSpørsmål';
import NårFlyttetDereFraHverandre from './NårFlyttetDereFraHverandre';
import { BegrunnelseSpørsmål } from '../SivilstatusConfig';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import FeltGruppe from '../../../../../components/gruppe/FeltGruppe';
import { Input } from 'nav-frontend-skjema';
import IdentEllerFødselsdatoGruppe from '../../../../../components/gruppe/IdentEllerFødselsdatoGruppe';
import {
  hentSvarAlertFraSpørsmål,
  hentTekst,
} from '../../../../../utils/søknad';
import {
  EBegrunnelse,
  ISivilstatus,
} from '../../../../../models/steg/omDeg/sivilstatus';
import { ISpørsmål, ISvar } from '../../../../../models/felles/spørsmålogsvar';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import {
  EPersonDetaljer,
  IPersonDetaljer,
} from '../../../../../models/søknad/person';
import LocaleTekst from '../../../../../language/LocaleTekst';
import { harFyltUtSamboerDetaljer } from '../../../../../utils/person';

interface Props {
  sivilstatus: ISivilstatus;
  settSivilstatus: (sivilstatus: ISivilstatus) => void;
  settDato: (date: string, objektnøkkel: string, tekstid: string) => void;
  settDokumentasjonsbehov: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    erHuketAv?: boolean
  ) => void;
}

const Søknadsbegrunnelse: FC<Props> = ({
  sivilstatus,
  settSivilstatus,
  settDato,
  settDokumentasjonsbehov,
}) => {
  const intl = useIntl();
  const spørsmål: ISpørsmål = BegrunnelseSpørsmål(intl);

  const {
    årsakEnslig,
    datoForSamlivsbrudd,
    datoFlyttetFraHverandre,
    datoEndretSamvær,
    tidligereSamboerDetaljer,
  } = sivilstatus;

  const [samboerInfo, settSamboerInfo] = useState<IPersonDetaljer>(
    tidligereSamboerDetaljer
      ? tidligereSamboerDetaljer
      : { kjennerIkkeIdent: false }
  );
  const [erGyldigIdent, settGyldigIdent] = useState<boolean>(
    !!tidligereSamboerDetaljer?.ident?.verdi
  );

  const [ident, settIdent] = useState<string>(
    samboerInfo?.ident ? samboerInfo?.ident.verdi : ''
  );

  useEffect(() => {
    samlivsbruddAndre &&
      settSivilstatus({
        ...sivilstatus,
        tidligereSamboerDetaljer: samboerInfo,
      });
    // eslint-disable-next-line
  }, [samboerInfo]);

  useEffect(() => {
    samlivsbruddAndre &&
      erGyldigIdent &&
      settSamboerInfo({
        ...samboerInfo,
        [EPersonDetaljer.ident]: {
          label: hentTekst('person.ident', intl),
          verdi: ident,
        },
      });
    // eslint-disable-next-line
  }, [erGyldigIdent, ident]);

  const settNavn = (e: React.FormEvent<HTMLInputElement>) => {
    settSamboerInfo({
      ...samboerInfo,
      [EPersonDetaljer.navn]: {
        label: hentTekst('person.navn', intl),
        verdi: e.currentTarget.value,
      },
    });
  };

  const oppdaterIdent = (e: React.FormEvent<HTMLInputElement>) => {
    settIdent(e.currentTarget.value);
  };

  const hvisGyldigIdentSettIdentISamboerDetaljer = (erGyldig: boolean) => {
    settGyldigIdent(erGyldig);
    erGyldig &&
      settSamboerInfo({
        ...samboerInfo,
        [EPersonDetaljer.ident]: {
          label: hentTekst('person.ident', intl),
          verdi: ident,
        },
      });

    if (!erGyldig) {
      delete samboerInfo.ident;
    }
  };

  const settChecked = (checked: boolean) => {
    const endretSamboerInfo = samboerInfo;
    if (checked && endretSamboerInfo.ident?.verdi) {
      delete endretSamboerInfo.ident;
      settIdent('');
    }
    if (!checked && endretSamboerInfo.fødselsdato?.verdi)
      delete endretSamboerInfo.fødselsdato;

    settSamboerInfo({ ...endretSamboerInfo, kjennerIkkeIdent: checked });
  };

  const settFødselsdato = (date: string) => {
    settSamboerInfo({
      ...samboerInfo,
      fødselsdato: {
        label: hentTekst('datovelger.fødselsdato', intl),
        verdi: date,
      },
    });
  };

  const erBegrunnelse = (svaralternativ: EBegrunnelse): boolean => {
    return årsakEnslig?.svarid === svaralternativ;
  };
  const samlivsbruddAndre: boolean = erBegrunnelse(
    EBegrunnelse.samlivsbruddAndre
  );

  const settÅrsakEnslig = (spørsmål: ISpørsmål, svar: ISvar) => {
    const spørsmålTekst: string = hentTekst(spørsmål.tekstid, intl);

    const nyttSivilstatusObjekt = fjernIrrelevanteSøknadsfelter(svar);

    settSivilstatus({
      ...nyttSivilstatusObjekt,
      årsakEnslig: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: spørsmålTekst,
        verdi: svar.svar_tekst,
      },
    });
    settDokumentasjonsbehov(spørsmål, svar);
  };

  if (!samlivsbruddAndre) {
    delete sivilstatus.tidligereSamboerDetaljer;
  }

  const fjernIrrelevanteSøknadsfelter = (svar: ISvar): ISivilstatus => {
    const nySivilStatusObjekt = sivilstatus;
    if (svar.id !== EBegrunnelse.samlivsbruddForeldre && datoForSamlivsbrudd) {
      delete nySivilStatusObjekt.datoForSamlivsbrudd;
    }
    if (svar.id !== EBegrunnelse.samlivsbruddAndre && datoFlyttetFraHverandre) {
      delete nySivilStatusObjekt.datoFlyttetFraHverandre;
    }

    if (svar.id !== EBegrunnelse.endringISamværsordning && datoEndretSamvær) {
      delete nySivilStatusObjekt.datoEndretSamvær;
    }
    return nySivilStatusObjekt;
  };

  const alertTekstForDødsfall = hentSvarAlertFraSpørsmål(
    EBegrunnelse.dødsfall,
    spørsmål
  );

  return (
    <div aria-live="polite">
      <KomponentGruppe>
        <MultiSvarSpørsmål
          key={spørsmål.tekstid}
          spørsmål={spørsmål}
          valgtSvar={sivilstatus.årsakEnslig?.verdi}
          settSpørsmålOgSvar={settÅrsakEnslig}
        />
      </KomponentGruppe>

      {årsakEnslig?.svarid === EBegrunnelse.samlivsbruddForeldre && (
        <DatoForSamlivsbrudd
          settDato={settDato}
          datoForSamlivsbrudd={datoForSamlivsbrudd}
        />
      )}

      {årsakEnslig?.svarid === EBegrunnelse.samlivsbruddAndre && (
        <KomponentGruppe>
          <FeltGruppe>
            <Undertittel tag={'h3'}>
              <LocaleTekst tekst={'sivilstatus.tittel.samlivsbruddAndre'} />
            </Undertittel>
          </FeltGruppe>
          <FeltGruppe>
            <Input
              key={'navn'}
              label={hentTekst('person.navn', intl)}
              type="text"
              bredde={'L'}
              onChange={(e) => settNavn(e)}
              value={samboerInfo?.navn?.verdi}
            />
          </FeltGruppe>
          <FeltGruppe>
            <IdentEllerFødselsdatoGruppe
              identLabel={hentTekst('person.ident', intl)}
              datoLabel={hentTekst('person.fødselsdato', intl)}
              checkboxLabel={hentTekst('person.checkbox.ident', intl)}
              ident={ident && !samboerInfo.kjennerIkkeIdent ? ident : ''}
              fødselsdato={samboerInfo.fødselsdato?.verdi || ''}
              checked={samboerInfo?.kjennerIkkeIdent}
              erGyldigIdent={erGyldigIdent}
              settGyldigIdent={hvisGyldigIdentSettIdentISamboerDetaljer}
              settFødselsdato={settFødselsdato}
              settChecked={settChecked}
              settIdent={oppdaterIdent}
            />
          </FeltGruppe>

          {harFyltUtSamboerDetaljer(samboerInfo, true) && (
            <NårFlyttetDereFraHverandre
              settDato={settDato}
              datoFlyttetFraHverandre={datoFlyttetFraHverandre}
            />
          )}
        </KomponentGruppe>
      )}

      {årsakEnslig?.svarid === EBegrunnelse.endringISamværsordning && (
        <EndringISamvær
          settDato={settDato}
          datoEndretSamvær={datoEndretSamvær}
        />
      )}

      {årsakEnslig?.svarid === EBegrunnelse.dødsfall && (
        <KomponentGruppe>
          <AlertStripeInfo className={'fjernBakgrunn'}>
            <FormattedHTMLMessage id={alertTekstForDødsfall} />
          </AlertStripeInfo>
        </KomponentGruppe>
      )}
    </div>
  );
};

export default Søknadsbegrunnelse;
