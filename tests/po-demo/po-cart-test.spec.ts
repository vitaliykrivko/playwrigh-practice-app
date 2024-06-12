import {expect, test} from '@playwright/test'
import { LoginPage } from '../../po-cart/loginPage'
import { ProductPage } from '../../po-cart/productsPage'
import { assert } from 'console'

let loginPage: LoginPage
let productPage: ProductPage

test.describe('test add to cart', () => {
    const userName = 'standard_user'
    const password = 'secret_sauce'     

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        await page.goto('https://www.saucedemo.com/')
        await loginPage.loginToProducts(userName, password)
    })

    test('first order', async({page}) => {
        const order = await productPage.adToCart('Sauce Labs Backpack')
        expect(order).toBe('Sauce Labs Backpack - $29.99')
    })

    test('second order', async({page}) => {

    })
})