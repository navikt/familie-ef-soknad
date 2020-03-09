import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { IBarn } from '../../../models/person';
import BarnasBostedHeader from './BarnasBostedHeader';
import ufødtIkon from '../../../assets/ufodt.svg';
import { formatDate, formatDateFnr, dagensDato } from '../../../utils/dato';
import barn1 from '../../../assets/barn1.svg';
import { format } from 'date-fns';

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
  const intl = useIntl();
  const ikon = barn.ufødt ? ufødtIkon : barn1;

  console.log('LAGT TIL');
  console.log(barn);

  const forelder = barn.forelder;

  if (!forelder) return null;

  const endreInformasjon = () => {
    settAktivIndex(index);
  };

  return (
    <div className="barnas-bosted-lagt-til">
      <BarnasBostedHeader barn={barn} visInfo={false} />
      <div className="barnas-bosted-lagt-til__svar">
        {forelder.navn && (
          <div className="spørsmål-og-svar">
            <Element>{barn.navn}s andre forelder</Element>
            <Normaltekst>{forelder.navn}</Normaltekst>
          </div>
        )}
        {forelder.fødselsdato && (
          <div className="spørsmål-og-svar">
            <Element>Fødselsdato</Element>
            <Normaltekst>{formatDate(forelder.fødselsdato)}</Normaltekst>
          </div>
        )}
        <div className="spørsmål-og-svar">
          <Element>Bor {barn.navn}s andre forelder i Norge?</Element>
          <Normaltekst>{forelder.borINorge ? 'Ja' : 'Nei'}</Normaltekst>
        </div>
        <div className="spørsmål-og-svar">
          <Element>
            Har du og den andre forelderen skriftlig avtaale om delt bosted for{' '}
            {barn.navn}?
          </Element>
          <Normaltekst>
            {forelder.avtaleOmDeltBosted ? 'Ja' : 'Nei'}
          </Normaltekst>
        </div>
        <div className="spørsmål-og-svar">
          <Element>Har den andre forelderen samvær med {barn.navn}?</Element>
          <Normaltekst>{forelder.harAnnenForelderSamværMedBarn}</Normaltekst>
        </div>
        {forelder.harDereSkriftligSamværsavtale ? (
          <div className="spørsmål-og-svar">
            <Element>Har dere skriftlig samværsavtale for {barn.navn}?</Element>
            <Normaltekst>{forelder.harDereSkriftligSamværsavtale}</Normaltekst>
          </div>
        ) : null}
        {forelder.hvordanPraktiseresSamværet ? (
          <div className="spørsmål-og-svar">
            <Element>Hvordan praktiserer dere samværet?</Element>
            <Normaltekst>{forelder.hvordanPraktiseresSamværet}</Normaltekst>
          </div>
        ) : null}
        {forelder.borISammeHus ? (
          <div className="spørsmål-og-svar">
            <Element>
              Bor du og den andre forelderen til Solveig i samme hus, blokk,
              gårdstun, kvartal eller vei/gate?
            </Element>
            <Normaltekst>{forelder.borISammeHus}</Normaltekst>
          </div>
        ) : null}
        <div onClick={endreInformasjon}>Endre informasjon</div>
      </div>
    </div>
  );
};

export default BarnetsBostedLagtTil;
