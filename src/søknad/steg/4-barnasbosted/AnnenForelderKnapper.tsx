import React, { useState, SyntheticEvent } from 'react';
import { Element } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { RadioPanel } from 'nav-frontend-skjema';
import { IBarn, IForelder } from '../../../models/person';

interface Props {
    barn: IBarn;
    andreBarnMedForelder: IBarn[];
    settForelder: Function;
    forelder: IForelder;
    settHuketAvAnnenForelder: Function;
}

const AnnenForelderKnapper: React.FC<Props> = ( { barn, andreBarnMedForelder, settForelder, forelder, settHuketAvAnnenForelder }) => {
  const intl = useIntl();

  const [andreForelderRadioVerdi, settAndreForelderRadioVerdi] = useState<string>("");

  const leggTilSammeForelder = (e: SyntheticEvent<EventTarget, Event>, detAndreBarnet: IBarn) => {
    settHuketAvAnnenForelder(true);
    const denAndreForelderen = detAndreBarnet.forelder;
    settAndreForelderRadioVerdi(detAndreBarnet.navn);

    settForelder({...forelder, 
        navn : denAndreForelderen?.navn, 
        fødselsdato: denAndreForelderen?.fødselsdato, 
        personnr: denAndreForelderen?.personnr, 
        borINorge: denAndreForelderen?.borINorge, 
        hvordanPraktiseresSamværet: denAndreForelderen?.hvordanPraktiseresSamværet, 
        borISammeHus: denAndreForelderen?.borISammeHus, 
        boddSammenFør: denAndreForelderen?.boddSammenFør, 
        flyttetFra: denAndreForelderen?.flyttetFra, 
        hvorMyeSammen: denAndreForelderen?.hvorMyeSammen
    });
  };

  const leggTilAnnenForelder = () => {
    settHuketAvAnnenForelder(false);
    settAndreForelderRadioVerdi("annen-forelder");
    settForelder({});
  }

  return (
      <>
    <Element>
    {barn.navn}
    {intl.formatMessage({ id: 'barnasbosted.element.andreforelder' })}
  </Element>
  {andreBarnMedForelder.length ? <div className="andre-forelder-valg">
  {andreBarnMedForelder.map((b) => {
    return <RadioPanel
      key={`andre-forelder-${b.navn}`}
      name={`andre-forelder-${barn.navn}`}
      label={`Samme som ${b.navn}`}
      value={`andre-forelder-${b.navn}`}
      checked={andreForelderRadioVerdi === b.navn}
      onChange={(e) => leggTilSammeForelder(e, b)}
    />
  })}
  <RadioPanel
      key={`andre-forelder-annen`}
      name={`andre-forelder-${barn.navn}`}
      label={`Annen forelder`}
      value={`andre-forelder-annen`}
      checked={andreForelderRadioVerdi === "annen-forelder"}
      onChange={() => leggTilAnnenForelder()}
    />
  </div> : null}
  </>)
}

export default AnnenForelderKnapper;
