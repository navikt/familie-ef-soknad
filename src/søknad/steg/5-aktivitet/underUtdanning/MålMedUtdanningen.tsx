import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import {
  EUtdanning,
  IUnderUtdanning,
} from '../../../../models/steg/aktivitet/utdanning';
import { Textarea } from 'nav-frontend-skjema';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { hentTekst } from '../../../../utils/søknad';
import { useIntl } from 'react-intl';
import styled from 'styled-components/macro';
import dokumentasjon from '../../../../assets/dokumentasjon.svg';

const StyledDokumentasjonAlert = styled.div`
  .undertittel {
    font-size: 18px;
  }

  .tekstlinje {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .ikon-overskrift {
    margin-top: 2rem;
    margin-bottom: 1rem;

    img {
      display: inline;
      position: relative;
      top: 0.3rem;
    }

    .undertittel {
      display: inline;
    }
  }
`;

interface Props {
  utdanning: IUnderUtdanning;
  oppdaterUtdanning: (nøkkel: EUtdanning, label: string, verdi: string) => void;
}

const MålMedUtdanningen: React.FC<Props> = ({
  utdanning,
  oppdaterUtdanning,
}) => {
  const intl = useIntl();

  const settMålMedUtdanning = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    oppdaterUtdanning(
      EUtdanning.målMedUtdanning,
      målMedUtdanningLabel,
      e.currentTarget.value
    );
  };

  const målMedUtdanningLabel = hentTekst('utdanning.spm.mål', intl);

  return (
    <KomponentGruppe>
      <Textarea
        label={målMedUtdanningLabel}
        value={
          utdanning.målMedUtdanning?.verdi
            ? utdanning.målMedUtdanning?.verdi
            : ''
        }
        maxLength={1000}
        onChange={(e) => settMålMedUtdanning(e)}
      />
      <StyledDokumentasjonAlert>
        <div className="ikon-overskrift">
          <img src={dokumentasjon}></img>{' '}
          <Sidetittel className="undertittel" tag="h4">
            Du må legge ved dokumentasjon på utdanningen du tar eller skal ta
          </Sidetittel>
        </div>
        <Normaltekst>Dokumentasjonen må tydelig vise:</Normaltekst>
        <ul>
          <li>
            <Normaltekst>navn på studiested</Normaltekst>
          </li>
          <li>
            <Normaltekst>navn på studie</Normaltekst>
          </li>
          <li>
            <Normaltekst>hvor mye du skal studere</Normaltekst>
          </li>
          <li>
            <Normaltekst>perioden du skal studere</Normaltekst>
          </li>
        </ul>
        <Normaltekst className="tekstlinje">
          Dokumentasjonen må vise tydelig hvem det gjelder.
        </Normaltekst>
        <Normaltekst>
          Får du allerede overgangsstønad og søker om å forlenge stønadsperioden
          fordi du har fått tilbud om studieplass? Da må dokumentasjonen også
          vise datoen du takket ja til tilbudet.
        </Normaltekst>
      </StyledDokumentasjonAlert>
    </KomponentGruppe>
  );
};

export default MålMedUtdanningen;
