import React, { FC } from 'react';
import { ISpørsmål, ISvar } from '../../models/felles/spørsmålogsvar';
import LesMerTekst from '../LesMerTekst';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import styled from 'styled-components/macro';
import classNames from 'classnames';
import Show from '../../utils/showIf';
import { logSpørsmålBesvart } from '../../utils/amplitude';
import { skjemanavnTilId, urlTilSkjemanavn } from '../../utils/skjemanavn';
import { useLokalIntlContext } from '../../context/LokalIntlContext';

const StyledMultisvarSpørsmål = styled.div`
  .radioknapp {
    &__multiSvar {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: min-content;
      grid-gap: 1rem;
      padding-top: 1rem;

      .inputPanel__label  {
        font-size: 18px;
      }
    }
  }

  .toKorteSvar {
    grid-template-columns: 1fr 1fr;

    @media all and (max-width: 420px) {
      grid-template-columns: 1fr;
    }
  }
`;

interface Props {
  toKorteSvar?: boolean;
  spørsmål: ISpørsmål;
  spørsmålTekst: string;
  settSpørsmålOgSvar: (spørsmål: ISpørsmål, svar: ISvar) => void;
  valgtSvar: string | undefined;
}

const MultiSvarSpørsmålMedNavn: FC<Props> = ({
  toKorteSvar,
  spørsmål,
  spørsmålTekst,
  settSpørsmålOgSvar,
  valgtSvar,
}) => {
  const intl = useLokalIntlContext();

  const url = window.location.href;

  const skalLogges = true;

  const skjemanavn = urlTilSkjemanavn(url);
  const skjemaId = skjemanavnTilId(skjemanavn);

  const spørsmålstekstUtenNavn = intl.formatMessage({ id: spørsmål.tekstid });

  return (
    <SkjemaGruppe legend={spørsmålTekst}>
      <StyledMultisvarSpørsmål key={spørsmål.søknadid}>
        <Show if={spørsmål.lesmer}>
          <LesMerTekst
            åpneTekstid={spørsmål.lesmer ? spørsmål.lesmer.headerTekstid : ''}
            innholdTekstid={
              spørsmål.lesmer ? spørsmål.lesmer.innholdTekstid : ''
            }
          />
        </Show>
        <div
          className={classNames('radioknapp__multiSvar', {
            toKorteSvar: toKorteSvar,
          })}
        >
          {spørsmål.svaralternativer.map((svar: ISvar) => {
            const svarISøknad = svar.svar_tekst === valgtSvar;
            return (
              <RadioPanel
                key={svar.svar_tekst}
                name={spørsmål.søknadid}
                label={svar.svar_tekst}
                value={svar.svar_tekst}
                checked={svarISøknad ? svarISøknad : false}
                onChange={() => {
                  logSpørsmålBesvart(
                    skjemanavn,
                    skjemaId,
                    spørsmålstekstUtenNavn,
                    svar.svar_tekst,
                    skalLogges
                  );
                  settSpørsmålOgSvar(spørsmål, svar);
                }}
              />
            );
          })}
        </div>
      </StyledMultisvarSpørsmål>
    </SkjemaGruppe>
  );
};

export default MultiSvarSpørsmålMedNavn;
