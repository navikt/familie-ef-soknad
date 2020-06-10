import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Side from '../../../components/side/Side';
import CheckboxSpørsmål from '../../../components/spørsmål/CheckboxSpørsmål';
import { hvaErDinArbeidssituasjonSpm } from './AktivitetConfig';
import { IAktivitet } from '../../../models/steg/aktivitet/aktivitet';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { ISpørsmål, ISvar } from '../../../models/spørsmålogsvar';
import { hentTekst } from '../../../utils/søknad';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { returnerAvhukedeSvar } from '../../../utils/spørsmålogsvar';
import { useSøknad } from '../../../context/SøknadContext';
import {
  filtrerAktivitetSvaralternativer,
  fjernAktivitet,
} from '../../../helpers/arbeidssituasjon/aktivitet';
import AktivitetOppfølgingSpørsmål from './AktivitetOppfølgingSpørsmål';
import { erAktivitetSeksjonFerdigUtfylt } from '../../../helpers/arbeidssituasjon/aktivitetvalidering';

const Aktivitet: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad, settDokumentasjonsbehov } = useSøknad();
  const history = useHistory();
  const location = useLocation();
  const [arbeidssituasjon, settArbeidssituasjon] = useState<IAktivitet>({
    ...søknad.aktivitet,
    hvaErDinArbeidssituasjon: søknad.aktivitet.hvaErDinArbeidssituasjon,
  });
  const { hvaErDinArbeidssituasjon } = arbeidssituasjon;
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  useEffect(() => {
    settSøknad({ ...søknad, aktivitet: arbeidssituasjon });
    // eslint-disable-next-line
  }, [arbeidssituasjon]);

  const oppdaterArbeidssituasjon = (nyArbeidssituasjon: IAktivitet) => {
    settArbeidssituasjon({ ...arbeidssituasjon, ...nyArbeidssituasjon });
  };

  const settArbeidssituasjonFelt = (
    spørsmål: ISpørsmål,
    svarHuketAv: boolean,
    svar: ISvar
  ) => {
    const { avhukedeSvar, svarider } = returnerAvhukedeSvar(
      hvaErDinArbeidssituasjon,
      svarHuketAv,
      svar,
      intl
    );

    const endretArbeidssituasjon = fjernAktivitet(svarider, arbeidssituasjon);

    oppdaterArbeidssituasjon({
      ...endretArbeidssituasjon,
      [spørsmål.søknadid]: {
        spørsmålid: spørsmål.søknadid,
        svarid: svarider,
        label: hentTekst(spørsmål.tekstid, intl),
        verdi: avhukedeSvar,
      },
    });
    settDokumentasjonsbehov(spørsmål, svar, svarHuketAv);
  };

  const erAlleFelterUtfylt = hvaErDinArbeidssituasjon.svarid.every(
    (id) => erAktivitetSeksjonFerdigUtfylt(id, arbeidssituasjon) === true
  );

  const erSisteSpørsmålBesvartOgMinstEttAlternativValgt =
    hvaErDinArbeidssituasjon.svarid.length !== 0 && erAlleFelterUtfylt;

  const erSpørsmålFørAktivitetBesvart = (
    svarid: string,
    arbeidssituasjon: IAktivitet
  ) => {
    return arbeidssituasjon.hvaErDinArbeidssituasjon.svarid
      .filter((aktivitet) => aktivitet !== svarid)
      .every(
        (id) => erAktivitetSeksjonFerdigUtfylt(id, arbeidssituasjon) === true
      );
  };

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.arbeidssituasjon' })}
      skalViseKnapper={!kommerFraOppsummering}
      erSpørsmålBesvart={erSisteSpørsmålBesvartOgMinstEttAlternativValgt}
    >
      <SeksjonGruppe>
        <CheckboxSpørsmål
          spørsmål={filtrerAktivitetSvaralternativer(
            søknad.person,
            hvaErDinArbeidssituasjonSpm
          )}
          settValgteSvar={settArbeidssituasjonFelt}
          valgteSvar={hvaErDinArbeidssituasjon?.verdi}
        />
      </SeksjonGruppe>

      {arbeidssituasjon.hvaErDinArbeidssituasjon.svarid.map((svarid) => {
        const harValgtFlereEnnEn = hvaErDinArbeidssituasjon.svarid.length !== 0;

        const erValgtFørsteAktivitet =
          hvaErDinArbeidssituasjon.svarid[0] === svarid;

        const visSeksjon = harValgtFlereEnnEn
          ? !erValgtFørsteAktivitet
            ? erSpørsmålFørAktivitetBesvart(svarid, arbeidssituasjon)
            : true
          : true;

        console.log('visSeksjon', visSeksjon, svarid);

        return (
          visSeksjon && (
            <AktivitetOppfølgingSpørsmål
              svarid={svarid}
              arbeidssituasjon={arbeidssituasjon}
              settArbeidssituasjon={settArbeidssituasjon}
            />
          )
        );
      })}

      {kommerFraOppsummering ? (
        <div className={'side'}>
          <Hovedknapp
            className="tilbake-til-oppsummering"
            onClick={() =>
              history.push({
                pathname: '/oppsummering',
              })
            }
          >
            {hentTekst('oppsummering.tilbake', intl)}
          </Hovedknapp>
        </div>
      ) : null}
    </Side>
  );
};

export default Aktivitet;
