import React, { FC } from 'react';
import { IBarn } from '../../../models/steg/barn';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
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
        <FeltGruppe>
          <Element>{navn?.label}</Element>
          <Normaltekst>{navn.verdi}</Normaltekst>
        </FeltGruppe>
      )}

      {ident && ident.verdi !== '' && (
        <FeltGruppe>
          <Element>{ident?.label}</Element>
          <Normaltekst>{ident.verdi}</Normaltekst>
        </FeltGruppe>
      )}

      {alder && (
        <FeltGruppe>
          <Element>{alder.label}</Element>
          <Normaltekst>{alder.verdi}</Normaltekst>
        </FeltGruppe>
      )}

      {fødselsdato.verdi !== '' && (
        <FeltGruppe>
          <Element>{fødselsdato.label}</Element>
          <Normaltekst>{fødselsdato.verdi}</Normaltekst>
        </FeltGruppe>
      )}

      {født && lagtTil && (
        <FeltGruppe>
          <Element>{født?.label}</Element>
          <Normaltekst>{verdiTilTekstsvar(født.verdi)}</Normaltekst>
        </FeltGruppe>
      )}

      {stønadstype === Stønadstype.barnetilsyn && skalHaBarnepass && (
        <FeltGruppe>
          <Element>{skalHaBarnepass?.label}</Element>
          <Normaltekst>
            {verdiTilTekstsvar(skalHaBarnepass?.verdi, intl)}
          </Normaltekst>
        </FeltGruppe>
      )}

      {harSammeAdresse && (
        <FeltGruppe>
          <Element>{harSammeAdresse.label}</Element>
          <Normaltekst>{verdiTilTekstsvar(harSammeAdresse.verdi)}</Normaltekst>
        </FeltGruppe>
      )}
    </>
  );
};

export default OppsummeringBarn;
