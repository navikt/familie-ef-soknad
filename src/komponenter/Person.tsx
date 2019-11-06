import React, { useState } from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Hovedknapp } from 'nav-frontend-knapper';
import axios from 'axios';
import Environment from '../Environment';

const getUser = () => {
  return axios
    .get(`${Environment().apiUrl}/api/oppslag/sokerinfo`, {
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response.data;
    });
};

const Person = () => {
  let [loading, setLoading] = useState(false);
  //let [bearer, setBearer] = useState('');
  let [person, setPerson] = useState();
  let [barn, setBarn] = useState();
  let [feil, setFeil] = useState('');

  function getPerson() {
    setLoading(true);
    getUser()
      .then((response) => {
        setPerson(response.søker);
        setBarn(response.barn);
        setLoading(false);
      })
      .catch((error) => {
        setPerson({});
        setBarn({});
        setFeil(error);
        setLoading(false);
      });
  }

  function renderBarn(barnet: any) {
    return (
      <div key={barnet.fnr}>
        <p>Navn: {barnet.navn}</p>
        <p>Fnr: {barnet.fnr}</p>
        <p>Alder: {barnet.alder}</p>
      </div>
    );
  }

  function renderAlleBarn() {
    if (barn && barn.length) {
      return (
        <>
          <h3>Barn (Antall: {barn.length})</h3>
          {barn.map((barnet: any) => renderBarn(barnet))}
        </>
      );
    }
  }

  function renderPerson() {
    if (person && person.forkortetNavn) {
      return (
        <>
          <h3>Person</h3>
          <p>Navn: {person.forkortetNavn}</p>
          <p>Fødselsnummer: {person.fnr}</p>
          <p>Sivilstand: {person.sivilstand}</p>
        </>
      );
    } else {
      return <p> {feil.toString()}</p>;
    }
  }

  return (
    <Panel className="innholdspanel" border>
      <Hovedknapp onClick={() => getPerson()} spinner={loading}>
        Hent bruker
      </Hovedknapp>

      {renderPerson()}
      {renderAlleBarn()}
    </Panel>
  );
};

export default Person;
