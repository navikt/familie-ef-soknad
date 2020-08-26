import React, { useEffect, useState } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import IdentEllerFødselsdatoGruppe from '../../../components/gruppe/IdentEllerFødselsdatoGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { ESvar, ESvarTekstid } from '../../../models/felles/spørsmålogsvar';
import { FormattedMessage } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import { useIntl } from 'react-intl';

interface Props {
  navn?: string;
  ident?: string;
  settNavn: Function;
  settIdent: (ident: string) => void;
  settBo: Function;
  settBoHosDeg: (boHosDeg: string) => void;
  boHosDeg: string;
  settDato: (dato: Date | null) => void;
  barnDato: Date | undefined;
  kjennerIkkeIdent: boolean;
  settKjennerIkkeIdent: (kjennerIkkeIdent: boolean) => void;
}

const LeggTilBarnFødt: React.FC<Props> = ({
  navn,
  ident,
  settNavn,
  settIdent,
  settBo,
  boHosDeg,
  settBoHosDeg,
  settDato,
  barnDato,
  kjennerIkkeIdent,
  settKjennerIkkeIdent,
}) => {
  const intl = useIntl();
  const [erGyldigIdent, settGyldigIdent] = useState<boolean>(!!ident);
  const [identFelt, settIdentFelt] = useState<string>(ident ? ident : '');

  useEffect(() => {
    erGyldigIdent && settIdent(identFelt);
    // eslint-disable-next-line
  }, [erGyldigIdent, identFelt]);

  const hvisGyldigIdentSettIdent = (erGyldig: boolean) => {
    settGyldigIdent(erGyldig);
  };

  const oppdaterIdent = (e: React.FormEvent<HTMLInputElement>) => {
    settIdentFelt(e.currentTarget.value);
  };

  const settChecked = (checked: boolean) => {
    if (checked) {
      settIdent('');
      settIdentFelt('');
    }
    if (!checked && barnDato) {
      settDato(null);
    }

    settBoHosDeg('');
    settKjennerIkkeIdent(checked);
  };

  return (
    <>
      <KomponentGruppe>
        <Input
          className="inputfelt-tekst-fetskrift"
          onChange={(e) => settNavn(e.target.value)}
          value={navn}
          label="Barnets fulle navn, om dette er bestemt"
        />
      </KomponentGruppe>

      <KomponentGruppe>
        <IdentEllerFødselsdatoGruppe
          identLabel={hentTekst('person.ident.visning', intl)}
          datoLabel={hentTekst('datovelger.fødselsdato', intl)}
          checkboxLabel={hentTekst('barn.checkbox.ident', intl)}
          ident={identFelt && !kjennerIkkeIdent ? identFelt : ''}
          fødselsdato={barnDato ? barnDato : undefined}
          checked={kjennerIkkeIdent}
          erGyldigIdent={erGyldigIdent}
          settGyldigIdent={hvisGyldigIdentSettIdent}
          settFødselsdato={settDato}
          settChecked={settChecked}
          settIdent={oppdaterIdent}
          fetSkrift={true}
        />
      </KomponentGruppe>

      {(barnDato || (ident && erGyldigIdent)) && (
        <KomponentGruppe>
          <Normaltekst className="label-normaltekst">
            {intl.formatMessage({ id: 'barnadine.spm.borBarnHosDeg' })}
          </Normaltekst>
          <div className="radiogruppe-2-svar">
            <RadioPanel
              key={ESvar.JA}
              name={'radio-bosted'}
              label={hentTekst(ESvarTekstid.JA, intl)}
              value={ESvar.JA}
              checked={boHosDeg === ESvar.JA}
              onChange={(e) => settBo(e)}
            />
            <RadioPanel
              key={ESvar.NEI}
              name={'radio-bosted'}
              label={hentTekst(ESvarTekstid.NEI, intl)}
              value={ESvar.NEI}
              checked={boHosDeg === ESvar.NEI}
              onChange={(e) => settBo(e)}
            />
          </div>

          {boHosDeg === ESvar.NEI && (
            <AlertStripe type="advarsel" form="inline" className="bor-ikke">
              <FormattedMessage id="barnadine.advarsel.borikke" />
            </AlertStripe>
          )}
        </KomponentGruppe>
      )}
    </>
  );
};

export default LeggTilBarnFødt;
