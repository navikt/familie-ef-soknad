import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import styled from 'styled-components/macro';
import { useIntl } from 'react-intl';
import LocaleTekst from '../language/LocaleTekst';
import { hentTekst } from '../utils/søknad';
import { FormattedHTMLMessage } from 'react-intl';

const StyledHjelpetekst = styled.div`
  .lesMerPanel {
    padding: 0;

    &__toggle {
      justify-content: flex-start;

      @media @mobile {
        padding-left: 0;
      }
    }

    &__togglelink {
      flex-direction: row-reverse;

      .chevron--ned {
        margin-top: 0.2rem;
      }

      .chevron--opp {
        margin-top: 0.3rem;
      }
    }
    &__toggleTekst {
      font-size: 16px;
    }
  }
  &.sentrert {
    .lesMerPanel {
      &__togglelink {
        &--erApen {
          margin: auto;
        }
      }
    }
  }
`;

interface Props {
  className?: string;
  åpneTekstid: string;
  lukkeTekstid?: string;
  innholdTekstid?: string;
  innholdTekst?: string;
  html?: boolean;
}

const Hjelpetekst: React.FC<Props> = ({
  className,
  åpneTekstid,
  lukkeTekstid,
  innholdTekstid,
  innholdTekst,
  html,
}) => {
  const intl = useIntl();

  return (
    <>
      {åpneTekstid === '' ? (
        <Normaltekst>
          {innholdTekst && innholdTekst}
          {!innholdTekst && innholdTekstid && (
            <LocaleTekst tekst={innholdTekstid} />
          )}
        </Normaltekst>
      ) : (
        <StyledHjelpetekst className={className}>
          <Lesmerpanel
            apneTekst={hentTekst(åpneTekstid, intl)}
            lukkTekst={lukkeTekstid ? hentTekst(lukkeTekstid, intl) : undefined}
          >
            <Normaltekst>
              {innholdTekst && innholdTekst}
              {!innholdTekst && innholdTekstid && html && (
                <FormattedHTMLMessage id={innholdTekstid} />
              )}
              {!innholdTekst && innholdTekstid && !html && (
                <LocaleTekst tekst={innholdTekstid} />
              )}
            </Normaltekst>
          </Lesmerpanel>
        </StyledHjelpetekst>
      )}
    </>
  );
};

export default Hjelpetekst;
