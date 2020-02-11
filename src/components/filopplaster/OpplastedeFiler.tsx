import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import vedlegg from '../../assets/vedlegg.svg';
import slett from '../../assets/Slett.svg';
import { formaterFilstørrelse } from './utils';
import useSøknadContext from '../../context/SøknadContext';

interface Props {
  filliste: any;
  settFilliste: Function;
}

const OpplastedeFiler: React.FC<Props> = ({ filliste, settFilliste }) => {
  const { søknad, settSøknad } = useSøknadContext();

  const slettFil = (filwrapper: any) => {
    const fil = filwrapper.filObjekt;

    const nyListe = filliste.filter((obj: any) => {
      return obj.filObjekt !== fil;
    });

    const nyVedleggsliste = søknad.vedleggsliste.filter((obj: any) => {
      return obj.dokumentId !== filwrapper.dokumentId;
    });

    settFilliste(nyListe);

    settSøknad({
      ...søknad,
      vedleggsliste: nyVedleggsliste,
    });
  };

  return (
    <>
      {filliste.map((filwrapper: any) => {
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
                  slettFil(filwrapper);
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
