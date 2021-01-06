import { Textarea } from 'nav-frontend-skjema';
import React, { ChangeEvent } from 'react';
import { IBarn } from '../../../models/steg/barn';
import { IntlShape, useIntl } from 'react-intl';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentBarnetsNavnEllerBeskrivelseMedGenetiv } from '../../../utils/barn';
import { useSøknad } from '../../../context/SøknadContext';
import { storeForbokstaver } from '../../../utils/tekst';
import './BarnMedSærligeBehovBegrunnelse.less';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { hentBeskjedMedNavn } from '../../../utils/språk';
import LocaleTekst from '../../../language/LocaleTekst';

const MAX_LENGDE_BEGRUNDELSE = 1500;

const BarnMedSærligeBehovBegrunnelse = () => {
  const intl = useIntl();
  const { søknad, oppdaterBarnISoknaden } = useSøknad();
  const barnMedSærligeBehov = søknad.person.barn.filter(
    (barn) => barn.særligeTilsynsbehov
  );

  const settBarnSærligBehovBegrunnelse = (
    barnMedSærligeBehovBegrunnelse: IBarn
  ) => {
    return (event: ChangeEvent<HTMLTextAreaElement>) => {
      const indeksBarnSomErHuket = søknad.person.barn.findIndex(
        (barn) => barn.id === barnMedSærligeBehovBegrunnelse.id
      );
      const barnMedSærligeBehov: IBarn =
        søknad.person.barn[indeksBarnSomErHuket];
      const oppdatertBarn: IBarn = {
        ...barnMedSærligeBehov,
        særligeTilsynsbehov: {
          ...barnMedSærligeBehov.særligeTilsynsbehov!,
          verdi: event.target.value,
        },
      };
      oppdaterBarnISoknaden(oppdatertBarn);
    };
  };

  return (
    <>
      {barnMedSærligeBehov.map((barn) => {
        const onChange = settBarnSærligBehovBegrunnelse(barn);
        return (
          <KomponentGruppe>
            <Textarea
              onChange={onChange}
              label={<BarnMedSærligeBehovLabelTekst barn={barn} intl={intl} />}
              value={barn.særligeTilsynsbehov!.verdi}
              maxLength={MAX_LENGDE_BEGRUNDELSE}
            />
          </KomponentGruppe>
        );
      })}
    </>
  );
};

const BarnMedSærligeBehovLabelTekst: React.FC<{
  barn: IBarn;
  intl: IntlShape;
}> = (props: { barn: IBarn; intl: IntlShape }) => {
  const barnetsNavn = hentBarnetsNavnEllerBeskrivelseMedGenetiv(
    props.barn,
    props.intl
  );
  const intl = useIntl();
  const navn = props.barn.navn.verdi
    ? storeForbokstaver(barnetsNavn)
    : barnetsNavn;
  const omBarnetsTilsynsbehovLabel = hentBeskjedMedNavn(
    navn,
    intl.formatMessage({ id: 'barnetilsyn.OmBarnetsTilsynsbehov' })
  );

  return (
    <section className="om-barnets-tilsynsbehov" aria-live="polite">
      <Element className="blokk-xs">{omBarnetsTilsynsbehovLabel}</Element>
      <Normaltekst>
        <LocaleTekst
          tekst={'dinSituasjon.alert.harBarnMedSærligeBehov.beskrivelse'}
        />
      </Normaltekst>
    </section>
  );
};

export default BarnMedSærligeBehovBegrunnelse;
