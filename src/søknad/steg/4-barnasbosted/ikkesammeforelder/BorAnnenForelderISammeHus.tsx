import React, { FC } from 'react';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';
import { borAnnenForelderISammeHus } from '../ForeldreConfig';
import { EBorAnnenForelderISammeHus } from '../../../../models/steg/barnasbosted';
import { hentTekst } from '../../../../utils/søknad';
import { IForelder } from '../../../../models/forelder';
import { ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import { Normaltekst } from 'nav-frontend-typografi';
import { Textarea } from 'nav-frontend-skjema';
import { useIntl } from 'react-intl';

interface Props {
  forelder: IForelder;
  settForelder: (verdi: IForelder) => void;
}
const BorAnnenForelderISammeHus: FC<Props> = ({ forelder, settForelder }) => {
  const intl = useIntl();

  const settBorAnnenForelderISammeHus = (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar
  ) => {
    const nyForelder = {
      ...forelder,
      [borAnnenForelderISammeHus.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: valgtSvar.id,
        label: hentTekst('barnasbosted.spm.borAnnenForelderISammeHus', intl),
        verdi: hentTekst(valgtSvar.svar_tekstid, intl),
      },
    };

    if (
      valgtSvar.id === EBorAnnenForelderISammeHus.nei ||
      valgtSvar.id === EBorAnnenForelderISammeHus.vetikke
    ) {
      delete nyForelder.borAnnenForelderISammeHusBeskrivelse;
    }

    settForelder(nyForelder);
  };

  const settBorAnnenForelderISammeHusBeskrivelse = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    settForelder({
      ...forelder,
      borAnnenForelderISammeHusBeskrivelse: {
        label: hentTekst(
          'barnasbosted.spm.borAnnenForelderISammeHusBeskrivelse',
          intl
        ),
        verdi: e.target.value,
      },
    });
  };

  return (
    <>
      <KomponentGruppe>
        <MultiSvarSpørsmål
          key={borAnnenForelderISammeHus.søknadid}
          spørsmål={borAnnenForelderISammeHus}
          valgtSvar={forelder.borAnnenForelderISammeHus?.verdi}
          settSpørsmålOgSvar={(spørsmål, svar) =>
            settBorAnnenForelderISammeHus(spørsmål, svar)
          }
        />
      </KomponentGruppe>
      {forelder.borAnnenForelderISammeHus?.svarid ===
        EBorAnnenForelderISammeHus.ja && (
        <>
          <div className="margin-bottom-05">
            <Normaltekst>
              {intl.formatMessage({
                id: 'barnasbosted.spm.borAnnenForelderISammeHusBeskrivelse',
              })}
            </Normaltekst>
          </div>
          <FeltGruppe>
            <Textarea
              value={
                forelder.borAnnenForelderISammeHusBeskrivelse &&
                forelder.borAnnenForelderISammeHusBeskrivelse.verdi
                  ? forelder.borAnnenForelderISammeHusBeskrivelse.verdi
                  : ''
              }
              onChange={settBorAnnenForelderISammeHusBeskrivelse}
              label=""
            />
          </FeltGruppe>
        </>
      )}
    </>
  );
};

export default BorAnnenForelderISammeHus;
