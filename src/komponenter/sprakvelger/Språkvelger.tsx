import * as React from 'react';
import EngelskFlaggSVG from './EngelskFlaggSVG';
import NorskFlaggSVG from './NorskFlaggSVG';
import { Wrapper, Button, Menu } from 'react-aria-menubutton';
import NedChevron from 'nav-frontend-chevron/lib/ned-chevron';
import { useSpråkContext } from '../../context/SpråkContext';
import { hentListeMedSpråk, hentValgtSpråk } from '../../utils/språk';
import { renderMenuItem } from './SpråkvelgerItem';

const Språkvelger: React.FC<any> = () => {
  const [locale, setLocale] = useSpråkContext();
  const språkObjekter = hentListeMedSpråk();

  const handleSelection = (value: JSX.Element[]) => {
    const språk = value[1].props.children;
    const loc = språkObjekter.find((språkobj) => språkobj.tittel === språk);
    loc ? setLocale(loc.locale) : console.log(loc);
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
              {hentValgtSpråk(locale)}
            </div>
            <div>
              <NedChevron />
            </div>
          </Button>
          <Menu className="languageToggle__menu">
            <ul>
              {språkObjekter.map((språkObj) => (
                renderMenuItem(locale, språkObj)
              ))}
            </ul>
          </Menu>
        </Wrapper>
      </div>
    </>
  );
};

export default Språkvelger;
