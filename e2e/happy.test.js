import { Selector, RequestMock, RequestLogger, ClientFunction } from 'testcafe';

// testcafe chrome e2e/**.test.js --skip-js-errors --live
// pga cors-feil så kjøres denne med --skip-js-errors
// https://github.com/manakuro/github-actions-browser-test-example/blob/main/e2e/runner.ts

const sendSøknadLogger = RequestLogger('http://localhost:8091/api/soknad');

fixture(`Overgangsstønad`)
  .page(`http://localhost:3000/familie/alene-med-barn/soknad`)
  .requestHooks(
    RequestMock()
      .onRequestTo('http://localhost:8091/api/soknad')
      .respond('{}'),
    sendSøknadLogger
  );

const prepare = (t) => {
  let count = 0;
  t.legendMedRadio = async (spørsmålTekst, radioSvar) => {
    console.log(`Svarer på "${spørsmålTekst}"`);
    let selector = Selector('legend')
      .withExactText(spørsmålTekst)
      .parent(0);
    await t.expect(selector.count).eql(1);
    await t.click(selector.find('label').withExactText(radioSvar));
  };

  //TODO hvorfor har 1 spørsmål P?
  t.pMedRadio = async (spørsmålTekst, radioSvar) => {
    console.log(`Svarer på "${spørsmålTekst}"`);
    let selector = Selector('p')
      .withExactText(spørsmålTekst)
      .parent(0);
    await t.expect(selector.count).eql(1);
    await t.click(selector.find('label').withExactText(radioSvar));
  };

  t.typeTelefonummer = async () => {
    let telefonnummer = Selector('.skjemaelement')
      .withExactText('Telefonnummer du kan kontaktes på')
      .find('input');
    await t.typeText(telefonnummer, '12345678');
  };

  t.hvorforAleneMedBarn = async (svarTekst) => {
    let hvorforAlene = Selector('legend')
      .withExactText('Hvorfor er du alene med barn?')
      .parent(0);

    await t.click(hvorforAlene.find('label').withExactText(svarTekst));
  };

  t.klikkPåNeste = async () => {
    console.log(`Klikker på neste i=${++count}`);
    await t.click(Selector('button').withExactText('NESTE'));
  };
};

async function startSøknad(t) {
  await t.click('.skjemaelement__label');
  await t.click(Selector('button').withExactText('START SØKNAD'));
}

async function førsteSide_omDeg(t) {
  await t.legendMedRadio('Bor du på denne adressen?', 'Ja');
  await t.typeTelefonummer();
  await t.legendMedRadio(
    'Du er registrert som ugift i folkeregisteret. Er du gift uten at det er registrert i folkeregisteret i Norge?',
    'Nei'
  );
  await t.legendMedRadio(
    'Er du separert eller skilt uten at dette er registrert i folkeregisteret i Norge?',
    'Nei'
  );
  await t.hvorforAleneMedBarn('Jeg er alene med barn på grunn av dødsfall');
  await t.legendMedRadio(
    'Er du separert eller skilt uten at dette er registrert i folkeregisteret i Norge?',
    'Nei'
  );
  await t.legendMedRadio('Oppholder du og barnet/barna dere i Norge?', 'Ja');
  await t.legendMedRadio('Har du bodd i Norge de siste fem årene?', 'Ja');

  await t.klikkPåNeste();
}

async function tredje_bosituasjon(t) {
  await t.legendMedRadio(
    'Deler du bolig med andre voksne?',
    'Nei, jeg bor alene med barn eller jeg er gravid og bor alene'
  );
  await t.legendMedRadio(
    'Har du konkrete planer om å gifte deg eller bli samboer?',
    'Nei'
  );

  await t.klikkPåNeste();
}

async function fjerdje_samvær(t) {
  await t.click(
    Selector('label').withExactText('Jeg kan ikke oppgi den andre forelderen')
  );

  await t.legendMedRadio(
    'Hvorfor kan du ikke oppgi den andre forelderen?',
    'Donor'
  );

  await t.klikkPåNeste();
  await t.klikkPåNeste();
}

test('My first test', async (t) => {
  prepare(t);
  await startSøknad(t);

  await førsteSide_omDeg(t);

  await tredje_bosituasjon(t);

  await t.klikkPåNeste(); // Barne dine

  await fjerdje_samvær(t);

  await t.legendMedRadio(
    'Hvordan er arbeidsituasjonen din?',
    'Jeg er ikke i arbeid, utdanning eller arbeidssøker'
  );
  await t.klikkPåNeste();

  await t.legendMedRadio('Gjelder noe av dette deg?', 'Nei');
  await t.legendMedRadio(
    'Har du sagt opp jobben eller redusert arbeidstiden de siste 6 månedene?',
    'Nei'
  );
  await t.pMedRadio(
    'Søker du overgangsstønad fra en bestemt måned?',
    'Nei, Nav kan vurdere fra hvilken måned jeg har rett til stønad'
  );
  await t.klikkPåNeste();

  await t.klikkPåNeste(); // Oppsummering

  await t.click(Selector('button').withExactText('SEND SØKNAD'));
  await t
    .expect(sendSøknadLogger.requests.length)
    .eql(1)
    .expect(sendSøknadLogger.contains((r) => r.response.statusCode === 200))
    .ok();

  await t.wait(5000);
});
