import React, { useEffect, useState } from 'react';
import Arbeidsgiver from './Arbeidsgiver';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { IAktivitet } from '../../../../models/steg/aktivitet/aktivitet';
import { IArbeidsgiver } from '../../../../models/steg/aktivitet/arbeidsgiver';
import { nyttTekstFelt } from '../../../../helpers/tommeSøknadsfelter';
import { hentUid } from '../../../../utils/uuid';
import { erSisteArbeidsgiverFerdigUtfylt } from '../../../../helpers/steg/aktivitetvalidering';
import LeggTilKnapp from '../../../../components/knapper/LeggTilKnapp';

interface Props {
  arbeidssituasjon: IAktivitet;
  settArbeidssituasjon: (nyArbeidssituasjon: IAktivitet) => void;
}

const tomArbeidsgiver: IArbeidsgiver = {
  id: hentUid(),
  navn: nyttTekstFelt,
  arbeidsmengde: nyttTekstFelt,
};

const OmArbeidsforholdetDitt: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const [arbeidsforhold, settArbeidsforhold] = useState<IArbeidsgiver[]>(
    arbeidssituasjon.arbeidsforhold
      ? arbeidssituasjon.arbeidsforhold
      : [tomArbeidsgiver]
  );

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
          <SeksjonGruppe key={arbeidsgiver.id}>
            <Arbeidsgiver
              arbeidsforhold={arbeidsforhold}
              settArbeidsforhold={settArbeidsforhold}
              arbeidsgivernummer={index}
            />
          </SeksjonGruppe>
        );
      })}

      {erSisteArbeidsgiverFerdigUtfylt(arbeidsforhold) && (
        <KomponentGruppe>
          <FeltGruppe>
            <Element>
              <LocaleTekst tekst={'arbeidsforhold.label.flereArbeidsgivere'} />
            </Element>
          </FeltGruppe>
          <FeltGruppe>
            <LeggTilKnapp onClick={() => leggTilArbeidsgiver()}>
              <LocaleTekst tekst={'arbeidsforhold.knapp.leggTilArbeidsgiver'} />
            </LeggTilKnapp>
          </FeltGruppe>
        </KomponentGruppe>
      )}
    </>
  );
};

export default OmArbeidsforholdetDitt;
