import React from 'react';
import SprakTekst from '../sprak/LocaleTekst';
import { FormattedMessage } from 'react-intl';
import { ISporsmal } from '../typer/sporsmal';
import { useSpråkContext } from '../context/SpråkContext';

interface ISporsmalProps {
  sporsmalListe: ISporsmal[];
  steg: number;
}

type MergedProps = ISporsmalProps;
const Sporsmal: React.FC<MergedProps> = ({ sporsmalListe, steg }) => {
  const sporsmal = sporsmalListe[steg];
  console.log(sporsmal);
  const [locale, setLocale] = useSpråkContext();

  return (
    <div>
      <SprakTekst tekst={sporsmal.tittel} />
      <FormattedMessage id={'app.tekst'} defaultMessage={'Tekst da'} />
      <button value={'nb'} onClick={() => setLocale('nb')}>
        Bokmål
      </button>
      <button value={'nn'} onClick={() => setLocale('nn')}>
        Nynorsk
      </button>
      <button value={'en'} onClick={() => setLocale('en')}>
        English
      </button>
    </div>
  );
};

export default Sporsmal;
