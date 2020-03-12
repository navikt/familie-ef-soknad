import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { IBarn } from '../../../models/person';
import BarnasBostedHeader from './BarnasBostedHeader';
import { formatDate } from '../../../utils/dato';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from './LenkeMedIkon';
import { hentBeskjedMedNavn } from '../../../utils/språk';

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

  if (!forelder) return null;

  const endreInformasjon = () => {
    settAktivIndex(index);
  };

  return (
    <div className="barnas-bosted-lagt-til">
      <BarnasBostedHeader barn={barn} visBakgrunn={true} />
      <div className="barnas-bosted-lagt-til__svar">
        {forelder.navn && (
          <div className="spørsmål-og-svar">
            <Element>
              {hentBeskjedMedNavn(
                barn.navn,
                intl.formatMessage({ id: 'barnasbosted.element.andreforelder' })
              )}
            </Element>
            <Normaltekst>{forelder.navn}</Normaltekst>
          </div>
        )}
        {forelder.fødselsdato && (
          <div className="spørsmål-og-svar">
            <Element>
              {intl.formatMessage({ id: 'datovelger.fødselsdato' })}
            </Element>
            <Normaltekst>{formatDate(forelder.fødselsdato)}</Normaltekst>
          </div>
        )}
        <div className="spørsmål-og-svar">
          <Element>
            {hentBeskjedMedNavn(
              barn.navn,
              intl.formatMessage({ id: 'barnasbosted.spm.andreForelderNorge' })
            )}
          </Element>
          <Normaltekst>{forelder.borINorge ? 'Ja' : 'Nei'}</Normaltekst>
        </div>
        <div className="spørsmål-og-svar">
          <Element>
            {hentBeskjedMedNavn(
              barn.navn,
              intl.formatMessage({ id: 'barnasbosted.avtale' })
            )}
          </Element>
          <Normaltekst>
            {forelder.avtaleOmDeltBosted ? 'Ja' : 'Nei'}
          </Normaltekst>
        </div>
        <div className="spørsmål-og-svar">
          <Element>
            {hentBeskjedMedNavn(
              barn.navn,
              intl.formatMessage({
                id: 'barnasbosted.spm.harAnnenForelderSamværMedBarn',
              })
            )}
          </Element>
          <Normaltekst>{forelder.harAnnenForelderSamværMedBarn}</Normaltekst>
        </div>
        {forelder.harDereSkriftligSamværsavtale ? (
          <div className="spørsmål-og-svar">
            <Element>
              {hentBeskjedMedNavn(
                barn.navn,
                intl.formatMessage({
                  id: 'barnasbosted.spm.harDereSkriftligSamværsavtale',
                })
              )}
            </Element>
            <Normaltekst>{forelder.harDereSkriftligSamværsavtale}</Normaltekst>
          </div>
        ) : null}
        {forelder.hvordanPraktiseresSamværet ? (
          <div className="spørsmål-og-svar">
            <Element>
              {intl.formatMessage({ id: 'barnasbosted.element.samvær' })}
            </Element>
            <Normaltekst>{forelder.hvordanPraktiseresSamværet}</Normaltekst>
          </div>
        ) : null}
        {forelder.borISammeHus ? (
          <div className="spørsmål-og-svar">
            <Element>
              {hentBeskjedMedNavn(
                barn.navn,
                intl.formatMessage({
                  id: 'barnasbosted.spm.borISammeHus',
                })
              )}
            </Element>
            <Normaltekst>{forelder.borISammeHus}</Normaltekst>
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
