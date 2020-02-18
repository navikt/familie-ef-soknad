import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import LocaleTekst from '../language/LocaleTekst';

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
`;

interface Props {
  åpneTekstid: string;
  lukkeTekstid?: string;
  innholdTekstid: string;
}

const Hjelpetekst: React.FC<Props> = ({
  åpneTekstid,
  lukkeTekstid,
  innholdTekstid,
}) => {
  const intl = useIntl();
  const hentTekst = (id: string) => intl.formatMessage({ id: id });

  return (
    <StyledHjelpetekst>
      <Lesmerpanel
        apneTekst={hentTekst(åpneTekstid)}
        lukkTekst={lukkeTekstid ? hentTekst(lukkeTekstid) : undefined}
      >
        <Normaltekst>
          <LocaleTekst tekst={innholdTekstid} />
        </Normaltekst>
      </Lesmerpanel>
    </StyledHjelpetekst>
  );
};

export default Hjelpetekst;
