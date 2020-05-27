import React, { useState, SyntheticEvent } from 'react';
import { useIntl } from 'react-intl';
import { RadioPanel } from 'nav-frontend-skjema';
import { IBarn } from '../../../models/barn';
import { IForelder } from '../../../models/forelder';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';

interface Props {
  barn: IBarn;
  andreBarnMedForelder: IBarn[];
  settForelder: Function;
  forelder: IForelder;
  settBarnHarSammeForelder: Function;
}

const AnnenForelderKnapper: React.FC<Props> = ({
  barn,
  andreBarnMedForelder,
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
    settAndreForelderRadioVerdi(detAndreBarnet.navn.verdi);

    settForelder({
      ...forelder,
      navn: denAndreForelderen?.navn,
      fødselsdato: denAndreForelderen?.fødselsdato,
      personnr: denAndreForelderen?.personnr,
      borINorge: denAndreForelderen?.borINorge,
      hvordanPraktiseresSamværet:
        denAndreForelderen?.hvordanPraktiseresSamværet,
      borISammeHus: denAndreForelderen?.borISammeHus,
      boddSammenFør: denAndreForelderen?.boddSammenFør,
      flyttetFra: denAndreForelderen?.flyttetFra,
      hvorMyeSammen: denAndreForelderen?.hvorMyeSammen,
    });
  };

  const leggTilAnnenForelder = () => {
    settBarnHarSammeForelder(false);
    settAndreForelderRadioVerdi('annen-forelder');
    settForelder({});
  };

  const andreForelder = 'andre-forelder-';
  const andreForelderAnnen = 'andre-forelder-annen';

  return (
    <KomponentGruppe>
      <div className="andre-forelder-valg">
        {andreBarnMedForelder.map((b) => {
          return (
            <RadioPanel
              key={`${andreForelder}${b.navn}`}
              name={`${andreForelder}${barn.navn}`}
              label={`${intl.formatMessage({
                id: 'barnasbosted.forelder.sammesom',
              })} ${b.navn.verdi}`}
              value={`${andreForelder}${b.navn}`}
              checked={andreForelderRadioVerdi === b.navn.verdi}
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
