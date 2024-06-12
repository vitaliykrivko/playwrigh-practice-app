import { Locator, Page, expect } from "@playwright/test";

export class LoginPage{

    readonly page: Page
    readonly userName: Locator
    readonly password: Locator
    readonly loginButton: Locator

    constructor(page: Page){
        this.page = page
        this.userName = page.locator('#user-name')
        this.password = page.locator('#password')
        this.loginButton = page.locator('#login-button')
    }

    async loginToProducts(userName: string, password: string){
        await this.userName.fill(userName)
        await this.password.fill(password)
        await this.loginButton.click()
        await expect(this.loginButton).toBeHidden()
    }

}