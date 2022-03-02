import * as React from 'react';
import EngelskFlaggSVG from '../../assets/EngelskFlaggSVG';
import NedChevron from 'nav-frontend-chevron/lib/ned-chevron';
import NorskFlaggSVG from '../../assets/NorskFlaggSVG';
import styled from 'styled-components/macro';
import { Normaltekst } from 'nav-frontend-typografi';
import { SpråkSelectMenu } from './SpråkSelectMenu';
import { Wrapper, Button } from 'react-aria-menubutton';
import { useSpråkContext } from '../../context/SpråkContext';
import navFarger from 'nav-frontend-core';
import {
  hentListeMedSpråk,
  hentListeMedSpråkUtenNynorsk,
  hentValgtSpråk,
} from '../../language/utils';
import { useToggles } from '../../context/TogglesContext';
import { ToggleName } from '../../models/søknad/toggles';

const StyledSpråkvelger = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledWrapper = styled(Wrapper)`
  width: 170px;
  border: 3px solid ${navFarger.navGra40};
  border-radius: 0.25rem;
  position: relative;
  outline: none;
`;

const StyledButton = styled(Button)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-gap: 1.22rem;
  padding: 0.5rem 1rem 0.5rem 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${navFarger.navOransjeLighten40};
    border-color: transparent;
  }
`;

export const SVGFlagg = styled.div`
  text-align: left;
  width: 65%;
`;

export const StyledTekst = styled(Normaltekst)`
  text-align: left;
  width: 65%;
`;

const StyledChevronNed = styled(NedChevron)`
  align-self: center;
`;

const Språkvelger: React.FC<any> = () => {
  const [locale, setLocale] = useSpråkContext();
  const { toggles } = useToggles();
  const språkObjekter = toggles[ToggleName.leggTilNynorsk]
    ? hentListeMedSpråk()
    : hentListeMedSpråkUtenNynorsk();

  const handleSelection = (value: JSX.Element[]) => {
    const språk = value[1].props.children;
    const loc = språkObjekter.find((språkobj) => språkobj.tittel === språk);
    if (loc) {
      setLocale(loc.locale);
    }
  };

  return (
    <StyledSpråkvelger>
      <StyledWrapper
        onSelection={(value: JSX.Element[]) => handleSelection(value)}
      >
        <StyledButton>
          <SVGFlagg>
            {locale === 'en' ? <EngelskFlaggSVG /> : <NorskFlaggSVG />}
          </SVGFlagg>
          <StyledTekst>{hentValgtSpråk(locale)}</StyledTekst>
          <StyledChevronNed />
        </StyledButton>
        <SpråkSelectMenu locale={locale} språkObjekter={språkObjekter} />
      </StyledWrapper>
    </StyledSpråkvelger>
  );
};

export default Språkvelger;
