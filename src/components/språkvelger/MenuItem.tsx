import * as React from 'react';
import { Språk } from '../../models/språk';
import { MenuItem } from 'react-aria-menubutton';
import EngelskFlaggSVG from '../../assets/EngelskFlaggSVG';
import NorskFlaggSVG from '../../assets/NorskFlaggSVG';
import { Normaltekst } from 'nav-frontend-typografi';

export const renderMenuItem = (valgtSpråkLocale: string, sprakobj: Språk) => {
  const erSprakObjValgtSprakObj = sprakobj.locale === valgtSpråkLocale;

  return (
    !erSprakObjValgtSprakObj && (
      <li key={sprakobj.locale} value={sprakobj.locale}>
        <MenuItem className="languageToggle__menu__item">
          <div className="languageToggle__button__flag">
            {sprakobj.locale === 'en' ? <EngelskFlaggSVG /> : <NorskFlaggSVG />}
          </div>
          <div
            id={`languagesprakobj_${sprakobj}`}
            className="languageToggle__button__language"
          >
            <Normaltekst>{sprakobj.tittel}</Normaltekst>
          </div>
        </MenuItem>
      </li>
    )
  );
};
