import React from 'react';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../language/LocaleTekst';
import AlertStripe from 'nav-frontend-alertstriper';
import { IDokumentasjonsbehov } from '../DokumentasjonsbehovModel';
import { hentDokumentasjonsConfigInnslagForDokumentasjonsbehov } from '../DokumentasjonsbehovUtils';

interface Props {
  alleredeSendtInn: IDokumentasjonsbehov[];
}

const AlleredeInnsendtVedlegg: React.FC<Props> = ({ alleredeSendtInn }) => {
  return (
    <div className="seksjon">
      <Systemtittel>
        Dokumentasjon du har oppgitt at du tidligere har sendt inn til oss
      </Systemtittel>

      {alleredeSendtInn.map((dokumentasjonsbehov: IDokumentasjonsbehov) => (
        <AlertStripe
          type={'suksess'}
          form={'inline'}
          key={dokumentasjonsbehov.id}
          className={'tekstblokk'}
        >
          <div>
            <Undertittel>
              <LocaleTekst
                tekst={
                  hentDokumentasjonsConfigInnslagForDokumentasjonsbehov(
                    dokumentasjonsbehov
                  ).tittel
                }
              />
            </Undertittel>
          </div>
        </AlertStripe>
      ))}
    </div>
  );
};

export default AlleredeInnsendtVedlegg;
