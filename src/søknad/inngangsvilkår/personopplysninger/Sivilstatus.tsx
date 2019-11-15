import React, { SyntheticEvent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import FeltGruppe from '../../../components/FeltGruppe';
import LocaleTekst from '../../../language/LocaleTekst';
import { usePersonContext } from '../../../context/PersonContext';
import { injectIntl } from 'react-intl';
import { hentSivilstatus } from '../../../utils/søknad';
import { ISpørsmål, ISvar } from '../../../models/spørsmal';
import {
  hentSvar,
  hentTekstidTilJaNeiSvar,
} from '../../../utils/spørsmålogsvar';
import { RadioPanel } from 'nav-frontend-skjema';
import useSøknadContext from '../../../context/SøknadContext';
import { SpørsmålOgSvar } from '../../../config/SivilstatusConfig';

const Sivilstatus: React.FC<any> = ({ intl }) => {
  const { person } = usePersonContext();
  const { søknad, settSøknad } = useSøknadContext();
  const erSøkerGift = person.søker.sivilstand === 'GIFT';
  const sivilstand = person.søker.sivilstand;
  const spørsmål: ISpørsmål = SpørsmålOgSvar;

  const onClickHandle = (
    e: SyntheticEvent<EventTarget, Event>,
    spørsmål: ISpørsmål,
    svar: ISvar
  ): void => {
    settSøknad({ ...søknad, [spørsmål.spørsmål_id]: svar === ISvar.JA });
  };

  return (
    <>
      {erSøkerGift ? (
        <section className={'seksjon'}>
          <FeltGruppe>
            <Element>
              <LocaleTekst tekst={'sivilstatus.tittel'} />
            </Element>
            <Normaltekst>
              {intl.formatMessage({ id: 'sivilstatus.giftmed' }) +
                '[insert partner here]'}
            </Normaltekst>
          </FeltGruppe>
          <div key={sivilstand} className="spørsmålgruppe">
            <Element>
              {intl.formatMessage({ id: 'sivilstatus.søktseparasjon' })}
            </Element>
            <div className={'radioknapp__wrapper'}>
              {spørsmål.svaralternativer.map((svar: ISvar) => {
                const svarISøknad = hentSvar(spørsmål, svar, søknad);
                return (
                  <div key={svar} className={'radioknapp__item'}>
                    <RadioPanel
                      key={svar}
                      name={spørsmål.spørsmål_id + svar}
                      label={intl.formatMessage({
                        id: hentTekstidTilJaNeiSvar(svar),
                      })}
                      value={svar}
                      checked={svarISøknad ? svarISøknad : false}
                      onChange={(e) => onClickHandle(e, spørsmål, svar)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className={'seksjon'}>
          <FeltGruppe>
            <Element>
              <LocaleTekst tekst={'sivilstatus.tittel'} />
            </Element>
            <Normaltekst>{hentSivilstatus(sivilstand)}</Normaltekst>
          </FeltGruppe>
        </section>
      )}
    </>
  );
};

export default injectIntl(Sivilstatus);
