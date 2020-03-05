import React, { useEffect, useState } from 'react';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import Side from '../../../components/side/Side';
import useSøknadContext from '../../../context/SøknadContext';
import { gjelderNoeAvDetteDeg } from './SituasjonConfig';
import { IDinSituasjon } from '../../../models/steg/meromsituasjon';
import { ISpørsmål } from '../../../models/spørsmal';
import { nyttTekstListeFelt } from '../../../models/søknadsfelter';
import { useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';

const MerOmDinSituasjon: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknadContext();
  const [dinSituasjon, settDinSituasjon] = useState<IDinSituasjon>({
    situasjon: nyttTekstListeFelt,
  });

  useEffect(() => {
    settSøknad({ ...søknad, merOmDinSituasjon: dinSituasjon });
    // eslint-disable-next-line
  }, [dinSituasjon]);

  const oppdaterDinSituasjon = (nyDinSituasjon: IDinSituasjon) => {
    settDinSituasjon({ ...dinSituasjon, ...nyDinSituasjon });
  };

  const settDinSituasjonFelt = (spørsmål: ISpørsmål, svar: string[]) => {
    oppdaterDinSituasjon({
      ...dinSituasjon,
      [spørsmål.søknadid]: {
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: svar,
      },
    });
  };

  return (
    <Side tittel={'din situasjon placeholder'}>
      <SeksjonGruppe>
        <KomponentGruppe>
          <CheckboxSpørsmål
            spørsmål={gjelderNoeAvDetteDeg}
            settValgteSvar={settDinSituasjonFelt}
            valgteSvar={søknad.merOmDinSituasjon.situasjon.verdi}
          />
        </KomponentGruppe>
      </SeksjonGruppe>
    </Side>
  );
};

export default MerOmDinSituasjon;
