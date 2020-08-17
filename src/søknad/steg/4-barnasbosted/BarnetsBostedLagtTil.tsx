import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import BarneHeader from '../../../components/BarneHeader';
import { formatDate, strengTilDato } from '../../../utils/dato';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { hentBeskjedMedNavn } from '../../../utils/språk';
import { IBarn } from '../../../models/steg/barn';
import { hentTekst } from '../../../utils/søknad';

interface Props {
  barn: IBarn;
  settAktivIndex: Function;
  index: number;
}

const BarnetsBostedLagtTil: React.FC<Props> = ({
  barn,
  settAktivIndex,
  index,
}) => {
  const forelder = barn.forelder;
  const intl = useIntl();
  const barnetsNavn =
    barn.navn && barn.navn.verdi !== ''
      ? barn.navn.verdi
      : hentTekst('barnet.litenForBokstav', intl);
  if (!forelder) return null;

  const endreInformasjon = () => {
    settAktivIndex(index);
  };

  return (
    <div className="barnas-bosted-lagt-til">
      <BarneHeader barn={barn} visBakgrunn={true} />
      <div className="barnas-bosted-lagt-til__svar">
        {(forelder.navn || forelder.kanIkkeOppgiAnnenForelderFar) && (
          <div className="spørsmål-og-svar">
            <Element>
              {barnetsNavn}
              {intl.formatMessage({ id: 'barnasbosted.element.andreforelder' })}
            </Element>
            <Normaltekst>
              {forelder.navn?.verdi
                ? forelder.navn.verdi
                : hentTekst('barnasbosted.kanikkeoppgiforelder', intl)}
            </Normaltekst>
          </div>
        )}
        {forelder.hvorforIkkeOppgi && (
          <div className="spørsmål-og-svar">
            <Element>
              {hentBeskjedMedNavn(
                barnetsNavn,
                intl.formatMessage({ id: 'barnasbosted.spm.hvorforikkeoppgi' })
              )}
            </Element>
            <Normaltekst>
              {forelder.ikkeOppgittAnnenForelderBegrunnelse
                ? forelder.ikkeOppgittAnnenForelderBegrunnelse?.verdi
                : hentTekst('barnasbosted.spm.donorbarn', intl)}
            </Normaltekst>
          </div>
        )}
        {forelder.fødselsdato && (
          <div className="spørsmål-og-svar">
            <Element>
              {intl.formatMessage({ id: 'datovelger.fødselsdato' })}
            </Element>
            <Normaltekst>
              {formatDate(strengTilDato(forelder.fødselsdato.verdi))}
            </Normaltekst>
          </div>
        )}
        <div className="spørsmål-og-svar">
          <Element>
            {hentBeskjedMedNavn(
              barnetsNavn,
              intl.formatMessage({ id: 'barnasbosted.borinorge' })
            )}
          </Element>
          <Normaltekst>{forelder.borINorge?.verdi ? 'Ja' : 'Nei'}</Normaltekst>
        </div>
        {forelder.land && (
          <div className="spørsmål-og-svar">
            <Element>
              {intl.formatMessage({ id: 'barnasbosted.hvilketLand' })}
            </Element>
            <Normaltekst>{forelder.land?.verdi}</Normaltekst>
          </div>
        )}
        <div className="spørsmål-og-svar">
          <Element>
            {hentBeskjedMedNavn(
              barnetsNavn,
              intl.formatMessage({ id: 'barnasbosted.avtale' })
            )}
          </Element>
          <Normaltekst>
            {forelder.avtaleOmDeltBosted?.verdi ? 'Ja' : 'Nei'}
          </Normaltekst>
        </div>
        {forelder.harAnnenForelderSamværMedBarn?.verdi && (
          <div className="spørsmål-og-svar">
            <Element>
              {hentBeskjedMedNavn(
                barnetsNavn,
                intl.formatMessage({
                  id: 'barnasbosted.spm.harAnnenForelderSamværMedBarn',
                })
              )}
            </Element>
            <Normaltekst>
              {forelder.harAnnenForelderSamværMedBarn?.verdi || ''}
            </Normaltekst>
          </div>
        )}
        {forelder.harDereSkriftligSamværsavtale?.verdi ? (
          <div className="spørsmål-og-svar">
            <Element>
              {hentBeskjedMedNavn(
                barnetsNavn,
                intl.formatMessage({
                  id: 'barnasbosted.spm.harDereSkriftligSamværsavtale',
                })
              )}
            </Element>
            <Normaltekst>
              {forelder.harDereSkriftligSamværsavtale.verdi}
            </Normaltekst>
          </div>
        ) : null}
        {forelder.hvordanPraktiseresSamværet?.verdi ? (
          <div className="spørsmål-og-svar">
            <Element>
              {intl.formatMessage({ id: 'barnasbosted.element.samvær' })}
            </Element>
            <Normaltekst>
              {forelder.hvordanPraktiseresSamværet.verdi}
            </Normaltekst>
          </div>
        ) : null}
        {forelder.beskrivSamværUtenBarn && (
          <div className="spørsmål-og-svar">
            <Element>
              {hentBeskjedMedNavn(
                barnetsNavn,
                intl.formatMessage({
                  id: 'barnasbosted.spm.beskrivSamværUtenBarn',
                })
              )}
            </Element>
            <Normaltekst>{forelder.beskrivSamværUtenBarn.verdi}</Normaltekst>
          </div>
        )}
        {forelder.borAnnenForelderISammeHus ? (
          <div className="spørsmål-og-svar">
            <Element>
              {hentBeskjedMedNavn(
                barnetsNavn,
                intl.formatMessage({
                  id: 'barnasbosted.spm.borAnnenForelderISammeHus',
                })
              )}
            </Element>
            <Normaltekst>
              {forelder.borAnnenForelderISammeHus.verdi}
            </Normaltekst>
          </div>
        ) : null}
        <LenkeMedIkon
          onClick={endreInformasjon}
          tekst_id="barnasbosted.knapp.endre"
          ikon={endre}
        />
      </div>
    </div>
  );
};

export default BarnetsBostedLagtTil;
