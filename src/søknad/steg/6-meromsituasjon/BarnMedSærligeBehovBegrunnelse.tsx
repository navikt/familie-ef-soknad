import { Textarea } from 'nav-frontend-skjema';
import React from 'react';
import { IBarn } from '../../../models/steg/barn';
import { IntlShape, useIntl } from 'react-intl';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentBarnetsNavnEllerBeskrivelse } from '../../../utils/barn';
import { useSøknad } from '../../../context/SøknadContext';

const MAX_LENGDE_BEGRUNDELSE = 1500;

const BarnMedSærligeBehovBegrunnelse = () => {
  const intl = useIntl();
  const { søknad, oppdaterBarnISoknaden } = useSøknad();
  const barnMedSærligeBehov = søknad.person.barn.filter(
    (barn) => barn.særligeTilsynsbehov
  );

  const settBarnSærligBehovBegrunnelse = (
    barnMedSærligeBehovBegrunnelse: IBarn,
    begrunnelse: string
  ) => {
    const indeksBarnSomErHuket = søknad.person.barn.findIndex(
      (barn) => barn.id === barnMedSærligeBehovBegrunnelse.id
    );
    const barnMedSærligeBehov: IBarn = søknad.person.barn[indeksBarnSomErHuket];
    const oppdatertBarn: IBarn = {
      ...barnMedSærligeBehov,
      særligeTilsynsbehov: {
        ...barnMedSærligeBehov.særligeTilsynsbehov!,
        verdi: begrunnelse,
      },
    };
    oppdaterBarnISoknaden(oppdatertBarn, indeksBarnSomErHuket);
  };

  return (
    <>
      {barnMedSærligeBehov.map((barn) => {
        return (
          <div className="blokk-m">
            <Textarea
              onChange={(e) =>
                settBarnSærligBehovBegrunnelse(barn, e.target.value)
              }
              label={<BarnMedSærligeBehovLabelTekst barn={barn} intl={intl} />}
              value={barn.særligeTilsynsbehov?.verdi || ''}
              maxLength={MAX_LENGDE_BEGRUNDELSE}
            />
          </div>
        );
      })}
    </>
  );
};

const BarnMedSærligeBehovLabelTekst: React.FC<{
  barn: IBarn;
  intl: IntlShape;
}> = (props: { barn: IBarn; intl: IntlShape }) => {
  return (
    <>
      <Element className="blokk-xs">
        {`Om ${leggTilGenitiv(props.barn, props.intl)} tilsynsbehov`}
      </Element>
      <Normaltekst>Vi trenger opplysninger om:</Normaltekst>
      <ul>
        <li>hvor mye og hvordan barnet ditt trenger tilsyn</li>
        <li>
          hvordan det påvirker muligheten din til å være i yrkesrettet aktivitet
        </li>
      </ul>
    </>
  );
};

const leggTilGenitiv = (barn: IBarn, intl: IntlShape) => {
  const barnetsNavn = hentBarnetsNavnEllerBeskrivelse(barn, intl);
  return barn.navn.verdi ? `${barnetsNavn}s` : `${barnetsNavn} sitt`;
};

export default BarnMedSærligeBehovBegrunnelse;
