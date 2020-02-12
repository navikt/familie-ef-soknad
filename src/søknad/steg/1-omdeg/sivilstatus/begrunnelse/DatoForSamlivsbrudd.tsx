import React from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../../../components/dato/Datovelger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import LocaleTekst from '../../../../../language/LocaleTekst';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import { IDatoFelt } from '../../../../../models/søknadsfelter';

interface Props {
  settDato: (date: Date | null, objektnøkkel: string, tekstid: string) => void;
  datoForSamlivsbrudd: IDatoFelt | undefined;
}

const DatoForSamlivsbrudd: React.FC<Props> = ({
  settDato,
  datoForSamlivsbrudd,
}) => {
  return (
    <>
      <KomponentGruppe>
        <Datovelger
          settDato={(e) =>
            settDato(
              e,
              'datoForSamlivsbrudd',
              'sivilstatus.sporsmål.datoForSamlivsbrudd'
            )
          }
          valgtDato={
            datoForSamlivsbrudd ? datoForSamlivsbrudd.verdi : undefined
          }
          tekstid={'sivilstatus.sporsmål.datoForSamlivsbrudd'}
          datobegrensning={DatoBegrensning.AlleDatoer}
        />
        <AlertStripeInfo className={'fjernBakgrunn'}>
          <LocaleTekst tekst={'sivilstatus.alert.samlivsbrudd'} />
        </AlertStripeInfo>
      </KomponentGruppe>
    </>
  );
};

export default DatoForSamlivsbrudd;
