import React, { FC } from 'react';
import { EForelder, IForelder } from '../../../../models/steg/forelder';
import {
  ESvar,
  ISpørsmål,
  ISvar,
} from '../../../../models/felles/spørsmålogsvar';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { borINorge } from '../ForeldreConfig';
import { hentTekst } from '../../../../utils/søknad';
import JaNeiSpørsmålMedNavn from '../../../../components/spørsmål/JaNeiSpørsmålMedNavn';
import { IBarn } from '../../../../models/steg/barn';
import { hentBarnNavnEllerBarnet } from '../../../../utils/barn';
import {
  erJaNeiSvar,
  hentBooleanFraValgtSvar,
} from '../../../../utils/spørsmålogsvar';
import { useLokalIntlContext } from '../../../../context/LokalIntlContext';
import { TextField } from '@navikt/ds-react';

interface Props {
  barn: IBarn;
  forelder: IForelder;
  settForelder: (verdi: IForelder) => void;
  settDokumentasjonsbehovForBarn: (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar,
    barneid: string,
    barnapassid?: string
  ) => void;
}

const BorForelderINorge: FC<Props> = ({
  settForelder,
  barn,
  forelder,
  settDokumentasjonsbehovForBarn,
}) => {
  const intl = useLokalIntlContext();

  const settFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    const nyForelder = {
      ...forelder,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: erJaNeiSvar(svar)
          ? hentBooleanFraValgtSvar(svar)
          : svar.svar_tekst,
      },
    };

    if (
      spørsmål.søknadid === EForelder.borINorge &&
      nyForelder.land &&
      svar.id === ESvar.JA
    ) {
      delete nyForelder.land;
    }
    settForelder(nyForelder);
    settDokumentasjonsbehovForBarn(spørsmål, svar, barn.id);
  };

  return (
    <>
      <KomponentGruppe>
        <JaNeiSpørsmålMedNavn
          spørsmål={borINorge(intl)}
          spørsmålTekst={hentBarnNavnEllerBarnet(
            barn,
            borINorge(intl).tekstid,
            intl
          )}
          onChange={settFelt}
          valgtSvar={forelder.borINorge?.verdi}
        />
      </KomponentGruppe>
      {forelder.borINorge?.verdi === false && (
        <KomponentGruppe>
          <TextField
            onChange={(e) =>
              settForelder({
                ...forelder,
                land: {
                  label: hentTekst('barnasbosted.land', intl),
                  verdi: e.target.value,
                },
              })
            }
            value={forelder.land ? forelder.land?.verdi : ''}
            label={hentTekst('barnasbosted.hvilketLand', intl)}
          />
        </KomponentGruppe>
      )}
    </>
  );
};

export default BorForelderINorge;
