import React from 'react';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import LocaleTekst from '../../language/LocaleTekst';
import AlertStripe from 'nav-frontend-alertstriper';
import { IDokumentasjonsbehov } from '../DokumentasjonsbehovModel';
import { hentDokumentasjonsConfigInnslagForDokumentasjonsbehov } from '../DokumentasjonsbehovUtils';
import { default as vedleggIkon } from '../../assets/vedlegg.svg';

interface Props {
  vedlegg: IDokumentasjonsbehov[];
}

const InnsendteVedlegg: React.FC<Props> = ({ vedlegg }) => {
  return (
    <div className="seksjon">
      <Systemtittel>
        Dokumentasjon som ble sendt inn sammen med søknaden
      </Systemtittel>

      {vedlegg.map((dokumentasjonsbehov: IDokumentasjonsbehov) => (
        <AlertStripe
          type={'suksess'}
          form={'inline'}
          key={dokumentasjonsbehov.id}
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
            {dokumentasjonsbehov.opplastedeVedlegg.map((fil) => (
              <div className="fil" key={fil.id}>
                <img
                  className="vedleggsikon"
                  src={vedleggIkon}
                  alt="Vedleggsikon"
                />
                <Normaltekst className="filnavn">{fil.navn}</Normaltekst>
              </div>
            ))}
          </div>
        </AlertStripe>
      ))}
    </div>
  );
};

export default InnsendteVedlegg;
