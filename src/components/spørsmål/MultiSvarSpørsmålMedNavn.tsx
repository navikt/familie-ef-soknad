import React, { FC } from 'react';
import { ISpørsmål } from '../../models/spørsmålogsvar';
import Hjelpetekst from '../Hjelpetekst';
import { ISvar } from '../../models/spørsmålogsvar';
import { useIntl } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import styled from 'styled-components/macro';
import classNames from 'classnames';

const StyledMultisvarSpørsmål = styled.div`
  .radioknapp {
    &__multiSvar {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: min-content;
      grid-gap: 1rem;
      padding-top: 1rem;

      .inputPanel__label {
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
  const intl = useIntl();

  return (
    <StyledMultisvarSpørsmål key={spørsmål.søknadid}>
      <Element>{spørsmålTekst}</Element>
      {spørsmål.lesmer ? (
        <Hjelpetekst
          åpneTekstid={spørsmål.lesmer.åpneTekstid}
          innholdTekstid={spørsmål.lesmer.innholdTekstid}
        />
      ) : null}
      <div
        className={classNames('radioknapp__multiSvar', {
          toKorteSvar: toKorteSvar,
        })}
      >
        {spørsmål.svaralternativer.map((svar: ISvar) => {
          const svarISøknad =
            intl.formatMessage({ id: svar.svar_tekstid }) === valgtSvar;
          return (
            <RadioPanel
              key={svar.svar_tekstid}
              name={spørsmål.søknadid}
              label={intl.formatMessage({
                id: svar.svar_tekstid,
              })}
              value={svar.svar_tekstid}
              checked={svarISøknad ? svarISøknad : false}
              onChange={() => settSpørsmålOgSvar(spørsmål, svar)}
            />
          );
        })}
      </div>
    </StyledMultisvarSpørsmål>
  );
};

export default MultiSvarSpørsmålMedNavn;
