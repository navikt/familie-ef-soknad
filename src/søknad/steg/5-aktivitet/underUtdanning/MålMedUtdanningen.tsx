import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import {
  EUtdanning,
  IUnderUtdanning,
} from '../../../../models/steg/aktivitet/utdanning';
import { Textarea } from 'nav-frontend-skjema';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { hentTekst } from '../../../../utils/søknad';
import { useIntl } from 'react-intl';

import AlertStripeDokumentasjon from '../../../../components/AlertstripeDokumentasjon';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';

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
      <FeltGruppe>
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
      </FeltGruppe>

      <FeltGruppe>
        <AlertStripeDokumentasjon>
          <Element>
            Du må legge ved dokumentasjon på utdanningen du tar eller skal ta
          </Element>
          <Normaltekst>Dokumentasjonen må vise:</Normaltekst>
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
            Får du allerede overgangsstønad og søker om å forlenge
            stønadsperioden fordi du har fått tilbud om studieplass? Da må
            dokumentasjonen også vise datoen du takket ja til tilbudet.
          </Normaltekst>
        </AlertStripeDokumentasjon>
      </FeltGruppe>
    </KomponentGruppe>
  );
};

export default MålMedUtdanningen;
