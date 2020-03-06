import React, { useEffect, useState } from 'react';
import {
  IUtdanning,
  IUnderUtdanning,
} from '../../../../models/steg/aktivitet/utdanning';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import KnappBase from 'nav-frontend-knapper';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import Utdanning from './Utdanning';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { hentTekst } from '../../../../utils/søknad';
import { ISpørsmål } from '../../../../models/spørsmal';
import { linjeKursGrad, utdanningEtterGrunnskolenSpm } from './UtdanningConfig';
import { useIntl } from 'react-intl';
import { tomPeriode } from '../../../../utils/søknadsfelter';

interface Props {
  underUtdanning: IUnderUtdanning;
  settUnderUtdanning: (utdanning: IUnderUtdanning) => void;
}
const TidligereUtdanning: React.FC<Props> = ({
  underUtdanning,
  settUnderUtdanning,
}) => {
  const intl = useIntl();
  const linjeKursGradLabel = hentTekst(linjeKursGrad.label_tekstid, intl);
  const tomUtdanning: IUtdanning = {
    linjeKursGrad: { label: linjeKursGradLabel, verdi: '' },
    periode: tomPeriode,
  };

  const [tidligereUtdanning, settTidligereUtdanning] = useState<IUtdanning[]>([
    tomUtdanning,
  ]);

  useEffect(() => {
    underUtdanning.harTattUtdanningEtterGrunnskolen &&
      settUnderUtdanning({
        ...underUtdanning,
        tidligereUtdanning: tidligereUtdanning,
      });

    // eslint-disable-next-line
  }, [tidligereUtdanning]);

  const leggTilUtdanning = () => {
    const nyUtdanning: IUtdanning = tomUtdanning;
    const allUtdanning: IUtdanning[] = tidligereUtdanning;
    allUtdanning.push(nyUtdanning);
    settUnderUtdanning({ ...underUtdanning, tidligereUtdanning: allUtdanning });
  };

  const settHarTattUtdanningEtterGrunnskolen = (
    spørsmål: ISpørsmål,
    svar: boolean
  ) => {
    const tattUtdanningEtterGrunnskolenFelt = {
      label: hentTekst(spørsmål.tekstid, intl),
      verdi: svar,
    };

    if (!svar && underUtdanning.tidligereUtdanning) {
      const endretUtdanning = underUtdanning;
      delete endretUtdanning.tidligereUtdanning;
      settUnderUtdanning({
        ...endretUtdanning,
        [spørsmål.søknadid]: tattUtdanningEtterGrunnskolenFelt,
      });
    } else if (svar && !underUtdanning.tidligereUtdanning) {
      settUnderUtdanning({
        ...underUtdanning,
        [spørsmål.søknadid]: tattUtdanningEtterGrunnskolenFelt,
        tidligereUtdanning: [tomUtdanning],
      });
    } else {
      underUtdanning &&
        settUnderUtdanning({
          ...underUtdanning,
          [spørsmål.søknadid]: tattUtdanningEtterGrunnskolenFelt,
        });
    }
  };

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <Undertittel className={'sentrert'}>
          <LocaleTekst tekst={'utdanning.tittel.tidligere'} />
        </Undertittel>
      </KomponentGruppe>

      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={utdanningEtterGrunnskolenSpm}
          onChange={settHarTattUtdanningEtterGrunnskolen}
          valgtSvar={underUtdanning.harTattUtdanningEtterGrunnskolen?.verdi}
        />
      </KomponentGruppe>
      {underUtdanning.harTattUtdanningEtterGrunnskolen?.verdi && (
        <>
          {tidligereUtdanning?.map((utdanning, index) => {
            return (
              <Utdanning
                key={'utdanning-' + index}
                tidligereUtdanninger={tidligereUtdanning}
                settTidligereUtdanninger={settTidligereUtdanning}
                utdanningsnummer={index}
              />
            );
          })}
          <KomponentGruppe>
            <FeltGruppe>
              <Element>
                <LocaleTekst tekst={'utdanning.label.leggtil'} />
              </Element>
            </FeltGruppe>
            <FeltGruppe>
              <KnappBase type={'standard'} onClick={() => leggTilUtdanning()}>
                <LocaleTekst tekst={'utdanning.knapp.leggtil'} />
              </KnappBase>
            </FeltGruppe>
          </KomponentGruppe>
        </>
      )}
    </SeksjonGruppe>
  );
};

export default TidligereUtdanning;
