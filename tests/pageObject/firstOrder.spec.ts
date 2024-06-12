import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('https://practicesoftwaretesting.com/#/')
})

test.describe('test order', () => {
    
    test('1 test', async({page}) => {
        const dropDownMenu = page.getByLabel('sort')
        await dropDownMenu.click()

    })
})