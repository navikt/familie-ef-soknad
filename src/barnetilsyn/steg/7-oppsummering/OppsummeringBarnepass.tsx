import React, { FC } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import endre from '../../../assets/endre.svg';
import LenkeMedIkon from '../../../components/knapper/LenkeMedIkon';
import LocaleTekst from '../../../language/LocaleTekst';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { hentTekst } from '../../../utils/søknad';
import { IBarn } from '../../../models/steg/barn';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import {
  IDatoFelt,
  ISpørsmålBooleanFelt,
} from '../../../models/søknad/søknadsfelter';
import { ESøkerFraBestemtMåned } from '../../../models/steg/dinsituasjon/meromsituasjon';

import { formatDate, strengTilDato } from '../../../utils/dato';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import {
  VisLabelOgSvar,
  visLabelOgVerdiForSpørsmålFelt,
} from '../../../utils/visning';
import BarneHeader from '../../../components/BarneHeader';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { StyledOppsummeringForBarn } from '../../../components/stegKomponenter/StyledOppsummering';

interface Props {
  søkerFraBestemtDato?: ISpørsmålBooleanFelt;
  søknadsdato?: IDatoFelt;
  barnSomSkalHaBarnepass: IBarn[];
  endreInformasjonPath?: string;
}

const OppsummeringBarnepass: FC<Props> = ({
  barnSomSkalHaBarnepass,
  søknadsdato,
  søkerFraBestemtDato,
  endreInformasjonPath,
}) => {
  const history = useHistory();
  const intl = useIntl();

  return (
    <Ekspanderbartpanel
      tittel={
        <Undertittel>
          <LocaleTekst tekst={'barnepass.sidetittel'} />
        </Undertittel>
      }
    >
      {barnSomSkalHaBarnepass.map((barn: IBarn) => {
        const { barnepass } = barn;

        return (
          <KomponentGruppe>
            <StyledOppsummeringForBarn>
              <FeltGruppe>
                <BarneHeader barn={barn} />
              </FeltGruppe>
              {barnepass?.årsakBarnepass &&
                visLabelOgVerdiForSpørsmålFelt(barnepass.årsakBarnepass, intl)}
              {barnepass?.barnepassordninger.map((barnepassordning) =>
                VisLabelOgSvar(barnepassordning)
              )}
            </StyledOppsummeringForBarn>
          </KomponentGruppe>
        );
      })}

      {søkerFraBestemtDato && (
        <KomponentGruppe>
          <hr />
          <br />
          <div className={'spørsmål-og-svar'}>
            <Element>{søkerFraBestemtDato.label}</Element>
            <Normaltekst>
              {søkerFraBestemtDato.svarid === ESøkerFraBestemtMåned.ja
                ? hentTekst('svar.ja', intl)
                : hentTekst('søkerFraBestemtMåned.svar.neiNavKanVurdere', intl)}
            </Normaltekst>
          </div>

          {søkerFraBestemtDato.svarid === ESøkerFraBestemtMåned.ja &&
            søknadsdato?.verdi && (
              <div className={'spørsmål-og-svar'}>
                <Element>{søknadsdato.label}</Element>
                <Normaltekst>
                  {formatDate(strengTilDato(søknadsdato?.verdi))}
                </Normaltekst>
              </div>
            )}
        </KomponentGruppe>
      )}
      <KomponentGruppe>
        <LenkeMedIkon
          onClick={() =>
            history.push({
              pathname: endreInformasjonPath,
              state: { kommerFraOppsummering: true },
            })
          }
          tekst_id="barnasbosted.knapp.endre"
          ikon={endre}
        />
      </KomponentGruppe>
    </Ekspanderbartpanel>
  );
};

export default OppsummeringBarnepass;
