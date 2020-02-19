import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { useIntl } from 'react-intl';
import { Textarea } from 'nav-frontend-skjema';

interface Props {
    forelder: any;
    settForelder: Function;
}

const HvordanPraktiseresSamværet: React.FC<Props> = ({ forelder, settForelder }) => {
    const intl = useIntl();

  return (
    <KomponentGruppe className="hvordan-praktiseres-samværet">
    <FeltGruppe>
      <Element>{intl.formatMessage({ id: 'barnasbosted.element.samvær' })}</Element>
      <Normaltekst>{intl.formatMessage({ id: 'barnasbosted.normaltekst.opplysninger' })}</Normaltekst>
      <ul>
        <li>
          <Normaltekst>{intl.formatMessage({ id: 'barnasbosted.normaltekst.hvormangedager' })}</Normaltekst>
        </li>
        <li>
          <Normaltekst>{intl.formatMessage({ id: 'barnasbosted.normaltekst.nårreiserbarnet' })}</Normaltekst>
        </li>
      </ul>
    </FeltGruppe>
    <FeltGruppe>
    <Textarea 
        value={forelder.hvordanPraktiseresSamværet}
        onChange={(e) => settForelder({...forelder, "hvordanPraktiseresSamværet": e.target.value})}
        label=""
    />
    </FeltGruppe>
  </KomponentGruppe>
  );
};

export default HvordanPraktiseresSamværet;
