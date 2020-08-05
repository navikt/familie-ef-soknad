import React, { FC } from 'react';
import EkspanderbarOppsummering from '../../../components/stegKomponenter/EkspanderbarOppsummering';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import LocaleTekst from '../../../language/LocaleTekst';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { hentTekst } from '../../../utils/søknad';
import { IBarn } from '../../../models/barn';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { hentPath, RouteEnum, Routes } from '../../routing/Routes';
import { IDatoFelt, ISpørsmålBooleanFelt } from '../../../models/søknadsfelter';
import { ESøkerFraBestemtMåned } from '../../../models/steg/dinsituasjon/meromsituasjon';

import { parseISO } from 'date-fns';
import { formatDate, tilDato } from '../../../utils/dato';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';

interface Props {
  søkerFraBestemtDato?: ISpørsmålBooleanFelt;
  søknadsdato?: IDatoFelt;
  barnSomSkalHaBarnepass: IBarn[];
}

const OppsummeringBarnepass: FC<Props> = ({
  barnSomSkalHaBarnepass,
  søknadsdato,
  søkerFraBestemtDato,
}) => {
  const history = useHistory();
  const intl = useIntl();

  const visLabelOgSvarForBarn = (barn: IBarn) => {
    // VIS ÅRSAKBARN
    // VIS BARNEPASSORDNINGER FOR BARN
  };

  return (
    <Ekspanderbartpanel
      tittel={
        <Undertittel>
          <LocaleTekst tekst={'barnepass.sidetittel'} />
        </Undertittel>
      }
    >
      <EkspanderbarOppsummering>
        {barnSomSkalHaBarnepass.map((barn: IBarn) =>
          visLabelOgSvarForBarn(barn)
        )}

        {søkerFraBestemtDato && (
          <>
            <FeltGruppe>
              <Element>{søkerFraBestemtDato.label}</Element>
              <Normaltekst>
                {søkerFraBestemtDato.svarid === ESøkerFraBestemtMåned.ja
                  ? hentTekst('svar.ja', intl)
                  : hentTekst(
                      'søkerFraBestemtMåned.svar.neiNavKanVurdere',
                      intl
                    )}
              </Normaltekst>
            </FeltGruppe>

            {søkerFraBestemtDato.svarid === ESøkerFraBestemtMåned.ja &&
              søknadsdato?.verdi && (
                <FeltGruppe>
                  <Element>{søknadsdato.label}</Element>
                  <Normaltekst>
                    {formatDate(tilDato(parseISO(søknadsdato?.verdi)))}
                  </Normaltekst>
                </FeltGruppe>
              )}
          </>
        )}
        <FeltGruppe>
          <LenkeMedIkon
            onClick={() =>
              history.push({
                pathname: hentPath(Routes, RouteEnum.Barnepass),
                state: { kommerFraOppsummering: true },
              })
            }
            tekst_id="barnasbosted.knapp.endre"
            ikon={endre}
          />
        </FeltGruppe>
      </EkspanderbarOppsummering>
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBarnepass;
