import React, { SyntheticEvent } from 'react';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { RadioPanel } from 'nav-frontend-skjema';
import { IBarn } from '../../../models/steg/barn';
import { IForelder } from '../../../models/steg/forelder';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { harValgtSvar } from '../../../utils/spørsmålogsvar';
import { hentBarnetsNavnEllerBeskrivelse } from '../../../utils/barn';
import { hentUid } from '../../../utils/autentiseringogvalidering/uuid';
import { cloneDeep } from 'lodash';

interface Props {
  barn: IBarn;
  forelder: IForelder;
  oppdaterAnnenForelder: (annenForelderId: string) => void;
  førsteBarnTilHverForelder?: IBarn[];
  settBarnHarSammeForelder: Function;
  settForelder: (verdi: IForelder) => void;
}

const AnnenForelderKnapper: React.FC<Props> = ({
  barn,
  forelder,
  oppdaterAnnenForelder,
  førsteBarnTilHverForelder,
  settBarnHarSammeForelder,
  settForelder,
}) => {
  const intl = useLokalIntlContext();

  const leggTilSammeForelder = (
    e: SyntheticEvent<EventTarget, Event>,
    detAndreBarnet: IBarn
  ) => {
    settBarnHarSammeForelder(true);
    const denAndreForelderen = cloneDeep(detAndreBarnet.forelder);
    oppdaterAnnenForelder(detAndreBarnet.id);

    settForelder({
      ...forelder,
      id: denAndreForelderen?.id,
      navn: denAndreForelderen?.navn,
      fødselsdato: denAndreForelderen?.fødselsdato,
      ident: denAndreForelderen?.ident,
      borINorge: denAndreForelderen?.borINorge,
      hvordanPraktiseresSamværet:
        denAndreForelderen?.hvordanPraktiseresSamværet,
      borAnnenForelderISammeHus: denAndreForelderen?.borAnnenForelderISammeHus,
      borAnnenForelderISammeHusBeskrivelse:
        denAndreForelderen?.borAnnenForelderISammeHusBeskrivelse,
      boddSammenFør: denAndreForelderen?.boddSammenFør,
      flyttetFra: denAndreForelderen?.flyttetFra,
      hvorMyeSammen: denAndreForelderen?.hvorMyeSammen,
      beskrivSamværUtenBarn: denAndreForelderen?.beskrivSamværUtenBarn,
      land: denAndreForelderen?.land,
      fraFolkeregister: denAndreForelderen?.fraFolkeregister,
    });
  };

  const leggTilAnnenForelder = () => {
    settBarnHarSammeForelder(false);
    oppdaterAnnenForelder('annen-forelder');
    const id = hentUid();

    !barn.harSammeAdresse.verdi &&
    harValgtSvar(forelder.skalBarnetBoHosSøker?.verdi)
      ? settForelder({
          skalBarnetBoHosSøker: forelder.skalBarnetBoHosSøker,
          id,
        })
      : settForelder({ id });
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
          checked={barn.annenForelderId === 'annen-forelder'}
          onChange={() => leggTilAnnenForelder()}
        />
      </div>
    </KomponentGruppe>
  );
};

export default AnnenForelderKnapper;
