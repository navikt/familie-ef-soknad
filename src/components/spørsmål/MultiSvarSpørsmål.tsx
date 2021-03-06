import React, { FC } from 'react';
import { ISpørsmål } from '../../models/felles/spørsmålogsvar';
import Hjelpetekst from '../Hjelpetekst';
import { ISvar } from '../../models/felles/spørsmålogsvar';
import { useIntl } from 'react-intl';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import styled from 'styled-components/macro';
import Show from '../../utils/showIf';
import classNames from 'classnames';
import { logSpørsmålBesvart } from '../../utils/amplitude';
import { urlTilSkjemanavn, skjemanavnTilId } from '../../utils/skjemanavn';

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
  className?: string;
  spørsmål: ISpørsmål;
  settSpørsmålOgSvar: (spørsmål: ISpørsmål, svar: ISvar) => void;
  valgtSvar: string | undefined;
}

const MultiSvarSpørsmål: FC<Props> = ({
  className,
  spørsmål,
  settSpørsmålOgSvar,
  valgtSvar,
}) => {
  const intl = useIntl();

  const url = window.location.href;

  const skjemanavn = urlTilSkjemanavn(url);
  const skjemaId = skjemanavnTilId(skjemanavn);

  const legend = intl.formatMessage({ id: spørsmål.tekstid });

  return (
    <SkjemaGruppe legend={legend}>
      <StyledMultisvarSpørsmål key={spørsmål.søknadid}>
        <Show if={spørsmål.lesmer}>
          <Hjelpetekst
            åpneTekstid={spørsmål.lesmer ? spørsmål.lesmer.åpneTekstid : ''}
            innholdTekstid={
              spørsmål.lesmer ? spørsmål!.lesmer!.innholdTekstid : ''
            }
          />
        </Show>
        <div className={classNames('radioknapp__multiSvar', className)}>
          {spørsmål.svaralternativer.map((svar: ISvar) => {
            const svarISøknad = svar.svar_tekst === valgtSvar;
            return (
              <RadioPanel
                className={`inputPanel__field ${spørsmål.søknadid}-${svar.svar_tekst}`}
                key={svar.svar_tekst}
                name={spørsmål.søknadid}
                label={svar.svar_tekst}
                value={svar.svar_tekst}
                checked={svarISøknad ? svarISøknad : false}
                onChange={() => {
                  logSpørsmålBesvart(
                    skjemanavn,
                    skjemaId,
                    legend,
                    svar.svar_tekst
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

export default MultiSvarSpørsmål;
