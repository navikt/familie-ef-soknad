import React, { useState } from 'react';
import barn1 from '../../../assets/barn1.svg';
import barn2 from '../../../assets/barn2.svg';
import barn3 from '../../../assets/barn3.svg';
import ufødtIkon from '../../../assets/ufodt.svg';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import LeggTilBarn from './LeggTilBarn';
import { hentTekst } from '../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { IBarn } from '../../../models/steg/barn';
import { formatDate, strengTilDato } from '../../../utils/dato';
import { BodyShort, Heading } from '@navikt/ds-react';
import { ModalWrapper } from '../../../components/Modal/ModalWrapper';
import { SettDokumentasjonsbehovBarn } from '../../../models/søknad/søknad';

interface Props {
  gjeldendeBarn: IBarn;
  velgBarnForDenneSøknaden?: React.ReactNode;
  slettBarn: Function;
  settDokumentasjonsbehovForBarn: SettDokumentasjonsbehovBarn;
  barneListe: IBarn[];
  settBarneListe: (barneListe: IBarn[]) => void;
}

const Barnekort: React.FC<Props> = ({
  gjeldendeBarn,
  velgBarnForDenneSøknaden,
  slettBarn,
  settDokumentasjonsbehovForBarn,
  barneListe,
  settBarneListe,
}) => {
  const intl = useLokalIntlContext();
  const [åpenEndreModal, settÅpenEndreModal] = useState(false);

  const {
    id,
    navn,
    fødselsdato,
    født,
    ident,
    alder,
    lagtTil,
    harSammeAdresse,
    medforelder,
    harAdressesperre,
  } = gjeldendeBarn;

  const formatFnr = (fødselsnummer: string) => {
    return fødselsnummer.substring(0, 6) + ' ' + fødselsnummer.substring(6, 11);
  };

  const ikoner = [barn1, barn2, barn3];
  const ikon = født?.verdi
    ? ikoner[Math.floor(Math.random() * ikoner.length)]
    : ufødtIkon;

  let bosted: string = '';

  if (lagtTil) {
    bosted = født?.verdi
      ? harSammeAdresse.verdi
        ? hentTekst('barnekort.adresse.bor', intl)
        : hentTekst('barnekort.adresse.borIkke', intl)
      : harSammeAdresse.verdi
      ? hentTekst('barnekort.adresse.skalBo', intl)
      : hentTekst('barnekort.adresse.skalIkkeBo', intl);
  } else {
    bosted = harSammeAdresse.verdi
      ? intl.formatMessage({ id: 'barnekort.adresse.registrert' })
      : intl.formatMessage({ id: 'barnekort.adresse.uregistrert' });
  }

  return (
    <div className="barnekort">
      <div className="barnekort__header">
        <img alt="barn" className="barneikon" src={ikon} />
      </div>
      <div className="barnekort__informasjonsboks">
        <div className="informasjonsboks-innhold">
          <Heading size="small" level="3">
            {navn.verdi
              ? navn.verdi
              : intl.formatMessage({ id: 'barnekort.normaltekst.barn' })}
          </Heading>
          {!harAdressesperre && (
            <div className="informasjonselement">
              {ident.verdi ? (
                <>
                  <BodyShort>
                    {intl.formatMessage({ id: 'barnekort.fødselsnummer' })}
                  </BodyShort>
                  <BodyShort>{formatFnr(ident.verdi)}</BodyShort>
                </>
              ) : (
                <>
                  <BodyShort>
                    {født?.verdi
                      ? intl.formatMessage({ id: 'barnekort.fødselsdato' })
                      : intl.formatMessage({ id: 'barnekort.termindato' })}
                  </BodyShort>
                  <BodyShort>
                    {formatDate(strengTilDato(fødselsdato.verdi))}
                  </BodyShort>
                </>
              )}
            </div>
          )}
          <div className="informasjonselement">
            <BodyShort>
              {intl.formatMessage({ id: 'barnekort.alder' })}
            </BodyShort>
            <BodyShort>
              {født?.verdi ? alder.verdi : hentTekst('barnekort.erUfødt', intl)}
              {født?.verdi && ' ' + intl.formatMessage({ id: 'barnekort.år' })}
            </BodyShort>
          </div>
          {!harAdressesperre && (
            <div className="informasjonselement">
              <BodyShort>
                {intl.formatMessage({ id: 'barnekort.bosted' })}
              </BodyShort>
              <BodyShort>{bosted}</BodyShort>
            </div>
          )}
          {medforelder &&
            (medforelder.verdi?.navn || medforelder.verdi?.alder) && (
              <div className="informasjonselement">
                <BodyShort>
                  {intl.formatMessage({ id: 'barnasbosted.forelder.annen' })}
                </BodyShort>
                <BodyShort>
                  {medforelder?.verdi && medforelder?.verdi.navn
                    ? medforelder?.verdi?.navn
                    : medforelder?.verdi?.alder
                    ? `${hentTekst('barnekort.medforelder.hemmelig', intl)}, ${
                        medforelder.verdi.alder
                      }`
                    : null}
                </BodyShort>
              </div>
            )}
          {velgBarnForDenneSøknaden}
          {lagtTil ? (
            <button
              className="barnekort__endre-barnekort lenke"
              onClick={() => settÅpenEndreModal(true)}
            >
              <BodyShort>
                {intl.formatMessage({ id: 'barnekort.lenke.endre' })}
              </BodyShort>
            </button>
          ) : null}
          {lagtTil ? (
            <button
              className="barnekort__endre-barnekort lenke"
              onClick={() => slettBarn(id)}
            >
              <BodyShort>
                {intl.formatMessage({ id: 'barnekort.fjern' })}
              </BodyShort>
            </button>
          ) : null}
        </div>
        <ModalWrapper
          tittel="Endre informasjon om barnet"
          visModal={åpenEndreModal}
          onClose={() => settÅpenEndreModal(false)}
        >
          <div style={{ padding: '2rem 2.5rem' }}>
            <LeggTilBarn
              settÅpenModal={settÅpenEndreModal}
              id={id}
              barneListe={barneListe}
              settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
              settBarneListe={settBarneListe}
            />
          </div>
        </ModalWrapper>
      </div>
    </div>
  );
};

export default Barnekort;
