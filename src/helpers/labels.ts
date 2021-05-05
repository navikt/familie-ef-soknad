export const standardLabelsBarn: any = {
  fnr: 'Fødselsnummer eller d-nummer',
  navn: 'Navn',
  alder: 'Alder',
  fødselsdato: 'Fødselsdato',
  harSammeAdresse: 'Har barnet samme adresse som deg?',
  født: 'Er barnet født?',
  medforelder: 'Annen forelder',
};

export const skalMappeBarnefeltUtenLabel = (key: string) => {
  switch (key) {
    case 'harAdressesperre':
      return true;
    default:
      return false;
  }
};
