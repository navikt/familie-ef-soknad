import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../../language/LocaleTekst';
import SlettKnapp from '../../../components/knapper/SlettKnapp';
import { IArbeidsgiver } from '../../../models/arbeidssituasjon';
import useSøknadContext from '../../../context/SøknadContext';
import { useIntl } from 'react-intl';
import { hentTittelMedNr } from '../../../language/utils';
import classnames from 'classnames';

interface Props {
  arbeidsgiver: IArbeidsgiver;
  nummer: number;
}

const Arbeidsgiver: React.FC<Props> = ({ arbeidsgiver, nummer }) => {
  const { søknad, settSøknad } = useSøknadContext();
  const { arbeidsforhold } = søknad.arbeidssituasjon;
  const {
    navn,
    arbeidsmengde,
    fastStilling,
    harSluttDato,
    sluttdato,
  } = arbeidsgiver;

  const intl = useIntl();
  const hentTekst = (id: string) => intl.formatMessage({ id: id });

  const arbeidsgiverTittel = hentTittelMedNr(
    arbeidsforhold!,
    nummer,
    intl.formatMessage({ id: 'arbeidsforhold.tittel.arbeidsgiver' })
  );

  const fjernArbeidsgiver = () => {
    // if (perioderBoddIUtlandet && perioderBoddIUtlandet.length > 1) {
    //   const utenlandsopphold = perioderBoddIUtlandet?.filter(
    //     (periode, index) => index !== oppholdsnr
    //   );
    //   settSøknad({
    //     ...søknad,
    //     medlemskap: {
    //       ...søknad.medlemskap,
    //       perioderBoddIUtlandet: utenlandsopphold,
    //     },
    //   });
    // }
  };

  return (
    <>
      <Undertittel>
        <LocaleTekst tekst={'arbeidsforhold.tittel.arbeidsgiver'} />
      </Undertittel>
      <SlettKnapp
        className={classnames('slettknapp', {
          kunEnArbeidsgiver: arbeidsforhold?.length === 1,
        })}
        onClick={() => fjernArbeidsgiver()}
        tekstid={'arbeidsforhold.slett.arbeidsgiver'}
      />
    </>
  );
};

export default Arbeidsgiver;
