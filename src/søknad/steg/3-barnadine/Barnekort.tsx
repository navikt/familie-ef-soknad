import React, { useState } from 'react';
import barn1 from '../../../assets/barn1.svg';
import barn2 from '../../../assets/barn2.svg';
import barn3 from '../../../assets/barn3.svg';
import ufødtIkon from '../../../assets/ufodt.svg';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import LeggTilBarn from './LeggTilBarn';
import { hentTekst } from '../../../utils/søknad';
import { IBarn } from '../../../models/steg/barn';
import { formatDate, strengTilDato } from '../../../utils/dato';
import { Heading, Link } from '@navikt/ds-react';
import { ModalWrapper } from '../../../components/Modal/ModalWrapper';
import { SettDokumentasjonsbehovBarn } from '../../../models/søknad/søknad';
import styled from 'styled-components';
import { InformasjonsElement } from './BarnekortInformasjonsElement';

interface Props {
  gjeldendeBarn: IBarn;
  velgBarnForDenneSøknaden?: React.ReactNode;
  slettBarn: Function;
  settDokumentasjonsbehovForBarn: SettDokumentasjonsbehovBarn;
  barneListe: IBarn[];
  settBarneListe: (barneListe: IBarn[]) => void;
}

const Container = styled.div`
  width: 276px;
  background-color: #e7e9e9;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  height: 128px;
  justify-content: center;
  background-color: #4d3e55;
  border-bottom: 4px solid #826ba1;
`;

const Innhold = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 2rem;
  text-align: center;
`;

const LenkeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const LinkMedPointer = styled(Link)`
  cursor: pointer;
`;

const Barnekort: React.FC<Props> = ({
  gjeldendeBarn,
  velgBarnForDenneSøknaden,
  slettBarn,
  settDokumentasjonsbehovForBarn,
  barneListe,
  settBarneListe,
}) => {
  const intl = useLokalIntlContext();
  const [åpenEndreModal, settÅpenEndreModal] = useState(false);

  const {
    id,
    navn,
    fødselsdato,
    født,
    ident,
    alder,
    lagtTil,
    harSammeAdresse,
    medforelder,
    harAdressesperre,
  } = gjeldendeBarn;

  const formatFnr = (fødselsnummer: string) => {
    return fødselsnummer.substring(0, 6) + ' ' + fødselsnummer.substring(6, 11);
  };

  const ikoner = [barn1, barn2, barn3];
  const ikon = født?.verdi
    ? ikoner[Math.floor(Math.random() * ikoner.length)]
    : ufødtIkon;

  let bosted: string = '';

  if (lagtTil) {
    bosted = født?.verdi
      ? harSammeAdresse.verdi
        ? hentTekst('barnekort.adresse.bor', intl)
        : hentTekst('barnekort.adresse.borIkke', intl)
      : harSammeAdresse.verdi
      ? hentTekst('barnekort.adresse.skalBo', intl)
      : hentTekst('barnekort.adresse.skalIkkeBo', intl);
  } else {
    bosted = harSammeAdresse.verdi
      ? intl.formatMessage({ id: 'barnekort.adresse.registrert' })
      : intl.formatMessage({ id: 'barnekort.adresse.uregistrert' });
  }

  return (
    <Container>
      <Header>
        <img alt="barn" src={ikon} />
      </Header>
      <Innhold>
        <Heading size="small" level="3">
          {navn.verdi
            ? navn.verdi
            : intl.formatMessage({ id: 'barnekort.normaltekst.barn' })}
        </Heading>
        {!harAdressesperre &&
          (ident.verdi ? (
            <InformasjonsElement
              forklaringId={'barnekort.fødselsnummer'}
              verdi={formatFnr(ident.verdi)}
            />
          ) : (
            <InformasjonsElement
              forklaringId={
                født?.verdi ? 'barnekort.fødselsdato' : 'barnekort.termindato'
              }
              verdi={formatDate(strengTilDato(fødselsdato.verdi))}
            />
          ))}
        <InformasjonsElement
          forklaringId={'barnekort.alder'}
          verdi={
            født?.verdi
              ? alder.verdi + ' ' + intl.formatMessage({ id: 'barnekort.år' })
              : hentTekst('barnekort.erUfødt', intl)
          }
        />
        {!harAdressesperre && (
          <InformasjonsElement
            forklaringId={'barnekort.bosted'}
            verdi={bosted}
          />
        )}
        {medforelder &&
          (medforelder.verdi?.navn || medforelder.verdi?.alder) && (
            <InformasjonsElement
              forklaringId={'barnasbosted.forelder.annen'}
              verdi={
                medforelder?.verdi && medforelder?.verdi.navn
                  ? medforelder?.verdi?.navn
                  : medforelder?.verdi?.alder
                  ? `${hentTekst('barnekort.medforelder.hemmelig', intl)}, ${
                      medforelder.verdi.alder
                    }`
                  : null
              }
            />
          )}
        {velgBarnForDenneSøknaden}
        {lagtTil && (
          <LenkeContainer>
            <LinkMedPointer onClick={() => settÅpenEndreModal(true)}>
              {intl.formatMessage({ id: 'barnekort.lenke.endre' })}
            </LinkMedPointer>
            <LinkMedPointer onClick={() => slettBarn(id)}>
              {intl.formatMessage({ id: 'barnekort.fjern' })}
            </LinkMedPointer>
          </LenkeContainer>
        )}
      </Innhold>
      <ModalWrapper
        tittel="Endre informasjon om barnet"
        visModal={åpenEndreModal}
        onClose={() => settÅpenEndreModal(false)}
      >
        <div style={{ padding: '2rem 2.5rem' }}>
          <LeggTilBarn
            settÅpenModal={settÅpenEndreModal}
            id={id}
            barneListe={barneListe}
            settDokumentasjonsbehovForBarn={settDokumentasjonsbehovForBarn}
            settBarneListe={settBarneListe}
          />
        </div>
      </ModalWrapper>
    </Container>
  );
};

export default Barnekort;
