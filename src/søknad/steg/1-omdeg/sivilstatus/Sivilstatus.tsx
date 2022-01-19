import React from 'react';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import SøkerErGift from './SøkerErGift';
import Søknadsbegrunnelse from './begrunnelse/SøknadsBegrunnelse';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';
import { hentTekst } from '../../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../../models/felles/spørsmålogsvar';
import { useIntl } from 'react-intl';
import { usePersonContext } from '../../../../context/PersonContext';
import {
  ESivilstatusSøknadid,
  ISivilstatus,
} from '../../../../models/steg/omDeg/sivilstatus';
import SøkerErUgift from './SøkerErUgift';
import {
  erSøkerEnke,
  erSøkerGift,
  erSøkerSeparert,
  erSøkerSkilt,
  erSøkerUgift,
} from '../../../../utils/sivilstatus';
import { IMedlemskap } from '../../../../models/steg/omDeg/medlemskap';

interface Props {
  sivilstatus: ISivilstatus;
  settSivilstatus: (sivilstatus: ISivilstatus) => void;
  settMedlemskap: (medlemskap: IMedlemskap) => void;
  settDokumentasjonsbehov: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    erHuketAv?: boolean
  ) => void;
}

const Sivilstatus: React.FC<Props> = ({
  sivilstatus,
  settSivilstatus,
  settDokumentasjonsbehov,
  settMedlemskap,
}) => {
  const intl = useIntl();
  const { person } = usePersonContext();
  const sivilstand = person.søker.sivilstand;

  const {
    harSøktSeparasjon,
    erUformeltSeparertEllerSkilt,
    erUformeltGift,
    datoFlyttetFraHverandre,
    datoSøktSeparasjon,
  } = sivilstatus;

  const settSivilstatusFelt = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const spørsmålLabel = hentTekst(spørsmål.tekstid, intl);
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);

    const nySivilstatus = {
      ...sivilstatus,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: valgtSvar.id,
        label: spørsmålLabel,
        verdi: svar,
      },
    };
    if (spørsmål.søknadid === ESivilstatusSøknadid.harSøktSeparasjon) {
      datoSøktSeparasjon && delete nySivilstatus.datoSøktSeparasjon;
      datoFlyttetFraHverandre && delete nySivilstatus.datoFlyttetFraHverandre;
    }

    settSivilstatus(nySivilstatus);
    settDokumentasjonsbehov(spørsmål, valgtSvar);
    settMedlemskap({});
  };

  const settDato = (
    date: string,
    objektnøkkel: string,
    tekstid: string
  ): void => {
    settSivilstatus({
      ...sivilstatus,
      [objektnøkkel]: {
        label: intl.formatMessage({ id: tekstid }),
        verdi: date,
      },
    });
  };

  const harFyltUtSeparasjonSomGift =
    harSøktSeparasjon !== undefined
      ? harSøktSeparasjon.verdi
        ? datoSøktSeparasjon?.verdi
        : true
      : false;

  return (
    <SeksjonGruppe aria-live="polite">
      {erSøkerGift(sivilstand) && (
        <SøkerErGift
          settJaNeiFelt={settSivilstatusFelt}
          settDato={settDato}
          sivilstatus={sivilstatus}
        />
      )}
      {erSøkerUgift(sivilstand) && (
        <SøkerErUgift
          erUformeltGift={erUformeltGift}
          settSivilstatusFelt={settSivilstatusFelt}
          sivilstatus={sivilstatus}
        />
      )}

      {(erSøkerUgift(sivilstand) &&
        erUformeltSeparertEllerSkilt?.hasOwnProperty('verdi')) ||
      (erSøkerGift(sivilstand) && harFyltUtSeparasjonSomGift) ||
      erSøkerSeparert(sivilstand) ||
      erSøkerSkilt(sivilstand) ||
      erSøkerEnke(sivilstand) ? (
        <Søknadsbegrunnelse
          sivilstatus={sivilstatus}
          settSivilstatus={settSivilstatus}
          settDato={settDato}
          settDokumentasjonsbehov={settDokumentasjonsbehov}
        />
      ) : null}
    </SeksjonGruppe>
  );
};

export default Sivilstatus;
