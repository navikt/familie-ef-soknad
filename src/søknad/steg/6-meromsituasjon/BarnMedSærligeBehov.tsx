import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import AlertStripeDokumentasjon from '../../../components/AlertstripeDokumentasjon';
import { useSøknad } from '../../../context/SøknadContext';
import { ISpørsmål, ISvar } from '../../../models/felles/spørsmålogsvar';
import { storeForbokstaver } from '../../../utils/tekst';
import { DinSituasjonType } from '../../../models/steg/dinsituasjon/meromsituasjon';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import { Textarea } from 'nav-frontend-skjema';
import LocaleTekst from '../../../language/LocaleTekst';
import { IntlShape, useIntl } from 'react-intl';
import { oppdaterObjektIListe } from '../../../utils/array';
import { IBarn } from '../../../models/steg/barn';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { hentBarnetsNavnEllerBeskrivelse } from '../../../utils/barn';

const MAX_LENGDE_BEGRUNDELSE = 1500;

const BarnMedSærligeBehov: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknad();

  const barnMedSærligeBehov = søknad.person.barn.filter(
    (barn) => barn.harSærligeTilsynsbehov
  );

  const valgteSvar = barnMedSærligeBehov.map((barn) => barn.id);

  const settBarnTrengerSærligBehov = (
    spørsmålet: ISpørsmål,
    erBarnetHuketAv: boolean,
    svar: ISvar
  ) => {
    const indeksBarnSomErHuket = søknad.person.barn.findIndex(
      (barn) => barn.id === svar.id
    );
    const barnMedSærligeBehov = søknad.person.barn[indeksBarnSomErHuket];

    settSøknad((prevSøknad) => {
      const leggTilHarSærligeBehovFelt = () => {
        const oppdatertBarn = {
          ...barnMedSærligeBehov,
          harSærligeTilsynsbehov: {
            verdi: '',
            label: intl.formatMessage({
              id: 'dinSituasjon.legend.særligTilsyn',
            }),
          },
        };
        return {
          ...prevSøknad,
          person: {
            ...prevSøknad.person,
            barn: oppdaterObjektIListe<IBarn>(
              søknad.person.barn,
              oppdatertBarn,
              indeksBarnSomErHuket
            ),
          },
        };
      };

      const fjernSærligBehovFeltet = () => {
        const { harSærligeTilsynsbehov, ...barn } = barnMedSærligeBehov;
        return {
          ...prevSøknad,
          person: {
            ...prevSøknad.person,
            barn: oppdaterObjektIListe<IBarn>(
              søknad.person.barn,
              barn,
              indeksBarnSomErHuket
            ),
          },
        };
      };

      if (!erBarnetHuketAv) {
        return leggTilHarSærligeBehovFelt();
      } else {
        return fjernSærligBehovFeltet();
      }
    });
  };

  const settBarnSærligBehovBegrunnelse = (
    barnMedSærligeBehovBegrunnelse: IBarn,
    begrunnelse: string
  ) => {
    const indeksBarnSomErHuket = søknad.person.barn.findIndex(
      (barn) => barn.id === barnMedSærligeBehovBegrunnelse.id
    );
    const barnMedSærligeBehov = søknad.person.barn[indeksBarnSomErHuket];

    settSøknad((prevSøknad) => {
      const oppdatertBarn = {
        ...barnMedSærligeBehov,
        harSærligeTilsynsbehov: {
          verdi: begrunnelse,
          label: intl.formatMessage({ id: 'dinSituasjon.legend.særligTilsyn' }),
        },
      };
      return {
        ...prevSøknad,
        person: {
          ...prevSøknad.person,
          barn: oppdaterObjektIListe<IBarn>(
            søknad.person.barn,
            oppdatertBarn,
            indeksBarnSomErHuket
          ),
        },
      };
    });
  };

  const barnSvarsAlternativer: ISvar[] = søknad.person.barn.map((barn) => ({
    id: barn.id,
    svar_tekst: hentBarnetsNavnEllerBeskrivelse(barn, intl),
  }));

  const spørsmål: ISpørsmål = {
    flersvar: true,
    svaralternativer: barnSvarsAlternativer,
    søknadid: DinSituasjonType.harBarnMedSærligeBehov,
    tekstid: 'dinSituasjon.legend.særligTilsyn',
  };

  return (
    <KomponentGruppe>
      <AlertStripeDokumentasjon>
        <LocaleTekst tekst="harBarnMedSærligeBehov.alert-dok.tittel" />
        <LocaleTekst tekst="harBarnMedSærligeBehov.alert-dok.beskrivelse" />
      </AlertStripeDokumentasjon>
      <div className="blokk-m">
        <CheckboxSpørsmål
          spørsmål={spørsmål}
          valgteSvar={valgteSvar}
          settValgteSvar={settBarnTrengerSærligBehov}
        />
      </div>
      {barnMedSærligeBehov.map((barn) => {
        return (
          <Textarea
            onChange={(e) =>
              settBarnSærligBehovBegrunnelse(barn, e.target.value)
            }
            label={<BarnMedSærligeBehovLabelTekst barn={barn} intl={intl} />}
            value={barn.harSærligeTilsynsbehov?.verdi || ''}
            maxLength={MAX_LENGDE_BEGRUNDELSE}
          />
        );
      })}
    </KomponentGruppe>
  );
};

const BarnMedSærligeBehovLabelTekst: React.FC<{
  barn: IBarn;
  intl: IntlShape;
}> = (props: { barn: IBarn; intl: IntlShape }) => {
  return (
    <>
      <Element className="blokk-xs">
        {' '}
        {`Om ${hentBarnetsNavnEllerBeskrivelse(
          props.barn,
          props.intl
        )} tilsynsbehov`}{' '}
      </Element>
      <Normaltekst>Vi trenger opplysninger om:</Normaltekst>
      <ul>
        <li>
          <Normaltekst>
            hvor mye og hvordan barnet ditt trenger tilsyn
          </Normaltekst>
        </li>
        <li>
          <Normaltekst>
            hvordan det påvirker muligheten din til å være i yrkesrettet
            aktivitet
          </Normaltekst>
        </li>
      </ul>
    </>
  );
};

export default BarnMedSærligeBehov;
