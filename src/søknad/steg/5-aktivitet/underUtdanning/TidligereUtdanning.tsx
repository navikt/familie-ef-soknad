import React from 'react';
import {
  IUtdanning,
  IUnderUtdanning,
} from '../../../../models/steg/aktivitet/utdanning';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../../language/LocaleTekst';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import Hjelpetekst from '../../../../components/Hjelpetekst';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import Utdanning from './Utdanning';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { hentTekst } from '../../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../../models/felles/spørsmålogsvar';
import { utdanningEtterGrunnskolenSpm } from './UtdanningConfig';
import { useIntl } from 'react-intl';
import { tidligereUtdanningHjelpetekst } from './UtdanningConfig';
import { lagTomUtdanning } from '../../../../helpers/steg/utdanning';
import { hentBooleanFraValgtSvar } from '../../../../utils/spørsmålogsvar';
import { erTidligereUtdanningFerdigUtfylt } from '../../../../helpers/steg/aktivitetvalidering';
import LeggTilKnapp from '../../../../components/knapper/LeggTilKnapp';

interface Props {
  underUtdanning: IUnderUtdanning;
  settUnderUtdanning: (utdanning: IUnderUtdanning) => void;
}
const TidligereUtdanning: React.FC<Props> = ({
  underUtdanning,
  settUnderUtdanning,
}) => {
  const intl = useIntl();
  const tidligereUtdanning: IUtdanning[] = underUtdanning.tidligereUtdanning
    ? underUtdanning.tidligereUtdanning
    : [];

  const settTidligereUtdanning = (tidligereUtdanninger: IUtdanning[]) => {
    settUnderUtdanning({
      ...underUtdanning,
      tidligereUtdanning: tidligereUtdanninger,
    });
  };

  const leggTilUtdanning = () => {
    const allUtdanning: IUtdanning[] = [
      ...tidligereUtdanning,
      lagTomUtdanning(intl),
    ];
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

    if (!svar) {
      const endretUtdanning = underUtdanning;
      delete endretUtdanning.tidligereUtdanning;
      settUnderUtdanning({
        ...endretUtdanning,
        [spørsmål.søknadid]: tattUtdanningEtterGrunnskolenFelt,
      });
    } else if (svar) {
      settUnderUtdanning({
        ...underUtdanning,
        [spørsmål.søknadid]: tattUtdanningEtterGrunnskolenFelt,
        tidligereUtdanning: [lagTomUtdanning(intl)],
      });
    }
  };

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <Undertittel className={'sentrert'} tag="h3">
          <LocaleTekst tekst={'utdanning.tittel.tidligere'} />
        </Undertittel>
        <Hjelpetekst
          className={'sentrert'}
          åpneTekstid={tidligereUtdanningHjelpetekst.åpneTekstid}
          innholdTekstid={tidligereUtdanningHjelpetekst.innholdTekstid}
          html={true}
        />
      </KomponentGruppe>

      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={utdanningEtterGrunnskolenSpm(intl)}
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
          {erTidligereUtdanningFerdigUtfylt(
            tidligereUtdanning ? tidligereUtdanning : []
          ) && (
            <KomponentGruppe>
              <FeltGruppe>
                <Element>
                  <LocaleTekst tekst={'utdanning.label.leggtil'} />
                </Element>
                <LeggTilKnapp onClick={() => leggTilUtdanning()}>
                  <LocaleTekst tekst={'utdanning.knapp.leggtil'} />
                </LeggTilKnapp>
              </FeltGruppe>
            </KomponentGruppe>
          )}
        </>
      )}
    </SeksjonGruppe>
  );
};

export default TidligereUtdanning;
