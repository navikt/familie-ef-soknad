import * as React from 'react';
import EngelskFlaggSVG from '../../assets/EngelskFlaggSVG';
import NorskFlaggSVG from '../../assets/NorskFlaggSVG';
import { Wrapper, Button, Menu } from 'react-aria-menubutton';
import NedChevron from 'nav-frontend-chevron/lib/ned-chevron';
import { useSpråkContext } from '../../context/SpråkContext';
import { hentValgtSpråk } from '../../utils/språk';
import { renderMenuItem } from './MenuItem';
import { Språk } from '../../models/språk';
import { Normaltekst } from 'nav-frontend-typografi';

const Språkvelger: React.FC<{ språkObjekter: Språk[] }> = ({
  språkObjekter,
}) => {
  const [locale, setLocale] = useSpråkContext();

  const handleSelection = (value: JSX.Element[]) => {
    const språk = value[1].props.children;
    const loc = språkObjekter.find((språkobj) => språkobj.tittel === språk);
    if (loc) {
      setLocale(loc.locale);
    }
  };

  return (
    <>
      <div className="languageToggle">
        <Wrapper
          className="languageToggle__wrapper"
          onSelection={(value: JSX.Element[]) => handleSelection(value)}
        >
          <Button className="languageToggle__button">
            <div className="languageToggle__button__flag">
              {locale === 'en' ? <EngelskFlaggSVG /> : <NorskFlaggSVG />}
            </div>
            <div className="languageToggle__button__language">
              <Normaltekst>{hentValgtSpråk(locale)}</Normaltekst>
            </div>
            <div>
              <NedChevron />
            </div>
          </Button>
          <Menu className="languageToggle__menu">
            <ul>
              {språkObjekter.map((språkObj) =>
                renderMenuItem(locale, språkObj)
              )}
            </ul>
          </Menu>
        </Wrapper>
      </div>
    </>
  );
};

export default Språkvelger;
