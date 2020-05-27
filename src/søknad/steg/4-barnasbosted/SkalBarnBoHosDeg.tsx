import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import { hentTekst } from '../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { Normaltekst } from 'nav-frontend-typografi';
import { skalBarnBoHosDeg } from './ForeldreConfig';
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import { ESkalBarnBoHosDeg } from '../../../models/steg/barnasbosted';
import { IForelder } from '../../../models/forelder';
import { hentBeskjedMedNavn } from '../../../utils/språk';
import { IBarn } from '../../../models/barn';
import MultiSvarSpørsmålMedNavn from '../../../components/spørsmål/MultiSvarSpørsmålMedNavn';
import { hentSpørsmålTekstMedNavnEllerBarn } from '../../../utils/barn';

interface Props {
  barn: IBarn;
  forelder: IForelder;
  settForelder: (forelder: IForelder) => void;
}

const SkalBarnBoHosDeg: React.FC<Props> = ({
  barn,
  forelder,
  settForelder,
}) => {
  const intl = useIntl();
  const { settDokumentasjonsbehov } = useSøknad();

  const settSkalBarnBoHosDegFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    settForelder({
      ...forelder,
      [skalBarnBoHosDeg.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svar.id,
        label: hentTekst('barnasbosted.spm.skalBarnBoHosDeg', intl),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    });
    settDokumentasjonsbehov(spørsmål, svar);
  };

  const hentSpørsmålTekst = (tekstid: string) => {
    const navnEllerBarn = barn.født?.verdi
      ? barn.navn.verdi
      : hentTekst('barnet', intl);
    return hentSpørsmålTekstMedNavnEllerBarn(tekstid, navnEllerBarn, intl);
  };

  return (
    <>
      <FeltGruppe>
        <AlertStripe type={'advarsel'} form={'inline'}>
          {hentSpørsmålTekst('barnasbosted.alert.måBoHosDeg')}
        </AlertStripe>
      </FeltGruppe>
      <KomponentGruppe>
        <MultiSvarSpørsmålMedNavn
          key={skalBarnBoHosDeg.søknadid}
          spørsmål={skalBarnBoHosDeg}
          spørsmålTekst={hentBeskjedMedNavn(
            !barn.født ? hentTekst('barnet', intl) : barn.navn.verdi,
            hentTekst(skalBarnBoHosDeg.tekstid, intl)
          )}
          valgtSvar={forelder.skalBarnBoHosDeg?.verdi}
          settSpørsmålOgSvar={settSkalBarnBoHosDegFelt}
        />
      </KomponentGruppe>
      {forelder.skalBarnBoHosDeg?.svarid ===
        ESkalBarnBoHosDeg.jaMenSamarbeiderIkke && (
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
      )}
    </>
  );
};

export default SkalBarnBoHosDeg;
