import React, { FC, useState } from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { Textarea, Select } from 'nav-frontend-skjema';
import LocaleTekst from '../../../../language/LocaleTekst';
//import useSøknadContext from '../../../../context/SøknadContext';
import { hentÅrstall } from '../../../../utils/dato';
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi';
import { måneder } from '../../../../config/datoConfig';
import { IPeriode } from '../../../../models/søknad';
import { Flatknapp } from 'nav-frontend-knapper';
import { ReactComponent as Slett } from '../../../../assets/Slett.svg';

interface Props {
  periode: IPeriode;
  nummer: number;
  intl: IntlShape;
}

const Utenlandsperiode: FC<Props> = ({ nummer, periode, intl }) => {
  // const { søknad, settSøknad } = useSøknadContext();
  // const { perioderBoddIUtlandet } = søknad;
  const fratilTekst = ['periode.fra', 'periode.til'];
  const [fritekst, settFritekst] = useState('');

  const { årstall } = hentÅrstall();
  const settMåned = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log(e.target.value, e);
  };
  const settÅr = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log(e.target.value, e);
  };
  const settBegrunnelse = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    settFritekst(e.target.value);
    console.log(e.target.value);
    // settSøknad({
    //   ...søknad,
    //   perioderBoddIUtlandet: {
    //     ...perioderBoddIUtlandet,
    //     begrunnelse: fritekst
    //   }

    // });
  };

  const fjernUtenlandsperiode = (nummer: number) => {
    /*const nyttUtenlandsopphold: IPeriode = nyPeriode;
    const alleUtenlandsopphold = perioderBoddIUtlandet;
    alleUtenlandsopphold && alleUtenlandsopphold.push(nyttUtenlandsopphold);
    alleUtenlandsopphold &&
      settSøknad({ ...søknad, perioderBoddIUtlandet: alleUtenlandsopphold });*/
  };

  const periodeTittel = intl.formatMessage({
    id: 'medlemskap.periodeBoddIUtlandet.utenlandsopphold',
  });

  return (
    <div className="utenlandsopphold utenlandsopphold__container">
      <Undertittel className={'utenlandsopphold__tittel'}>
        {periodeTittel + ' ' + (nummer + 1)}
      </Undertittel>
      <Flatknapp
        className="utenlandsopphold__slettknapp"
        onClick={() => fjernUtenlandsperiode(nummer)}
      >
        <span>
          {intl.formatMessage({ id: 'medlemskap.periodeBoddIUtlandet.slett' })}
        </span>
        <Slett />
      </Flatknapp>

      <Element className={'utenlandsopphold__spørsmål'}>
        <LocaleTekst tekst={'medlemskap.periodeBoddIUtlandet'} />
      </Element>
      {fratilTekst.map((tekstid) => {
        const stylingKlasse = 'periodegruppe ' + tekstid.replace('.', '-');
        return (
          <div key={tekstid} className={stylingKlasse}>
            <Normaltekst className={'fratil'}>
              <LocaleTekst tekst={tekstid} />
            </Normaltekst>
            <Select
              label={''}
              bredde={'s'}
              className={'måned'}
              selected={intl.formatMessage({ id: 'måned' })}
              onFocus={(e) => settMåned(e)}
            >
              <option value="">{intl.formatMessage({ id: 'måned' })}</option>
              {måneder.map((mnd, index) => {
                return (
                  <option value={index + 1} key={index + 1}>
                    {intl.formatMessage({ id: mnd.tekstid })}
                  </option>
                );
              })}
            </Select>
            <Select
              label={''}
              bredde={'s'}
              className={'år'}
              selected={intl.formatMessage({ id: 'år' })}
              onFocus={(e) => settÅr(e)}
            >
              <option value="">{intl.formatMessage({ id: 'år' })}</option>
              {årstall.map((år) => {
                return (
                  <option key={år} value={år}>
                    {år}
                  </option>
                );
              })}
            </Select>
          </div>
        );
      })}
      <Textarea
        label={intl.formatMessage({
          id: 'medlemskap.periodeBoddIUtlandet.begrunnelse',
        })}
        placeholder={'...'}
        value={fritekst}
        maxLength={1000}
        onChange={(e) => settBegrunnelse(e)}
      />
    </div>
  );
};

export default injectIntl(Utenlandsperiode);
