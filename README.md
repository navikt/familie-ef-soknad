# familie-ef-soknad

Frontend - søknad for enslig forsørger.

## Kjør lokalt

1. `npm install`
2. `npm start`

Kjør uten redirect til autentisering lokalt: 
sett .env variabel: 
REACT_APP_BRUK_AUTENTISERING_I_DEV=false

## Deploy

`npm run deploy` deployer til test (https://navikt.github.io/familie-ef-veiviser/). Homepage-variablen i `package.json` må være satt til denne URLen før deploy: ´"homepage": "https://navikt.github.io/familie-ef-veiviser/"`.

Prod bygges fra master. homepage-variabelen må være satt til `"/familie/alene-med-barn/veiviser"` før push til master.

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
