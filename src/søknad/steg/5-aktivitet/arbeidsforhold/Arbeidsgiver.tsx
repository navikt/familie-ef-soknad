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
  EStilling,
  IArbeidsgiver,
} from '../../../../models/steg/aktivitet/arbeidsgiver';
import { ISpørsmål, ISvar } from '../../../../models/spørsmalogsvar';

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

  const settSpørsmålOgSvar = (spørsmål: ISpørsmål, svar: ISvar) => {
    if (
      spørsmål.søknadid === EArbeidsgiver.fastStilling &&
      svar.id === EStilling.fast &&
      arbeidsgiver.harSluttDato
    ) {
      delete arbeidsgiver.harSluttDato;
      delete arbeidsgiver.sluttdato;
    }

    arbeidsgiver &&
      settArbeidsgiver({
        ...arbeidsgiver,
        [spørsmål.søknadid]: {
          spørsmålid: spørsmål.søknadid,
          svarid: svar.id,
          label: hentTekst(spørsmål.tekstid, intl),
          verdi: hentTekst(svar.svar_tekstid, intl),
        },
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
    arbeidsgiver &&
      settArbeidsgiver({
        ...arbeidsgiver,
        [nøkkel]: { label: label, verdi: e.currentTarget.value },
      });
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
          settSpørsmålOgSvar={settSpørsmålOgSvar}
          valgtSvar={arbeidsgiver.fastStilling?.verdi}
        />
      </FeltGruppe>
      {arbeidsgiver.fastStilling?.svarid === EStilling.midlertidig && (
        <HarSøkerSluttdato
          arbeidsgiver={arbeidsgiver}
          settArbeidsgiver={settArbeidsgiver}
        />
      )}
    </StyledArbeidsgiver>
  );
};

export default Arbeidsgiver;
