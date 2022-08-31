import { FC } from 'react';
import { IBarn } from '../../../models/steg/barn';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { verdiTilTekstsvar } from '../../../utils/visning';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import LocaleTekst from '../../../language/LocaleTekst';
import { BodyShort, Label } from '@navikt/ds-react';

interface Props {
  stønadstype: Stønadstype;
  barn: IBarn;
}

const OppsummeringBarn: FC<Props> = ({ stønadstype, barn }) => {
  const intl = useLokalIntlContext();
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
          <Label>
            <LocaleTekst tekst="person.navn" />
          </Label>
          <BodyShort>{navn.verdi}</BodyShort>
        </div>
      )}

      {!harAdressesperre && ident && ident.verdi !== '' && (
        <div className={'spørsmål-og-svar'}>
          <Label>
            <LocaleTekst tekst="person.fnr" />
          </Label>
          <BodyShort>{ident.verdi}</BodyShort>
        </div>
      )}

      {alder && (
        <div className={'spørsmål-og-svar'}>
          <Label>
            <LocaleTekst tekst="person.alder" />
          </Label>
          <BodyShort>{alder.verdi}</BodyShort>
        </div>
      )}

      {født?.verdi && lagtTil && (
        <div className={'spørsmål-og-svar'}>
          <Label>{født?.label}</Label>
          <BodyShort>{verdiTilTekstsvar(født.verdi)}</BodyShort>
        </div>
      )}

      {stønadstype === Stønadstype.barnetilsyn && skalHaBarnepass && (
        <div className={'spørsmål-og-svar'}>
          <Label>{skalHaBarnepass?.label}</Label>
          <BodyShort>
            {verdiTilTekstsvar(skalHaBarnepass?.verdi, intl)}
          </BodyShort>
        </div>
      )}

      {!harAdressesperre && harSammeAdresse && (
        <div className={'spørsmål-og-svar'}>
          <Label>{harSammeAdresse.label}</Label>
          <BodyShort>{verdiTilTekstsvar(harSammeAdresse.verdi)}</BodyShort>
        </div>
      )}
    </>
  );
};

export default OppsummeringBarn;
