# familie-ef-soknad

Frontend - søknad for enslig forsørger.

## Kjør lokalt

1. `npm install`
2. `npm run start`

* Hvis man ønsker å kjøre med mock-api
1. `node mock/mock-server.js`
2. `npm run start:mock`

Med api må du sette cookie første gang:
`http://localhost:8091/local/cookie?redirect=http://localhost:3000/familie/alene-med-barn/soknad&issuerId=tokenx&audience=familie-app`
## Kjør lokalt med mellomlagring
1. Last ned [familie-dokument](https://github.com/navikt/familie-dokument) og [familie-ef-soknad-api](https://github.com/navikt/familie-ef-soknad-api)
2. Kjør `mvn clean install` i begge prosjektene
2. Kjør opp appene lokalt ved å kjøre familie-dokument din `DevLauncher` og familie-ef-soknad-api sin `ApplicationLocalLauncher` 


## Kjøre opp med node-server lokalt
I noen få tilfeller kan det være nyttig å kjøre opp node-serverne lokalt, slik som det gjøres i preprod
1. `npm run build`
2. `kubectl -n teamfamilie get secret tokenx-familie-ef-soknad-[PODID] -o json | jq '.data | map_values(@base64d)'`
3. Legg inn dette istedenfor `tokenxConfig i `server/tokenx.ts`;
``` 
const tokenxConfig = {
  discoveryUrl:
    'https://tokendings.dev-gcp.nais.io/.well-known/oauth-authorization-server',
  clientId: 'dev-gcp:teamfamilie:familie-ef-soknad',
  privateJwk: '', // Kopier fra kubernetes
  redirectUri: miljø.oauthCallbackUri,
  clusterName: 'dev-gcp',
};
```
4. I `server`-mappa: `npm run build`
5. I `server`-mappa: `npm run start:dev`

## Kjør testcafe lokalt
1. Kjør `familie-ef-soknad-api` lokalt
2. Kjør søknaden lokalt med `npm run start`
3. Åpne en ny terminal og kjør `testcafe chrome test/test.js --skip-js-errors --live`

Hvis testcafe ikke er installert, kjør en `npm install` ev. installer testcafe globalt hos deg `npm install -g testcafe`

## Tekstinnhold
I appen har vi tekstinnhold på norsk bokmål, engelsk og nynorsk. 
Ønsker du å legge til eller redigere på en tekst, skal dette gjøres i exceldokumentet "EF Tekstinnhold App Søknadsdialog" som du finner på Teams under Team Familie > Enslig forsørger > Filer > Søknadsdialog > "EF Tekstinnhold App Søknadsdialog". 
1. Åpne "EF Tekstinnhold App Søknadsdialog" i nettleseren
2. Trykk på "Automate" i fanen, og velg "EF Script - Konverter tabell til json format".
3. Trykk på "Vis/Show" fulgt av "Kjør/Run".

Det skrives ut 3 ulike tekstbolker i "Utdata"-fanen under kodesnutten. Denne skal kopieres og limes inn i tilhørende "tekster_xx.json" fil. Husk å kjøre reformat (optn + cmd + l")


## Sett opp Prettier lokalt on save (IntelliJ)

1. I IntelliJ, åpne settings. Finn prettier. Ligger under Languages and Frameworks -> Javascript -> Prettier.
2. Sjekk av bokser for: 'On reformat code' og 'On save'

Test om Prettier fungerer ved å gå inn i en tilfeldig tsx-fil, lag et par nye linjer, og `Ctrl`+ `S`. Hvis koden reformatteres (fjerner alle utenom en av de tomme linjene), så er Prettier på plass lokalt! :sparkles:

## Kode generert av GitHub Copilot

Dette repoet bruker GitHub Copilot til å generere kode.