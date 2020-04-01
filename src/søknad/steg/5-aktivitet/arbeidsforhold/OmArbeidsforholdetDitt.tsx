import React, { useEffect, useState } from 'react';
import Arbeidsgiver from './Arbeidsgiver';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import KnappBase from 'nav-frontend-knapper';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { IAktivitet } from '../../../../models/steg/aktivitet/aktivitet';
import { IArbeidsgiver } from '../../../../models/steg/aktivitet/arbeidsgiver';
import { hentUid } from '../../../../utils/uuid';
import { nyttTekstFelt } from '../../../../helpers/tommeSøknadsfelter';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (nyArbeidssituasjon: IAktivitet) => void;
}

const tomArbeidsgiver: IArbeidsgiver = {
  react_key: hentUid(),
  navn: nyttTekstFelt,
  arbeidsmengde: nyttTekstFelt,
};

const OmArbeidsforholdetDitt: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const [arbeidsforhold, settArbeidsforhold] = useState<IArbeidsgiver[]>([
    tomArbeidsgiver,
  ]);

  useEffect(() => {
    settArbeidssituasjon({
      ...arbeidssituasjon,
      arbeidsforhold: arbeidsforhold,
    });
    // eslint-disable-next-line
  }, [arbeidsforhold]);

  const leggTilArbeidsgiver = () => {
    const nyArbeidsgiver: IArbeidsgiver = tomArbeidsgiver;
    const alleArbeidsgivere = arbeidsforhold;
    alleArbeidsgivere.push(nyArbeidsgiver);
    settArbeidssituasjon({
      ...arbeidssituasjon,
      arbeidsforhold: alleArbeidsgivere,
    });
  };

  return (
    <>
      <KomponentGruppe className={'sentrert'}>
        <Undertittel>
          <LocaleTekst tekst={'arbeidsforhold.tittel'} />
        </Undertittel>
      </KomponentGruppe>
      {arbeidssituasjon.arbeidsforhold?.map((arbeidsgiver, index) => {
        return (
          <SeksjonGruppe key={arbeidsgiver.react_key}>
            <Arbeidsgiver
              arbeidsforhold={arbeidsforhold}
              settArbeidsforhold={settArbeidsforhold}
              arbeidsgivernummer={index}
            />
          </SeksjonGruppe>
        );
      })}
      <KomponentGruppe>
        <FeltGruppe>
          <Element>
            <LocaleTekst tekst={'arbeidsforhold.label.flereArbeidsgivere'} />
          </Element>
        </FeltGruppe>
        <FeltGruppe>
          <KnappBase type={'standard'} onClick={() => leggTilArbeidsgiver()}>
            <LocaleTekst tekst={'arbeidsforhold.knapp.leggTilArbeidsgiver'} />
          </KnappBase>
        </FeltGruppe>
      </KomponentGruppe>
    </>
  );
};

export default OmArbeidsforholdetDitt;
