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
import { ISpørsmål, ISvar } from '../../../../models/spørsmålogsvar';
import { utdanningEtterGrunnskolenSpm } from './UtdanningConfig';
import { useIntl } from 'react-intl';
import { lagTomUtdanning } from '../../../../helpers/utdanning';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';

interface Props {
  underUtdanning: IUnderUtdanning;
  settUnderUtdanning: (utdanning: IUnderUtdanning) => void;
}
const TidligereUtdanning: React.FC<Props> = ({
  underUtdanning,
  settUnderUtdanning,
}) => {
  const intl = useIntl();

  const [tidligereUtdanning, settTidligereUtdanning] = useState<IUtdanning[]>([
    lagTomUtdanning(intl),
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
    const nyUtdanning: IUtdanning = lagTomUtdanning(intl);
    const allUtdanning: IUtdanning[] = tidligereUtdanning;
    allUtdanning.push(nyUtdanning);
    settUnderUtdanning({ ...underUtdanning, tidligereUtdanning: allUtdanning });
  };

  const settHarTattUtdanningEtterGrunnskolen = (
    spørsmål: ISpørsmål,
    valgtSvar: ISvar
  ) => {
    const svar: boolean = hentBooleanFraValgtSvar(valgtSvar);

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
        tidligereUtdanning: [lagTomUtdanning(intl)],
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
                key={utdanning.id}
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
