import React, { useState, SyntheticEvent } from 'react';
import { Element } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { RadioPanel } from 'nav-frontend-skjema';
import { IBarn } from '../../../models/barn';
import { IForelder } from '../../../models/forelder';

interface Props {
  barn: IBarn;
  andreBarnMedForelder: IBarn[];
  settForelder: Function;
  forelder: IForelder;
  settHuketAvAnnenForelder: Function;
}

const AnnenForelderKnapper: React.FC<Props> = ({
  barn,
  andreBarnMedForelder,
  settForelder,
  forelder,
  settHuketAvAnnenForelder,
}) => {
  const intl = useIntl();

  const [andreForelderRadioVerdi, settAndreForelderRadioVerdi] = useState<
    string
  >('');

  const leggTilSammeForelder = (
    e: SyntheticEvent<EventTarget, Event>,
    detAndreBarnet: IBarn
  ) => {
    settHuketAvAnnenForelder(true);
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
    settHuketAvAnnenForelder(false);
    settAndreForelderRadioVerdi('annen-forelder');
    settForelder({});
  };

  const andreForelder = 'andre-forelder-';
  const andreForelderAnnen = 'andre-forelder-annen';

  return (
    <>
      <Element>
        {barn.navn.verdi}
        {intl.formatMessage({ id: 'barnasbosted.element.andreforelder' })}
      </Element>
      {andreBarnMedForelder.length ? (
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
      ) : null}
    </>
  );
};

export default AnnenForelderKnapper;
