import React, { FC } from 'react';
import { IBarn } from '../../../models/steg/barn';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { verdiTilTekstsvar } from '../../../utils/visning';
import { useIntl } from 'react-intl';
import LocaleTekst from '../../../language/LocaleTekst';
import { formatDate, strengTilDato } from '../../../utils/dato';

interface Props {
  stønadstype: Stønadstype;
  barn: IBarn;
}

const OppsummeringBarn: FC<Props> = ({ stønadstype, barn }) => {
  const intl = useIntl();
  const {
    alder,
    ident,
    navn,
    født,
    skalHaBarnepass,
    harSammeAdresse,
    lagtTil,
    harAdressesperre,
  } = barn;

  return (
    <>
      {!harAdressesperre && navn && (
        <div className={'spørsmål-og-svar'}>
          <Element tag="h3">
            <LocaleTekst tekst="person.navn" />
          </Element>
          <Normaltekst>{navn.verdi}</Normaltekst>
        </div>
      )}

      {!harAdressesperre && ident && ident.verdi !== '' && (
        <div className={'spørsmål-og-svar'}>
          <Element>
            <LocaleTekst tekst="person.fnr" />
          </Element>
          <Normaltekst>{ident.verdi}</Normaltekst>
        </div>
      )}

      {alder && (
        <div className={'spørsmål-og-svar'}>
          <Element>
            <LocaleTekst tekst="person.alder" />
          </Element>
          <Normaltekst>{alder.verdi}</Normaltekst>
        </div>
      )}

      {født?.verdi && lagtTil && (
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

      {!harAdressesperre && harSammeAdresse && (
        <div className={'spørsmål-og-svar'}>
          <Element>{harSammeAdresse.label}</Element>
          <Normaltekst>{verdiTilTekstsvar(harSammeAdresse.verdi)}</Normaltekst>
        </div>
      )}
    </>
  );
};

export default OppsummeringBarn;
