import { IForelder } from '../../../../models/forelder';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import MultiSvarSpørsmål from '../../../../components/spørsmål/MultiSvarSpørsmål';
import { hvorMyeSammen } from '../ForeldreConfig';
import { hentTekst } from '../../../../utils/søknad';
import { Normaltekst } from 'nav-frontend-typografi';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import { Textarea } from 'nav-frontend-skjema';
import { ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import { EHvorMyeSammen } from '../../../../models/steg/barnasbosted';

interface Props {
  forelder: IForelder;
  settForelder: Function;
}
const HvorMyeSammen: FC<Props> = ({ forelder, settForelder }) => {
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
        <MultiSvarSpørsmål
          key={hvorMyeSammen.søknadid}
          spørsmål={hvorMyeSammen}
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
            <Normaltekst>
              {intl.formatMessage({
                id: 'barnasbosted.spm.beskrivSamværUtenBarn',
              })}
            </Normaltekst>
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
