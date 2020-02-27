import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { ISpørsmål } from '../../../models/spørsmal';
import { boddSammenFør, borISammeHus, hvorMyeSammen } from './ForeldreConfig';
import { IForelder } from '../../../models/person';
import JaNeiSpørsmål from '../../../components/spørsmål/JaNeiSpørsmål';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import BarnasBostedHeader from './BarnasBostedHeader';
import { useIntl } from 'react-intl';
import Datovelger, {
  DatoBegrensning,
} from '../../../components/dato/Datovelger';
import OmAndreForelder from './OmAndreForelder';
import BostedOgSamvær from './BostedOgSamvær';

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknadContext();
  const [forelder, settForelder] = useState<IForelder>({});

  const settHarBoddsammenFør = (spørsmål: ISpørsmål, valgtSvar: boolean) => {
    const nyForelder = { ...forelder, [boddSammenFør.søknadid]: valgtSvar };

    if (valgtSvar === false) {
      delete nyForelder.flyttetFra;
    }

    settForelder(nyForelder);
  };

  const barn = søknad.person.barn[0];

  return (
    <>
      <Side tittel={intl.formatMessage({ id: 'barnasbosted.sidetittel' })}>
        <div className="barnas-bosted">
          <BarnasBostedHeader barn={barn} />
          <div className="barnas-bosted__innhold">
            <OmAndreForelder
              barn={barn}
              settForelder={settForelder}
              forelder={forelder}
            />
            <BostedOgSamvær settForelder={settForelder} forelder={forelder} />
            <KomponentGruppe>
              <MultiSvarSpørsmål
                key={borISammeHus.søknadid}
                spørsmål={borISammeHus}
                valgtSvar={forelder.borISammeHus}
                onChange={(_, svar) =>
                  settForelder({
                    ...forelder,
                    [borISammeHus.søknadid]: svar,
                  })
                }
              />
            </KomponentGruppe>
            <KomponentGruppe>
              <JaNeiSpørsmål
                spørsmål={boddSammenFør}
                onChange={(spørsmål, svar) =>
                  settHarBoddsammenFør(spørsmål, svar)
                }
                valgtSvar={forelder.boddSammenFør}
              />
            </KomponentGruppe>
            {forelder.boddSammenFør ? (
              <KomponentGruppe>
                <div className="fødselsnummer">
                  <div className="fødselsdato">
                    <div className={'datepicker__container'}>
                      <Datovelger
                        settDato={(e: Date | null) =>
                          settForelder({ ...forelder, flyttetFra: e })
                        }
                        valgtDato={
                          forelder.flyttetFra ? forelder.flyttetFra : undefined
                        }
                        tekstid={'barnasbosted.normaltekst.nårflyttetfra'}
                        datobegrensning={DatoBegrensning.TidligereDatoer}
                      />
                    </div>
                  </div>
                </div>
              </KomponentGruppe>
            ) : null}
            <KomponentGruppe>
              <MultiSvarSpørsmål
                key={hvorMyeSammen.søknadid}
                spørsmål={hvorMyeSammen}
                valgtSvar={forelder.hvorMyeSammen}
                onChange={(_, svar) =>
                  settForelder({
                    ...forelder,
                    [hvorMyeSammen.søknadid]: svar,
                  })
                }
              />
            </KomponentGruppe>
          </div>
        </div>
      </Side>
    </>
  );
};

export default BarnasBosted;
