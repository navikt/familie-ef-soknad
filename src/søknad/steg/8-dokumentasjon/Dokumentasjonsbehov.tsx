import React, { useEffect, useState } from 'react';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import Filopplaster from '../../../components/filopplaster/Filopplaster';
import LocaleTekst from '../../../language/LocaleTekst';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';
import { Checkbox } from 'nav-frontend-skjema';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import { hentTekst } from '../../../utils/søknad';
import { IDokumentasjon } from '../../../models/dokumentasjon';
import { IVedlegg } from '../../../models/vedlegg';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useSøknad } from '../../../context/SøknadContext';

interface Props {
  dokumentasjon: IDokumentasjon;
}

const Dokumentasjonsbehov: React.FC<Props> = ({ dokumentasjon }) => {
  const intl = useIntl();
  const { søknad, settSøknad } = useSøknad();
  const [dokumentasjonsbehov, settDokumentasjon] = useState<IDokumentasjon[]>(
    søknad.dokumentasjonsbehov
  );

  useEffect(() => {
    settSøknad({ ...søknad, dokumentasjonsbehov: dokumentasjonsbehov });
  }, [dokumentasjonsbehov]);

  const settVedlegg = (vedleggliste: IVedlegg[]) => {
    const dokumentasjonMedVedlegg = dokumentasjonsbehov.map((dok) => {
      if (dok.id === dokumentasjon.id) {
        return {
          ...dok,
          opplastedeVedlegg: vedleggliste,
        };
      } else return dok;
    });
    settDokumentasjon(dokumentasjonMedVedlegg);
  };

  const settHarSendtInnTidligere = (e: any) => {
    const dokumentasjonEndret = dokumentasjonsbehov.map((dok) => {
      if (dok.id === dokumentasjon.id) {
        return {
          ...dok,
          harSendtInn: e.target.checked,
        };
      } else return dok;
    });
    settDokumentasjon(dokumentasjonEndret);
  };

  return (
    <SeksjonGruppe>
      <FeltGruppe>
        <Undertittel>
          <LocaleTekst tekst={dokumentasjon.tittel} />
        </Undertittel>
      </FeltGruppe>
      <FeltGruppe>
        <Normaltekst>
          <FormattedHTMLMessage id={dokumentasjon.beskrivelse} />
        </Normaltekst>
      </FeltGruppe>
      <FeltGruppe>
        <Checkbox
          label={hentTekst('dokumentasjon.checkbox.sendtTidligere', intl)}
          checked={dokumentasjon.harSendtInn}
          onChange={settHarSendtInnTidligere}
        />
      </FeltGruppe>
      <Filopplaster
        settVedlegg={settVedlegg}
        vedleggsliste={
          dokumentasjon.opplastedeVedlegg ? dokumentasjon.opplastedeVedlegg : []
        }
        tittel={hentTekst(dokumentasjon.tittel, intl)}
        dokumentasjonsType={hentTekst(dokumentasjon.tittel, intl)}
      />
    </SeksjonGruppe>
  );
};

export default Dokumentasjonsbehov;
