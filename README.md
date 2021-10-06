# familie-ef-soknad

Frontend - søknad for enslig forsørger.

## Kjør lokalt

1. `npm install`
2. `npm start`

Kjør uten redirect til autentisering lokalt: 
sett .env variabel: 
REACT_APP_BRUK_API_I_DEV=false

Med api må du sette cookie første gang:
`http://localhost:8091/local/cookie?redirect=http://localhost:3000/familie/alene-med-barn/soknad/`

## Kjør lokalt med mellomlagring
1. Last ned [familie-dokument](https://github.com/navikt/familie-dokument) og [familie-ef-soknad-api](https://github.com/navikt/familie-ef-soknad-api)
2. Kjør `mvn clean install` i begge prosjektene
2. Kjør opp appene lokalt ved å kjøre familie-dokument din `DevLauncher` og familie-ef-soknad-api sin `ApplicationLocalLauncher` 

## Kjør testcafe lokalt
1. Kjør `familie-ef-soknad-api` lokalt
2. Kjør søknaden lokalt med `npm start`
3. Åpne en ny terminal og kjør `testcafe chrome test/test.js --skip-js-errors --live`

Hvis testcafe ikke er installert, kjør en `npm install` ev. installer testcafe globalt hos deg `npm install -g testcafe`

## Tekstinnhold
I appen har vi tekstinnhold på norsk bokmål, engelsk og nynorsk. 
Ønsker du å legge til eller redigere på en tekst, skal dette gjøres i exceldokumentet "EF Tekstinnhold App Søknadsdialog" som du finner på Teams under Team Familie > Enslig forsørger > Filer > Søknadsdialog > "EF Tekstinnhold App Søknadsdialog". 
1. Åpne "EF Tekstinnhold App Søknadsdialog" i nettleseren
2. Trykk på "Automate" i fanen, og velg "EF Script - Konverter tabell til json format".

Det skrives ut 3 ulike tekst bolker. Denne skal kopieres og limes inn i tilhørende "tekster_xx.json" fil. Husk å kjøre reformat (optn + cmd + l")



## Sett opp Prettier lokalt on save (IntelliJ)

1. I IntelliJ, åpne `Preferences/Plugins` for så å søke opp og installere `File Watchers` og `Prettier` hvis dette ikke allerede er gjort.  
2. Finn `File Watchers` under `Preferences/Tools/File Watchers`, og trykk på `+-ikonet nederst til venstre. for å legge til en ny Watcher.
3. Fyll deretter inn feltene slik som tabellen under, og fjern ellers avhuking på `Auto-Save edited files to trigger the watcher` og `Trigger the watcher on external changes`. Trykk ok. 
 

| File Watcher  | Second Header |
| -------- | ------------ |
| Name  | Prettier |
| File type | any |
|  Scope | Project Files |
| Program | $ProjectFileDir$/node_modules/.bin/prettier |
| Arguments | --write $FilePathRelativeToProjectRoot$ |
| Output paths to refresh | $FilePathRelativeToProjectRoot$ |
| Working Directory | $ProjectFileDir$ |


Test om Prettier fungerer ved å gå inn i en tilfeldig tsx-fil, lag et par nye linjer, og `Ctrl`+ `S`. Hvis koden reformatteres (fjerner alle utenom en av de tomme linjene), så er Prettier på plass lokalt! :sparkles:
