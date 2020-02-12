import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import barn1 from '../../../assets/barn1.svg';
import { Routes, IRoute } from '../../../routing/Routes';
import { hentNesteRoute } from '../../../routing/utils';
import { hentForrigeRoute } from '../../../routing/utils';
import { Input } from 'nav-frontend-skjema';
import DatePicker from 'react-datepicker';
import { Checkbox } from 'nav-frontend-skjema';
import SeksjonsGruppe from '../../../components/gruppe/SeksjonGruppe';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import FeltGruppe from '../../../components/gruppe/FeltGruppe';
import { useLocation } from 'react-router';
import { useIntl } from 'react-intl';

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknadContext();

  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);
  const forrigeRoute: IRoute = hentForrigeRoute(Routes, location.pathname);

  const barn = søknad.person.barn[0];

  const bosted = barn.harSammeAdresse ? intl.formatMessage({ id: 'barnekort.adresse.registrert' }) : intl.formatMessage({ id: 'barnekort.adresse.uregistrert' });

  console.log(barn);

  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'barnasbosted.sidetittel' })}
        nestePath={nesteRoute.path}
        tilbakePath={forrigeRoute.path}
      >
        <div className="barnas-bosted">
          <div className="barnas-bosted__header">
            <img alt="barn" className="barneikon" src={barn1} />
          </div>
          <div className="barnas-bosted__info">
            <Element className="navn">{barn.navn}</Element>
            <div className="inforad">
              <div className="informasjonselement">
                  <Normaltekst className="informasjonselement__header">FØDSELSNUMMER</Normaltekst>
                  <Normaltekst className="informasjonselement__innhold">{barn.fnr}</Normaltekst>
              </div>
              <div className="informasjonselement">
                  <Normaltekst className="informasjonselement__header">ALDER</Normaltekst>
                  <Normaltekst className="informasjonselement__innhold">{barn.alder} år</Normaltekst>
              </div>
              <div className="informasjonselement">
                  <Normaltekst className="informasjonselement__header">BOSTED</Normaltekst>
                  <Normaltekst className="informasjonselement__innhold">{bosted}</Normaltekst>
              </div>
            </div>
          </div>
          <div className="barnas-bosted__innhold">
          <KomponentGruppe>
            <FeltGruppe>
            <Element>{barn.navn}s andre forelder</Element>
            </FeltGruppe>
          <FeltGruppe>
            <Input className="foreldre-navn-input" onChange={(e) => console.log(e.target.value)} label="Navn" />
          </FeltGruppe>
          </KomponentGruppe>
          <KomponentGruppe>
          <div className="fødselsnummer">
            <div className="fødselsdato">
          <Normaltekst>Fødselsdato</Normaltekst>
          <div className="barn-datovelger">
          <div className={'datepicker__container'}>
            <DatePicker
                    onChange={(e) => console.log(e)}
                    selected={new Date()}
                    dateFormat={'dd.MM.yyyy'}
                    className={'datovelger__input'}
                />
                </div>
            </div>
            </div>
            <Input className="personnummer" onChange={(e) => console.log(e.target.value)} label="Personnummer. Kun hvis barnet har fått." />
            </div>
            </KomponentGruppe>
            <FeltGruppe>
            <Checkbox label={'Jeg kan ikke oppgi den andre forelderen'} />
            </FeltGruppe>
            </div>
            </div>
      </Side>
    </>
  );
};

export default BarnasBosted;
