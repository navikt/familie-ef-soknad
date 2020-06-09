interface IEnvUrls {
  veiviserUrl: string;
  apiUrl: string;
  loginService: string;
  dokumentUrl: string;
  mellomlagerUrl: string;
}

const Environment = (): IEnvUrls => {
  if (window.location.hostname.indexOf('www-q0') > -1) {
    return {
      veiviserUrl: 'https://www-q0.nav.no/familie/alene-med-barn/veiviser',
      apiUrl: 'https://www-q0.nav.no/familie/alene-med-barn/soknad-api',
      loginService: 'https://loginservice-q.nav.no/login',
      dokumentUrl:
        'https://www-q0.nav.no/familie/alene-med-barn/mellomlagring/api/mapper/ANYTTHING', //Vil uansett gå til bucket "familievedlegg" enn så lenge
      mellomlagerUrl:
        'https://www-q0.nav.no/familie/alene-med-barn/mellomlagring/api/soknad/overgangsstonad',
    };
  } else if (window.location.hostname.indexOf('www') > -1) {
    return {
      veiviserUrl: 'https://www.nav.no/familie/alene-med-barn/veiviser',
      apiUrl: 'https://www.nav.no/familie/alene-med-barn/soknad-api',
      loginService: 'https://loginservice.nav.no/login',
      dokumentUrl:
        'https://www.nav.no/familie/alene-med-barn/mellomlagring/api/mapper/ANYTTHING', //Vil uansett gå til bucket "familievedlegg" enn så lenge,
      mellomlagerUrl:
        'https://www.nav.no/familie/alene-med-barn/mellomlagring/api/soknad/overgangsstonad',
    };
  } else {
    return {
      veiviserUrl: '',
      apiUrl: 'http://localhost:8091',
      loginService: `http://localhost:8091/local/cookie`,
      dokumentUrl: `http://localhost:8082/api/mapper/ANYTTHING`,
      mellomlagerUrl: `http://localhost:8082/api/soknad/overgangsstonad`,
    };
  }
};

export default Environment;
