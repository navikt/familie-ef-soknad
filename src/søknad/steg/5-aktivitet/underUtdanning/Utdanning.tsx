import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import KomponentGruppe from '../../../../components/gruppe/KomponentGruppe';
import SlettKnapp from '../../../../components/knapper/SlettKnapp';
import TittelOgSlettKnapp from '../../../../components/knapper/TittelOgSlettKnapp';
import { hentTekst } from '../../../../utils/søknad';
import { hentTittelMedNr } from '../../../../language/utils';
import { Input } from 'nav-frontend-skjema';
import { IUtdanning } from '../../../../models/steg/aktivitet/utdanning';
import { linjeKursGrad } from './UtdanningConfig';
import { tomPeriode } from '../../../../helpers/tommeSøknadsfelter';
import { Undertittel } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import { harValgtSvar } from '../../../../utils/spørsmålogsvar';
import { EPeriode } from '../../../../models/felles/periode';
import PeriodeÅrMånedvelgere from '../../../../components/dato/PeriodeÅrMånedvelgere';
import { DatoBegrensning } from '../../../../components/dato/Datovelger';

interface Props {
  tidligereUtdanninger: IUtdanning[];
  settTidligereUtdanninger: (tidligereUtdanninger: IUtdanning[]) => void;
  utdanningsnummer: number;
}

const Utdanning: React.FC<Props> = ({
  tidligereUtdanninger,
  settTidligereUtdanninger,
  utdanningsnummer,
}) => {
  const intl = useIntl();
  const utdanningFraSøknad = tidligereUtdanninger?.find(
    (utdanning, index) => index === utdanningsnummer && utdanning
  );

  const [utdanning, settUtdanning] = useState<IUtdanning>(utdanningFraSøknad!);

  useEffect(() => {
    const endretTidligereUtdanninger = tidligereUtdanninger?.map(
      (tidligereUtdanningFraSøknad, index) => {
        if (index === utdanningsnummer) return utdanning;
        else return tidligereUtdanningFraSøknad;
      }
    );
    endretTidligereUtdanninger &&
      settTidligereUtdanninger(endretTidligereUtdanninger);
    // eslint-disable-next-line
  }, [utdanning]);

  const linjeKursGradLabel = hentTekst(linjeKursGrad.label_tekstid, intl);

  const fjernUtdanning = () => {
    if (tidligereUtdanninger && tidligereUtdanninger.length > 1) {
      const endretUtdanning = tidligereUtdanninger?.filter(
        (arbeidsgiver, index) => index !== utdanningsnummer
      );
      settTidligereUtdanninger(endretUtdanning);
    }
  };

  const settInputFelt = (
    label: string,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    settUtdanning({
      ...utdanning,
      linjeKursGrad: { label: label, verdi: e.currentTarget.value },
    });
  };

  const settPeriode = (dato: Date | null, nøkkel: EPeriode): void => {
    utdanning.periode &&
      settUtdanning({
        ...utdanning,
        periode: {
          ...utdanning.periode,
          label: hentTekst('utdanning.datovelger.studieperiode', intl),
          [nøkkel]: {
            label: hentTekst('periode.' + nøkkel, intl),
            verdi: dato,
          },
        },
      });
  };

  const utdanningTittel = hentTittelMedNr(
    tidligereUtdanninger!,
    utdanningsnummer,
    intl.formatMessage({ id: 'utdanning.undertittel' })
  );

  return (
    <KomponentGruppe>
      <TittelOgSlettKnapp>
        <Undertittel className={'tittel'} tag="h4">
          {utdanningTittel}
        </Undertittel>
        <SlettKnapp
          className={classnames('slettknapp', {
            kunEn: tidligereUtdanninger?.length === 1,
          })}
          onClick={() => fjernUtdanning()}
          tekstid={'utdanning.knapp.slett'}
        />
      </TittelOgSlettKnapp>
      <FeltGruppe aria-live="polite">
        <Input
          key={linjeKursGrad.id}
          label={linjeKursGradLabel}
          type="text"
          value={utdanning.linjeKursGrad?.verdi}
          bredde={'L'}
          onChange={(e) => settInputFelt(linjeKursGradLabel, e)}
        />
      </FeltGruppe>
      {harValgtSvar(utdanning.linjeKursGrad?.verdi) && (
        <KomponentGruppe>
          <PeriodeÅrMånedvelgere
            tekst={hentTekst('utdanning.datovelger.studieperiode', intl)}
            periode={utdanning.periode ? utdanning.periode : tomPeriode}
            settDato={settPeriode}
            aria-live="polite"
            datobegrensing={DatoBegrensning.TidligereDatoer}
          />
        </KomponentGruppe>
      )}
    </KomponentGruppe>
  );
};

export default Utdanning;
