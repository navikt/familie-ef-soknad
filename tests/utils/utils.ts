import tekster_nb from '../../src/language/tekster_nb';
import {Locator, Page} from "@playwright/test";

export const clickCheckBox = (page: Page, spørsmålstekst?: string): Promise<void> =>
    locateCheckBox(page, spørsmålstekst).click()

export const locateCheckBox = (page: Page, spørsmålstekst?: string): Locator =>
    page.locator('.skjemaelement__label', {hasText: spørsmålstekst})

export const clickRadioPanel = (page: Page, spørsmålstekst: string, svartekst: string): Promise<void> =>
    locateRadioPanel(page, spørsmålstekst, svartekst).click()

export const locateRadioPanel = (page: Page, spørsmålstekst: string, svartekst: string): Locator =>
    page.locator("fieldset", {hasText: spørsmålstekst})
        .locator("label", {hasText: svartekst})

export const clickInput = (page: Page, spørsmålstekst: string): Promise<void> =>
    locateInput(page, spørsmålstekst).click()

export const locateInput = (page: Page, spørsmålstekst: string): Locator =>
    page.locator('.skjemaelement', {hasText: spørsmålstekst}) //TODO .withExactText(spørsmålstekst).find('input');

export const clickNesteKnapp = (page: Page): Promise<void> =>
    locateNesteKnapp(page).click()

export const locateNesteKnapp = (page: Page): Locator =>
    page.locator('button', {hasText: 'NESTE'});

export const clickSendSøknadKnapp = (page: Page): Promise<void> =>
    locateSendSøknadKnapp(page).click()

export const locateSendSøknadKnapp = (page: Page): Locator =>
    page.locator('button', {hasText: 'SEND SØKNAD'})
