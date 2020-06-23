import React, { FC, useState, useEffect } from 'react';

import DatoForSamlivsbrudd from './DatoForSamlivsbrudd';
import EndringISamvær from './EndringISamvær';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../../../components/spørsmål/MultiSvarSpørsmål';
import NårFlyttetDereFraHverandre from './NårFlyttetDereFraHverandre';
import SeksjonGruppe from '../../../../../components/gruppe/SeksjonGruppe';
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
import { ISpørsmål, ISvar } from '../../../../../models/spørsmålogsvar';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { datoTilStreng, strengTilDato } from '../../../../../utils/dato';
import { useSøknad } from '../../../../../context/SøknadContext';
import { EPersonDetaljer, IPersonDetaljer } from '../../../../../models/person';

interface Props {
  sivilstatus: ISivilstatus;
  settSivilstatus: (sivilstatus: ISivilstatus) => void;
  settDato: (date: Date | null, objektnøkkel: string, tekstid: string) => void;
}

const Søknadsbegrunnelse: FC<Props> = ({
  sivilstatus,
  settSivilstatus,
  settDato,
}) => {
  const spørsmål: ISpørsmål = BegrunnelseSpørsmål;
  const intl = useIntl();
  const { settDokumentasjonsbehov } = useSøknad();

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

  const settFødselsdato = (date: Date | null) => {
    date !== null &&
      settSamboerInfo({
        ...samboerInfo,
        fødselsdato: {
          label: hentTekst('datovelger.fødselsdato', intl),
          verdi: datoTilStreng(date),
        },
      });
  };

  const erBegrunnelse = (svaralternativ: EBegrunnelse): boolean => {
    return årsakEnslig?.svarid === svaralternativ;
  };

  const samlivsbruddMedForelder = erBegrunnelse(
    EBegrunnelse.samlivsbruddForeldre
  );
  const samlivsbruddAndre: boolean = erBegrunnelse(
    EBegrunnelse.samlivsbruddAndre
  );
  const endretSamvær: boolean = erBegrunnelse(
    EBegrunnelse.endringISamværsordning
  );
  const dødsfall: boolean = erBegrunnelse(EBegrunnelse.dødsfall);

  const settÅrsakEnslig = (spørsmål: ISpørsmål, svar: ISvar) => {
    const spørsmålTekst: string = hentTekst(spørsmål.tekstid, intl);

    const nyttSivilstatusObjekt = fjernIrrelevanteSøknadsfelter(svar);

    settSivilstatus({
      ...nyttSivilstatusObjekt,
      årsakEnslig: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: spørsmålTekst,
        verdi: hentTekst(svar.svar_tekstid, intl),
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
    <SeksjonGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmål
          key={spørsmål.tekstid}
          spørsmål={spørsmål}
          valgtSvar={sivilstatus.årsakEnslig?.verdi}
          settSpørsmålOgSvar={settÅrsakEnslig}
        />
      </KomponentGruppe>

      {samlivsbruddMedForelder && (
        <>
          <DatoForSamlivsbrudd
            settDato={settDato}
            datoForSamlivsbrudd={datoForSamlivsbrudd}
          />
        </>
      )}

      {samlivsbruddAndre && (
        <KomponentGruppe>
          <FeltGruppe>
            <Undertittel>Om den tidligere samboeren din</Undertittel>
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
              fødselsdato={
                samboerInfo.fødselsdato?.verdi
                  ? strengTilDato(samboerInfo.fødselsdato?.verdi)
                  : undefined
              }
              checked={samboerInfo?.kjennerIkkeIdent}
              erGyldigIdent={erGyldigIdent}
              settGyldigIdent={hvisGyldigIdentSettIdentISamboerDetaljer}
              settFødselsdato={settFødselsdato}
              settChecked={settChecked}
              settIdent={oppdaterIdent}
            />
          </FeltGruppe>
        </KomponentGruppe>
      )}

      {samboerInfo?.navn?.verdi && (
        <NårFlyttetDereFraHverandre
          settDato={settDato}
          datoFlyttetFraHverandre={datoFlyttetFraHverandre}
        />
      )}

      {endretSamvær && (
        <EndringISamvær
          settDato={settDato}
          datoEndretSamvær={datoEndretSamvær}
        />
      )}

      {dødsfall && (
        <KomponentGruppe>
          <AlertStripeInfo className={'fjernBakgrunn'}>
            <FormattedHTMLMessage id={alertTekstForDødsfall} />
          </AlertStripeInfo>
        </KomponentGruppe>
      )}
    </SeksjonGruppe>
  );
};

export default Søknadsbegrunnelse;
