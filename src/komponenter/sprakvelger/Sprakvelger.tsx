import * as React from 'react';
import EngelskFlaggSVG from './EngelskFlaggSVG';
import NorskFlaggSVG from './NorskFlaggSVG';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import NedChevron from 'nav-frontend-chevron/lib/ned-chevron';
import { locale } from 'moment';

interface Props {
  locale: string;
}

const Sprakvelger: React.FC<Props> = (props) => {
  return <div className="sprakvelger"></div>;
};

export default Sprakvelger;
