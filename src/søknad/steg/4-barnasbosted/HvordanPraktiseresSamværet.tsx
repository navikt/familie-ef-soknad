import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { Textarea } from 'nav-frontend-skjema';
import { IForelder } from '../../../models/steg/forelder';
import { BodyShort, Label } from '@navikt/ds-react';

interface Props {
  forelder: any;
  settForelder: (verdi: IForelder) => void;
}

const HvordanPraktiseresSamværet: React.FC<Props> = ({
  forelder,
  settForelder,
}) => {
  const intl = useLokalIntlContext();

  return (
    <KomponentGruppe className="hvordan-praktiseres-samværet">
      <FeltGruppe>
        <Label>
          {intl.formatMessage({ id: 'barnasbosted.element.samvær' })}
        </Label>
        <BodyShort>
          {intl.formatMessage({ id: 'barnasbosted.BodyShort.opplysninger' })}
        </BodyShort>
        <ul>
          <li>
            <BodyShort>
              {intl.formatMessage({
                id: 'barnasbosted.BodyShort.hvormangedager',
              })}
            </BodyShort>
          </li>
          <li>
            <BodyShort>
              {intl.formatMessage({
                id: 'barnasbosted.BodyShort.nårreiserbarnet',
              })}
            </BodyShort>
          </li>
        </ul>
      </FeltGruppe>
      <FeltGruppe>
        <Textarea
          value={
            forelder.hvordanPraktiseresSamværet &&
            forelder.hvordanPraktiseresSamværet.verdi
              ? forelder.hvordanPraktiseresSamværet.verdi
              : ''
          }
          onChange={(e) =>
            settForelder({
              ...forelder,
              hvordanPraktiseresSamværet: {
                label: intl.formatMessage({
                  id: 'barnasbosted.element.samvær',
                }),
                verdi: e.target.value,
              },
            })
          }
          label=""
        />
      </FeltGruppe>
    </KomponentGruppe>
  );
};

export default HvordanPraktiseresSamværet;
