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
import { hentValgtSvar } from '../../../../utils/sivilstatus';

interface Props {
  sivilstatus: ISivilstatus;
  settSivilstatusFelt: (spørsmål: ISpørsmål, valgtSvar: ISvar) => void;
}

const SøkerErSkilt: React.FC<Props> = ({
  sivilstatus,
  settSivilstatusFelt,
}: Props) => {
  const intl = useLokalIntlContext();

  const harSvartJaPåUformeltGift =
    sivilstatus.erUformeltGift?.svarid === ESvar.JA;

  return (
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
  );
};

export default SøkerErSkilt;
