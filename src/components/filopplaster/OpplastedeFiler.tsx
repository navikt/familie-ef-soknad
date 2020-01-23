import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import vedlegg from '../../assets/vedlegg.svg';
import slett from '../../assets/slett.svg';
import { formaterFilstørrelse } from './utils';
//import useSøknadContext from '../../context/SøknadContext';

interface Props {
  filliste: any;
  settFilliste: Function;
}

const OpplastedeFiler: React.FC<Props> = ({ filliste, settFilliste }) => {
  //const { søknad, settSøknad } = useSøknadContext();

  const slettFil = (fil: any) => {
    const temp = filliste.slice();

    const index = temp.indexOf(fil);

    if (index > -1) {
      temp.splice(index, 1);
    }

    const nyListe = filliste.filter((obj: any) => {
      return obj.filObjekt !== fil;
    });

    console.log('nyListe');
    console.log(nyListe);

    settFilliste(nyListe);
  };

  return (
    <>
      {filliste.map((filwrapper: any) => {
        console.log('filwrapper');
        console.log(filwrapper);
        const fil = filwrapper.filObjekt;
        const filKey = fil.name + fil.size;

        return (
          <div key={filKey}>
            <div className="fil">
              <div>
                <img
                  className="vedleggsikon"
                  src={vedlegg}
                  alt="Vedleggsikon"
                />
                <Normaltekst className="filnavn">{fil.name}</Normaltekst>
                <Normaltekst className="filstørrelse">
                  ({formaterFilstørrelse(fil.size)})
                </Normaltekst>
              </div>
              <div
                className="slett"
                onClick={() => {
                  slettFil(fil);
                }}
              >
                <Normaltekst>slett</Normaltekst>
                <img className="slettikon" src={slett} alt="Rødt kryss" />
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default OpplastedeFiler;
