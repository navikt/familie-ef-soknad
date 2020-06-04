import React, { FC, useEffect, useState } from 'react';
import TittelOgSlettKnapp from '../../../../components/TittelOgSlettKnapp';
import { Undertittel } from 'nav-frontend-typografi';
import SlettKnapp from '../../../../components/knapper/SlettKnapp';
import classnames from 'classnames';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import { Input } from 'nav-frontend-skjema';
import InputLabelGruppe from '../../../../components/gruppe/InputLabelGruppe';
import { hentTittelMedNr } from '../../../../language/utils';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import {
  EAksjeselskap,
  IAksjeselskap,
} from '../../../../models/steg/aktivitet/aktivitet';

interface Props {
  egetAS: IAksjeselskap[];
  settEgetAS: (egetAS: IAksjeselskap[]) => void;
  aksjeselskapnummer: number;
}

const Aksjeselskap: FC<Props> = ({
  egetAS,
  settEgetAS,
  aksjeselskapnummer,
}) => {
  const intl = useIntl();
  const aksjeselskapFraSøknad = egetAS?.find((aksjeselskap, index) => {
    if (index === aksjeselskapnummer) return aksjeselskap;
  });
  const [aksjeselskap, settAksjeselskap] = useState<IAksjeselskap>(
    aksjeselskapFraSøknad!
  );

  useEffect(() => {
    const endretAksjeselskap = egetAS?.map((aksjeselskapFraSøknad, index) => {
      if (index === aksjeselskapnummer) return aksjeselskap;
      else return aksjeselskapFraSøknad;
    });
    settEgetAS(endretAksjeselskap);
    // eslint-disable-next-line
  }, [aksjeselskap]);

  const aksjeselskapTittel = hentTittelMedNr(
    egetAS!,
    aksjeselskapnummer,
    intl.formatMessage({ id: 'egetAS.label.aksjeselskap' })
  );
  const navnLabel: string = hentTekst('egetAS.label.navn', intl);
  const arbeidsmengdeLabel: string = hentTekst(
    'arbeidsforhold.label.arbeidsmengde',
    intl
  );

  const settSpørsmålOgSvar = (spørsmål: ISpørsmål, svar: ISvar) => {
    aksjeselskap &&
      settAksjeselskap({
        ...aksjeselskap,
        [spørsmål.søknadid]: {
          spørsmålid: spørsmål.søknadid,
          svarid: svar.id,
          label: hentTekst(spørsmål.tekstid, intl),
          verdi: hentTekst(svar.svar_tekstid, intl),
        },
      });
  };

  const fjernAksjeselskap = () => {
    if (egetAS && egetAS.length > 1) {
      const endretAksjeselskap = egetAS?.filter(
        (aksjeselskap, index) => index !== aksjeselskapnummer
      );
      settEgetAS(endretAksjeselskap);
    }
  };

  const settTekstInputFelt = (
    e: React.FormEvent<HTMLInputElement>,
    label: string,
    nøkkel: EAksjeselskap
  ) => {
    aksjeselskap &&
      settAksjeselskap({
        ...aksjeselskap,
        [nøkkel]: { label: label, verdi: e.currentTarget.value },
      });
  };
  return (
    <>
      <TittelOgSlettKnapp>
        <Undertittel className={'tittel'}>{aksjeselskapTittel}</Undertittel>
        <SlettKnapp
          className={classnames('slettknapp', {
            kunEn: egetAS?.length === 1,
          })}
          onClick={() => fjernAksjeselskap()}
          tekstid={'arbeidsforhold.knapp.slettArbeidsgiver'}
        />
      </TittelOgSlettKnapp>
      <FeltGruppe>
        <Input
          key={navnLabel}
          label={navnLabel}
          type="text"
          bredde={'L'}
          onChange={(e) => settTekstInputFelt(e, navnLabel, EAksjeselskap.navn)}
        />
      </FeltGruppe>
      <FeltGruppe>
        <InputLabelGruppe
          label={arbeidsmengdeLabel}
          nøkkel={EAksjeselskap.arbeidsmengde}
          type={'number'}
          bredde={'XS'}
          settInputFelt={(e) =>
            settTekstInputFelt(
              e,
              arbeidsmengdeLabel,
              EAksjeselskap.arbeidsmengde
            )
          }
          beskrivendeTekst={'%'}
        />
      </FeltGruppe>
    </>
  );
};

export default Aksjeselskap;
