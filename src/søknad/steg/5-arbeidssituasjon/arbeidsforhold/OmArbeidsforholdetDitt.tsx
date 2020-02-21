import React, { useEffect, useState } from 'react';
import { Element, Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../../language/LocaleTekst';
import Arbeidsgiver from './Arbeidsgiver';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import KnappBase from 'nav-frontend-knapper';
import {
  IArbeidsgiver,
  IArbeidssituasjon,
  nyttTekstFelt,
} from '../../../../models/arbeidssituasjon';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';

interface Props {
  erHuketAv: boolean;
  arbeidssituasjon: IArbeidssituasjon;
  settArbeidssituasjon: (nyArbeidssituasjon: IArbeidssituasjon) => void;
}

const tomArbeidsgiver: IArbeidsgiver = {
  navn: nyttTekstFelt,
  arbeidsmengde: nyttTekstFelt,
};

const OmArbeidsforholdetDitt: React.FC<Props> = ({
  erHuketAv,
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const [arbeidsforhold, settArbeidsforhold] = useState<IArbeidsgiver[]>([
    tomArbeidsgiver,
  ]);

  useEffect(() => {
    erHuketAv &&
      settArbeidssituasjon({
        ...arbeidssituasjon,
        arbeidsforhold: arbeidsforhold,
      });
    // eslint-disable-next-line
  }, [arbeidsforhold]);

  const leggTilArbeidsgiver = () => {
    const nyArbeidsgiver: IArbeidsgiver = tomArbeidsgiver;
    const alleArbeidsgivere = arbeidsforhold;
    alleArbeidsgivere && alleArbeidsgivere.push(nyArbeidsgiver);
    alleArbeidsgivere && settArbeidsforhold(alleArbeidsgivere);
  };

  return (
    <>
      {erHuketAv && (
        <>
          <KomponentGruppe className={'sentrert'}>
            <Undertittel>
              <LocaleTekst tekst={'arbeidsforhold.tittel'} />
            </Undertittel>
          </KomponentGruppe>
          {arbeidsforhold?.map((arbeidsgiver, index) => {
            return (
              <SeksjonGruppe key={index}>
                <Arbeidsgiver
                  arbeidsforhold={arbeidsforhold}
                  settArbeidsforhold={settArbeidsforhold}
                  arbeidsgiver={arbeidsgiver}
                  arbeidsgivernummer={index}
                />
              </SeksjonGruppe>
            );
          })}
          <KomponentGruppe>
            <FeltGruppe>
              <Element>
                <LocaleTekst
                  tekst={'arbeidsforhold.label.flereArbeidsgivere'}
                />
              </Element>
            </FeltGruppe>
            <FeltGruppe>
              <KnappBase
                type={'standard'}
                onClick={() => leggTilArbeidsgiver()}
              >
                <LocaleTekst
                  tekst={'arbeidsforhold.knapp.leggTilArbeidsgiver'}
                />
              </KnappBase>
            </FeltGruppe>
          </KomponentGruppe>
        </>
      )}
    </>
  );
};

export default OmArbeidsforholdetDitt;
