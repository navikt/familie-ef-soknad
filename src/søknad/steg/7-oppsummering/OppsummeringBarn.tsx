import React, { FC } from 'react';
import { IBarn } from '../../../models/steg/barn';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { verdiTilTekstsvar } from '../../../utils/visning';
import { useIntl } from 'react-intl';

interface Props {
  stønadstype: Stønadstype;
  barn: IBarn;
}

const OppsummeringBarn: FC<Props> = ({ stønadstype, barn }) => {
  const intl = useIntl();
  const {
    alder,
    fødselsdato,
    ident,
    navn,
    født,
    skalHaBarnepass,
    harSammeAdresse,
    lagtTil,
  } = barn;

  return (
    <>
      {navn && (
        <div className={'spørsmål-og-svar'}>
          <Element>{navn?.label}</Element>
          <Normaltekst>{navn.verdi}</Normaltekst>
        </div>
      )}

      {ident && ident.verdi !== '' && (
        <div className={'spørsmål-og-svar'}>
          <Element>{ident?.label}</Element>
          <Normaltekst>{ident.verdi}</Normaltekst>
        </div>
      )}

      {alder && (
        <div className={'spørsmål-og-svar'}>
          <Element>{alder.label}</Element>
          <Normaltekst>{alder.verdi}</Normaltekst>
        </div>
      )}

      {fødselsdato.verdi !== '' && (
        <div className={'spørsmål-og-svar'}>
          <Element>{fødselsdato.label}</Element>
          <Normaltekst>{fødselsdato.verdi}</Normaltekst>
        </div>
      )}

      {født && lagtTil && (
        <div className={'spørsmål-og-svar'}>
          <Element>{født?.label}</Element>
          <Normaltekst>{verdiTilTekstsvar(født.verdi)}</Normaltekst>
        </div>
      )}

      {stønadstype === Stønadstype.barnetilsyn && skalHaBarnepass && (
        <div className={'spørsmål-og-svar'}>
          <Element>{skalHaBarnepass?.label}</Element>
          <Normaltekst>
            {verdiTilTekstsvar(skalHaBarnepass?.verdi, intl)}
          </Normaltekst>
        </div>
      )}

      {harSammeAdresse && (
        <div className={'spørsmål-og-svar'}>
          <Element>{harSammeAdresse.label}</Element>
          <Normaltekst>{verdiTilTekstsvar(harSammeAdresse.verdi)}</Normaltekst>
        </div>
      )}
    </>
  );
};

export default OppsummeringBarn;
