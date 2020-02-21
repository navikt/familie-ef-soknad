import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import SlettKnapp from '../../../../components/knapper/SlettKnapp';
import {
  EArbeidsgiver,
  IArbeidsgiver,
} from '../../../../models/arbeidssituasjon';

import { useIntl } from 'react-intl';
import { hentTittelMedNr } from '../../../../language/utils';
import classnames from 'classnames';
import styled from 'styled-components';
import { Input } from 'nav-frontend-skjema';
import TittelOgSlettKnapp from '../../../../components/TittelOgSlettKnapp';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';

const StyledArbeidsgiver = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  arbeidsforhold: IArbeidsgiver[];
  settArbeidsforhold: (arbeidsforhold: IArbeidsgiver[]) => void;
  arbeidsgiver: IArbeidsgiver;
  arbeidsgivernummer: number;
}

const Arbeidsgiver: React.FC<Props> = ({
  arbeidsforhold,
  settArbeidsforhold,
  arbeidsgiver,
  arbeidsgivernummer,
}) => {
  const intl = useIntl();

  const arbeidsgiverTittel = hentTittelMedNr(
    arbeidsforhold!,
    arbeidsgivernummer,
    intl.formatMessage({ id: 'arbeidsforhold.tittel.arbeidsgiver' })
  );

  const oppdaterArbeidsgiver = (
    objektnøkkel: EArbeidsgiver,
    label: string,
    verdi: any
  ) => {
    const endretArbeidsforhold = arbeidsforhold?.map((arbeidsgiver, index) => {
      if (index === arbeidsgivernummer) {
        return {
          ...arbeidsgiver,
          [objektnøkkel]: { label: label, verdi: verdi },
        };
      } else return arbeidsgiver;
    });
    console.log(endretArbeidsforhold);
    arbeidsforhold && settArbeidsforhold(endretArbeidsforhold);
  };

  const fjernArbeidsgiver = () => {
    if (arbeidsforhold && arbeidsforhold.length > 1) {
      const endretArbeidsforhold = arbeidsforhold?.filter(
        (arbeidsgiver, index) => index !== arbeidsgivernummer
      );
      settArbeidsforhold(endretArbeidsforhold);
    }
  };

  const settTekstFelt = (
    e: React.FormEvent<HTMLInputElement>,
    nøkkel: EArbeidsgiver,
    label: string
  ) => {
    oppdaterArbeidsgiver(nøkkel, label, e.currentTarget.value);
  };

  const hentFeltTekstid = (feltid: EArbeidsgiver) => {
    return intl.formatMessage({ id: 'arbeidsforhold.label.' + feltid }).trim();
  };

  const navnLabel: string = hentFeltTekstid(EArbeidsgiver.navn);
  const arbeidsmengdeLabel: string = hentFeltTekstid(
    EArbeidsgiver.arbeidsmengde
  );

  return (
    <StyledArbeidsgiver>
      <TittelOgSlettKnapp>
        <Undertittel className={'tittel'}>{arbeidsgiverTittel}</Undertittel>
        <SlettKnapp
          className={classnames('slettknapp', {
            kunEn: arbeidsforhold?.length === 1,
          })}
          onClick={() => fjernArbeidsgiver()}
          tekstid={'arbeidsforhold.knapp.slettArbeidsgiver'}
        />
      </TittelOgSlettKnapp>

      <KomponentGruppe>
        <Input
          key={navnLabel}
          label={navnLabel}
          type="text"
          bredde={'L'}
          onChange={(e) => settTekstFelt(e, EArbeidsgiver.navn, navnLabel)}
        />
      </KomponentGruppe>
      <KomponentGruppe>
        <Input
          key={arbeidsmengdeLabel}
          label={arbeidsmengdeLabel}
          type="text"
          bredde={'L'}
          onChange={(e) =>
            settTekstFelt(e, EArbeidsgiver.navn, arbeidsmengdeLabel)
          }
        />
      </KomponentGruppe>
    </StyledArbeidsgiver>
  );
};

export default Arbeidsgiver;
