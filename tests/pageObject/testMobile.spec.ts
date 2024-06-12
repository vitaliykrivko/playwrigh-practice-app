import {test, expect} from '@playwright/test'

test('input fileds', async({page}, testInfo) => {
    await page.goto('/')
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click()
    }
    await page.getByText('Forms').click()
    await page.getByText('Form Layout').click()
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click()
    }

    const usingTHeGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
    await usingTHeGridEmailInput.fill('test@test.com')
    await usingTHeGridEmailInput.clear()
    await usingTHeGridEmailInput.fill('test2@test.com')
})