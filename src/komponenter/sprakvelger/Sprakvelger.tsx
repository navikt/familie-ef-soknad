import * as React from 'react';
import EngelskFlaggSVG from './EngelskFlaggSVG';
import NorskFlaggSVG from './NorskFlaggSVG';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import NedChevron from 'nav-frontend-chevron/lib/ned-chevron';
import { locale } from 'moment';

interface Props {
  byttSprak: (sprak: string) => void;
  valgtSprak: string;
}

const Sprakvelger: React.FC<Props> = ({ byttSprak, valgtSprak }) => {
  return <div className="sprakvelger"></div>;
};

export default Sprakvelger;
