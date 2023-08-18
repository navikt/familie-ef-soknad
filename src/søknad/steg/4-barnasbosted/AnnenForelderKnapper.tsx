import React, { useState, SyntheticEvent } from 'react';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { RadioPanel } from 'nav-frontend-skjema';
import { IBarn } from '../../../models/steg/barn';
import { IForelder } from '../../../models/steg/forelder';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { harValgtSvar } from '../../../utils/spørsmålogsvar';
import {
  lagtTilAnnenForelderId,
  hentBarnetsNavnEllerBeskrivelse,
} from '../../../utils/barn';
import { hentUid } from '../../../utils/autentiseringogvalidering/uuid';
import { cloneDeep } from 'lodash';

interface Props {
  barn: IBarn;
  forelder: IForelder;
  oppdaterAnnenForelder: (annenForelderId: string) => void;
  førsteBarnTilHverForelder?: IBarn[];
  settBarnHarSammeForelder: Function;
  settForelder: (verdi: IForelder) => void;
  oppdaterBarn: (barn: IBarn, erFørsteAvflereBarn: boolean) => void;
}

const AnnenForelderKnapper: React.FC<Props> = ({
  barn,
  forelder,
  oppdaterAnnenForelder,
  førsteBarnTilHverForelder,
  settBarnHarSammeForelder,
  settForelder,
  oppdaterBarn,
}) => {
  const intl = useLokalIntlContext();

  const leggTilSammeForelder = (
    e: SyntheticEvent<EventTarget, Event>,
    detAndreBarnet: IBarn
  ) => {
    settBarnHarSammeForelder(true);
    const oppdatertForelder = cloneDeep(detAndreBarnet.forelder);
    oppdaterAnnenForelder(detAndreBarnet.id);

    settForelder({
      ...barn.forelder,
      id: oppdatertForelder?.id,
      navn: oppdatertForelder?.navn,
      fødselsdato: oppdatertForelder?.fødselsdato,
      ident: oppdatertForelder?.ident,
      borINorge: oppdatertForelder?.borINorge,
      borAnnenForelderISammeHus: oppdatertForelder?.borAnnenForelderISammeHus,
      borAnnenForelderISammeHusBeskrivelse:
        oppdatertForelder?.borAnnenForelderISammeHusBeskrivelse,
      boddSammenFør: oppdatertForelder?.boddSammenFør,
      flyttetFra: oppdatertForelder?.flyttetFra,
      hvorMyeSammen: oppdatertForelder?.hvorMyeSammen,
      beskrivSamværUtenBarn: oppdatertForelder?.beskrivSamværUtenBarn,
      land: oppdatertForelder?.land,
      fraFolkeregister: oppdatertForelder?.fraFolkeregister,
    });
  };

  const leggTilAnnenForelder = () => {
    settBarnHarSammeForelder(false);
    const id = hentUid();

    const annenForelder =
      !barn.harSammeAdresse.verdi &&
      harValgtSvar(forelder.skalBarnetBoHosSøker?.verdi)
        ? {
            skalBarnetBoHosSøker: forelder.skalBarnetBoHosSøker,
            id,
          }
        : { id };

    oppdaterBarn(
      {
        ...barn,
        annenForelderId: lagtTilAnnenForelderId,
        forelder: annenForelder,
      },
      false
    );
    settForelder(annenForelder);
  };

  const andreForelder = 'andre-forelder-';
  const andreForelderAnnen = 'andre-forelder-annen';

  if (!førsteBarnTilHverForelder) return null;

  return (
    <KomponentGruppe>
      <div className="andre-forelder-valg">
        {førsteBarnTilHverForelder.map((b) => {
          if (
            !b.forelder?.borINorge &&
            !b.forelder?.kanIkkeOppgiAnnenForelderFar
          )
            return null;

          return (
            <RadioPanel
              key={`${andreForelder}${b.id}`}
              name={`${andreForelder}${b.id}`}
              label={`${intl.formatMessage({
                id: 'barnasbosted.forelder.sammesom',
              })} ${hentBarnetsNavnEllerBeskrivelse(b, intl)}`}
              value={`${andreForelder}${b.id}`}
              checked={barn.annenForelderId === b.id}
              onChange={(e) => leggTilSammeForelder(e, b)}
            />
          );
        })}
        <RadioPanel
          key={andreForelderAnnen}
          name={`${andreForelder}${barn.navn}`}
          label={intl.formatMessage({ id: 'barnasbosted.forelder.annen' })}
          value={andreForelderAnnen}
          checked={barn.annenForelderId === lagtTilAnnenForelderId}
          onChange={() => leggTilAnnenForelder()}
        />
      </div>
    </KomponentGruppe>
  );
};

export default AnnenForelderKnapper;
