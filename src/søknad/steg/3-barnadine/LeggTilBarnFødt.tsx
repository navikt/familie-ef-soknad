import React, { useState } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import IdentEllerFødselsdatoGruppe from '../../../components/gruppe/IdentEllerFødselsdatoGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { datoTilStreng } from '../../../utils/dato';
import { ESvar, ESvarTekstid } from '../../../models/spørsmålogsvar';
import { FormattedMessage } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import { useIntl } from 'react-intl';

interface Props {
  navn?: string;
  fnrEllerDnr?: string;
  settNavn: Function;
  settFnrEllerDnr: (ident: string) => void;
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
  fnrEllerDnr,
  settNavn,
  settFnrEllerDnr,
  settBo,
  boHosDeg,
  settBoHosDeg,
  settDato,
  barnDato,
  kjennerIkkeIdent,
  settKjennerIkkeIdent,
}) => {
  const intl = useIntl();
  const [erGyldigIdent, settGyldigIdent] = useState<boolean>(false);
  const [ident, settIdent] = useState<string>(fnrEllerDnr ? fnrEllerDnr : '');

  const hvisGyldigIdentSettFnrEllerDnr = (erGyldig: boolean) => {
    settGyldigIdent(erGyldig);
    erGyldig && settFnrEllerDnr(ident);
  };

  const oppdaterIdent = (e: React.FormEvent<HTMLInputElement>) => {
    settIdent(e.currentTarget.value);
  };

  const settChecked = (checked: boolean) => {
    if (checked) {
      settFnrEllerDnr('');
      settIdent('');
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
          onChange={(e) => settNavn(e.target.value)}
          value={navn}
          label="Barnets fulle navn, om dette er bestemt"
        />
      </KomponentGruppe>
      {navn && (
        <KomponentGruppe>
          <IdentEllerFødselsdatoGruppe
            identLabel={hentTekst('barn.ident', intl)}
            datoLabel={hentTekst('datovelger.fødselsdato', intl)}
            checkboxLabel={hentTekst('barn.checkbox.ident', intl)}
            ident={ident && !kjennerIkkeIdent ? ident : ''}
            fødselsdato={barnDato ? datoTilStreng(barnDato) : undefined}
            checked={kjennerIkkeIdent}
            erGyldigIdent={erGyldigIdent}
            settGyldigIdent={hvisGyldigIdentSettFnrEllerDnr}
            settFødselsdato={settDato}
            settChecked={settChecked}
            settIdent={oppdaterIdent}
          />
        </KomponentGruppe>
      )}
      {(barnDato || (ident && erGyldigIdent)) && (
        <KomponentGruppe>
          <Normaltekst>
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
