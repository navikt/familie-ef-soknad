import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import { IBarn } from '../../../models/person';
import { skalBarnBoHosDeg } from './ForeldreConfig';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { Normaltekst } from 'nav-frontend-typografi';
import LocaleTekst from '../../../language/LocaleTekst';

interface Props {
  barn: IBarn;
  forelder: any;
  settForelder: Function;
}

const SkalBarnBoHosDeg: React.FC<Props> = ({
  barn,
  forelder,
  settForelder,
}) => {
  const intl = useIntl();

  return (
    <>
      {!barn.harSammeAdresse ? (
        <KomponentGruppe>
          <AlertStripe type={'advarsel'} form={'inline'}>
            <LocaleTekst tekst={'barnasbosted.alert.måBoHosDeg'} />
          </AlertStripe>
          <MultiSvarSpørsmål
            key={skalBarnBoHosDeg.søknadid}
            spørsmål={skalBarnBoHosDeg}
            valgtSvar={forelder.skalBarnBoHosDeg}
            settSpørsmålOgSvar={(_, svar) =>
              settForelder({ ...forelder, [skalBarnBoHosDeg.søknadid]: svar })
            }
          />
        </KomponentGruppe>
      ) : null}
      {forelder.skalBarnBoHosDeg ===
      intl.formatMessage({ id: 'barnasbosted.spm.jaMenSamarbeiderIkke' }) ? (
        <FeltGruppe>
          <AlertStripe type={'info'} form={'inline'}>
            <LocaleTekst tekst={'barnasbosted.alert.hvisFaktiskBor'} />
          </AlertStripe>
          <FeltGruppe>
            <Normaltekst className="innskutt">
              Familievernkontoret kan også hjelpe deg
            </Normaltekst>
          </FeltGruppe>
          <Normaltekst className="innskutt">
            Når det kommer til denne søknaden kan du dokumentere at Lise bor hos
            deg ved å sende inn for eksempel:
          </Normaltekst>
          <ul className="dokumentere-bosted">
            <li>
              <Normaltekst>
                redegjørelse for årsaken til manglende adresseendring for barnet
              </Normaltekst>
            </li>
            <li>
              <Normaltekst>
                kopi av flyttemelding/tips til Folkeregisteret
              </Normaltekst>
            </li>
            <li>
              <Normaltekst>
                bekreftelse fra for eksempel barnehage/skole, barnevern eller
                helsestasjon
              </Normaltekst>
            </li>
          </ul>
        </FeltGruppe>
      ) : null}
    </>
  );
};

export default SkalBarnBoHosDeg;
