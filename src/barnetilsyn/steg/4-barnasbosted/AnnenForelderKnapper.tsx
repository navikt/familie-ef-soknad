import React, { useState, SyntheticEvent } from 'react';
import { useIntl } from 'react-intl';
import { RadioPanel } from 'nav-frontend-skjema';
import { IBarn } from '../../../models/barn';
import { IForelder } from '../../../models/forelder';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { harValgtSvar } from '../../../utils/spørsmålogsvar';
import { hentBarnetsNavnEllerBeskrivelse } from '../../../utils/barn';

interface Props {
  barn: IBarn;
  førsteBarnTilHverForelder?: IBarn[];
  settForelder: (verdi: IForelder) => void;
  forelder: IForelder;
  settBarnHarSammeForelder: Function;
}

const AnnenForelderKnapper: React.FC<Props> = ({
  barn,
  førsteBarnTilHverForelder,
  settForelder,
  forelder,
  settBarnHarSammeForelder,
}) => {
  const intl = useIntl();

  const [andreForelderRadioVerdi, settAndreForelderRadioVerdi] = useState<
    string
  >('');

  const leggTilSammeForelder = (
    e: SyntheticEvent<EventTarget, Event>,
    detAndreBarnet: IBarn
  ) => {
    settBarnHarSammeForelder(true);
    const denAndreForelderen = detAndreBarnet.forelder;
    settAndreForelderRadioVerdi(detAndreBarnet.id);

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
      boddSammenFør: denAndreForelderen?.boddSammenFør,
      flyttetFra: denAndreForelderen?.flyttetFra,
      hvorMyeSammen: denAndreForelderen?.hvorMyeSammen,
    });
  };

  const leggTilAnnenForelder = () => {
    settBarnHarSammeForelder(false);
    settAndreForelderRadioVerdi('annen-forelder');

    !barn.harSammeAdresse.verdi &&
    harValgtSvar(forelder.skalBarnetBoHosSøker?.verdi)
      ? settForelder({
          ...forelder,
          skalBarnetBoHosSøker: forelder.skalBarnetBoHosSøker,
        })
      : settForelder(forelder);
  };

  const andreForelder = 'andre-forelder-';
  const andreForelderAnnen = 'andre-forelder-annen';

  if (!førsteBarnTilHverForelder) return null;

  return (
    <KomponentGruppe>
      <div className="andre-forelder-valg">
        {førsteBarnTilHverForelder.map((b) => {
          if (!b) return null;

          return (
            <RadioPanel
              key={`${andreForelder}${b.id}`}
              name={`${andreForelder}${b.id}`}
              label={`${intl.formatMessage({
                id: 'barnasbosted.forelder.sammesom',
              })} ${hentBarnetsNavnEllerBeskrivelse(b, intl)}`}
              value={`${andreForelder}${b.id}`}
              checked={andreForelderRadioVerdi === b.id}
              onChange={(e) => leggTilSammeForelder(e, b)}
            />
          );
        })}
        <RadioPanel
          key={andreForelderAnnen}
          name={`${andreForelder}${barn.navn}`}
          label={intl.formatMessage({ id: 'barnasbosted.forelder.annen' })}
          value={andreForelderAnnen}
          checked={andreForelderRadioVerdi === 'annen-forelder'}
          onChange={() => leggTilAnnenForelder()}
        />
      </div>
    </KomponentGruppe>
  );
};

export default AnnenForelderKnapper;
