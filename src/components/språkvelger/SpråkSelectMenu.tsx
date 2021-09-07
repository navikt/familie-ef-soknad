import * as React from 'react';
import { Språk } from '../../models/felles/språk';
import { Menu, MenuItem } from 'react-aria-menubutton';
import EngelskFlaggSVG from '../../assets/EngelskFlaggSVG';
import NorskFlaggSVG from '../../assets/NorskFlaggSVG';
import { FC } from 'react';
import styled from 'styled-components/macro';
import { StyledTekst, SVGFlagg } from './Språkvelger';
import navFarger from 'nav-frontend-core';

const StyledSpråkMeny = styled(Menu)`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
`;

const StyledListe = styled.ul`
  margin: 0;
  padding-left: 0;

  position: absolute;
  width: 100%;
  z-index: 100;
  left: 0;
  top: 100%;

  &:hover {
    outline: none;
    box-shadow: 0 0 0 3px ${navFarger.navOransjeLighten40};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${navFarger.navOransjeLighten40};
  }

  ul {
    margin: 0;
    padding-left: 0;

    position: absolute;
    width: 100%;
    z-index: 100;
    left: 0;
    top: 100%;
  }

  li {
    width: 100%;
    list-style: none;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-gap: 1.1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  outline: none;
  background-color: #ffffff;
  border-bottom: 1px solid ${navFarger.navGra40};
  border-left: 1px solid ${navFarger.navGra40};
  border-right: 1px solid ${navFarger.navGra40};

  &:hover {
    outline: none;
    cursor: pointer;
    box-shadow: 0 0 0 3px ${navFarger.navOransjeLighten40};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${navFarger.navOransjeLighten40};
  }
`;

const SelectMenuItem: FC<{ språkObj: Språk }> = ({ språkObj }) => {
  return (
    <li key={språkObj.locale} value={språkObj.locale}>
      <StyledMenuItem>
        <SVGFlagg key={språkObj.locale}>
          {språkObj.locale === 'en' ? <EngelskFlaggSVG /> : <NorskFlaggSVG />}
        </SVGFlagg>
        <StyledTekst id={språkObj.tittel}>{språkObj.tittel}</StyledTekst>
      </StyledMenuItem>
    </li>
  );
};

export const SpråkSelectMenu: FC<{
  språkObjekter: Språk[];
  locale: string;
}> = ({ språkObjekter, locale }) => {
  return (
    <StyledSpråkMeny>
      <StyledListe>
        {språkObjekter.map((språkObj) => {
          return (
            språkObj.locale !== locale && (
              <SelectMenuItem key={språkObj.locale} språkObj={språkObj} />
            )
          );
        })}
      </StyledListe>
    </StyledSpråkMeny>
  );
};
