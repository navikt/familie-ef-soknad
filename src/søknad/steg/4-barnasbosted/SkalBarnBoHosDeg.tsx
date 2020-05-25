import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import { skalBarnBoHosDeg } from './ForeldreConfig';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import AlertStripe from 'nav-frontend-alertstriper';
import MultiSvarSpørsmål from '../../../components/spørsmål/MultiSvarSpørsmål';
import { Normaltekst } from 'nav-frontend-typografi';
import { hentTekst } from '../../../utils/søknad';
import LocaleTekst from '../../../language/LocaleTekst';
import { IBarn } from '../../../models/barn';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { useSøknad } from '../../../context/SøknadContext';

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
  const { søknad, settSøknad, settDokumentasjonsbehov } = useSøknad();

  console.log(forelder);

  const settSkalBarnBoHosDegFelt = (spørsmål: ISpørsmål, svar: ISvar) => {
    const nyttBarn = {
      ...barn,
      skalBarnBoHosDeg: {
        label: intl.formatMessage({
          id: 'barnasbosted.spm.skalBarnBoHosDeg',
        }),
        verdi: hentTekst(svar.svar_tekstid, intl),
      },
    };

    const nyBarneListe = [
      ...søknad.person.barn.filter((b) => b.id !== barn.id),
      nyttBarn,
    ];

    settSøknad({
      ...søknad,
      person: { ...søknad.person, barn: nyBarneListe },
    });

    console.log('nyliste', nyBarneListe);

    settDokumentasjonsbehov(spørsmål, svar);

    console.log('ny', søknad.person);
  };

  return (
    <>
      {barn.harSammeAdresse ? (
        <KomponentGruppe>
          <AlertStripe type={'advarsel'} form={'inline'}>
            <LocaleTekst tekst={'barnasbosted.alert.måBoHosDeg'} />
          </AlertStripe>
          <MultiSvarSpørsmål
            key={skalBarnBoHosDeg.søknadid}
            spørsmål={skalBarnBoHosDeg}
            valgtSvar={forelder?.skalBarnBoHosDeg?.verdi}
            settSpørsmålOgSvar={settSkalBarnBoHosDegFelt}
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
