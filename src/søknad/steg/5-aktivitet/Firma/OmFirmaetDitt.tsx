import React, { useEffect, useState } from 'react';
import { Feilmelding, Undertittel } from 'nav-frontend-typografi';

import { useIntl } from 'react-intl';
import { Input, Textarea } from 'nav-frontend-skjema';
import Datovelger, {
  DatoBegrensning,
} from '../../../../components/dato/Datovelger';
import InputLabelGruppe from '../../../../components/gruppe/InputLabelGruppe';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import { EFirma, IFirma } from '../../../../models/steg/aktivitet/firma';
import { hentTekst } from '../../../../utils/søknad';
import { hentTittelMedNr } from '../../../../language/utils';
import classnames from 'classnames';
import SlettKnapp from '../../../../components/knapper/SlettKnapp';
import styled from 'styled-components/macro';
import LocaleTekst from '../../../../language/LocaleTekst';
import { erStrengGyldigOrganisasjonsnummer } from '../../../../utils/autentiseringogvalidering/feltvalidering';
import { erDatoGyldigOgInnaforBegrensninger } from '../../../../components/dato/utils';
import TittelOgSlettKnapp from '../../../../components/knapper/TittelOgSlettKnapp';

const StyledFirma = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  firmaer: IFirma[];
  firmanr: number;
  settFirmaer: (firmaer: IFirma[]) => void;
  inkludertArbeidsmengde?: boolean;
}

const OmFirmaetDitt: React.FC<Props> = ({
  firmaer,
  firmanr,
  settFirmaer,
  inkludertArbeidsmengde = true,
}) => {
  const intl = useIntl();
  const firmaFraSøknad = firmaer?.find((firma, index) => index === firmanr);

  const [firma, settFirma] = useState<IFirma>(firmaFraSøknad!);
  const [organisasjonsnummer, settOrganisasjonsnr] = useState<string>(
    firma.organisasjonsnummer?.verdi ? firma.organisasjonsnummer.verdi : ''
  );

  useEffect(() => {
    const endredeFirmaer = firmaer?.map((firmaFraSøknad, index) => {
      return index === firmanr ? firma : firmaFraSøknad;
    });

    settFirmaer(endredeFirmaer);
    // eslint-disable-next-line
  }, [firma]);

  const settDatoFelt = (dato: string): void => {
    dato !== null &&
      settFirma({
        ...firma,
        etableringsdato: {
          label: hentTekst('firma.datovelger.etablering', intl),
          verdi: dato,
        },
      });
  };

  const settArbeidsukeTekst = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    settFirma({
      ...firma,
      arbeidsuke: {
        label: hentTekst('firma.label.arbeidsuke', intl),
        verdi: e.target.value,
      },
    });
  };

  const settInputTekstFelt = (
    e: React.FormEvent<HTMLInputElement>,
    nøkkel: EFirma,
    label: string
  ) => {
    settFirma({
      ...firma,
      [nøkkel]: { label: label, verdi: e.currentTarget.value },
    });
  };

  const fjernFirma = () => {
    if (firmaer && firmaer.length > 1) {
      const oppdaterteFirmaer = firmaer?.filter(
        (arbeidsgiver, index) => index !== firmanr
      );
      settFirmaer(oppdaterteFirmaer);
    }
  };

  const labelArbeidsmengde = hentTekst('firma.label.arbeidsmengde', intl);
  const labelArbeidsuke = hentTekst('firma.label.arbeidsuke', intl);
  const labelOrganisasjonsnr = hentTekst('firma.label.organisasjonnr', intl);
  const labelNavn = hentTekst('firma.label.navn', intl);
  const firmaTittel = hentTittelMedNr(
    firmaer!,
    firmanr,
    intl.formatMessage({ id: 'firma.tittel' })
  );
  const harValgtUgyldigOrganisasjonsnummer =
    organisasjonsnummer !== '' &&
    firma?.organisasjonsnummer?.verdi &&
    !erStrengGyldigOrganisasjonsnummer(firma?.organisasjonsnummer?.verdi);

  return (
    <StyledFirma aria-live="polite">
      <TittelOgSlettKnapp>
        <Undertittel className={'tittel'} tag="h4">
          {firmaTittel}
        </Undertittel>
        <SlettKnapp
          className={classnames('slettknapp', {
            kunEn: firmaer?.length === 1,
          })}
          onClick={() => fjernFirma()}
          tekstid={'firma.knapp.slett'}
        />
      </TittelOgSlettKnapp>
      <FeltGruppe>
        <Input
          label={labelNavn}
          bredde={'L'}
          type={'text'}
          onChange={(e) => settInputTekstFelt(e, EFirma.navn, labelNavn)}
          value={firma?.navn ? firma?.navn.verdi : ''}
        />
      </FeltGruppe>

      {firma.navn?.verdi && (
        <>
          <FeltGruppe>
            <Input
              label={labelOrganisasjonsnr}
              bredde={'L'}
              type={'text'}
              onChange={(e) => settOrganisasjonsnr(e.target.value)}
              onBlur={(e) =>
                settInputTekstFelt(
                  e,
                  EFirma.organisasjonsnummer,
                  labelOrganisasjonsnr
                )
              }
              value={organisasjonsnummer ? organisasjonsnummer : ''}
              feil={harValgtUgyldigOrganisasjonsnummer}
            />
          </FeltGruppe>
          {harValgtUgyldigOrganisasjonsnummer && (
            <FeltGruppe>
              <Feilmelding>
                <LocaleTekst tekst={'firma.feilmelding.organisasjonnr'} />
              </Feilmelding>
            </FeltGruppe>
          )}
        </>
      )}

      {erStrengGyldigOrganisasjonsnummer(firma.organisasjonsnummer?.verdi) && (
        <FeltGruppe>
          <Datovelger
            valgtDato={firma?.etableringsdato?.verdi}
            tekstid={'firma.datovelger.etablering'}
            datobegrensning={DatoBegrensning.TidligereDatoer}
            settDato={(e) => settDatoFelt(e)}
            fetSkrift={true}
          />
        </FeltGruppe>
      )}

      {firma.etableringsdato?.verdi &&
        erDatoGyldigOgInnaforBegrensninger(
          firma.etableringsdato?.verdi,
          DatoBegrensning.TidligereDatoer
        ) &&
        inkludertArbeidsmengde && (
          <FeltGruppe>
            <InputLabelGruppe
              label={labelArbeidsmengde}
              nøkkel={labelArbeidsmengde}
              type={'number'}
              bredde={'XS'}
              settInputFelt={(e) =>
                settInputTekstFelt(e, EFirma.arbeidsmengde, labelArbeidsmengde)
              }
              beskrivendeTekst={'%'}
              value={
                firma?.arbeidsmengde?.verdi ? firma?.arbeidsmengde?.verdi : ''
              }
            />
          </FeltGruppe>
        )}

      {(firma.arbeidsmengde?.verdi ||
        (!inkludertArbeidsmengde && firma.etableringsdato?.verdi)) && (
        <FeltGruppe>
          <Textarea
            key={labelArbeidsuke}
            label={labelArbeidsuke}
            value={firma.arbeidsuke?.verdi ? firma.arbeidsuke?.verdi : ''}
            maxLength={1000}
            onChange={(e) => settArbeidsukeTekst(e)}
          />
        </FeltGruppe>
      )}
    </StyledFirma>
  );
};

export default OmFirmaetDitt;
