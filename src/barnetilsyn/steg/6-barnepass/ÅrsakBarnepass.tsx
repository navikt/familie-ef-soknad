import React, { FC } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import MultiSvarSpørsmålMedNavn from '../../../components/spørsmål/MultiSvarSpørsmålMedNavn';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { hentBarnNavnEllerBarnet } from '../../../utils/barn';
import { IBarn } from '../../../models/barn';
import {
  EÅrsakBarnepass,
  IBarnepass,
  IBarnepassOrdning,
} from '../../models/barnepass';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import { hentUid } from '../../../utils/uuid';
import { årsakBarnepass } from './BarnepassConfig';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';

interface Props {
  barn: IBarn;
  settBarnepass: (barnepass: IBarnepass, barneid: string) => void;
  settDokumentasjonsbehov: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    erHuketAv?: boolean
  ) => void;
}

const ÅrsakBarnepass: FC<Props> = ({
  barn,
  settBarnepass,
  settDokumentasjonsbehov,
}) => {
  const intl = useIntl();
  const { barnepass } = barn;

  const spørsmålTekstMedNavn = hentBarnNavnEllerBarnet(
    barn,
    årsakBarnepass.tekstid,
    intl
  );
  const barnepassordningerListe: IBarnepassOrdning[] = barnepass?.barnepassordninger
    ? barnepass.barnepassordninger
    : [{ id: hentUid() }];

  const valgtÅrsak = barnepass?.årsakBarnepass?.svarid;
  const dokumentasjonsbehovTekst:
    | string
    | undefined = årsakBarnepass.svaralternativer.find(
    (svarsalternativ) => svarsalternativ.id === valgtÅrsak
  )?.alert_tekstid;

  const settÅrsakBarnepass = (spørsmål: ISpørsmål, svar: ISvar) => {
    settBarnepass(
      {
        ...barn.barnepass,
        årsakBarnepass: {
          spørsmålid: spørsmål.søknadid,
          svarid: svar.id,
          label: spørsmålTekstMedNavn,
          verdi: hentTekst(svar.svar_tekstid, intl),
        },
        barnepassordninger: barnepassordningerListe,
      },
      barn.id
    );
    settDokumentasjonsbehov(spørsmål, svar);
  };
  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <AlertStripe type={'advarsel'} form={'inline'}>
          <LocaleTekst tekst={'barnepass.alert-advarsel.årsak'} />
        </AlertStripe>
      </KomponentGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmålMedNavn
          spørsmål={årsakBarnepass}
          spørsmålTekst={spørsmålTekstMedNavn}
          settSpørsmålOgSvar={settÅrsakBarnepass}
          valgtSvar={barnepass?.årsakBarnepass?.verdi}
        />
      </KomponentGruppe>
      <KomponentGruppe>
        {valgtÅrsak === EÅrsakBarnepass.myeBortePgaJobb && (
          <AlertStripe type={'info'} form={'inline'}>
            <LocaleTekst tekst={'barnepass.alert-info.myeBortePgaJobb'} />
          </AlertStripe>
        )}

        {dokumentasjonsbehovTekst && (
          <AlertStripeDokumentasjon>
            <LocaleTekst tekst={dokumentasjonsbehovTekst} />
          </AlertStripeDokumentasjon>
        )}
      </KomponentGruppe>
    </SeksjonGruppe>
  );
};

export default ÅrsakBarnepass;
