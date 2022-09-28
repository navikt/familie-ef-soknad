import {expect, Page, TestInfo} from '@playwright/test';
import {clickNesteKnapp} from "./utils/utils";

export enum Steg {
    START_SØKNAD = 'START_SØKNAD',
    OM_DEG = 'OM_DEG',
    BOSITUASJON = 'BOSITUASJON',
    BARNA_DINE = 'BARNA_DINE',
    BARNAS_BOSTED = 'BARNAS_BOSTED',
    AKTIVITET = 'AKTIVITET',
    DIN_SITUASJON = 'DIN_SITUASJON',
    OPPSOMMERING = 'OPPSOMMERING',
    DOKUMENTASJON = 'DOKUMENTASJON',
    KVITTERING = 'KVITTERING',
}

export const stegNummber: Record<Steg, string> = {
    START_SØKNAD : "0",
    OM_DEG : "1",
    BOSITUASJON : "2",
    BARNA_DINE : "3",
    BARNAS_BOSTED : "4",
    AKTIVITET : "5",
    DIN_SITUASJON : "6",
    OPPSOMMERING : "7",
    DOKUMENTASJON : "8",
    KVITTERING : "9",
}

const stegUtenNesteKnapp = [Steg.START_SØKNAD, Steg.DOKUMENTASJON, Steg.KVITTERING];

const lagPrefix = (testInfo: TestInfo, steg: Steg) => [...testInfo.titlePath.slice(1)].join('-') + `-${stegNummber[steg]}-${steg}`;

export const testSideMedScreenshot = async (page: Page, testInfo: TestInfo, steg: Steg, testSide?: (page: Page) => Promise<void>) => {
    const prefix = lagPrefix(testInfo, steg)
    await expect(page).toHaveScreenshot(`${prefix}-før.png`, {fullPage: true});
    testSide && await testSide(page);
    await expect(page).toHaveScreenshot(`${prefix}-etter.png`, {fullPage: true});
    if (stegUtenNesteKnapp.indexOf(steg) === -1) {
        await clickNesteKnapp(page)
    }
}

export const screenshot = async (page: Page, testInfo: TestInfo, steg: Steg) => {
    const prefix = lagPrefix(testInfo, steg);
    await expect(page).toHaveScreenshot(`${prefix}.png`, {fullPage: true});
}