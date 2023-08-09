import { FC, useEffect, useState } from 'react';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import download from '../../../assets/download.svg';
import styled from 'styled-components/macro';
import { StyledUndertittel } from '../../../components/gruppe/Spacing';
import LocaleTekst from '../../../language/LocaleTekst';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { hentFilePath } from '../../../utils/språk';
import { useSpråkContext } from '../../../context/SpråkContext';
import { BodyShort, Label, Link } from '@navikt/ds-react';
import { byteTilKilobyte, filStorresleOgTypeStreng } from '../../../utils/nedlastningFilformater';

const StyledLenke = styled.div`
  margin-top: 1rem;

  img {
    margin-right: 0.5rem;
    display: inline;
  }

  p {
    display: inline;
  }
`;

const ErklæringSamlivsbrudd: FC = () => {
  const intl = useLokalIntlContext();
  const { locale } = useSpråkContext();
  const [filstorrelse, settFilstorrelse] = useState(0)
  const [filtype, settFiltype] = useState('')

  const hentSoknadBasertPaBrukerSprak = (): string => {
    return hentFilePath(locale, {
      nb: '/familie/alene-med-barn/soknad/filer/Erklaering_om_samlivsbrudd.pdf',
      en: '/familie/alene-med-barn/soknad/filer/Declaration_on_end_of_relationship_EN.pdf',
      nn: '/familie/alene-med-barn/soknad/filer/Erklaering_om_samlivsbrot_NN.pdf',
    })
  }

  useEffect(() => {
    const hentFilInformasjon = (url: string) => {
      let filBlob;
      fetch(url).then((res) => {
          filBlob = res.blob();
          return filBlob;
      }).then((filBlob) => {
          settFilstorrelse(byteTilKilobyte(filBlob.size))
          settFiltype(filBlob.type)
          console.log([filBlob.size, filBlob.type]);
      });
  }
    hentFilInformasjon(hentSoknadBasertPaBrukerSprak())
  }, []);

  return (
    <SeksjonGruppe>
      <StyledUndertittel size="small">
        <LocaleTekst tekst={'kvittering.tittel.samlivsbrudd'} />
      </StyledUndertittel>
      <BodyShort>
        <LocaleTekst tekst={'kvittering.beskrivelse.samlivsbrudd'} />
      </BodyShort>

      <StyledLenke>
        <Link
          href={hentSoknadBasertPaBrukerSprak()}
          download
        >
          <img alt="Nedlastingsikon" src={download} />
          <Label as="p">
            {intl.formatMessage({ id: 'kvittering.knapp.samlivsbrudd' })}
            {filStorresleOgTypeStreng(filtype, filstorrelse)}
          </Label>
        </Link>
      </StyledLenke>
    </SeksjonGruppe>
  );
};

export default ErklæringSamlivsbrudd;
