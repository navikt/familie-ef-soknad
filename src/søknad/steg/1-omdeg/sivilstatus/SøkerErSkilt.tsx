import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import { erUformeltGiftSpørsmål } from './SivilstatusConfig';
import {
  ESvar,
  ISpørsmål,
  ISvar,
} from '../../../../models/felles/spørsmålogsvar';
import AlertstripeDokumentasjon from '../../../../components/AlertstripeDokumentasjon';
import LocaleTekst from '../../../../language/LocaleTekst';
import { hentSvarAlertFraSpørsmål } from '../../../../utils/søknad';
import React from 'react';
import { ISivilstatus } from '../../../../models/steg/omDeg/sivilstatus';
import Show from '../../../../utils/showIf';
import { useLokalIntlContext } from '../../../../context/LokalIntlContext';

interface Props {
  sivilstatus: ISivilstatus;
  settSivilstatusFelt: (spørsmål: ISpørsmål, valgtSvar: ISvar) => void;
  settHarValgtSvartPåGiftUtenAtDetErRegistrertSpørsmålet: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const SøkerErSkilt: React.FC<Props> = ({
  sivilstatus,
  settSivilstatusFelt,
  settHarValgtSvartPåGiftUtenAtDetErRegistrertSpørsmålet,
}: Props) => {
  const intl = useLokalIntlContext();

  const hentValgtSvar = (spørsmål: ISpørsmål, sivilstatus: ISivilstatus) => {
    for (const [key, value] of Object.entries(sivilstatus)) {
      if (key === spørsmål.søknadid && value !== undefined) {
        return value.verdi;
      }
    }
  };

  const harSvartJaPåUformeltGift =
    sivilstatus.erUformeltGift?.svarid === ESvar.JA;

  const harSvartPåSpørsmål =
    sivilstatus.erUformeltGift?.svarid === ESvar.JA ||
    sivilstatus.erUformeltGift?.svarid === ESvar.NEI;

  settHarValgtSvartPåGiftUtenAtDetErRegistrertSpørsmålet(harSvartPåSpørsmål);

  return (
    <>
      <KomponentGruppe>
        <JaNeiSpørsmål
          spørsmål={erUformeltGiftSpørsmål(intl)}
          onChange={settSivilstatusFelt}
          valgtSvar={hentValgtSvar(erUformeltGiftSpørsmål(intl), sivilstatus)}
        />
        <Show if={harSvartJaPåUformeltGift}>
          <AlertstripeDokumentasjon>
            <LocaleTekst
              tekst={hentSvarAlertFraSpørsmål(
                ESvar.JA,
                erUformeltGiftSpørsmål(intl)
              )}
            />
          </AlertstripeDokumentasjon>
        </Show>
      </KomponentGruppe>
    </>
  );
};

export default SøkerErSkilt;
