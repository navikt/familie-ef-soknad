import React from 'react';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import InputLabelGruppe from '../../../../components/gruppe/InputLabelGruppe';
import { EUtdanning } from '../../../../models/steg/aktivitet/utdanning';
import { hentTekst } from '../../../../utils/søknad';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import { IDetaljertUtdanning } from '../../../../skolepenger/models/detaljertUtdanning';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import styled from 'styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import AlertStripeDokumentasjon from '../../../../components/AlertstripeDokumentasjon';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

interface Props {
  utdanning: IDetaljertUtdanning;
  oppdaterUtdanning: (nøkkel: EUtdanning, label: string, verdi: string) => void;
}

const StyledUndertittel = styled(Undertittel)`
  padding-bottom: 2rem;
`;

const Studiekostnader: React.FC<Props> = ({ utdanning, oppdaterUtdanning }) => {
  const intl = useIntl();

  const settInputFelt = (
    nøkkel: EUtdanning,
    label: string,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    oppdaterUtdanning(nøkkel, label, e.currentTarget.value);
  };

  const semesteravgiftLabel = hentTekst(
    'utdanning.label.utgifter.semesteravgift',
    intl
  );
  const studieavgiftLabel = hentTekst(
    'utdanning.label.utgifter.studieavgift',
    intl
  );
  const eksamensgebyrLabel = hentTekst(
    'utdanning.label.utgifter.eksamensgebyr',
    intl
  );

  return (
    <>
      <KomponentGruppe>
        <StyledUndertittel>
          <LocaleTekst tekst={'utdanning.label.utgifter'} />
        </StyledUndertittel>
        <FeltGruppe>
          <InputLabelGruppe
            label={semesteravgiftLabel}
            nøkkel={EUtdanning.semesteravgift}
            type={'number'}
            bredde={'XS'}
            settInputFelt={(e) =>
              settInputFelt(EUtdanning.semesteravgift, semesteravgiftLabel, e)
            }
            beskrivendeTekst={'kroner'}
            value={
              utdanning?.semesteravgift?.verdi
                ? utdanning?.semesteravgift?.verdi
                : ''
            }
          />
        </FeltGruppe>
        <FeltGruppe>
          <InputLabelGruppe
            label={studieavgiftLabel}
            nøkkel={EUtdanning.studieavgift}
            type={'number'}
            bredde={'XS'}
            settInputFelt={(e) =>
              settInputFelt(EUtdanning.studieavgift, studieavgiftLabel, e)
            }
            beskrivendeTekst={'kroner'}
            value={
              utdanning?.studieavgift?.verdi
                ? utdanning?.studieavgift?.verdi
                : ''
            }
          />
        </FeltGruppe>
        <FeltGruppe>
          <InputLabelGruppe
            label={eksamensgebyrLabel}
            nøkkel={EUtdanning.eksamensgebyr}
            type={'number'}
            bredde={'XS'}
            settInputFelt={(e) =>
              settInputFelt(EUtdanning.eksamensgebyr, eksamensgebyrLabel, e)
            }
            beskrivendeTekst={'kroner'}
            value={
              utdanning?.eksamensgebyr?.verdi
                ? utdanning?.eksamensgebyr?.verdi
                : ''
            }
          />
        </FeltGruppe>
        <FeltGruppe>
          <AlertStripeDokumentasjon>
            {hentTekst('utdanning.andreUtgifter.fakturatekst', intl)}
          </AlertStripeDokumentasjon>
        </FeltGruppe>
        <FeltGruppe>
          <AlertStripeInfo className={'fjernBakgrunn'}>
            <FormattedHTMLMessage id={'utdanning.andreUtgifter.tekst'} />
          </AlertStripeInfo>
        </FeltGruppe>
      </KomponentGruppe>
    </>
  );
};

export default Studiekostnader;
