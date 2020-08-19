import { IForelder } from '../../../../models/steg/forelder';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import { hvorMyeSammen } from '../ForeldreConfig';
import { hentTekst } from '../../../../utils/søknad';
import { Element } from 'nav-frontend-typografi';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import { Textarea } from 'nav-frontend-skjema';
import { ISpørsmål, ISvar } from '../../../../models/felles/spørsmålogsvar';
import { EHvorMyeSammen } from '../../../../models/steg/barnasbosted';
import { IBarn } from '../../../../models/steg/barn';
import MultiSvarSpørsmålMedNavn from '../../../../components/spørsmål/MultiSvarSpørsmålMedNavn';
import { hentBarnNavnEllerBarnet } from '../../../../utils/barn';

interface Props {
  forelder: IForelder;
  barn: IBarn;
  settForelder: (verdi: IForelder) => void;
}
const HvorMyeSammen: FC<Props> = ({ forelder, barn, settForelder }) => {
  const intl = useIntl();

  const settHvorMyeSammen = (spørsmål: ISpørsmål, valgtSvar: ISvar) => {
    const nyForelder = {
      ...forelder,
      [hvorMyeSammen.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: valgtSvar.id,
        label: hentTekst('barnasbosted.spm.hvorMyeSammen', intl),
        verdi: hentTekst(valgtSvar.svar_tekstid, intl),
      },
    };

    if (
      (valgtSvar.id === EHvorMyeSammen.kunNårLeveres ||
        valgtSvar.id === EHvorMyeSammen.møtesIkke) &&
      nyForelder.beskrivSamværUtenBarn?.verdi
    ) {
      delete nyForelder.beskrivSamværUtenBarn;
    }

    settForelder(nyForelder);
  };

  const settBeskrivSamværUtenBarn = (e: any) => {
    settForelder({
      ...forelder,
      beskrivSamværUtenBarn: {
        label: hentTekst('barnasbosted.spm.beskrivSamværUtenBarn', intl),
        verdi: e.target.value,
      },
    });
  };
  return (
    <>
      <KomponentGruppe>
        <MultiSvarSpørsmålMedNavn
          key={hvorMyeSammen.søknadid}
          spørsmål={hvorMyeSammen}
          spørsmålTekst={hentBarnNavnEllerBarnet(
            barn,
            hvorMyeSammen.tekstid,
            intl
          )}
          valgtSvar={forelder.hvorMyeSammen?.verdi}
          settSpørsmålOgSvar={(spørsmål, svar) =>
            settHvorMyeSammen(spørsmål, svar)
          }
        />
      </KomponentGruppe>
      {forelder.hvorMyeSammen?.verdi ===
        hentTekst('barnasbosted.spm.møtesUtenom', intl) && (
        <>
          <div className="margin-bottom-05">
            <Element>
              {hentBarnNavnEllerBarnet(
                barn,
                'barnasbosted.spm.beskrivSamværUtenBarn',
                intl
              )}
            </Element>
          </div>
          <FeltGruppe>
            <Textarea
              value={
                forelder.beskrivSamværUtenBarn &&
                forelder.beskrivSamværUtenBarn.verdi
                  ? forelder.beskrivSamværUtenBarn.verdi
                  : ''
              }
              onChange={settBeskrivSamværUtenBarn}
              label=""
            />
          </FeltGruppe>
        </>
      )}
    </>
  );
};
export default HvorMyeSammen;
