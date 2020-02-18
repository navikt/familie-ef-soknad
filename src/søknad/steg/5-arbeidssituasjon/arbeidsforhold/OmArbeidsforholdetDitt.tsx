import React, { useEffect } from 'react';
import { Element, Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../language/LocaleTekst';
import Arbeidsgiver from './Arbeidsgiver';
import useSøknadContext from '../../../../context/SøknadContext';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import KnappBase from 'nav-frontend-knapper';
import {
  IArbeidsgiver,
  nyttTekstFelt,
} from '../../../../models/arbeidssituasjon';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';

const OmArbeidsforholdetDitt: React.FC = () => {
  const { søknad, settSøknad } = useSøknadContext();
  const { arbeidsforhold } = søknad.arbeidssituasjon;

  const tomArbeidsgiver: IArbeidsgiver = {
    navn: nyttTekstFelt,
    arbeidsmengde: nyttTekstFelt,
  };

  const leggTilArbeidsgiver = () => {
    const nyArbeidsgiver: IArbeidsgiver = tomArbeidsgiver;
    const alleArbeidsgivere = arbeidsforhold;
    alleArbeidsgivere && alleArbeidsgivere.push(nyArbeidsgiver);
    alleArbeidsgivere &&
      settSøknad({
        ...søknad,
        arbeidssituasjon: {
          ...søknad.arbeidssituasjon,
          arbeidsforhold: alleArbeidsgivere,
        },
      });
  };

  useEffect(() => {
    settSøknad({
      ...søknad,
      arbeidssituasjon: {
        ...søknad.arbeidssituasjon,
        arbeidsforhold: [tomArbeidsgiver],
      },
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <KomponentGruppe className={'sentrert'}>
        <Undertittel>
          <LocaleTekst tekst={'arbeidsforhold.tittel'} />
        </Undertittel>
      </KomponentGruppe>
      {arbeidsforhold?.map((arbeidsgiver, index) => {
        return (
          <SeksjonGruppe>
            <Arbeidsgiver arbeidsgiver={arbeidsgiver} nummer={index} />
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
