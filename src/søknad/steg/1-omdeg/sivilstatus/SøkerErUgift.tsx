import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import JaNeiSpørsmål from '../../../../components/spørsmål/JaNeiSpørsmål';
import {
  erUformeltGiftSpørsmål,
  erUformeltSeparertEllerSkiltSpørsmål,
} from './SivilstatusConfig';
import { ESvar, ISpørsmål } from '../../../../models/felles/spørsmålogsvar';
import AlertstripeDokumentasjon from '../../../../components/AlertstripeDokumentasjon';
import LocaleTekst from '../../../../language/LocaleTekst';
import { hentSvarAlertFraSpørsmål } from '../../../../utils/søknad';
import React from 'react';
import { ISivilstatus } from '../../../../models/steg/omDeg/sivilstatus';
import Show from '../../../../utils/showIf';
import { useIntl } from 'react-intl';

interface Props {
  sivilstatus: any;
  settSivilstatusFelt: any;
  erUformeltGift: any;
}

const SøkerErUgift: React.FC<Props> = ({
  sivilstatus,
  settSivilstatusFelt,
  erUformeltGift,
}: Props) => {
  const intl = useIntl();
  const hentValgtSvar = (spørsmål: ISpørsmål, sivilstatus: ISivilstatus) => {
    for (const [key, value] of Object.entries(sivilstatus)) {
      if (key === spørsmål.søknadid && value !== undefined) {
        return value.verdi;
      }
    }
  };

  const harSvartJaPåUformeltGift =
    sivilstatus.erUformeltGift?.svarid === ESvar.JA;

  const harSvartJaUformeltSeparertEllerSkilt =
    sivilstatus.erUformeltSeparertEllerSkilt?.svarid === ESvar.JA;

  const harSvartPåUformeltGiftSpørsmålet = erUformeltGift?.hasOwnProperty(
    'verdi'
  );
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
      <Show if={harSvartPåUformeltGiftSpørsmålet}>
        <KomponentGruppe>
          <JaNeiSpørsmål
            spørsmål={erUformeltSeparertEllerSkiltSpørsmål(intl)}
            onChange={settSivilstatusFelt}
            valgtSvar={hentValgtSvar(
              erUformeltSeparertEllerSkiltSpørsmål(intl),
              sivilstatus
            )}
          />
          <Show if={harSvartJaUformeltSeparertEllerSkilt}>
            <AlertstripeDokumentasjon>
              <LocaleTekst
                tekst={hentSvarAlertFraSpørsmål(
                  ESvar.JA,
                  erUformeltSeparertEllerSkiltSpørsmål(intl)
                )}
              />
            </AlertstripeDokumentasjon>
          </Show>
        </KomponentGruppe>
      </Show>
    </>
  );
};

export default SøkerErUgift;
