import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import SlettKnapp from '../../../../components/knapper/SlettKnapp';
import { IArbeidsgiver } from '../../../../models/arbeidssituasjon';
import useSøknadContext from '../../../../context/SøknadContext';
import { useIntl } from 'react-intl';
import { hentTittelMedNr } from '../../../../language/utils';
import classnames from 'classnames';
import styled from 'styled-components';

interface Props {
  arbeidsgiver: IArbeidsgiver;
  nummer: number;
}

const StyledArbeidsgiver = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: max-content;
  grid-template-areas:
    'tittel slett'
    'spm spm'
    'periodegruppe periodegruppe'
    'fritekst fritekst';

  @media @mobile {
    display: flex;
    flex-direction: column;
  }
  .tittel {
    grid-area: tittel;
  }

  .slettknapp {
    grid-area: slett;
    justify-self: end;
  }
`;

const Arbeidsgiver: React.FC<Props> = ({ arbeidsgiver, nummer }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { arbeidsforhold } = søknad.arbeidssituasjon;

  const intl = useIntl();

  const arbeidsgiverTittel = hentTittelMedNr(
    arbeidsforhold!,
    nummer,
    intl.formatMessage({ id: 'arbeidsforhold.tittel.arbeidsgiver' })
  );

  const fjernArbeidsgiver = () => {
    if (arbeidsforhold && arbeidsforhold.length > 1) {
      const endretArbeidsforhold = arbeidsforhold?.filter(
        (arbeidsgiver, index) => index !== nummer
      );
      settSøknad({
        ...søknad,
        arbeidssituasjon: {
          ...søknad.arbeidssituasjon,
          arbeidsforhold: endretArbeidsforhold,
        },
      });
    }
  };

  return (
    <StyledArbeidsgiver>
      <Undertittel className={'tittel'}>{arbeidsgiverTittel}</Undertittel>
      <SlettKnapp
        className={classnames('slettknapp', {
          kunEn: arbeidsforhold?.length === 1,
        })}
        onClick={() => fjernArbeidsgiver()}
        tekstid={'arbeidsforhold.knapp.slettArbeidsgiver'}
      />
    </StyledArbeidsgiver>
  );
};

export default Arbeidsgiver;
