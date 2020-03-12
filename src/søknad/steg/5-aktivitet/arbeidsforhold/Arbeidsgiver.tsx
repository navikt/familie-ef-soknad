import React, { useEffect, useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import SlettKnapp from '../../../../components/knapper/SlettKnapp';
import { useIntl } from 'react-intl';
import { hentTittelMedNr } from '../../../../language/utils';
import classnames from 'classnames';
import styled from 'styled-components';
import { Input } from 'nav-frontend-skjema';
import TittelOgSlettKnapp from '../../../../components/TittelOgSlettKnapp';
import { hvaSlagsStilling } from './ArbeidsgiverConfig';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';
import HarSøkerSluttdato from './HarSøkerSluttdato';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import InputLabelGruppe from '../../../../components/gruppe/InputLabelGruppe';
import { hentTekst } from '../../../../utils/søknad';
import {
  EArbeidsgiver,
  IArbeidsgiver,
} from '../../../../models/steg/aktivitet/arbeidsgiver';
import { ISpørsmål } from '../../../../models/spørsmal';

const StyledArbeidsgiver = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  arbeidsforhold: IArbeidsgiver[];
  settArbeidsforhold: (arbeidsforhold: IArbeidsgiver[]) => void;
  arbeidsgivernummer: number;
}

const Arbeidsgiver: React.FC<Props> = ({
  arbeidsforhold,
  settArbeidsforhold,
  arbeidsgivernummer,
}) => {
  const intl = useIntl();
  const arbeidsgiverFraSøknad = arbeidsforhold?.find((arbeidsgiver, index) => {
    if (index === arbeidsgivernummer) return arbeidsgiver;
  });
  const [arbeidsgiver, settArbeidsgiver] = useState<IArbeidsgiver>(
    arbeidsgiverFraSøknad!
  );

  useEffect(() => {
    const endretArbeidsforhold = arbeidsforhold?.map(
      (arbeidsgiverFraSøknad, index) => {
        if (index === arbeidsgivernummer) return arbeidsgiver;
        else return arbeidsgiverFraSøknad;
      }
    );
    settArbeidsforhold(endretArbeidsforhold);
    // eslint-disable-next-line
  }, [arbeidsgiver]);

  const oppdaterArbeidsgiver = (
    nøkkel: EArbeidsgiver,
    label: string,
    verdi: string
  ) => {
    arbeidsgiver &&
      settArbeidsgiver({
        ...arbeidsgiver,
        [nøkkel]: { label: label, verdi: verdi },
      });
  };

  const fjernArbeidsgiver = () => {
    if (arbeidsforhold && arbeidsforhold.length > 1) {
      const endretArbeidsforhold = arbeidsforhold?.filter(
        (arbeidsgiver, index) => index !== arbeidsgivernummer
      );
      settArbeidsforhold(endretArbeidsforhold);
    }
  };

  const settTekstInputFelt = (
    e: React.FormEvent<HTMLInputElement>,
    nøkkel: EArbeidsgiver,
    label: string
  ) => {
    oppdaterArbeidsgiver(nøkkel, label, e.currentTarget.value);
  };

  const arbeidsgiverTittel = hentTittelMedNr(
    arbeidsforhold!,
    arbeidsgivernummer,
    intl.formatMessage({ id: 'arbeidsforhold.tittel.arbeidsgiver' })
  );
  const navnLabel: string = hentTekst('arbeidsforhold.label.navn', intl);
  const arbeidsmengdeLabel: string = hentTekst(
    'arbeidsforhold.label.arbeidsmengde',
    intl
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
      <FeltGruppe>
        <Input
          key={navnLabel}
          label={navnLabel}
          type="text"
          bredde={'L'}
          onChange={(e) => settTekstInputFelt(e, EArbeidsgiver.navn, navnLabel)}
        />
      </FeltGruppe>
      <FeltGruppe>
        <InputLabelGruppe
          label={arbeidsmengdeLabel}
          nøkkel={EArbeidsgiver.arbeidsmengde}
          type={'number'}
          bredde={'XS'}
          settInputFelt={(e) =>
            settTekstInputFelt(
              e,
              EArbeidsgiver.arbeidsmengde,
              arbeidsmengdeLabel
            )
          }
          beskrivendeTekst={'%'}
        />
      </FeltGruppe>
      <FeltGruppe>
        <MultiSvarSpørsmål
          toKorteSvar={true}
          spørsmål={hvaSlagsStilling}
          settSpørsmålOgSvar={(spørsmål: ISpørsmål, svar: string) =>
            oppdaterArbeidsgiver(
              EArbeidsgiver.fastStilling,
              spørsmål.tekstid,
              svar
            )
          }
          valgtSvar={arbeidsgiver.fastStilling?.verdi}
        />
      </FeltGruppe>
      {arbeidsgiver.fastStilling && (
        <HarSøkerSluttdato
          arbeidsgiver={arbeidsgiver}
          settArbeidsgiver={settArbeidsgiver}
        />
      )}
    </StyledArbeidsgiver>
  );
};

export default Arbeidsgiver;
