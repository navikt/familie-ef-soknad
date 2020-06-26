import React from 'react';
import { useSøknad } from '../../../context/SøknadContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { VisLabelOgSvar } from '../../../utils/visning';
import endre from '../../../assets/endre.svg';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import { hentTekst } from '../../../utils/søknad';
import { Routes, RouteEnum, hentPath } from '../../../routing/Routes';

const OppsummeringBarnaDine: React.FC = () => {
  const { søknad } = useSøknad();
  const intl = useIntl();
  const history = useHistory();

  const barna = søknad.person.barn;

  const felterAlleBarna = barna.map((barn, index) => {
    let nyttBarn = { ...barn };

    if (!barn.født?.verdi) {
      delete nyttBarn.ident;
      delete nyttBarn.navn;
      delete nyttBarn.alder;

      nyttBarn.fødselsdato = {
        label: hentTekst('barnadine.termindato', intl),
        verdi: barn.fødselsdato.verdi,
      };
    }

    return (
      <div className="oppsummering-barn" key={index}>
        {VisLabelOgSvar(nyttBarn)}
        {index < barna.length - 1 && <hr />}
      </div>
    );
  });

  return (
    <Ekspanderbartpanel tittel={<Undertittel>Barna dine</Undertittel>}>
      {felterAlleBarna}
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: hentPath(Routes, RouteEnum.Barn),
            state: { kommerFraOppsummering: true },
          })
        }
        tekst_id="barnasbosted.knapp.endre"
        ikon={endre}
      />
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBarnaDine;
