import { Textarea } from 'nav-frontend-skjema';
import React, { ChangeEvent } from 'react';
import { IBarn } from '../../../models/steg/barn';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentBarnetsNavnEllerBeskrivelseMedGenetiv } from '../../../utils/barn';
import { useSøknad } from '../../../context/SøknadContext';
import { storeForbokstaver } from '../../../utils/tekst';
import './BarnMedSærligeBehovBegrunnelse.less';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { hentBeskjedMedNavn } from '../../../utils/språk';
import LocaleTekst from '../../../language/LocaleTekst';
import { LokalIntlShape } from '../../../language/typer';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';

const MAX_LENGDE_BEGRUNDELSE = 1500;

const BarnMedSærligeBehovBegrunnelse = () => {
  const intl = useLokalIntlContext();
  const { søknad, oppdaterBarnISoknaden } = useSøknad();
  const barnMedSærligeBehov = søknad.person.barn.filter(
    (barn: IBarn) => barn.særligeTilsynsbehov
  );

  const settBarnSærligBehovBegrunnelse = (
    barnMedSærligeBehovBegrunnelse: IBarn
  ) => {
    return (event: ChangeEvent<HTMLTextAreaElement>) => {
      const indeksBarnSomErHuket = søknad.person.barn.findIndex(
        (barn: IBarn) => barn.id === barnMedSærligeBehovBegrunnelse.id
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
      {barnMedSærligeBehov.map((barn: IBarn) => {
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
  intl: LokalIntlShape;
}> = (props: { barn: IBarn; intl: LokalIntlShape }) => {
  const barnetsNavn = hentBarnetsNavnEllerBeskrivelseMedGenetiv(
    props.barn,
    props.intl
  );
  const intl = useLokalIntlContext();
  const navn = props.barn.navn.verdi
    ? storeForbokstaver(barnetsNavn)
    : barnetsNavn;
  const omBarnetsTilsynsbehovLabel = hentBeskjedMedNavn(
    navn,
    intl.formatMessage({
      id: 'dinSituasjon.alert.harBarnMedSærligeBehov.tittel',
    })
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
