import React, { useEffect, useState } from 'react';
import {
  IUtdanning,
  IUnderUtdanning,
} from '../../../../../models/arbeidssituasjon/utdanning';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../../language/LocaleTekst';
import FeltGruppe from '../../../../../components/gruppe/FeltGruppe';
import JaNeiSpørsmål from '../../../../../components/spørsmål/JaNeiSpørsmål';
import KnappBase from 'nav-frontend-knapper';
import SeksjonGruppe from '../../../../../components/gruppe/SeksjonGruppe';
import Utdanning from './Utdanning';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { hentTekst } from '../../../../../utils/søknad';
import { ISpørsmål } from '../../../../../models/spørsmal';
import {
  linjeKursGrad,
  utdanningEtterGrunnskolenSpm,
} from '../UtdanningConfig';
import { useIntl } from 'react-intl';

interface Props {
  utdanning: IUnderUtdanning;
  settUtdanning: (utdanning: IUnderUtdanning) => void;
}
const TidligereUtdanning: React.FC<Props> = ({ utdanning, settUtdanning }) => {
  const intl = useIntl();
  const linjeKursGradLabel = hentTekst(linjeKursGrad.label_tekstid, intl);
  const tomUtdanning: IUtdanning = {
    linjeKursGrad: { label: linjeKursGradLabel, verdi: '' },
  };

  const [tidligereUtdanning, settTidligereUtdanning] = useState<IUtdanning[]>([
    tomUtdanning,
  ]);

  useEffect(() => {
    settUtdanning({ ...utdanning, tidligereUtdanning: tidligereUtdanning });
    // eslint-disable-next-line
  }, [tidligereUtdanning]);

  const settHarTattUtdanningEtterGrunnskolen = (
    spørsmål: ISpørsmål,
    svar: boolean
  ) => {
    utdanning &&
      settUtdanning({
        ...utdanning,
        [spørsmål.søknadid]: {
          label: hentTekst(spørsmål.tekstid, intl),
          verdi: svar,
        },
      });
  };

  const settInputFelt = (
    label: string,
    e: React.FormEvent<HTMLInputElement>
  ) => {};

  const leggTilUtdanning = () => {
    const nyUtdanning: IUtdanning = tomUtdanning;
    const allUtdanning: IUtdanning[] = tidligereUtdanning;
    allUtdanning.push(nyUtdanning);
    settUtdanning({ ...utdanning, tidligereUtdanning: allUtdanning });
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
          valgtSvar={utdanning.harTattUtdanningEtterGrunnskole?.verdi}
        />
      </KomponentGruppe>
      {utdanning.harTattUtdanningEtterGrunnskole?.verdi && (
        <>
          Cake??
          {utdanning.tidligereUtdanning?.map((utd, index) => {
            return (
              <Utdanning
                tidligereUtdanning={tidligereUtdanning[1]}
                utdanningsnummer={1}
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
