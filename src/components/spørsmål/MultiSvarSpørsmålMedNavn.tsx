import React, { FC } from 'react';
import { ISpørsmål } from '../../models/felles/spørsmålogsvar';
import Hjelpetekst from '../Hjelpetekst';
import { ISvar } from '../../models/felles/spørsmålogsvar';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import styled from 'styled-components/macro';
import classNames from 'classnames';
import Show from '../../utils/showIf';

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
  return (
    <SkjemaGruppe legend={spørsmålTekst}>
      <StyledMultisvarSpørsmål key={spørsmål.søknadid}>
        <Show if={spørsmål.lesmer}>
          <Hjelpetekst
            åpneTekstid={spørsmål.lesmer ? spørsmål.lesmer.åpneTekstid : ''}
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
                onChange={() => settSpørsmålOgSvar(spørsmål, svar)}
              />
            );
          })}
        </div>
      </StyledMultisvarSpørsmål>
    </SkjemaGruppe>
  );
};

export default MultiSvarSpørsmålMedNavn;
