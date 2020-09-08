import React from 'react';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../language/LocaleTekst';
import AlertStripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { IDokumentasjonsbehov, SøknadType } from '../DokumentasjonsbehovModel';
import {
  hentDokumentasjonsConfigInnslagForDokumentasjonsbehov,
  søknadTypeTilEttersendelseUrl,
} from '../DokumentasjonsbehovUtils';

interface Props {
  manglendeVedlegg: IDokumentasjonsbehov[];
  søknadType: SøknadType;
}

const ManglendeVedlegg: React.FC<Props> = ({
  manglendeVedlegg,
  søknadType,
}) => {
  return (
    <div className="seksjon">
      <Systemtittel>
        Dokumentasjon som ikke ble sendt inn sammen med søknaden
      </Systemtittel>
      {manglendeVedlegg.map((dokumentasjonsbehov) => {
        const dokumentasjonsConfig = hentDokumentasjonsConfigInnslagForDokumentasjonsbehov(
          dokumentasjonsbehov
        );
        return (
          <AlertStripe
            type={'advarsel'}
            form={'inline'}
            className={'tekstblokk'}
            key={dokumentasjonsbehov.id}
          >
            <div>
              <Undertittel>
                <LocaleTekst tekst={dokumentasjonsConfig.tittel} />
              </Undertittel>
              {dokumentasjonsConfig.beskrivelse && (
                <Normaltekst>
                  <LocaleTekst tekst={dokumentasjonsConfig.beskrivelse} />
                </Normaltekst>
              )}
            </div>
          </AlertStripe>
        );
      })}

      <Hovedknapp
        onClick={() => {
          window.location.href = søknadTypeTilEttersendelseUrl(søknadType);
        }}
      >
        Ettersend dokumentasjon
      </Hovedknapp>
    </div>
  );
};

export default ManglendeVedlegg;
