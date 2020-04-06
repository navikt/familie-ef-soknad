import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import BarnasBostedHeader from './BarnasBostedHeader';
import { formatDate } from '../../../utils/dato';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { hentBeskjedMedNavn } from '../../../utils/språk';
import { IBarn } from '../../../models/barn';

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
                barn.navn.verdi,
                intl.formatMessage({ id: 'barnasbosted.element.andreforelder' })
              )}
            </Element>
            <Normaltekst>{forelder.navn?.verdi}</Normaltekst>
          </div>
        )}
        {forelder.fødselsdato && (
          <div className="spørsmål-og-svar">
            <Element>
              {intl.formatMessage({ id: 'datovelger.fødselsdato' })}
            </Element>
            <Normaltekst>{formatDate(forelder.fødselsdato.verdi)}</Normaltekst>
          </div>
        )}
        <div className="spørsmål-og-svar">
          <Element>
            {hentBeskjedMedNavn(
              barn.navn.verdi,
              intl.formatMessage({ id: 'barnasbosted.spm.andreForelderNorge' })
            )}
          </Element>
          <Normaltekst>{forelder.borINorge?.verdi ? 'Ja' : 'Nei'}</Normaltekst>
        </div>
        <div className="spørsmål-og-svar">
          <Element>
            {hentBeskjedMedNavn(
              barn.navn.verdi,
              intl.formatMessage({ id: 'barnasbosted.avtale' })
            )}
          </Element>
          <Normaltekst>
            {forelder.avtaleOmDeltBosted?.verdi ? 'Ja' : 'Nei'}
          </Normaltekst>
        </div>
        <div className="spørsmål-og-svar">
          <Element>
            {hentBeskjedMedNavn(
              barn.navn.verdi,
              intl.formatMessage({
                id: 'barnasbosted.spm.harAnnenForelderSamværMedBarn',
              })
            )}
          </Element>
          <Normaltekst>
            {forelder.harAnnenForelderSamværMedBarn?.verdi}
          </Normaltekst>
        </div>
        {forelder.harDereSkriftligSamværsavtale?.verdi ? (
          <div className="spørsmål-og-svar">
            <Element>
              {hentBeskjedMedNavn(
                barn.navn.verdi,
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
        {forelder.borISammeHus ? (
          <div className="spørsmål-og-svar">
            <Element>
              {hentBeskjedMedNavn(
                barn.navn.verdi,
                intl.formatMessage({
                  id: 'barnasbosted.spm.borISammeHus',
                })
              )}
            </Element>
            <Normaltekst>{forelder.borISammeHus.verdi}</Normaltekst>
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
